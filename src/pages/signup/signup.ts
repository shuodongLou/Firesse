import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    authForm: FormGroup;
    failFlagCreate: boolean = false;
    public target:string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public formBuilder: FormBuilder,
                public auth: AuthProvider,
                public loadingCtrl: LoadingController) {
        this.authForm = formBuilder.group({
            phonenum: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });

    }



    onSubmit(data) {
        console.log('before this.loading...');
        let loading = this.loadingCtrl.create({
          content: '注册并登陆中...'
        });
        console.log('after create');
        loading.present();

        let details = {
            username: data.phonenum,
            password: data.password,
            role: 'customer',
            phone: data.phonenum
        }
        console.log("before createAccount");

        this.auth.createAccount(details).then((res) => {
          console.log("Already authorised...");
          return this.auth.login(details)
        }).then((res) => {
          console.log("Logged in...");
          console.log(res);
          loading.dismiss();
          this.navCtrl.pop();
      }).catch((step) => {
          console.log('error catched');
          this.failFlagCreate = true;
          loading.dismiss();
      });

    }


    gotoLogin() {
      console.log('goto');
      this.navCtrl.pop();
      if (this.target == undefined) {
        this.navCtrl.push('SigninPage');
      } else if (this.target == 'OrderPage') {
        this.navCtrl.push('SigninPage', { 'target': 'OrderPage', 'purchase': this.navParams.get('purchase') });
      } else {
        this.navCtrl.push('SigninPage', { 'target': this.target });
      }
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
      this.target = this.navParams.get('target');
    }

}
