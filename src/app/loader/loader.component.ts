import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { LoaderService } from "./loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"]
})
export class LoaderComponent implements OnInit, AfterViewInit {
  // private canElementId = "renderCanvas";
  @ViewChild("renderCanvas", { static: true })
  public renderCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private engService: LoaderService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.engService.createScene(this.renderCanvas);
    this.engService.animate();
    this.engService.loaderer();
  }
}
