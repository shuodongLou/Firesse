import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopingredientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popingredients',
  templateUrl: 'popingredients.html',
})
export class PopingredientsPage {

  public ingredients:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.ingredients = this.navParams.get('ingredients');
    console.log('in popover - ingredients: ', this.ingredients);
  }

  dismiss() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopingredientsPage');
  }

}
