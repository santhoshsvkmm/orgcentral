/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader } from 'three'
  // Minimal typing to satisfy imports; users can install @types/three if needed
  export class GLTFLoader extends Loader {
    load(url: string, onLoad: (gltf: any) => void, onProgress?: (event: any) => void, onError?: (error: any) => void): void;
    parse: (data: ArrayBuffer, path: string, onLoad: (gltf: any) => void, onError?: (error: any) => void) => void;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { EventDispatcher, MOUSE, TOUCH, Camera, Vector3 } from 'three'
  import { Camera as ThreeCamera } from 'three'
  export class OrbitControls extends EventDispatcher {
    constructor(object: any, domElement?: HTMLElement)
    update(): void
    dispose(): void
    target: Vector3
    enableDamping: boolean
    dampingFactor: number
    enableZoom: boolean
    enablePan: boolean
    mouseButtons: any
    touch: any
  }
}

declare module 'three/examples/jsm/loaders/DRACOLoader' {
  import { Loader } from 'three'
  export class DRACOLoader extends Loader {
    setDecoderPath(path: string): void
    decodeDracoFile(buffer: ArrayBuffer, callback: (geometry: any) => void): void
  }
}
