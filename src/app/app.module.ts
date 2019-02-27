import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaperCanvasComponent } from './paper-canvas/paper-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    PaperCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PaperCanvasComponent]
})
export class AppModule { }
