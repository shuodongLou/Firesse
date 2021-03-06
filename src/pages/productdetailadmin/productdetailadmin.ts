import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProductdetailadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetailadmin',
  templateUrl: 'productdetailadmin.html',
})
export class ProductdetailadminPage {

  public productName:string;
  public productNameE:string;
  public productDesc:string;
  public series:string;
  public price:number;
  public inventory:number;
  public status:string;
  public volume:string;
  public effects:string;
  public ingredients:string;
  public usage:string;
  public notes:string;

  public productObj:any;

  public id:number;

  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('imgresult') imgResult: ElementRef;

  public imgs_load = [];
  public imgs_add = [];

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.productObj = this.navParams.get('product');

  }

  submit() {
    let loading = this.loadingCtrl.create({
      content: '更新中...'
    });
    loading.present();
    console.log('Debug: productObj: ', this.productObj);
    this.auth.updateProduct(this.productObj).then((res) => {
      console.log('product details updated successfully - res: ', res);
      if (this.imgs_add.length > 0) {
        let imgReq = {
          'product': this.productObj['id'],
          'image': this.imgs_add
        };
        this.auth.uploadProductImages(imgReq);
      }
      loading.dismiss();
      this.viewCtrl.dismiss();
    }).catch((err) => {
      console.log('ERR: in productdetailadmin.ts - err: ', err);
      loading.dismiss();
    });
  }

  remove(img) {
    console.log('img: ', img);
    let alert = this.alertCtrl.create({
      message: '确定从产品展示中删除该图片吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: '删除中...'
            });
            loading.present();

            this.auth.deleteProductImage(img['id']).then((res) => {
              console.log('deleted image... res: ', res);
              let index = this.imgs_load.indexOf(img);
              this.imgs_load.splice(index, 1);
              loading.dismiss();
            }).catch((err) => {
              console.log('Err: in productdetailadmin.ts remove() - err: ', err);
              loading.dismiss();
            });
          }
        }
      ]
    });
    alert.present();
  }

  removepresent(img) {
    let index = this.imgs_add.indexOf(img);
    this.imgs_add.splice(index, 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailadminPage');
    this.auth.getProductImageListByProduct(this.productObj['id']).then((res) => {
      console.log('got images for product...');
      for (let i = 0; i < (<any>res).length; i++) {
        let imgObj = {
          'path': this.auth.server_url + 'media/' + res[i]['image'],
          'id': res[i]['id']
        }
        console.log('imgObj: ', imgObj);
        this.imgs_load.push(imgObj);
      }
    }).catch((err) => {
      console.log('Err: in productdetailadmin.ts - err: ', err);
    });

    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      const reader = new FileReader();

      reader.onload = (r: any) => {

        let base64 = r.target.result as string;

        this.imgs_add.push(base64);
        this.imgs_add.reverse();
      };

      reader.readAsDataURL(element.files[0]);
    };
  }


}
