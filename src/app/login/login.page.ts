import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: {email: string, password: string};
  error: Error;

  constructor(
    private menuCtrl: MenuController,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.credentials = {email: '', password: ''};
  }

  async login() {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
    } catch (e) {
      this.error = e;
    }
  }

}
