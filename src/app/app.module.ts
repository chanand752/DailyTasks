import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {ToastModule} from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import {MessageService} from 'primeng/api';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AudioplayerComponent,
    VideoplayerComponent,
    ProgressComponent,
    SafePipe,

    
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
    ToastModule,
    RippleModule,
    BrowserAnimationsModule,
  ],
  exports: [
    SafePipe
  ],
  providers: [MessageService,  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
