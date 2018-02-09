import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the PhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {

  //Camera code begin #1
  @ViewChild('inputcamera') cameraInput: ElementRef;

  @ViewChild('imgresult') imgResult: ElementRef;

  img = [];

  role: any;


  //camera code end #1

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public storage: Storage,
              public auth: AuthProvider) {
  }

  displayCard() {
    return (this.img).length !== 0;
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

        this.img.push(base64);
        this.loading.turnOff();

      };

      reader.readAsDataURL(element.files[0]);
    };
    //camera code end #3
    console.log('ionViewDidLoad PhotoPage');
  }

  upload() {
    if (!this.auth.isLoggedIn) {
      this.navCtrl.push("SigninPage");
    } else {

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
  }

}
