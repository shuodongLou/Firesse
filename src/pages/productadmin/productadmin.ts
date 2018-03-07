import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { CreateproductPage } from '../createproduct/createproduct';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProductadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productadmin',
  templateUrl: 'productadmin.html',
})
export class ProductadminPage {

  public items = [];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public auth: AuthProvider,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    //populate items with returned products

  }

  presentCreatePage() {
    let modal = this.modalCtrl.create(CreateproductPage);
    modal.present();
  }


  gotoProductDetail(product) {
    this.navCtrl.push("ProductdetailadminPage", {'product': product});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductadminPage');
  }

  ionViewWillEnter() {
    this.items = [];
    let loading = this.loadingCtrl.create({
      content: '载入中...'
    })
    loading.present();

    this.auth.getProductList().then((res) => {
      console.log('product list: ', res);
      for (let i = 0; i < (<any>res).length; i++) {
        this.items.push(res[i]);
      }
      loading.dismiss();
    }).catch((err) => {
      console.log('err in productadmin.ts - err: ', err);
      loading.dismiss();
    });
  }

}
