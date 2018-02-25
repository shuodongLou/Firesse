import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the InquiryreplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquiryreply',
  templateUrl: 'inquiryreply.html',
})
export class InquiryreplyPage {

  public note: any;
  public id: any;
  public timestamp: any;
  public photos = [];
  public photopaths = [];
  public replyReq = {};
  public replyNote: any;
  public acc_id: any;

  //variables related to toggle/checkbox
  public typeA: boolean;
  public typeB: boolean;
  public typeC: boolean;
  public typeD: boolean;
  public typeE: boolean;
  public subtypeA1: boolean;
  public subtypeA2: boolean;
  public subtypeA3: boolean;
  public subtypeB1: boolean;
  public subtypeB2: boolean;
  public subtypeB3: boolean;
  public subtypeC1: boolean;
  public subtypeC2: boolean;
  public subtypeC3: boolean;
  public subtypeD1: boolean;
  public subtypeD2: boolean;
  public subtypeD3: boolean;
  public subtypeE1: boolean;
  public subtypeE2: boolean;
  public a1Range: number;
  public a2Range: number;
  public a3Range: number;
  public b1Range: number;
  public b2Range: number;
  public b3Range: number;
  public c1Range: number;
  public c2Range: number;
  public c3Range: number;
  public d1Range: number;
  public d2Range: number;
  public d3Range: number;
  public e1Range: number;
  public e2Range: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public storage: Storage,
              public viewCtrl: ViewController) {
    let obj = this.navParams.get('obj');
    console.log('in reply: ', obj);
    this.note = obj['note'];
    this.id = obj['id'];
    this.timestamp = obj['timestamp'];
    this.storage.get('pk').then((value) => {
      this.acc_id = value;
    }).catch((err) => {
      console.log('Err: in inquiryreply - err: ', err);
    });


    this.typeA = false;
    this.typeB = false;
    this.typeC = false;
    this.typeD = false;
    this.typeE = false;
    this.subtypeA1 = false;
    this.subtypeA2 = false;
    this.subtypeA3 = false;
    this.subtypeB1 = false;
    this.subtypeB2 = false;
    this.subtypeB3 = false;
    this.subtypeC1 = false;
    this.subtypeC2 = false;
    this.subtypeC3 = false;
    this.subtypeD1 = false;
    this.subtypeD2 = false;
    this.subtypeD3 = false;
    this.subtypeE1 = false;
    this.subtypeE2 = false;
    this.a1Range = 0;
    this.a2Range = 0;
    this.a3Range = 0;
    this.b1Range = 0;
    this.b2Range = 0;
    this.b3Range = 0;
    this.c1Range = 0;
    this.c2Range = 0;
    this.c3Range = 0;
    this.d1Range = 0;
    this.d2Range = 0;
    this.d3Range = 0;
    this.e1Range = 0;
    this.e2Range = 0;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  displayImage(photo) {
    console.log('image clicked...');
    let popover = this.popoverCtrl.create("PhotopopPage", {'photo': photo}, {cssClass: 'mypopover'});
    popover.present();
  }

  typeAChange() {
    if (!this.typeA) {
      this.subtypeA1 = false;
      this.subtypeA2 = false;
      this.subtypeA3 = false;
    }
  }
  typeBChange() {
    if (!this.typeB) {
      this.subtypeB1 = false;
      this.subtypeB2 = false;
      this.subtypeB3 = false;
    }
  }
  typeCChange() {
    if (!this.typeC) {
      this.subtypeC1 = false;
      this.subtypeC2 = false;
      this.subtypeC3 = false;
    }
  }
  typeDChange() {
    if (!this.typeD) {
      this.subtypeD1 = false;
      this.subtypeD2 = false;
      this.subtypeD3 = false;
    }
  }
  typeEChange() {
    if (!this.typeE) {
      this.subtypeE1 = false;
      this.subtypeE2 = false;
    }
  }
  subtypeChange() {
    if (!this.subtypeA1) {
      this.a1Range = 0;
    }
    if (!this.subtypeA2) {
      this.a2Range = 0;
    }
  }

  constructReply() {
    this.replyReq['id'] = this.id;

    let replyText: string = ' 经过Firey老师的诊断，您的皮肤显现如下状况：\n\n';
    if(this.typeA) {
      replyText += '\n  过敏：\n\n';
      if(this.subtypeA1) {
        replyText += '  - 激素引发（主要来源可能是您最近使用的护肤化妆产品）\n';
      }
      if(this.subtypeA2) {
        replyText += '  - 抗生素引发\n';
      }
      if(this.subtypeA3) {
        replyText += '  - 食物性过敏源\n';
      }
    }
    if(this.typeB) {
      replyText += '\n  闭合粉刺：\n\n';
      if(this.subtypeB1) {
        replyText += '  - 丘疹\n';
      }
      if(this.subtypeB2) {
        replyText += '  - 黑头\n';
      }
      if(this.subtypeB3) {
        replyText += '  - 白头\n';
      }
    }
    if(this.typeC) {
      replyText += '\n  脓包：\n\n';
      if(this.subtypeC1) {
        replyText += '  - 囊肿\n';
      }
      if(this.subtypeC2) {
        replyText += '  - 结节\n';
      }
      if(this.subtypeC3) {
        replyText += '  - 混合型\n';
      }
    }
    if(this.typeD) {
      replyText += '\n  疤痕：\n\n';
      if(this.subtypeD1) {
        replyText += '  - 痘印\n';
      }
      if(this.subtypeD2) {
        replyText += '  - 痘疤\n';
      }
      if(this.subtypeD3) {
        replyText += '  - 增生性结节\n';
      }
    }
    if(this.typeE) {
      replyText += '\n  病理性问题：\n\n';
      if(this.subtypeE1) {
        replyText += '  - 毛囊炎\n';
      }
      if(this.subtypeE2) {
        replyText += '  - 其他皮肤病\n';
      }
    }
    replyText += '\n分析/建议\n\n   '
    replyText += this.replyNote;

    console.log(replyText);

    this.replyReq['reqObj'] = {};
    this.replyReq['reqObj']['reply'] = replyText;
    this.replyReq['reqObj']['status'] = true;
    this.replyReq['reqObj']['account'] = this.acc_id;

    console.log(this.replyReq);
  }

  submitReply() {
    let alert = this.alertCtrl.create({
      message: '确定提交吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            this.constructReply();
            this.auth.updateInquiry(this.replyReq);
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }



  ionViewDidLoad() {
    console.log('inquiry id is: ', this.id);
    this.auth.getPhotoByInquiryId(this.id).then((res) => {
      console.log('successfully got photo pathnames by id - ', this.id);

      for(let i=0; i < (<any>res).length; i++) {
        console.log(res[i]);
        let path = '//192.168.1.110:8000/media/' + res[i]['photo'];
        console.log('pathname: ', path);
        this.photopaths.push(path);
      }
    }).catch((err) => {
      console.log('ERR: inquiryreply.ts constructor getPhotoByInquiryId() - err: ', err);
    });

    console.log('ionViewDidLoad InquiryreplyPage');
  }

}
