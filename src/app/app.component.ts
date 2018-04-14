import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
//import { AgentPage } from '../pages/agent/agent';
//import { ProductsPage } from '../pages/products/products';
//import { BlogPage } from '../pages/blog/blog';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform) {
    //this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '主页', component: 'HomePage' },
      { title: '产品', component: 'ProductsPage' },
      { title: '燃族人', component: 'AgentPage' },
      { title: '博客', component: 'BlogPage' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
