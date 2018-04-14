import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ReceiptinfoPage } from '../receiptinfo/receiptinfo';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public purchase:any;
  public destination:string;
  public province:string;
  public user:number;
  public role:string;
  public points:number;
  public name:string;
  public phone:string;
  public destReady:boolean = true;
  public total:number = 0;
  public deliveryFee:number = 0;
  public addtionalUnitFee:number = 0;
  public hasFirecode:boolean=false;
  public firecode:string = '';
  public s_firecode:string = '';
  public firecodeWarning:string;
  public discount:number = 0;
  public finalPayment:number = 0;
  public agent:any;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public storage: Storage,
              public asCtrl: ActionSheetController,
              public navParams: NavParams) {
    //
    console.log('constructor called');
    this.purchase = this.navParams.get('purchase');
    console.log('Order - purchase: ', this.purchase);
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
      this.agent = res;
      this.hasFirecode = true;
      this.discount = Math.round(this.total * 0.05);
      this.finalPayment -= this.discount;
      this.s_firecode = this.firecode;
      this.firecode = '';
    }).catch((err) => {
      console.log('there is no such firecode - err: ', err);
      this.firecode = '';
    });
  }

  placeOrder() {
    //get num_of_products and order products info:
    let t_num:number = 0;
    let productInfoList = [];
    for (let i = 0; i < this.purchase['productList'].length; i++) {
      t_num += Number(this.purchase['productList'][i]['quantity']);
      let pInfo = this.purchase['productList'][i]['info']['name']
                + ' | ' + this.purchase['productList'][i]['quantity'];
      productInfoList.push(pInfo);
    }
    console.log('order products info: ', productInfoList);
    //create order number:
    let code:string = Math.random().toString(36).substr(2, 4).toUpperCase();
    let dtnow = new Date();
    let datetime:string = String(dtnow.getFullYear()) + String(dtnow.getMonth()+1) + String(dtnow.getDate())
                          + String(dtnow.getHours()) + String(dtnow.getMinutes()) + String(dtnow.getSeconds());
    let orderCode:string = 'FO' + code + datetime;
    let details = {
      'acct_id': this.auth.acct_pk,
      'product_total': this.total,
      'final_payment': this.finalPayment,
      'time_delivered': null,
      'time_resolved': null,
      'fire_code': this.s_firecode,
      'cus_name': this.name,
      'cus_phone': this.phone,
      'cus_address': this.destination,
      'num_of_products': t_num,
      'order_id': orderCode,
      'status': '已下单'
    };
    console.log('details obj: ', details);

    this.auth.createOrder(details).then((res) => {
      console.log('order placed... - res: ', res);
      details['id'] = res['id'];
      let reqObj = {
        'order': res['id'],
        'product': productInfoList
      };
      return this.auth.createOrderProducts(reqObj);
    }).then((res) => {
      if (this.hasFirecode == true) {

        let commission:number = Math.round(this.agent['commission_rate']/10 * this.finalPayment);
        console.log('commission: ', commission);
        let agent_details = {
          'fire_code': this.s_firecode,
          't_commission': this.agent['t_commission'] + commission,
          'y_commission': this.agent['y_commission'] + commission,
          'm_commission': this.agent['m_commission'] + commission,
          't_sales': this.agent['t_sales'] + this.finalPayment,
          'y_sales': this.agent['y_sales'] + this.finalPayment,
          'm_sales': this.agent['m_sales'] + this.finalPayment,
        };
        console.log('agent_details: ', agent_details);
        return this.auth.updateAgent(agent_details, this.agent['id']);
      } else {
        return 'fire code not applied, update agent skipped...';
      }
    }).then((res) => {
      console.log('updated agent successfully - res: ', res);
      let acct_details = {
        'user': this.user,
        'role': this.role,
        'points': this.points + this.total
      };
      return this.auth.updateAccountDetails(acct_details);
    }).then((res) => {
      console.log('customer points added - res: ', res);
      this.storage.set('cart', null);
      this.storage.set('cartItemNumber', 0);
      this.navCtrl.setRoot("OrderlistPage");
    }).catch((err) => {
      console.log('Err: in order.ts placeOrder() - err: ', err);
    });

    let productL = this.purchase['productList'];
    for (let i = 0; i < productL.length; i++) {
      let reqPack = {
        'id':productL[i]['info']['id'],
        'name': productL[i]['info']['name'],
        'inventory': productL[i]['info']['inventory'] - productL[i]['quantity'],
        'histsales': productL[i]['info']['histsales'] + productL[i]['subtotal']  
      };
      console.log('reqPack: ', reqPack);
      this.auth.updateProduct(reqPack).then((res) => {
        console.log('product updated successfully - res: ', res);
      }).catch((err) => {
        console.log('Err: in order.ts placeOrder() update products [' + i + '] - err: ', err);
      });
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter called');
    this.auth.retrieveAccountDetails().then((res) => {
      console.log('account details: ', res);
      this.destReady = true;
      if (res['name'] == '' || res['phone'] == '' || res['address'] == '' || res['city'] == '') {
        this.destReady = false;
      }
      this.user = res['user'];
      this.role = res['role'];
      this.points = res['points'];
      this.name = res['name'];
      this.phone = res['phone'];
      this.province = res['province'];
      this.destination = res['province'] + res['city'] + res['county'] + res['address'];
      this.finalPayment = this.total;
    }).catch((err) => {
      console.log('Err: in order.ts ionViewDidLoad() - err: ', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.purchase = this.navParams.get('purchase');
    console.log('Order - purchase: ', this.purchase);
    this.total = this.navParams.get('purchase')['total'];
    this.finalPayment = this.total;
  }

}
