import { Injectable, ElementRef } from "@angular/core";
import * as BABYLON from "babylonjs";
import "babylonjs-materials";

@Injectable({
  providedIn: "root"
})
export class EngineService {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera;
  public scene: BABYLON.Scene;
  private light: BABYLON.Light;
  public loader: BABYLON.SceneLoader;
  private plane: any;

  private sphere: BABYLON.Mesh;

  // createScene(elementId: string): void {
  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    // this.canvas = <HTMLCanvasElement>document.getElementById(elementId);
    this.canvas = canvas.nativeElement;
    // Then, load the Babylon 3D engine:
    this.engine = new BABYLON.Engine(this.canvas, true);

    // create a basic BJS Scene object
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // create a FreeCamera, and set its position to (x:5, y:10, z:-20 )
    this.camera = new BABYLON.ArcRotateCamera(
      "camera1",
      Math.PI / 2,
      Math.PI / 2,
      Math.PI / 2,
      new BABYLON.Vector3(5, 10, -20),
      this.scene
    );

    // target the camera to scene origin
    this.camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    this.camera.attachControl(this.canvas, true);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this.light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );

    // generates the world x-y-z axis for better understanding
    this.showWorldAxis(8);
    // this.createSkybox();
  }

  // this.loader = BABYLON.SceneLoader.Append(
  //   "../assets/models/",
  //   "test2.babylon",
  loaderer() {
    ///
    // BABYLON.SceneLoader.Load(
    //   "./",
    //   "awesome_scene.babylon",
    //   this.engine,
    //   (scene: BABYLON.Scene) => {
    //     // Success calblack
    //     this.scene = scene;

    //     // We can now access the scene.meshes array etc.
    //     // Decal the meshes to 10 units on X
    //     for (var i = 0; i < this.scene.meshes.length; i++) {
    //       this.scene.meshes[i].position.addInPlace(
    //         new BABYLON.Vector3(10, 0, 0)
    //       );
    //     }

    //     // Just append the same scene
    //     // this._appendScene();
    //   },
    //   () => {
    //     // Progress callback
    //     // Do something with your web page :)
    //   },
    //   (scene: BABYLON.Scene) => {
    //     // Error callback
    //   }
    // );
    //
    // this.loader = BABYLON.SceneLoader.ImportMesh(
    //   "",
    //   "../assets/models/",
    //   "skull.babylon",
    //   this.scene,
    //   (meshes, particleSystems, skeletons) => {
    //     // this.scene.createDefaultCameraOrLight(true, true, true);
    //     this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 0.2);
    //     this.scene.beginAnimation(skeletons[0], 0, 150, true, 1.0);
    //   }
    // );

    this.loader = BABYLON.SceneLoader.ImportMesh(
      // Load character
      "",
      "../assets/model/sara/",
      "Sara.babylon",
      this.scene,
      scene => {
        (meshes, particleSystems, skeletons) => {
          // Create a default arc rotate camera and light.
          // scene.createDefaultCameraOrLight(true, true, true);
          // this.scene.meshes[2].position.addInPlace(
          //   new BABYLON.Vector3(10, 0, 0)
          // );
        };
      }
    );

    // Both must write "true" in the console
    //     console.log(skeletons.length === 1);
    //     console.log(this.scene.getSkeletonByName("Skeleton0") === skeletons[0]);

    //     // Simply begin the animations of the skeleton
    //     // To remember, a skeleton has multiple bones, where each bone
    //     // as a list of animations of type BABYLON.Animation
    //     this.scene.beginAnimation(skeletons[0], 0, 150, true, 1.0);
    //   }
    // );

    var diffuseTexture = new BABYLON.Texture(
      "../assets/model/dude/floor_diffuse.png",
      this.scene
    );
    diffuseTexture.vScale = diffuseTexture.uScale = 5.0;

    // var boxTexture = new BABYLON.Texture("wood.jpg", this.scene);

    // Materials
    var planeMaterial = new BABYLON.StandardMaterial(
      "plane_material",
      this.scene
    );
    planeMaterial.diffuseTexture = diffuseTexture;

    // var boxMaterial = new BABYLON.StandardMaterial("box_material", this._scene);
    // boxMaterial.diffuseTexture = boxTexture;

    // Meshes
    this.plane = BABYLON.Mesh.CreateGround("ground", 100, 100, 2, this.scene);
    this.plane.material = planeMaterial;

    // this._box = BABYLON.Mesh.CreateBox("box", 5, this.scene);
    // this._box.refreshBoundingInfo();
    // this._box.position.y = 2.5;
    // this._box.material = boxMaterial;
  }
  animate(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
    // const $scope = this;

    // window.addEventListener("DOMContentLoaded", () => {
    //   $scope.engine.runRenderLoop(() => {
    //     $scope.scene.render();
    //   });
    // });

    // window.addEventListener("resize", () => {
    //   $scope.engine.resize();
    // });
  }

  /**
   * creates the world axes
   *
   * Source: https://doc.babylonjs.com/snippets/world_axes
   *
   * @param size number
   */
  showWorldAxis(size: number) {
    let $scope = this;

    let makeTextPlane = function(
      text: string,
      color: string,
      textSize: number
    ) {
      let dynamicTexture = new BABYLON.DynamicTexture(
        "DynamicTexture",
        50,
        $scope.scene,
        true
      );
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(
        text,
        5,
        40,
        "bold 24px Arial",
        color,
        "transparent",
        true
      );
      let plane = BABYLON.Mesh.CreatePlane(
        "TextPlane",
        textSize,
        $scope.scene,
        true
      );
      let material = new BABYLON.StandardMaterial(
        "TextPlaneMaterial",
        $scope.scene
      );
      material.backFaceCulling = false;
      material.specularColor = new BABYLON.Color3(0, 0, 0);
      material.diffuseTexture = dynamicTexture;
      plane.material = material;

      return plane;
    };

    let axisX = BABYLON.Mesh.CreateLines(
      "axisX",
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this.scene
    );

    axisX.color = new BABYLON.Color3(1, 0, 0);
    let xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    let axisY = BABYLON.Mesh.CreateLines(
      "axisY",
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
      ],
      this.scene
    );

    axisY.color = new BABYLON.Color3(0, 1, 0);
    let yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

    let axisZ = BABYLON.Mesh.CreateLines(
      "axisZ",
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
      ],
      this.scene
    );

    axisZ.color = new BABYLON.Color3(0, 0, 1);
    let zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
  }

  createSkybox(): BABYLON.Mesh {
    var skybox = BABYLON.MeshBuilder.CreateBox(
      "skybox",
      { size: 300 },
      this.scene
    );
    var material = new BABYLON.StandardMaterial("skyboxMaterial", this.scene);
    material.backFaceCulling = false;
    material.reflectionTexture = new BABYLON.CubeTexture(
      "../assets/textures/skybox2",
      this.scene
    );

    material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    material.fogEnabled = false;
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = material;

    return skybox;
  }
}

// var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
// var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
// skyboxMaterial.backFaceCulling = false;
// skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
// skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
// skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
// skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
// skybox.material = skyboxMaterial;
