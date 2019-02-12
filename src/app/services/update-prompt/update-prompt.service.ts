import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UpdatePromptService {

  constructor(
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
  ) {
  }

  listenForUpdates() {
    this.swUpdate.available.subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: this.translateService.instant('NEW_VERSION_AVAILABLE'),
        duration: 2000
      });

      await Promise.all([toast.present(), this.swUpdate.activateUpdate()]);

      document.location.reload();
    });
  }
}
