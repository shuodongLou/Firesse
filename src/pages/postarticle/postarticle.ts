import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the PostarticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postarticle',
  templateUrl: 'postarticle.html',
})
export class PostarticlePage {

  public content:string ='';
  public title:string ='';
  public author:string ='';
  public blurb:string = '';
  public art_id:number;
  public hasCover:boolean = false;
  public imgChanged:boolean = false;
  public img:any;
  public action:string;
  @ViewChild('inputcamera') cameraInput: ElementRef;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public navParams: NavParams) {
    //

  }

  postArticle() {
    if (this.action == 'create') {
      let article = {
        'title': this.title,
        'author': this.author,
        'blurb': this.blurb,
        'content': this.content,
        'cover': this.img
      };
      this.auth.createArticle(article).then((res) => {
        this.navCtrl.pop();
        this.navCtrl.pop();
      }).catch((e) => {
        console.log('in postarticle.ts postArticle() - e: ', e);
      });
    } else if (this.action == 'edit') {
      let article = {};
      if (this.imgChanged) {
        article['cover'] = this.img;
      }
      article['title'] = this.title;
      article['blurb'] = this.blurb;
      article['author'] = this.author;
      article['content'] = this.content;
      article['id'] = this.art_id;
      this.auth.updateArticle(article).then((res) => {
        this.navCtrl.pop();
        this.navCtrl.pop();
      }).catch((e) => {
        console.log('Err: in postarticle.ts postArticle else if block - e:', e);
      });
    } else {
      console.log('Err: in postarticle.ts postArticles in else block : action is neither create nor edit');
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostarticlePage');
    this.action = this.navParams.get('action');
    if (this.action == 'edit') {
      let article = this.navParams.get('article');
      this.art_id = article['id'];
      this.title = article['title'];
      this.blurb = article['blurb'];
      this.author = article['author'];
      this.content = article['content'];
      this.img = article['cover'];
      this.hasCover = true;
    }

    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {
      const reader = new FileReader();
      reader.onload = (r: any) => {
        this.img = r.target.result as string;
        this.hasCover = true;
        this.imgChanged = true;
      }
      reader.readAsDataURL(element.files[0]);
    }
  }

}
