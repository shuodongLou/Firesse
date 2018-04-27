import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, LoadingController, Loading, PopoverController, ToastController, Slides, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

//node_modules/tracking/build/tracking.js
import 'tracking/build/tracking-min';
//node_modules/tracking/build/data/face.js
import 'tracking/build/data/face-min';

//declare let window: any;
declare let tracking: any;


/**
 * Generated class for the PhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PhotoPage',
  segment: 'photo'
})
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {

  //Camera code begin #1
  @ViewChild('inputcamera') cameraInput: ElementRef;

  @ViewChild('imgresult') imgResult: ElementRef;

  @ViewChild(Slides) slides: Slides;

  img = [];

  role: any;

  isLoggedIn: boolean;
  acc_id: any;

  public note: any;
  public hasimg = [false, false, false];

  //camera code end #1

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public storage: Storage,
              public auth: AuthProvider) {
    window['hasFace'] = [false, false, false];
  }

  displayCard() {
    return (this.img).length !== 0;
  }
  debutton() {
    let ind = this.slides.getActiveIndex();
    return window['hasFace'][ind];
  }

  gotoHome() {
    this.navCtrl.setRoot('HomePage');
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
          content: '图片展示中...'
        });
        loadMessage.present();
      },
      turnOff: () => loadMessage.dismiss()
    };

  })();
  //camera code end #2

  ionViewWillEnter() {
    this.storage.get('pk').then((id) => {
      this.acc_id = id;
    });
    this.storage.get('isLoggedIn').then((value) => {
      this.isLoggedIn = value;
      console.log('photo.ts - logged in? : ', this.isLoggedIn);
    }).catch((err) => {
      console.log('err occurred - ionViewWillEnter - storage.get(): ', err);
    });
  }
  ionViewDidLoad() {
    //camera code begin #3
    //MY BIT
    console.log('debug - ionViewDidLoad top');
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {
      console.log('debug - element.onchange()');
      this.loading.turnOn();

      const reader = new FileReader();

      reader.onload = (r: any) => {
        console.log('debug - reader.onload()');
        let base64 = r.target.result as string;
        let alert = this.alertCtrl.create({
          subTitle: '没有识别到人脸，请重新上传。',
          buttons: [
            {
              text: '知道了',
              role: 'cancel'
            }
          ]
        });
        // face detection op on the loaded image
        let activeInd:number = this.slides.getActiveIndex();
        let tracker = new tracking.ObjectTracker('face');
        let image = new Image();

        image.width = 100;
        image.height = 100;
        image.onload = function() {
          console.log('debug - image.onload()');
          //console.log('size of this photo (b): ', image.width, image.height);

          //let r:number = Math.min(600/image.width, 600/image.height);
          //image.width = Number((image.width * r).toFixed());
          //image.height = Number((image.height * r).toFixed());
          //console.log('size of this photo (a): ', image.width, image.height);
          tracker.setStepSize(1);

          let task = tracking.track(image, tracker);
          tracker.on('track', function(event) {
            console.log('tracking result: ', event.data);
            let len:number = (event.data).length;
            if (len <= 0) {
              window['hasFace'][activeInd] = false;
              alert.present();
            } else {
              window['hasFace'][activeInd] = true;
            }
            console.log('set hasFace', window['hasFace']);
            task.stop();
          });

        }
        image.src = base64;


        console.log('active slide: ', activeInd);
        this.img[activeInd] = base64;
        //this.img.push(base64);
        //this.img.reverse();
        this.hasimg[activeInd] = true;


        this.loading.turnOff();

      }


      console.log('before show image');
      reader.readAsDataURL(element.files[0]);
    };
    //camera code end #3
    console.log('ionViewDidLoad PhotoPage');

    this.slides.lockSwipeToNext(true);
  }

  displayImage(photo) {
    console.log('image clicked...');
    let popover = this.popoverCtrl.create("PhotopopPage", {'photo': photo}, {cssClass: 'mypopover'});
    popover.present();
  }

  remove(photo) {
    console.log(this.img.length);
    let index = this.img.indexOf(photo);
    this.img.splice(index, 1);
    console.log(this.img.length);
  }

  upload() {
    if (!this.isLoggedIn) {
      this.navCtrl.push("SigninPage", { 'target': 'PhotoPage' });
    } else {


      let loading = this.loadingCtrl.create({
        content: '上传中...'
      });
      loading.present();


      this.auth.retrieveAccountDetails().then((res) => {
        let reqObj = {
          'user': res['user'],
          'role': res['role'],
          'points': Number(res['points']) + 10
        };
        console.log('reqObj: ', reqObj);
        return this.auth.updateAccountDetails(reqObj);
      }).then((res) => {
        console.log('res: ', res);
        let toast = this.toastCtrl.create({
          message: '您赢得了10积分',
          showCloseButton: true,
          closeButtonText: '关闭',
          position: 'top'
        });
        toast.present();
      }).catch((e) => {
        loading.dismiss();
        console.log('Err: in photo.ts retrieveAccountDetails - e: ', e);
      });

      let details = {
        'account': this.acc_id,
        'note': this.note
      };

      this.auth.createInquiry(details).then((res) => {
        console.log('after createInquiry id: ', res);

        let photoReq = {
          'photo': this.img,
          'account': this.acc_id,
          'inquiry_id': res
        };
        console.log('img length: ', this.img.length);
        return this.auth.uploadImg(photoReq);
      }).then((res) => {
        console.log('after createInquiry res: ', res);
        loading.dismiss();
        this.navCtrl.setRoot('HomePage');
        return this.navCtrl.push("InquiryPage", { acc_id: this.acc_id });
      }).catch((err) => {
        loading.dismiss();
        console.log('ERR: photo.ts:139 - uploading()/createInquiry() - err: ', err);
      });

    }
  }

  slideToNext() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);

  }
  slideToPrev() {
    this.slides.lockSwipeToNext(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToNext(true);
  }


}
