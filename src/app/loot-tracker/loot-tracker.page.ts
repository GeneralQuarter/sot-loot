import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Loot } from '../models/loot';
import { TranslateService } from '@ngx-translate/core';
import { LootHistory } from '../models/loot-history';
import { LootHistoryService } from '../services/loot-history/loot-history.service';
import { LootService } from '../services/loot/loot.service';

@Component({
  selector: 'app-loot-tracker',
  templateUrl: 'loot-tracker.page.html',
  styleUrls: ['loot-tracker.page.scss'],
})
export class LootTrackerPage implements OnInit {

  filteredLoots$: Observable<Loot[]>;
  searchTerm$: Subject<string> = new BehaviorSubject<string>('');

  lootHistory$: Observable<LootHistory[]>;
  lootHistorySum$: Observable<number>;
  selectedLootHistoryId: string;

  constructor(
    private menuCtrl: MenuController,
    private translateService: TranslateService,
    private alertCtrl: AlertController,
    public lootService: LootService,
    private lootHistoryService: LootHistoryService,
    private toastCtrl: ToastController,
  ) {}

  async ngOnInit() {
    this.menuCtrl.enable(true);
    this.filteredLoots$ = this.lootService.getFilteredLoots$(this.searchTerm$);
    this.lootHistory$ = this.lootHistoryService.getLootHistory$();
    this.lootHistorySum$ = this.lootHistoryService.getLootHistorySum$(this.lootHistory$);
    this.selectedLootHistoryId = null;
  }

  async openPriceUpdater(lootHistory: LootHistory) {
    const alert = await this.alertCtrl.create({
      header: this.translateService.instant('LOOT.' + lootHistory.loot.replace(/-/g, '_').toUpperCase()),
      inputs: [
        {
          name: 'price',
          type: 'number',
          placeholder: this.translateService.instant('PRICE_ALERT.PRICE')
        },
      ],
      buttons: [
        {
          text: this.translateService.instant('ACTIONS.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: this.translateService.instant('ACTIONS.OK'),
          handler: () => {
          }
        }
      ]
    });

    await alert.present();

    const input = (<any>alert.querySelector('input.alert-input'));
    input.focus();
    input.addEventListener('keyup', e => {
      if (e.key === 'Enter' && parseInt(input.value, 0) > 0) {
        alert.dismiss({values: {price: input.value}});
      }
    });

    const event = await alert.onDidDismiss();
    const priceStr = event.data.values.price;

    if (!priceStr) {
      return;
    }

    const price = parseInt(priceStr, 0);

    if (price <= 0) {
      return;
    }

    try {
      await this.lootHistoryService.updatePrice(lootHistory.id, price);
    } catch (e) {
      this.showLootHistoryError('UPDATE');
    }
  }

  trackByLootId(value: Loot) {
    return value.id;
  }

  trackByLootHistoryId(value: LootHistory) {
    return value.id;
  }

  async deleteLootHistory(lootHistory: LootHistory) {
    try {
      await this.lootHistoryService.delete(lootHistory);
    } catch (e) {
      this.showLootHistoryError('DELETE');
    }
  }

  async addLootHistoryWithoutPrice(loot: Loot) {
    try {
      await this.lootHistoryService.addWithoutPrice(loot.id);
    } catch (e) {
      this.showLootHistoryError('ADD');
    }
  }

  async addLootHistoryWithoutLoot(priceStr: string) {
    try {
      const priceNum = parseInt(priceStr, 0);
      await this.lootHistoryService.addWithoutLoot(priceNum);
    } catch (e) {
      this.showLootHistoryError('ADD');
    }
  }

  async updateSelectedLootHistoryLoot(loot: Loot) {
    if (!this.selectedLootHistoryId) {
      return;
    }

    try {
      await this.lootHistoryService.updateLoot(this.selectedLootHistoryId, loot.id);
      this.selectedLootHistoryId = null;
    } catch (e) {
      this.showLootHistoryError('UPDATE');
    }
  }

  clickOnLootHistory(lootHistory: LootHistory) {
    if (!lootHistory.loot) {
      this.selectedLootHistoryId = lootHistory.id;
      return;
    }
    this.openPriceUpdater(lootHistory);
  }

  private showLootHistoryError(actionKey: string) {
    const key = 'LOOT_TRACKER.ERRORS.LOOT_HISTORY';
    const action  = this.translateService.instant('LOOT_TRACKER.ERRORS.ACTIONS.' + actionKey);

    this.showError(key, {action: action});
  }

  private async showError(key: string, params: {[key: string]: any}) {
    const toast = await this.toastCtrl.create({
      message: this.translateService.instant(key, params),
      duration: 2000
    });
    await toast.present();
  }
}
