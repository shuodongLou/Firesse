import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  role: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public alertCtrl: AlertController,
              public navParams: NavParams,
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
  gotoPhoto() {
    this.navCtrl.push("PhotoPage");
  }

  startJourney() {
    if (this.auth.isLoggedIn) {
      this.navCtrl.push("PhotoPage");
    } else {
      this.navCtrl.push("SigninPage");
    }
  }

  isAdminLogged() {
    if (this.role == 'admin' && this.auth.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

  ionViewDidLoad() {
    this.storage.get('role').then((value) => {
      this.role = value;
      console.log('the role of current logged in user: ', this.role);
    });

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
