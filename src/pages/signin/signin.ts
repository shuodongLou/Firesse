import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home'

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  authForm: FormGroup;
  submitAttempt: boolean;
  failedLoggin: boolean;


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
      this.submitAttempt = true;

      let loading = this.loadingCtrl.create({
        content: '登录中...'
      });
      loading.present();

      let credentials = {
          username: data.phonenum,
          password: data.password
      }
      console.log("before login");

      this.auth.login(credentials).then((res) => {
          console.log("Logged in...");
          console.log(res);
          loading.dismiss();
          this.navCtrl.pop();
          //this.navCtrl.setRoot(HomePage);
      }, (err) => {
          console.log("Not logged in...");
          loading.dismiss();
          this.failedLoggin = true;
      });
  }

  isLogged(): boolean {
    console.log('isLogged() called, returned: ', this.auth.isLoggedIn);
    return this.auth.isLoggedIn;
  }

  gotoSignup() {
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
