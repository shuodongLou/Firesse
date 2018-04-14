import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OrderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage {
  public orders:any = [];

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public auth: AuthProvider,
              public navParams: NavParams) {
    this.storage.get('pk').then((pk) => {
      return this.auth.getOrdersByAccount(pk);
    }).then((res) => {
      console.log('Orders: ', res);
      this.orders = res;
      this.orders.reverse();
    }).catch((err) => {
      console.log('Err: in orderlist.ts constructor - err: ', err);
    });

  }

  gotoPayment(order) {
    console.log('order before jump: ', order);
    this.navCtrl.push("PaymentPage", { 'order': order });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderlistPage');
  }

}
