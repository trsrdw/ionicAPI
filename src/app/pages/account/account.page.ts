import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  datastorage: any;
  fname: string;
  lname: string;
  email: string;
  dob: string;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private accProv: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('storage_hybrid').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.fname = this.datastorage.firstname;
      this.lname = this.datastorage.lastname;
      this.email = this.datastorage.email;
      this.dob = this.datastorage.dob;
    });
  }

  async prosesLogout() {
    this.storage.clear();
    this.navCtrl.navigateRoot(['/intro']);
    const toast = await this.toastCtrl.create({
      message: 'Session end',
      duration: 1500
    });
    toast.present();
  }

}
