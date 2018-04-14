import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderlistadminPage } from './orderlistadmin';

@NgModule({
  declarations: [
    OrderlistadminPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderlistadminPage),
  ],
})
export class OrderlistadminPageModule {}
