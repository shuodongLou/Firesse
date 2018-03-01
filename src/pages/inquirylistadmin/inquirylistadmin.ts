import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { InquiryreplyPage } from '../inquiryreply/inquiryreply';
import { InquirydetailPage } from '../inquirydetail/inquirydetail';

/**
 * Generated class for the InquirylistadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquirylistadmin',
  templateUrl: 'inquirylistadmin.html',
})
export class InquirylistadminPage {

  public inquiries = [];

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public modalCtrl: ModalController,
              public navParams: NavParams) {
    let acc_id = this.navParams.get('acc_id');
    this.auth.getInquiriesForUser(acc_id).then((res) => {
      console.log('got inquiry list records - ', res);
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
          'note': res[i]['note'],
          'id': res[i]['id'],
          'subtypea1': res[i]['subtypea1'],
          'subtypea2': res[i]['subtypea2'],
          'subtypea3': res[i]['subtypea3'],
          'subtypeb1': res[i]['subtypeb1'],
          'subtypeb2': res[i]['subtypeb2'],
          'subtypeb3': res[i]['subtypeb3'],
          'subtypec1': res[i]['subtypec1'],
          'subtypec2': res[i]['subtypec2'],
          'subtypec3': res[i]['subtypec3'],
          'subtyped1': res[i]['subtyped1'],
          'subtyped2': res[i]['subtyped2'],
          'subtyped3': res[i]['subtyped3'],
          'subtypee1': res[i]['subtypee1'],
          'subtypee2': res[i]['subtypee2']
        };

        this.inquiries.push(obj);
      }
      this.inquiries.reverse();
    }).catch((err) => {
      console.log("Err: in InquirylistadminPage constructor - err: ", err);
    });
  }

  checkInquiry(inquiry) {
    if (inquiry['ori-status'] == true) {
      let modal = this.modalCtrl.create(InquirydetailPage, {'obj': inquiry});
      modal.present();
    } else {
      let modal = this.modalCtrl.create(InquiryreplyPage, {'obj': inquiry});
      modal.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InquirylistadminPage');
  }

}
