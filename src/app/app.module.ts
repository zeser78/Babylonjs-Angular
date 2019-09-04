import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoaderComponent } from "./loader/loader.component";
import { HeaderComponent } from './header/header.component';
import { BuilderComponent } from './builder/builder.component';

@NgModule({
  declarations: [AppComponent, LoaderComponent, HeaderComponent, BuilderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
