import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ViewController, LoadingController, Loading, PopoverController } from 'ionic-angular';
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

  isLoggedIn: boolean;
  acc_id: any;

  public note: any;


  //camera code end #1

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
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
          content: '图片展示中...'
        });
        loadMessage.present();
      },
      turnOff: () => loadMessage.dismiss()
    };

  })();
  //camera code end #2

  ionViewWillEnter() {
    this.storage.get('role').then((value) => {
      this.isLoggedIn = value;
    });
    this.storage.get('pk').then((id) => {
      this.acc_id = id;
    });
  }
  ionViewDidLoad() {
    //camera code begin #3
    //MY BIT
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      this.loading.turnOn();

      const reader = new FileReader();

      reader.onload = (r: any) => {

        let base64 = r.target.result as string;

        this.img.push(base64);
        this.img.reverse();
        this.loading.turnOff();

      };

      reader.readAsDataURL(element.files[0]);
    };
    //camera code end #3
    console.log('ionViewDidLoad PhotoPage');
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
      this.navCtrl.push("SigninPage");
    } else {
      let loading = this.loadingCtrl.create({
        content: '上传中...'
      });
      loading.present();


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
        return this.auth.uploadImg(photoReq);
      }).then((res) => {
        console.log('after createInquiry res: ', res);
        loading.dismiss();
        return this.navCtrl.push("InquiryPage", { acc_id: this.acc_id });
      }).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
        console.log('debug - removed...');
      }).catch((err) => {
        console.log('ERR: photo.ts:139 - uploading()/createInquiry() - err: ', err);
      });
    }
  }

}
