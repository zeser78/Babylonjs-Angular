import { Injectable, ElementRef } from "@angular/core";
import * as BABYLON from "babylonjs";
import "babylonjs-materials";

@Injectable({
  providedIn: "root"
})
export class BuilderService {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera;
  public scene: BABYLON.Scene;
  private light: BABYLON.Light;
  public loader: BABYLON.SceneLoader;
  private plane: any;
  private ringMaterial: any;
  private sphere: BABYLON.Mesh;

  constructor() {}

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
      new BABYLON.Vector3(0, 0, -50),
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
    this.makeSphere();

    // Create Spiral Line and Tube
    let myPaths = [];

    let deltaTheta = 0.1;
    let deltaY = 0.005; // how big is the distance between spiral

    let radius = 1; // radius of the spiral
    let theta = 0.5;
    let y = 0;
    for (let i = 0; i < 400; i++) {
      myPaths.push(
        new BABYLON.Vector3(
          radius * Math.cos(theta),
          y,
          radius * Math.sin(theta)
        )
      );
      theta += deltaTheta;
      y += deltaY;
    }

    // Create tube
    let tube = BABYLON.MeshBuilder.CreateTube(
      "spiral",
      {
        path: myPaths,
        radius: 0.1,
        tessellation: 6,
        arc: 0.75,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
      },
      this.scene
    );

    // tube.position.z = 10;
    tube.position.x = 20;
    this.ringMaterial = new BABYLON.StandardMaterial(
      "ringMaterial",
      this.scene
    );
    this.ringMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
    this.ringMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    tube.material = this.ringMaterial;
  }

  makeSphere() {
    let ringRadius = 10;
    let paths = [];
    let pi2 = Math.PI * 2;
    let step = pi2 / 60; // we want 60 points

    for (let p = -Math.PI / 2; p < Math.PI / 2 - 1.5; p += step / 2) {
      // creating
      // for (let p = -Math.PI / 2; p < Math.PI / 2; p += step / 2) { // to sphere
      let path = [];
      // to create circles on norht ansd south
      for (let i = 0; i < pi2; i += step) {
        // to create just one circle
        let x = ringRadius * Math.sin(i) * Math.cos(p);
        let z = ringRadius * Math.cos(i) * Math.cos(p);
        let y = ringRadius * Math.sin(p);
        path.push(new BABYLON.Vector3(x, y, z));
      }
      // path.push(path[0]);
      paths.push(path);

      // let circle = BABYLON.Mesh.CreateLines("circle", path, this._scene);
    }
    let lastPath = [];
    for (let j = 0; j < pi2; j += step) {
      lastPath.push(new BABYLON.Vector3(0, ringRadius, 0));
    }
    paths.push(lastPath);

    let makeSphere = BABYLON.Mesh.CreateRibbon(
      "sph",
      paths,
      false,
      true,
      0,
      this.scene
    );

    this.ringMaterial = new BABYLON.StandardMaterial(
      "ringMaterial",
      this.scene
    );
    this.ringMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
    this.ringMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    makeSphere.material = this.ringMaterial;
  }

  animate(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}
