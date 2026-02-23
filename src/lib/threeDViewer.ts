/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export interface ThreeDViewerInstance {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  loadModel: (url: string) => Promise<void>;
  dispose: () => void;
  zoomIn: (factor?: number) => void;
  zoomOut: (factor?: number) => void;
  pan: (deltaX: number, deltaY: number) => void;
  setOnSelectionChanged: (callback?: (object: THREE.Object3D | null) => void) => void;
}

export const initThreeDViewer = (container: HTMLDivElement, _options?: any): ThreeDViewerInstance => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  // Some OrbitControls properties may be missing from ambient typings for the examples package
  // Use ts-expect-error where necessary to avoid spurious type errors while keeping runtime behavior.
  // @ts-expect-error - example typings for OrbitControls may lack some runtime props
  controls.screenSpacePanning = false;
  // @ts-expect-error - property missing in ambient typedefs
  controls.minDistance = 1;
  // @ts-expect-error - property missing in ambient typedefs
  controls.maxDistance = 500;
  // @ts-expect-error - property missing in ambient typedefs
  controls.maxPolarAngle = Math.PI / 2;

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  // @ts-expect-error - loader typing may not expose setDRACOLoader in this env
  loader.setDRACOLoader?.(dracoLoader);

  let animationFrameId = 0;
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  const onWindowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onWindowResize);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let INTERSECTED: THREE.Object3D | null = null;
  let selectionCallback: ((object: THREE.Object3D | null) => void) | undefined;

  const onPointerMove = (event: MouseEvent) => {
    pointer.x = (event.clientX / container.clientWidth) * 2 - 1;
    pointer.y = -(event.clientY / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      if (INTERSECTED !== intersects[0].object) {
        INTERSECTED = intersects[0].object;
        selectionCallback?.(INTERSECTED);
      }
    } else {
      if (INTERSECTED) selectionCallback?.(null);
      INTERSECTED = null;
    }
  };
  container.addEventListener('mousemove', onPointerMove);

  const loadModel = (url: string) => {
    scene.children.slice().forEach(child => {
      if ((child as any).isMesh || (child as any).isGroup) scene.remove(child);
    });

    return new Promise<void>((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          scene.add(gltf.scene);
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = (camera.fov * Math.PI) / 180;
          let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
          cameraZ *= 1.5;
          camera.position.set(center.x, center.y, center.z + cameraZ);
          controls.target.copy(center);
          controls.update();
          resolve();
        },
        undefined,
        (error) => reject(error)
      );
    });
  };

  const dispose = () => {
    window.removeEventListener('resize', onWindowResize);
    container.removeEventListener('mousemove', onPointerMove);
    cancelAnimationFrame(animationFrameId);
    try { controls.dispose(); } catch {}
    try { renderer.dispose(); } catch {}
    if (renderer.domElement && renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
  };

  const zoomIn = (factor = 1.2) => { camera.zoom *= factor; camera.updateProjectionMatrix(); };
  const zoomOut = (factor = 1.2) => { camera.zoom /= factor; camera.updateProjectionMatrix(); };

  const pan = (deltaX: number, deltaY: number) => {
    const offset = new THREE.Vector3();
    offset.copy(camera.position).sub((controls as any).target ?? new THREE.Vector3());
    const targetDistance = offset.length();
    const panX = (2 * deltaX * (targetDistance / container.clientHeight)) / camera.zoom;
    const panY = (2 * deltaY * (targetDistance / container.clientHeight)) / camera.zoom;
    const panOffset = new THREE.Vector3(-panX, panY, 0);
    const te = camera.matrix.elements;
    const x = new THREE.Vector3(te[0], te[1], te[2]).multiplyScalar(panOffset.x);
    const y = new THREE.Vector3(te[4], te[5], te[6]).multiplyScalar(panOffset.y);
    (controls as any).target.add(x).add(y);
    camera.position.add(x).add(y);
    controls.update();
  };

  const setOnSelectionChanged = (cb?: (object: THREE.Object3D | null) => void) => { selectionCallback = cb; };

  return {
    scene,
    camera,
    renderer,
    controls,
    loadModel,
    dispose,
    zoomIn,
    zoomOut,
    pan,
    setOnSelectionChanged,
  };
};