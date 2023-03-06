import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuModule} from 'primeng/menu';
import { AudioplayerComponent } from './components/audioplayer/audioplayer.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { ProgressComponent } from './components/progress/progress.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AudioplayerComponent,
    VideoplayerComponent,
    ProgressComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FileUploadModule,
    HttpClientModule,
    TabMenuModule,
    MenuModule,
    FormsModule,
   
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
