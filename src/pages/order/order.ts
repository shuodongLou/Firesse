import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ReceiptinfoPage } from '../receiptinfo/receiptinfo';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory: ['CartPage']
})
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public purchase:any;
  public destination:string;
  public province:string;
  public name:string;
  public phone:string;
  public destReady:boolean = true;
  public total:number = 0;
  public deliveryFee:number = 0;
  public addtionalUnitFee:number = 0;
  public hasFirecode:boolean=false;
  public firecode:string = '';
  public firecodeWarning:string;
  public discount:number = 0;
  public finalPayment:number = 0;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public asCtrl: ActionSheetController,
              public navParams: NavParams) {
    //
    console.log('constructor called');
    this.purchase = this.navParams.get('purchase');
    console.log('Order - purchase: ', this.purchase);
  }

  pressEvent(e, image) {
    console.log('press event fired');
    let actionSheet = this.asCtrl.create({
      title: '处理图片',
      buttons: [
        {
          text: '保存至相册',
          handler: () => {
            console.log('saving clicked');
            /*
            let link = document.createElement("a");
            link.setAttribute("href", image);
            link.setAttribute("download", 'something');
            link.click();*/
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  changeDest() {
    this.navCtrl.push(ReceiptinfoPage);
  }

  applyFirecode() {
    console.log('entered firecode: ', this.firecode);
    if (this.firecode == '') {
      this.firecodeWarning = '请输入8位燃码';
      return;
    }

    this.auth.hasFirecode(this.firecode).then((res) => {
      console.log('hasFirecode - res: ', res);
      this.hasFirecode = true;
      this.discount = Math.round(this.total * 0.05);
      this.finalPayment -= this.discount;
      this.firecode = '';
    }).catch((err) => {
      console.log('there is no such firecode - err: ', err);
      this.firecode = '';
    });
  }

  calcTotal() {
    for (let i = 0; i < this.purchase['productList'].length; i++) {
      this.total += Number(this.purchase['productList'][i]['subtotal']);
    }
    console.log('total: ', this.total);
  }

  calcDeliveryFee() {
    console.log('province: ', this.province);
    switch (this.province) {
      case '北京':
        this.deliveryFee = 10;
        this.addtionalUnitFee = 8;
        break;
      case '天津':
      case '河北':
      case '河南':
      case '安徽':
      case '辽宁':
      case '江苏':
      case '山东':
      case '上海':
      case '浙江':
        this.deliveryFee = 12;
        this.addtionalUnitFee = 10;
        break;
      case '甘肃':
      case '海南':
      case '青海':
        this.deliveryFee = 18;
        this.addtionalUnitFee = 15;
        break;
      case '新疆':
      case '西藏':
        this.deliveryFee = 20;
        this.addtionalUnitFee = 18;
        break;
      default:
        this.deliveryFee = 15;
        this.addtionalUnitFee = 12;
    }
    console.log('deliveryFee: ', this.deliveryFee);
  }

  placeOrder() {
    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter called');
    this.auth.retrieveAccountDetails().then((res) => {
      console.log('account details: ', res);
      this.destReady = true;
      if (res['name'] == '' || res['phone'] == '' || res['address'] == '' || res['city'] == '') {
        this.destReady = false;
      }
      this.name = res['name'];
      this.phone = res['phone'];
      this.province = res['province'];
      this.destination = res['province'] + res['city'] + res['county'] + res['address'];
      this.calcDeliveryFee();
      this.finalPayment = this.deliveryFee + this.total;
    }).catch((err) => {
      console.log('Err: in order.ts ionViewDidLoad() - err: ', err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.purchase = this.navParams.get('purchase');
    console.log('Order - purchase: ', this.purchase);
    this.calcTotal();
    this.finalPayment = this.deliveryFee + this.total;
  }

}
