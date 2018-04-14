import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderdetailsadminPage } from './orderdetailsadmin';

@NgModule({
  declarations: [
    OrderdetailsadminPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderdetailsadminPage),
  ],
})
export class OrderdetailsadminPageModule {}
