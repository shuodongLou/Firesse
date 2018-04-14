import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the BlogadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blogadmin',
  templateUrl: 'blogadmin.html',
})
export class BlogadminPage {
  public articleList:any;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    //

  }

  createArticle() {
    this.navCtrl.push("PostarticlePage", { 'action': 'create' });
  }

  gotoEdit(article) {
    this.navCtrl.push("PostarticlePage", { 'action': 'edit', 'article': article });
  }

  deleteArticle(art_id) {
    let alert = this.alertCtrl.create({
      title: '操作确认',
      message: '确定删除这篇文章吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            this.auth.deleteArticle(art_id).then((res) => {
              this.ionViewDidLoad();
            }).catch((e) => {
              console.log('Err: in blogadmin.ts deleteArticle - e: ', e);
            });
          }
        }
      ]
    });
    alert.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogadminPage');
    this.auth.listArticles().then((res) => {
      this.articleList = res;
    }).catch((e) => {
      console.log('Err: in blogadmin.ts constructor - e: ', e);
    });
  }

}
