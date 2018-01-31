import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptinfoPage } from './receiptinfo';

@NgModule({
  declarations: [
    ReceiptinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptinfoPage),
  ],
})
export class ReceiptinfoPageModule {}
