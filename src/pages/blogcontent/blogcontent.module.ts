import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogcontentPage } from './blogcontent';

@NgModule({
  declarations: [
    BlogcontentPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogcontentPage),
  ],
})
export class BlogcontentPageModule {}
