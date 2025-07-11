import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; // For compressed glTF

interface ThreeDViewerInstance {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  loadModel: (url: string) => Promise<void>;
  dispose: () => void;
  // Add event listeners or other methods as needed
  zoomIn: (factor?: number) => void;
  zoomOut: (factor?: number) => void;
  pan: (deltaX: number, deltaY: number) => void; // Conceptual pan
  onSelectionChanged?: (object: THREE.Object3D | null) => void;
}

export const initThreeDViewer = (container: HTMLDivElement, options?: any): ThreeDViewerInstance => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0); // Light gray background

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when damping is enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2; // Prevent camera from going below the ground

  // Add some lighting
  const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);

  let animationFrameId: number;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping is set to true
    renderer.render(scene, camera);
  };
  animate();

  const onWindowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onWindowResize);

  // Simple selection (raycasting example)
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
          if (INTERSECTED != intersects[0].object) {
              if (INTERSECTED) {
                  // Reset previous selection highlight
                  // (Conceptual: you'd modify material/color here)
              }
              INTERSECTED = intersects[0].object;
              // Highlight new selection
              // (Conceptual: you'd modify material/color here)
              if (selectionCallback) {
                selectionCallback(INTERSECTED);
              }
          }
      } else {
          if (INTERSECTED) {
              // Reset highlight for no selection
              // (Conceptual: remove highlight)
              if (selectionCallback) {
                selectionCallback(null);
              }
          }
          INTERSECTED = null;
      }
  };
  container.addEventListener('mousemove', onPointerMove);


  return {
    scene,
    camera,
    renderer,
    controls,
    loadModel: (url: string) => {
      // Clear previous model
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
          scene.remove(child);
        }
      });

      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => {
            scene.add(gltf.scene);
            // Optional: Fit camera to model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5; // Add some padding
            camera.position.set(center.x, center.y, center.z + cameraZ);
            controls.target.copy(center);
            controls.update();

            resolve();
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error) => {
            console.error('An error happened loading 3D model', error);
            reject(error);
          }
        );
      });
    },
    dispose: () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeEventListener('mousemove', onPointerMove);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      console.log('Three.js viewer disposed.');
    },
    set onSelectionChanged(callback: ((object: THREE.Object3D | null) => void) | undefined) {
      selectionCallback = callback;
    }
    ,
    zoomIn: (factor = 1.2) => {
      camera.zoom *= factor;
      camera.updateProjectionMatrix();
      // controls.update() will handle rendering if damping is enabled
    },
    zoomOut: (factor = 1.2) => {
      camera.zoom /= factor;
      camera.updateProjectionMatrix();
      // controls.update() will handle rendering if damping is enabled
    },
    pan: (deltaX: number, deltaY: number) => {
      // Conceptual pan implementation
      // OrbitControls handles panning with mouse, but this could be for programmatic pan
      console.log(`Conceptual 3D Pan: deltaX=${deltaX}, deltaY=${deltaY}`);
    }
  };
};
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; // For compressed glTF

interface ThreeDViewerInstance {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  loadModel: (url: string) => Promise<void>;
  dispose: () => void;
  // Add event listeners or other methods as needed
  onSelectionChanged?: (object: THREE.Object3D | null) => void;
}

export const initThreeDViewer = (container: HTMLDivElement, options?: any): ThreeDViewerInstance => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0); // Light gray background

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when damping is enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2; // Prevent camera from going below the ground

  // Add some lighting
  const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);

  let animationFrameId: number;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping is set to true
    renderer.render(scene, camera);
  };
  animate();

  const onWindowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onWindowResize);

  // Simple selection (raycasting example)
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
          if (INTERSECTED != intersects[0].object) {
              if (INTERSECTED) {
                  // Reset previous selection highlight
                  // (Conceptual: you'd modify material/color here)
              }
              INTERSECTED = intersects[0].object;
              // Highlight new selection
              // (Conceptual: you'd modify material/color here)
              if (selectionCallback) {
                selectionCallback(INTERSECTED);
              }
          }
      } else {
          if (INTERSECTED) {
              // Reset highlight for no selection
              // (Conceptual: remove highlight)
              if (selectionCallback) {
                selectionCallback(null);
              }
          }
          INTERSECTED = null;
      }
  };
  container.addEventListener('mousemove', onPointerMove);


  return {
    scene,
    camera,
    renderer,
    controls,
    loadModel: (url: string) => {
      // Clear previous model
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
          scene.remove(child);
        }
      });

      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => {
            scene.add(gltf.scene);
            // Optional: Fit camera to model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5; // Add some padding
            camera.position.set(center.x, center.y, center.z + cameraZ);
            controls.target.copy(center);
            controls.update();

            resolve();
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error) => {
            console.error('An error happened loading 3D model', error);
            reject(error);
          }
        );
      });
    },
    dispose: () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeEventListener('mousemove', onPointerMove);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      console.log('Three.js viewer disposed.');
    },
    set onSelectionChanged(callback: ((object: THREE.Object3D | null) => void) | undefined) {
      selectionCallback = callback;
    }
  };
};
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; // For compressed glTF

interface ThreeDViewerInstance {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  loadModel: (url: string) => Promise<void>;
  dispose: () => void;
  // Add event listeners or other methods as needed
  onSelectionChanged?: (object: THREE.Object3D | null) => void;
}

export const initThreeDViewer = (container: HTMLDivElement, options?: any): ThreeDViewerInstance => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0); // Light gray background

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when damping is enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2; // Prevent camera from going below the ground

  // Add some lighting
  const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);

  let animationFrameId: number;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping is set to true
    renderer.render(scene, camera);
  };
  animate();

  const onWindowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onWindowResize);

  // Simple selection (raycasting example)
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
          if (INTERSECTED != intersects[0].object) {
              if (INTERSECTED) {
                  // Reset previous selection highlight
                  // (Conceptual: you'd modify material/color here)
              }
              INTERSECTED = intersects[0].object;
              // Highlight new selection
              // (Conceptual: you'd modify material/color here)
              if (selectionCallback) {
                selectionCallback(INTERSECTED);
              }
          }
      } else {
          if (INTERSECTED) {
              // Reset highlight for no selection
              // (Conceptual: remove highlight)
              if (selectionCallback) {
                selectionCallback(null);
              }
          }
          INTERSECTED = null;
      }
  };
  container.addEventListener('mousemove', onPointerMove);


  return {
    scene,
    camera,
    renderer,
    controls,
    loadModel: (url: string) => {
      // Clear previous model
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
          scene.remove(child);
        }
      });

      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => {
            scene.add(gltf.scene);
            // Optional: Fit camera to model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5; // Add some padding
            camera.position.set(center.x, center.y, center.z + cameraZ);
            controls.target.copy(center);
            controls.update();

            resolve();
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error) => {
            console.error('An error happened loading 3D model', error);
            reject(error);
          }
        );
      });
    },
    dispose: () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeEventListener('mousemove', onPointerMove);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      console.log('Three.js viewer disposed.');
    },
    set onSelectionChanged(callback: ((object: THREE.Object3D | null) => void) | undefined) {
      selectionCallback = callback;
    }
  };
};