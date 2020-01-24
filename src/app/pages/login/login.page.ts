import { from, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  disabledButton;

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
    this.disabledButton = false;
  }

  async tryLogin() {
    if (this.email == "") {
      this.presentToast('E-mail is required');
    } else if (this.password == "") {
      this.presentToast('Password is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present();

      try {
        console.log('calling login user with: ' + this.email);

        const requestBody = {
          email: this.email,
          password: this.password
        };

        this.accProv.callapilogin(requestBody)
        .then(async (res:any) => {
          if (res.status == 200) {
            const data = await res.json();
            const user = Object.assign(data);
            const setUser = {
              user_id: user[0]['user_id'],
              firstname: user[0]['firstname'],
              lastname: user[0]['lastname'],
              dob: user[0]['dob'],
              email: user[0]['email']
            };
            console.log(setUser);
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Login success');
            this.storage.set('storage_hybrid', setUser);
            this.navCtrl.navigateRoot(['/home']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Email or password is wrong');
          }
        });
      } catch (error) {
        console.log(error);
        loader.dismiss();
        this.disabledButton = false;
        this.presentToast('Login ERROR');
      }


      /* return new Promise(resolve => {
        let body = {
          aksi: 'proses_login',
          email: this.email,
          password: this.password
        }

        this.accProv.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Login success');
            this.storage.set('storage_hybrid', res.result);
            this.navCtrl.navigateRoot(['/home']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Email or password is wrong');
          }
        }, (err)=>{
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Timeout');
        }); 
      }); */

    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

}
