import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { InquiryreplyPage } from '../inquiryreply/inquiryreply';

/**
 * Generated class for the InquiryadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquiryadmin',
  templateUrl: 'inquiryadmin.html',
})
export class InquiryadminPage {

  public inquiries = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public loading: LoadingController,
              public auth: AuthProvider) {
    let loading = this.loading.create({
      content: '载入中...'
    });
    loading.present();
    this.auth.getUnresolvedInquiries().then((res) => {
      console.log('unresolved inquiries response: ', res);
      for (let i = 0; i < (<any>res).length; i++) {
        let datetime = res[i]['timestamp'].substring(0, 10);
        let time = res[i]['timestamp'].substring(11, 16);
        let dateArry = datetime.split('-');
        datetime = dateArry[0] + '年' + dateArry[1] + '月' + dateArry[2] + '日 ' + time;

        let obj = {
          'id': res[i]['id'],
          'timestamp': datetime,
          'note': res[i]['note'],
          'ori-timestamp': res[i]['timestamp']
        };
        this.inquiries.push(obj);
      }
      this.inquiries.reverse();
      loading.dismiss();
    }).catch((err) => {
      console.log('in inquiryadmin.ts constructor - getUnresolvedInquiries - err: ', err);
      loading.dismiss();
    });
  }

  presentDetailModal(inquiry) {
    let modal = this.modalCtrl.create(InquiryreplyPage, {'obj': inquiry});
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InquiryadminPage');
  }

}
