import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderlistadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderlistadmin',
  templateUrl: 'orderlistadmin.html',
})
export class OrderlistadminPage {
  public orderList:any = [];
  public perItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orderList = this.navParams.get('orders');
    this.orderList.reverse();
    this.perItems = this.orderList;
    console.log('orders: ', this.orderList);
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.orderList = this.perItems;
    // set val to the value of the ev target
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.orderList = this.orderList.filter((item) => {
        return (item['order_id'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  gotoOrder(order) {
    this.navCtrl.push("OrderdetailsadminPage", { 'order': order });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderlistadminPage');
  }

}
