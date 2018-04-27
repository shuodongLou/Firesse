import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Content } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public role:any;
  public isLoggedIn: boolean;
  public showHeader:boolean = false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public zone: NgZone,
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
  gotoAdmin() {
    this.navCtrl.push("AdminPage");
  }

  startJourney() {
    this.navCtrl.push("PhotoPage");
  }

  isAdminLogged() {
    if (this.role == 'admin' && this.isLoggedIn) {
      //console.log('admin logged in...');
      return true;
    } else {
      return false;
    }
  }

  ionViewWillEnter() {
    this.storage.get('role').then((value) => {
      this.role = value;
      //console.log('the role of currently logged in user: ', this.role, value);
    }).catch((err) => {
      console.log('err occurred - ionViewWillEnter - storage.get(): ', err);
    });

    this.storage.get('isLoggedIn').then((value) => {
      this.isLoggedIn = value;
      console.log('logged in? : ', this.isLoggedIn);
    }).catch((err) => {
      console.log('err occurred - ionViewWillEnter - storage.get(): ', err);
    });

    console.log("HomePage ionViewWillEnter is called...");
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

  ionViewDidLoad() {
    this.content.ionScroll.subscribe((data)=>{

      console.log('data: ', data);
      let scrollTop = this.content.scrollTop;
      console.log('scrollTop: ', scrollTop);
      if (scrollTop > 280) {
        this.zone.run(() => {
          this.showHeader = true;
          this.content.resize();
        });
      } else {
        this.zone.run(() => {
          this.showHeader = false;
          this.content.resize();
        });
      }

    });
  }

}
