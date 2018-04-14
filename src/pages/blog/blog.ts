import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the BlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {
  public articles:any;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public navParams: NavParams) {
    //
  }

  gotoContent(item) {
    this.navCtrl.push("BlogcontentPage", { 'id': item['id'] });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');
    this.auth.listArticles().then((res) => {
      this.articles = res;
    }).catch((e) => {
      console.log('Err: blog.ts ionViewDIdLoad - e: ', e);
    });
  }

}
