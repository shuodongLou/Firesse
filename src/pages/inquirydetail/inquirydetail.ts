import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the InquirydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquirydetail',
  templateUrl: 'inquirydetail.html',
})
export class InquirydetailPage {

  public timestamp: any;
  public reply: any;
  public note: any;
  public status: boolean = false;
  public radarChartLabels:string[]
    = ['激素', '抗生素', '食物性过敏', '丘疹', '黑头', '白头', '囊肿',
        '结节', '混合型脓包', '痘印', '痘坑', '增生性结节', '毛囊炎', '其他皮肤病'];

  public radarChartData:any;
  public radarChartType:string = 'radar';

  public radarOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 10,
        stepSize: 1
      }
    },
    legend: {
      position: 'right'
    }
  };


  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public loading: LoadingController,
              public navParams: NavParams) {
    console.log('received obj in inquirydetail page: ', this.navParams.get('obj'));
    let loading = this.loading.create({
      content: '载入中...'
    });
    loading.present();
    let obj = this.navParams.get('obj');
    this.timestamp = obj['timestamp'];
    this.reply = obj['feedback'];
    this.status = obj['ori-status'];
    this.note = obj['note'];

    this.radarChartData = [
      {data: [obj['subtypea1'], obj['subtypea2'], obj['subtypea3'], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '过敏'},
      {data: [0, 0, 0, obj['subtypeb1'], obj['subtypeb2'], obj['subtypeb3'], 0, 0, 0, 0, 0, 0, 0, 0], label: '闭合粉刺'},
      {data: [0, 0, 0, 0, 0, 0, obj['subtypec1'], obj['subtypec2'], obj['subtypec3'], 0, 0, 0, 0, 0], label: '脓包'},
      {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, obj['subtyped1'], obj['subtyped2'], obj['subtyped3'], 0, 0], label: '疤痕'},
      {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, obj['subtypee1'], obj['subtypee2']], label: '病理问题'}
    ];
    loading.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InquirydetailPage');
  }

}
