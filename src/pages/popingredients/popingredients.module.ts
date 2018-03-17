import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopingredientsPage } from './popingredients';

@NgModule({
  declarations: [
    PopingredientsPage,
  ],
  imports: [
    IonicPageModule.forChild(PopingredientsPage),
  ],
})
export class PopingredientsPageModule {}
