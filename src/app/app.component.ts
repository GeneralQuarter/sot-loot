import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private translate: TranslateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');

    this.afAuth.authState.subscribe(user => {
      this.user = user;
      if (user) {
        this.navCtrl.navigateRoot('/loot-tracker');
      } else {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  updateLang(event) {
    this.translate.use(event.detail.value);
  }
}
