import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

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
  public page:any;
  public target:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              public auth: AuthProvider,
              public loadingCtrl: LoadingController) {
      this.authForm = formBuilder.group({
          phonenum: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      });
      this.target = this.navParams.get('target');
      console.log('target is : ', this.target);

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
          //this.navCtrl.setRoot('HomePage');
          console.log('in signin - target: ', this.target);
          if (this.target == undefined) {
            this.navCtrl.pop();
          } else if (this.target == 'OrderPage') {
            const index = this.viewCtrl.index;
            this.navCtrl.remove(index);
            this.navCtrl.push(this.target, { 'purchase': this.navParams.get('purchase') });
          } else {
            const index = this.viewCtrl.index;
            this.navCtrl.remove(index);
            this.navCtrl.push(this.target);
          }

      }).catch((err) => {
          console.log("Not logged in... err: ", err);
          loading.dismiss();
          this.failedLoggin = true;
      });
  }


  gotoSignup() {
    this.navCtrl.pop();
    if (this.target == undefined) {
      this.navCtrl.push('SignupPage');
    } else if (this.target == 'OrderPage') {
      this.navCtrl.push('SignupPage', { 'target': 'OrderPage', 'purchase': this.navParams.get('purchase') });
    } else {
      this.navCtrl.push('SignupPage', { 'target': this.target });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
