import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the OrderdetailsadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetailsadmin',
  templateUrl: 'orderdetailsadmin.html',
})
export class OrderdetailsadminPage {
  public order:any;
  public time_c:string;
  public orderProducts:any;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
    this.order = this.navParams.get('order');
    this.time_c = this.order['time_created'].slice(0, 19);
    this.auth.getOrderProductsById(this.order['id']).then((res) => {
      this.orderProducts = res;
    }).catch((e) => {
      console.log('Err: in orderdetailsadmin.ts constructor - e: ', e);
    });
  }

  updateOrder() {
    console.log('updated order: ', this.order);
    this.auth.updateOrder(this.order).then((res) => {
      let toast = this.toastCtrl.create({
        message: '订单已更新成功，请勿重复更新相同信息。',
        showCloseButton: true,
        closeButtonText: '关闭',
        position: 'middle'
      });
      toast.present();
    }).catch((e) => {
      console.log('Err: in orderdetailsadmin.ts updateOrder() - e: ', e);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailsadminPage');
  }

}
