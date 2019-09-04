import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoaderComponent } from "./loader/loader.component";
import { BuilderComponent } from "./builder/builder.component";

const routes: Routes = [
  { path: "", component: BuilderComponent },
  { path: "loader", component: LoaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
