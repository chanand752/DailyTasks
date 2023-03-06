import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioplayerComponent } from './components/audioplayer/audioplayer.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';

const routes: Routes = [
  {path:'videoplayer', component:VideoplayerComponent},
  {path:'audioplayer', component:AudioplayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
