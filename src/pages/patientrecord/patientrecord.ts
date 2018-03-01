import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the PatientrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientrecord',
  templateUrl: 'patientrecord.html',
})
export class PatientrecordPage {

  public phone:string;
  public roleExp:string;
  public birthday:string;
  public sex:string;
  public name:string;
  public user:string;
  public acc_id:any;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public loading: LoadingController,
              public navParams: NavParams) {
    let loading = this.loading.create({
      content: '载入中...'
    });
    loading.present();
    let account = this.navParams.get('account');
    this.user = account['user'];
    this.phone = account['username'];
    this.name = account['name'];
    this.roleExp = account['role'];
    if (account['role'] == 'customer') {
      this.roleExp = '客户';
    } else if (account['role'] == 'agent') {
      this.roleExp = '代理';
    }
    this.birthday = account['birthday'];
    if (account['sex'] == 'F') {
      this.sex = '女';
    } else if (account['sex'] == 'M') {
      this.sex = '男';
    }


    console.log('in patientrecord: user_id: ', this.user);
    this.auth.getAccidByUser(this.user).then((res) => {
      console.log('got account id successfully: ', res);
      this.acc_id = res;
      loading.dismiss();
    }).catch((err) => {
      console.log("Err: in patientrecord page - err: ", err);
      loading.dismiss();
    });
  }

  gotoInquiryAdmin() {
    this.navCtrl.push('InquirylistadminPage', { 'acc_id': this.acc_id });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientrecordPage');
  }

}
