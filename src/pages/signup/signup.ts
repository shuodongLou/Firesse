import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
          content: '注册中...'
        });
        console.log('after create');
        loading.present();

        let details = {
            username: data.phonenum,
            password: data.password
        }
        console.log("before createAccount");
        this.auth.createAccount(details).then((res) => {
            console.log("Already authorised...");
            loading.dismiss();
        }, (err) => {
            console.log("Not authorized...");
            loading.dismiss();
        }).then(() => {

          this.auth.login(details).then((res) => {
              console.log("Logged in...");
              console.log(res);

              this.navCtrl.setRoot(HomePage);
          }, (err) => {
              console.log("Not logged in...");

          });
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

}
