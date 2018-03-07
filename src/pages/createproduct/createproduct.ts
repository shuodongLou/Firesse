import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CreateproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createproduct',
  templateUrl: 'createproduct.html',
})
export class CreateproductPage {

  public productName:string;
  public productDesc:string;
  public series:string;
  public price:number;
  public inventory:number;

  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('imgresult') imgResult: ElementRef;

  public imgs = [];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              public auth: AuthProvider,
              public navParams: NavParams) {
    //
  }

  submit() {
    console.log('submit called');
    let alert = this.alertCtrl.create({
      message: '请仔细检查信息后提交',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '已确认，提交',
          handler: () => {
            console.log('confirmed...');
            let reqObj = {};
            reqObj['name'] = this.productName;
            reqObj['desc'] = this.productDesc;
            reqObj['price'] = this.price;
            reqObj['inventory'] = this.inventory;
            reqObj['status'] = 'normal';
            reqObj['series'] = this.series;

            let loading = this.loadingCtrl.create({
              content: '产品创建中...'
            });
            loading.present();

            this.auth.createProduct(reqObj).then((res) => {
              console.log('created new product successfully (in createproduct.ts) - res: ', res);
              let imgReq = {
                'product': res['id'],
                'image': this.imgs
              };
              this.auth.uploadProductImages(imgReq);
              loading.dismiss();
              this.viewCtrl.dismiss();

            }).catch((err) => {
              console.log('ERR: in createproduct.ts - ERR: ', err);
              loading.dismiss();
            });
          }
        }
      ]
    });
    alert.present();
  }

  remove(photo) {
    let index = this.imgs.indexOf(photo);
    this.imgs.splice(index, 1);
  }

  dismissModal() {
    let alert = this.alertCtrl.create({
      message: '您确定放弃此次编辑吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            console.log('confirmed...');

            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateproductPage');
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      const reader = new FileReader();

      reader.onload = (r: any) => {

        let base64 = r.target.result as string;

        this.imgs.push(base64);
        this.imgs.reverse();
      };

      reader.readAsDataURL(element.files[0]);
    };
  }

}
