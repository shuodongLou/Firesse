import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ProductPage',
  segment: 'product/:product_id'
})
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public product:any;
  public n:number = 0;
  public id:number;
  public images:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public storage: Storage,
              public auth: AuthProvider) {
    //this.product = this.navParams.get('product');

  }

  gotoHome() {
    this.navCtrl.setRoot(HomePage);
  }
  gotoPhoto() {
    this.storage.get('isLoggedIn').then((value) => {
      if (value) {
        this.navCtrl.push('PhotoPage');
      } else {
        this.navCtrl.push('SigninPage', { 'target': 'PhotoPage' });
      }
    }).catch((e) => {
      console.log('Err: in product.ts gotoProfile() - e: ', e);
    });
  }
  gotoProfile() {
    this.storage.get('isLoggedIn').then((value) => {
      if (value) {
        this.navCtrl.push('ProfilePage');
      } else {
        this.navCtrl.push('SigninPage', { 'target': 'ProfilePage' });
      }
    }).catch((e) => {
      console.log('Err: in product.ts gotoProfile() - e: ', e);
    });
  }

  addToCart() {
    this.storage.get('cart').then((cart) => {
      let items = cart;
      console.log('items: ', items);
      if (items != undefined && items != null && items != []) {
        let num:number = 0;
        let flag = false;
        for (let i = 0; i < items.length; i++) {
          if (this.product['id'] == items[i]['info']['id']) {
            items[i]['quantity']++;
            items[i]['subtotal'] = items[i]['info']['price'] * items[i]['quantity'];
            flag = true;
          }
          num += Number(items[i]['quantity']);
        }
        if (flag == false) {
          let productObj = {
            'info': this.product,
            'quantity': 1,
            'subtotal': this.product['price'],
            'cover': this.auth.server_url + 'media/' + this.images[0]['image']
          };
          items.push(productObj);
          num += Number(1);
        }
        this.storage.set('cart', items);
        this.storage.set('cartItemNumber', num);
        this.n = num;
      } else {
        let productObj = {
          'info': this.product,
          'quantity': 1,
          'subtotal': this.product['price'],
          'cover': this.auth.server_url + 'media/' + this.images[0]['image']
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

  buyNow() {
    let productList = [];
    let product = {
      'info': this.product,
      'quantity': 1,
      'cover': this.auth.server_url + 'media/' + this.images[0]['image'],
      'subtotal': this.product['price']
    };
    productList.push(product);
    let purchase = {
      'productList': productList,
      'total': this.product['price']
    };
    this.storage.get('isLoggedIn').then((value) => {
      if (!value) {
        this.navCtrl.push("SigninPage", { 'target': 'OrderPage', 'purchase': purchase });
      } else {
        this.navCtrl.push("OrderPage", { 'purchase': purchase });
      }
    }).catch((e) => {
      console.log('Err: in produc.ts buyNow() - e: ', e);
    });

  }

  showIngredients() {
    let popover = this.popoverCtrl.create("PopingredientsPage", { 'ingredients': this.product['ingredients'] });
    popover.present();
  }

  gotoCart() {
    this.navCtrl.push("CartPage");
  }

  clearCart() {
    this.storage.set('cart', undefined);
    this.storage.set('cartItemNumber', 0);
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
    this.id = this.navParams.get('product_id');
    console.log('Product id: ', this.id);
    this.auth.getProductById(this.id).then((res) => {
      this.product = res;
      console.log('product.ts - product: ', res);
      return this.auth.getProductImageListByProduct(this.id)
    }).then((res) => {
      this.images = res;
      console.log('product.ts - images: ', res);
    }).catch((e) => {
      console.log('Err: in product.ts ionViewDidLoad - e: ', e);
    });
  }

}
