import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstname: string = "";
  lastname: string = "";
  dob: string = Date.toString();
  email: string = "";
  password: string = "";
  conf_password: string = "";

  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async tryRegister() {
    if (this.firstname == "") {
      this.presentToast('First name is required');
    } else if (this.lastname == "") {
      this.presentToast('Last name is required');
    } else if (this.email == "") {
      this.presentToast('E-mail is required');
    } else if (this.password == "") {
      this.presentToast('Password is required');
    } else if (this.conf_password != this.password) {
      this.presentToast('Password does not match');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present();

      try {
        console.log(environment.add_user);
        console.log('calling create a user account with: ' + this.email);
  
        const requestBody = {
          firstname: this.firstname,
          lastname: this.lastname,
          dob: this.dob,
          email: this.email,
          password: this.password
        };
  
        const createResponse =
          await fetch(environment.add_user, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
              'Content-Type': 'application/json'
            }
          });
        console.log('Success');
        console.log(createResponse.status);

        loader.dismiss();
        this.disabledButton = false;
        this.presentToast('Register successfully');
        this.router.navigate(['/login']);

      } catch (error) {
        console.log(error);
        loader.dismiss();
        this.disabledButton = false;
        this.presentAlert('Register ERROR');
      }

      /* return new Promise(resolve => {
        let body = {
          aksi: 'proses_register',
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        }

        this.accProv.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
          }
        }, (err)=>{
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Timeout');
        }); 
      }); */

    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

}
