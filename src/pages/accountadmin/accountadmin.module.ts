import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountadminPage } from './accountadmin';

@NgModule({
  declarations: [
    AccountadminPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountadminPage),
  ],
})
export class AccountadminPageModule {}
