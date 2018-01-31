import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AgentPage } from '../pages/agent/agent';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MultiPickerModule } from 'ion-multi-picker';
import { ReceiptinfoPage } from '../pages/receiptinfo/receiptinfo';
import { AddressProvider } from '../providers/address/address';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AgentPage,
    ReceiptinfoPage
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
    ListPage,
    AgentPage,
    ReceiptinfoPage
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
