import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  public productList = [];
  public total = 0;
  public warning:string;
  public isEmpty:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider,
              public storage: Storage) {
    //

  }

  calcTotal() {
    this.total = 0;
    if (this.productList) {
      for (let i = 0; i < this.productList.length; i++) {
        this.total += this.productList[i]['subtotal'];
      }
    }
  }

  updateQuantity(item) {
    this.storage.set('cart', this.productList);
    item['subtotal'] = item['quantity'] * item['info']['price'];
    this.calcTotal();
    let n:number = 0;
    for (let i = 0; i < this.productList.length; i++) {
      n += Number(this.productList[i]['quantity']);
      console.log('n in for: ', n);
    }
    this.storage.get('cartItemNumber').then((value) => {
      console.log('cartItemNumber before set in updateQuantity: ', value);
      this.storage.set('cartItemNumber', n);
    }).then(() => {
      this.storage.get('cartItemNumber').then((value) => {
        console.log('cartItemNumber after set in updateQuantity: ', value);
      });
    });


  }

  removeItem(item) {
    let index = this.productList.indexOf(item);
    this.productList.splice(index, 1);
    this.storage.set('cart', this.productList);
    this.calcTotal();
    this.storage.get('cartItemNumber').then((value) => {
      let n = value;
      n -= item['quantity'];
      this.storage.set('cartItemNumber', n);
    }).catch((err) => {
      console.log('Err: in cart.ts removeItem() - err: ', err);
    });
  }

  goback() {
    this.navCtrl.pop();
  }

  confirmOrder() {
    this.isEmpty = false;
    if (this.total == 0) {
      this.warning = "您的护肤包是空的哦~ 请先选宝贝吧~~";
      this.isEmpty = true;
      return;
    }
    this.storage.get('isLoggedIn').then((value) => {
      console.log('isLoggedIn: ', value);
      let purchase = {
        'productList': this.productList,
        'total': this.total
      };
      if (value == false || value == undefined || value == null) {
        this.navCtrl.push("SigninPage", { 'target': 'OrderPage', 'purchase': purchase });
      } else {

        this.navCtrl.push("OrderPage", { 'purchase': purchase });
      }
    }).catch((err) => {
      console.log('Err: in cart.ts confirmOrder - err: ', err);
    });
  }

  clearBadge() {
    this.storage.set('cart', undefined);
    this.storage.set('cartItemNumber', 0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.storage.get('cart').then((value) => {
      this.productList = value;
      console.log('productList: ', this.productList);
    }).then(() => {
      this.calcTotal();
      console.log('total is : ', this.total);
    }).catch((err) => {
      console.log('Err: in cart.ts ionViewDidLoad - err: ', err);
    });
  }

}
