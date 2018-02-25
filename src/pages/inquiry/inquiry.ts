import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { InquirydetailPage } from '../inquirydetail/inquirydetail';

/**
 * Generated class for the InquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquiry',
  templateUrl: 'inquiry.html',
})
export class InquiryPage {

  acc_id: any;
  public inquiries = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public auth: AuthProvider) {
    this.acc_id = navParams.get('acc_id');
    this.auth.getInquiriesForUser(this.acc_id).then((res) => {
      for (let i = 0; i < (<any>res).length; i++) {
        let datetime = res[i]['timestamp'].substring(0, 10);
        let time = res[i]['timestamp'].substring(11, 16);
        let dateArry = datetime.split('-');
        datetime = dateArry[0] + '年' + dateArry[1] + '月' + dateArry[2] + '日 ' + time;

        let statusExp = '';
        if (res[i]['status'] === true) {
          statusExp = '已回复';
        } else {
          statusExp = '待回复';
        }
        let obj = {
          'timestamp': datetime,
          'status': statusExp,
          'ori-status': res[i]['status'],
          'feedback': res[i]['reply'],
          'note': res[i]['note']
        };
        console.log('status: ', res[i]['status']);
        this.inquiries.push(obj);
      }
      this.inquiries.reverse();
    }).catch((err) => {
      console.log('ERR: inquiry.ts - getInquiriesForUser - err: ', err);
    })
  }

  presentDetailModal(inquiryObj) {
    let modal = this.modalCtrl.create(InquirydetailPage, {'obj': inquiryObj});
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InquiryPage');
  }

}
