import { Component, OnInit } from "@angular/core";
import { EngineService } from "../engine.service";

@Component({
  selector: "app-builder",
  templateUrl: "./builder.component.html",
  styleUrls: ["./builder.component.css"]
})
export class BuilderComponent implements OnInit {
  private canElementId = "renderCanvas";
  // private bgColor: number[] = [0.8, 0.8, 0.8];
  constructor(private engService: EngineService) {}

  ngOnInit() {
    this.engService.createScene(this.canElementId);
    this.engService.animate();
    this.engService.loaderer();
  }
}
