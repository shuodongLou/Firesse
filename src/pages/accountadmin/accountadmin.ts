import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AccountadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountadmin',
  templateUrl: 'accountadmin.html',
})
export class AccountadminPage {
  public account:any;
  public acct_id:number;
  public agent_id:number;
  public isAgent:boolean = false;
  public agent:any;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public auth: AuthProvider,
              public storage: Storage,
              public navParams: NavParams) {
    //
    this.account = this.navParams.get('account');
  }

  roleChange() {
    let alert = this.alertCtrl.create({
      title: '身份修改',
      message: '您确定修改吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            if (this.account['role'] == 'customer') {
              console.log('going to deactivate agent');
              let acctReq = {
                'user': this.account['user'],
                'role': this.account['role']
              };
              this.auth.deleteAgent(this.agent_id).then((res) => {
                return this.auth.updateAccountDetailsById(acctReq, this.acct_id);
              }).catch((err) => {
                console.log('err: in accountadmin roleChange - err: ', err);
              });
            } else if (this.account['role'] == 'agent') {
              console.log('going to create new agent');
              let code = Math.random().toString(36).substr(2, 8).toUpperCase();
              console.log('randome code: ', code);

              let details = {
                'acct_id': this.acct_id,
                'fire_code': code,
                'level': 1,
                'commission_rate': 1
              };
              let acctReq = {
                'user': this.account['user'],
                'role': this.account['role']
              };
              this.auth.createAgent(details).then((res) => {
                console.log('created agent successfully');
              }).then(() => {
                return this.auth.updateAccountDetailsById(acctReq, this.acct_id);
              }).then((res) => {
                console.log('result from role update: ', res);
              }).catch((err) => {
                console.log('Err: accountadmin construct - err: ', err);
              });

            }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountadminPage');
    this.auth.getAccidByUser(this.account['user']).then((value:number) => {
      console.log('value: ', value);
      this.acct_id = value;
      console.log('acct_id: ', this.acct_id);
      return this.auth.getAgentsByAccount(this.acct_id);
    }).then((res) => {
      console.log('accountadmin response from getAgentsByAccount: ', res);
      if ((<any>res).length > 0) {
        this.isAgent = true;
        this.agent_id = res[0]['id'];
        this.agent = res[0];
      }
    }).catch((err) => {
      console.log('Err: in accountadmin.ts ionViewDidLoad - err: ', err);
    });
  }

}
