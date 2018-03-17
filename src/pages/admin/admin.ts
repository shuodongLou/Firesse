import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

}
