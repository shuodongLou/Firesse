import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the BlogcontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'BlogcontentPage',
  segment: 'blogcontent/:id'
})
@Component({
  selector: 'page-blogcontent',
  templateUrl: 'blogcontent.html',
})
export class BlogcontentPage {
  public article:any;
  public id:number;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public storage: Storage,
              public navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.auth.getArticle(this.id).then((res) => {
      this.article = res;
      this.article.time_written = this.article.time_written.slice(0, 10);
    }).catch((e) => {
      console.log('Err: in blogcontent.ts constructor - e: ', e);
    });
  }

  gotoHome() {
    this.navCtrl.setRoot('HomePage');
  }
  gotoProfile() {
    this.storage.get('isLoggedIn').then((value) => {
      if (value) {
        this.navCtrl.push('ProfilePage');
      } else {
        this.navCtrl.push('SigninPage', { 'target': 'ProfilePage' });
      }
    }).catch((e) => {
      console.log('Err: in blogcontent.ts gotoProfile() - e: ', e);
    });

  }
  gotoPhoto() {
    this.storage.get('isLoggedIn').then((value) => {
      if (value) {
        this.navCtrl.push('PhotoPage');
      } else {
        this.navCtrl.push('SigninPage', { 'target': 'PhotoPage' });
      }
    }).catch((e) => {
      console.log('Err: in blogcontent.ts gotoProfile() - e: ', e);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogcontentPage');

  }

}
