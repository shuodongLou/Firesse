import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InquirydetailPage } from './inquirydetail';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    InquirydetailPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(InquirydetailPage),
  ],
})
export class InquirydetailPageModule {}
