import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  viewChild,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Constants } from '@common/constants/constants';
import { I18nService } from '@services/general';
import { TranslatePipe } from '@ngx-translate/core';
import { Model3DCreateHttpService, Model3DAnimalHttpService } from '@services/http';
/**component for 3D model visalization
 * @author nav
 * */

@Component({
  selector: 'app-glb-viewer',
  imports: [CommonModule, MatIcon, TranslatePipe],
  templateUrl: './glb-viewer.component.html',
  styleUrl: './glb-viewer.component.scss',
  changeDetection: Constants.changeDetectionStrategy,
})
export class GlbViewerComponent implements OnInit, OnDestroy {
  readonly animalId = input<number>();
  readonly width = input<string>('100%');
  readonly height = input<string>('100%');
  readonly autoRotate = input<boolean>(true);
  isLoading = true;

  errorMessage: string | null = null;
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private animationId: number | null = null;
  private loader = new GLTFLoader();
  private currentModelUrl: string | null = null;
  readonly model3DAnimalHttpService = inject(Model3DAnimalHttpService);
  readonly i18nService = inject(I18nService);

  constructor() {
    effect(() => {
      if (this.animalId() && this.scene) {
        this.loadModelFromDatabase();
      }
    });
    effect(() => {
      const model3D = this.model3DAnimalHttpService.currentModel3D();
      if (model3D?.urlModelo && this.scene) {
        this.loadGLBModel(model3D.urlModelo);
      } else if (model3D && !model3D.urlModelo && this.animalId()) {
        this.errorMessage = this.i18nService.instant(
          this.i18nService.i18nModel3DEnum.NO_MODEL_AVAILABLE
        );
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.initThreeJS();
    this.loadModel();
  }
  ngOnDestroy(): void {
    this.cleanup();
    this.model3DAnimalHttpService.clearModel();
  }
  /**
   * Load model either from URL or by animal ID
   * @author nav
   */
  private loadModel(): void {
    if (this.animalId()) {
      this.loadModelFromDatabase();
    } else {
      this.errorMessage = this.i18nService.instant(
        this.i18nService.i18nModel3DEnum.ANIMAL_ID_REQUIRED
      );
      this.isLoading = false;
    }
  }

  /**
   * Load model from database using animal ID
   * @author nav
   */
  private loadModelFromDatabase(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.clearScene();
    this.model3DAnimalHttpService.getByAnimalId(this.animalId()!);
  }
  /**
   * Load GLB model from URL
   * @param url URL of the GLB file
   * @author nav
   */
  private loadGLBModel(url: string): void {
    if (this.currentModelUrl === url) {
      this.isLoading = false;
      return;
    }
    this.currentModelUrl = url;
    this.isLoading = true;
    this.errorMessage = null;
    this.clearScene();
    this.loader.load(
      url,
      (gltf) => {
        this.onModelLoaded(gltf);
      },
      (progress) => {
        console.log(
          'Loading progress:',
          (progress.loaded / progress.total) * 100 + '%'
        );
      },
      (error) => {
        this.onModelError(error);
      }
    );
  }
  /**
   * Clear previous model from scene
   * @author nav
   */
  private clearScene(): void {
    if (this.scene) {
      const objectsToRemove = this.scene.children.filter(
        (child) => child.type === 'Group' || child.type === 'Object3D'
      );
      objectsToRemove.forEach((obj) => {
        this.scene.remove(obj);
      });
    }
  }
  /**
   * Initialize Three.js scene, camera, renderer, and controls
   * @author nav
   */
  private initThreeJS(): void {
    const canvasElement = this.canvas()?.nativeElement;
    if (!canvasElement) return;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvasElement.clientWidth / canvasElement.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(6, 4, 6);
    this.camera.lookAt(0, 0, 0);
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      precision: 'highp',
    });
    this.renderer.setSize(
      canvasElement.clientWidth,
      canvasElement.clientHeight
    );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 15;
    this.controls.maxPolarAngle = Math.PI * 0.9;
    this.controls.autoRotate = this.autoRotate();
    this.controls.autoRotateSpeed = 0.8;
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.setupLighting();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.animate();
  }

  /**
   * Setup lighting for the scene
   * @author nav
   */
  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    this.scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
  }
  /**
   * Handle successful model loading
   * @param gltf The loaded GLTF object
   * @author nav
   */
  private onModelLoaded(gltf: any): void {
    const model = gltf.scene;

    this.fitModelToScene(model);

    model.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.transparent = false;
          child.material.opacity = 1.0;
          if (
            child.material.color &&
            child.material.color.r < 0.1 &&
            child.material.color.g < 0.1 &&
            child.material.color.b < 0.1
          ) {
            child.material.color.setRGB(0, 0, 0);
          }
        }
      }
    });
    this.scene.add(model);
    this.isLoading = false;
  }
  /**
   * Handle model loading error
   * @param error The error object
   * @author nav
   */ private onModelError(error: any): void {
    console.error('Error loading GLB model:', error);
    const i18nKeys = this.i18nService.i18nModel3DEnum;

    if (
      error instanceof TypeError &&
      error.message.includes('Failed to fetch')
    ) {
      this.errorMessage = this.i18nService.instant(i18nKeys.CORS_ERROR);
    } else if (
      error.message?.includes('NetworkError') ||
      error.message?.includes('CORS')
    ) {
      this.errorMessage = this.i18nService.instant(i18nKeys.NETWORK_ERROR);
    } else if (error.status === 404) {
      this.errorMessage = this.i18nService.instant(i18nKeys.NOT_FOUND_ERROR);
    } else if (error.status === 0) {
      this.errorMessage = this.i18nService.instant(i18nKeys.CONNECTION_ERROR);
    } else if (error.status === 500) {
      this.errorMessage = this.i18nService.instant(i18nKeys.SERVER_ERROR);
    } else {
      this.errorMessage = `${this.i18nService.instant(
        i18nKeys.UNKNOWN_ERROR
      )}: ${error.message || this.i18nService.instant(i18nKeys.UNKNOWN_ERROR)}`;
    }
    this.isLoading = false;
  }

  /**
   * Fit model to scene by calculating bounding box and adjusting scale/position
   * @param model The loaded model
   * @author nav
   */
  private fitModelToScene(model: THREE.Object3D): void {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDim;
    model.scale.setScalar(scale);
    model.position.copy(center).multiplyScalar(-scale);
  }
  /**
   * Animation loop
   * @author nav
   */
  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Handle window resize
   * @author nav
   */
  private onWindowResize(): void {
    const canvasElement = this.canvas()?.nativeElement;
    if (!canvasElement) return;
    this.camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      canvasElement.clientWidth,
      canvasElement.clientHeight
    );
  }

  /**
   * Clean up resources
   * @author nav
   */
  private cleanup(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.scene) {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
    }
  }
}
