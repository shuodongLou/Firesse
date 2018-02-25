import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AgentPage } from '../pages/agent/agent';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MultiPickerModule } from 'ion-multi-picker';
import { ReceiptinfoPage } from '../pages/receiptinfo/receiptinfo';
import { AddressProvider } from '../providers/address/address';
import { InquirydetailPage } from '../pages/inquirydetail/inquirydetail';
import { InquiryreplyPage } from '../pages/inquiryreply/inquiryreply';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AgentPage,
    ReceiptinfoPage,
    InquirydetailPage,
    InquiryreplyPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    IonicStorageModule.forRoot(),
    MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AgentPage,
    ReceiptinfoPage,
    InquirydetailPage,
    InquiryreplyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AddressProvider
  ]
})
export class AppModule {

  rootPage:any = 'HomePage';
  isLoggedIn: boolean = false;
}
