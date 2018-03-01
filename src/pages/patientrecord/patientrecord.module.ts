import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientrecordPage } from './patientrecord';

@NgModule({
  declarations: [
    PatientrecordPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientrecordPage),
  ],
})
export class PatientrecordPageModule {}
