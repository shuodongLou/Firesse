import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public auth: AuthProvider) {
        this.authForm = formBuilder.group({
            phonenum: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    onSubmit(data) {
        let details = {
            username: data.phonenum,
            password: data.password
        }
        console.log("before createAccount");

        this.auth.createAccount(details).then((res) => {
            console.log("Already authorised...");
        }, (err) => {
            console.log("Not authorized...");
        });
        console.log(details);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

}
