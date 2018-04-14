import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptinfoPage } from './receiptinfo';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    ReceiptinfoPage,
  ],
  imports: [
    MultiPickerModule,
    IonicPageModule.forChild(ReceiptinfoPage),
  ],
})
export class ReceiptinfoPageModule {}
