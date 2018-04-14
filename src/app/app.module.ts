import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MultiPickerModule } from 'ion-multi-picker';
//import { HomePage } from '../pages/home/home';
//import { AgentPageModule } from '../pages/agent/agent.module';
//import { ProductsPageModule } from '../pages/products/products.module';
//import { BlogPageModule } from '../pages/blog/blog.module';

//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { AddressProvider } from '../providers/address/address';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    //HomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MultiPickerModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    //AgentPageModule,
    //ProductsPageModule,
    //BlogPageModule,
    IonicStorageModule.forRoot(),

    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage,
  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AddressProvider
  ]
})
export class AppModule {

  rootPage:any = 'HomePage';
  isLoggedIn: boolean = false;
}
