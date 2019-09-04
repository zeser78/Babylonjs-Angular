import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { BuilderService } from "./builder.service";

@Component({
  selector: "app-builder",
  templateUrl: "./builder.component.html",
  styleUrls: ["./builder.component.css"]
})
export class BuilderComponent implements OnInit, AfterViewInit {
  @ViewChild("renderCanvas")
  public renderCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private builderService: BuilderService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.builderService.createScene(this.renderCanvas);
    this.builderService.animate();
    // this.builderService.loaderer();
  }
}
