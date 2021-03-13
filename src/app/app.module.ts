import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionListComponent } from './section-list/section-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SectionEditorComponent } from './section-editor/section-editor.component';
import { EditorDirective } from './section-editor/editor.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionListComponent,
    SectionEditorComponent,
    EditorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
