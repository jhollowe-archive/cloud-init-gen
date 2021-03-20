import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightModule } from 'ngx-highlightjs';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { InfoComponent } from './component/info/info.component';
import { EditorComponent } from './component/editor/editor.component';
import { SelectorComponent } from './component/selector/selector.component';
import { YamlComponent } from './component/yaml/yaml.component';
import { FinalMessageComponent } from './section/component/final-message/final-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    EditorComponent,
    SelectorComponent,
    YamlComponent,
    FinalMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    HighlightModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
