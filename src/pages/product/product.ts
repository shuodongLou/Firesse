import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public product:any;
  public n:number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public storage: Storage,
              public auth: AuthProvider) {
    this.product = this.navParams.get('product');
    console.log('Product: ', this.product);
  }

  addToCart() {
    this.storage.get('cart').then((cart) => {
      let items = cart;
      console.log('items: ', items);
      if (items != undefined && items != null && items != []) {
        let num:number = 0;
        let flag = false;
        for (let i = 0; i < items.length; i++) {
          if (this.product['info']['id'] == items[i]['info']['id']) {
            items[i]['quantity']++;
            items[i]['subtotal'] = items[i]['info']['price'] * items[i]['quantity'];
            flag = true;
          }
          num += Number(items[i]['quantity']);
        }
        if (flag == false) {
          let productObj = {
            'info': this.product['info'],
            'quantity': 1,
            'subtotal': this.product['info']['price'],
            'cover': this.auth.server_url + 'media/' + this.product['images'][0]['image']
          };
          items.push(productObj);
          num += Number(1);
        }
        this.storage.set('cart', items);
        this.storage.set('cartItemNumber', num);
        this.n = num;
      } else {
        let productObj = {
          'info': this.product['info'],
          'quantity': 1,
          'subtotal': this.product['info']['price'],
          'cover': this.auth.server_url + 'media/' + this.product['images'][0]['image']
        };
        let productList = [];
        productList.push(productObj);
        console.log('productList: ', productList);
        this.storage.set('cart', productList);
        this.storage.set('cartItemNumber', 1);
        this.n = 1;
      }
    }).catch((err) => {
      console.log('Err: in product.ts addToCart() - err: ', err);
    });

  }

  showIngredients() {
    let popover = this.popoverCtrl.create("PopingredientsPage", { 'ingredients': this.product['info']['ingredients'] });
    popover.present();
  }

  gotoCart() {
    this.navCtrl.push("CartPage");
  }

  calcN(items) {
    this.n = 0;
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        this.n += Number(items[i]['quantity']);
      }
    }
  }

  ionViewWillEnter() {
    this.storage.get('cart').then((value) => {
      this.calcN(value);
    }).catch((err) => {
      console.log('Err: in products.ts constructor - err: ', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
