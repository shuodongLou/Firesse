import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public alertCtrl: AlertController,
              public auth: AuthProvider) {
  }

  gotoSignup() {
    this.navCtrl.push("SignupPage");
  }
  gotoSignin() {
    this.navCtrl.push("SigninPage");
  }
  gotoProfile() {
    this.navCtrl.push("ProfilePage");
  }

  ionViewDidLoad() {
    console.log("HomePage loaded...");
  }

  logoutAlert() {
    let alert = this.alertCtrl.create({
      title: '注销确认',
      message: '您确定注销吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            console.log('before logout()');
            this.auth.logout();
            this.gotoSignin();
          }
        }
      ]
    });
    alert.present();
  }

  checkLogin(): boolean {
    console.log('checkLogin() called...');
    return this.auth.isLoggedIn;
  }

}
