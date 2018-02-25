import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InquirydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquirydetail',
  templateUrl: 'inquirydetail.html',
})
export class InquirydetailPage {

  public timestamp: any;
  public reply: any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log('received obj in inquirydetail page: ', this.navParams.get('obj'));
    let obj = this.navParams.get('obj');
    this.timestamp = obj['timestamp'];
    this.reply = obj['feedback'];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InquirydetailPage');
  }

}
