import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogadminPage } from './blogadmin';

@NgModule({
  declarations: [
    BlogadminPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogadminPage),
  ],
})
export class BlogadminPageModule {}
