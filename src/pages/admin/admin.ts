import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  public n:number = 0;
  public orderList:any;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public navParams: NavParams) {
    this.auth.getAllOrders().then((res) => {
      this.orderList = res;
      for (let i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i]['status'] == '已下单') {
          this.n++;
        }
      }
    }).catch((e) => {
      console.log("Err: in admin.ts constructor - e: ", e);
    });
  }

  gotoInquiries() {
    this.navCtrl.push("InquiryadminPage");
  }
  gotoSearchMember(param) {
    this.navCtrl.push("SearchmemberPage", { 'param': param });
  }
  gotoProductsAdmin() {
    this.navCtrl.push("ProductadminPage");
  }
  gotoOrders() {
    this.navCtrl.push("OrderlistadminPage", { 'orders': this.orderList });
  }
  gotoBlog() {
    this.navCtrl.push("BlogadminPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

}
