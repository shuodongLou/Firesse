import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Camera code begin #1
  @ViewChild('inputcamera') cameraInput: ElementRef;

  @ViewChild('imgresult') imgResult: ElementRef;

  img = '';

  displayCard() {
    return this.img !== '';
  }
  //camera code end #1

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
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

  //camera code begin #2
  loading = (() => {
    let loadMessage: Loading;

    return {
      turnOn: () => {
        loadMessage = this.loadingCtrl.create({
          content: 'Please Wait, doing something awesome'
        });
        loadMessage.present();
      },
      turnOff: () => loadMessage.dismiss()
    };

  })();
  //camera code end #2

  ionViewDidLoad() {
    //camera code begin #3
    //MY BIT
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      this.loading.turnOn();

      const reader = new FileReader();

      reader.onload = (r: any) => {

        //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
        //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
        //UP TO YOU, NOT REALLY BOTHERED
        let base64 = r.target.result as string;

        /*
        //FIXING ORIENTATION USING NPM PLUGIN fix-orientation
        fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
          //fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
          this.img = fixed;

          this.loading.turnOff();
        });
        */

        this.img = base64;
        this.loading.turnOff();

      };

      reader.readAsDataURL(element.files[0]);
    };
    //camera code end #3

    console.log("HomePage loaded...");
  }

  upload() {
    this.storage.get('pk').then((value) => {
      let photoReq = {
        'photo': this.img,
        'account': value
      };
      this.auth.uploadImg(photoReq).then((res) => {
        console.log('image uploaded successfully...');
      }, (err) => {
        console.log('image upload failed... err: ', err);
      });
    });
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
