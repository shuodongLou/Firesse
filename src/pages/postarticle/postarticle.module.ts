import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostarticlePage } from './postarticle';

@NgModule({
  declarations: [
    PostarticlePage,
  ],
  imports: [
    IonicPageModule.forChild(PostarticlePage),
  ],
})
export class PostarticlePageModule {}
