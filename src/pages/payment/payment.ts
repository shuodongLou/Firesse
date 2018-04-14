import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  public order:any;
  public orderProducts:any;
  public timeCreated:string;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public navParams: NavParams) {
    this.order = this.navParams.get('order');
    console.log('order info: ', this.order);
    this.timeCreated = this.order['time_created'].slice(0, 10);

    this.auth.getOrderProductsById(this.order['id']).then((res) => {
      this.orderProducts = res;
    }).catch((e) => {
      console.log('Err: in payment.ts construtor - e: ', e);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
