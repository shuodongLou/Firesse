import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchmemberPage } from './searchmember';

@NgModule({
  declarations: [
    SearchmemberPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchmemberPage),
  ],
})
export class SearchmemberPageModule {}
