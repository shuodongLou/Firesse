import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  public products = [];
  public n: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public storage: Storage) {

  }

  gotoCart() {
    this.navCtrl.push('CartPage');
  }
  gotoProduct(product) {
    console.log('products - product_id: ', product['info']['id']);
    this.navCtrl.push('ProductPage', { 'product_id': product['info']['id'] });
  }

  calcN(items) {
    this.n = 0;
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        this.n += Number(items[i]['quantity']);
      }
    }
  }

  addToCart(product) {
    let productList = [];
    this.storage.get('cart').then((value) => {
      console.log('value: ', value);
      if (value != null) {
        productList = value;
        let flag = false;
        for (let i = 0; i < productList.length; i++) {
          if (productList[i]['info']['id'] == product['info']['id']) {
            productList[i]['quantity']++;
            productList[i]['subtotal'] += product['info']['price'];
            flag = true;
          }
        }
        if (flag == false) {
          let newProduct = {
            'info': product['info'],
            'quantity': 1,
            'subtotal': product['info']['price'],
            'cover': this.auth.server_url + 'media/' + product['images'][0]['image']
          };
          productList.push(newProduct);
        }

      } else {
        let newProduct = {
          'info': product['info'],
          'quantity': 1,
          'subtotal': product['info']['price'],
          'cover': this.auth.server_url + 'media/' + product['images'][0]['image']
        };
        productList.push(newProduct);
      }
      console.log('productList: ', productList);
      //this.n = productList.length;
      this.storage.set('cart', productList);
      this.calcN(productList);
      this.storage.set('cartItemNumber', this.n);
    }).catch((err) => {
      console.log('Err: storage err in products.ts - err: ', err);
    });
  }

  ionViewWillEnter() {
    this.storage.get('cart').then((value) => {
      this.calcN(value);
    }).catch((err) => {
      console.log('Err: in products.ts constructor - err: ', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.auth.getProductList().then((res) => {
      for (let i = 0; i < (<any>res).length; i++) {
        let productObj = {};
        this.auth.getProductImageListByProduct(res[i]['id']).then((imgs) => {
          productObj['images'] = imgs;
        }).catch((err) => {
          console.log('Err: in products.ts constructor - err: ', err);
        });
        productObj['info'] = res[i];

        this.products.push(productObj);
      }
    }).catch((err) => {
      console.log('ERR: in products.ts - err: ', err);
    });
  }

}
