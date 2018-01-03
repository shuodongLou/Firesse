import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.authForm = formBuilder.group({
        phoneNum: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        re_password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
