import { Component } from '@angular/core';
import { LootHistoryService } from '../services/loot-history/loot-history.service';
import { LootHistory } from '../models/loot-history';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {
  lootHistory: LootHistory[];

  // stats
  totalAmount: number;
  lootCount: number;
  bestLootSold: LootHistory;
  soldCount: {lootId: string, sold: number}[];

  constructor(
    private lootHistoryService: LootHistoryService
  ) { }

  async ionViewDidEnter() {
    this.lootHistory = await this.lootHistoryService.getAllLootHistoryOnce();
    // this.lootHistory = await this.storage.get('lootHistory');

    this.lootCount = this.lootHistory.length;

    this.totalAmount = 0;
    this.bestLootSold = this.lootHistory[0];
    const soldCount: {[key: string]: number} = {};

    for (const lh of this.lootHistory) {
      if (!soldCount[lh.loot]) {
        soldCount[lh.loot] = 0;
      }

      soldCount[lh.loot]++;

      if (!lh.price) {
        continue;
      }

      this.totalAmount += lh.price;

      if (lh.price > this.bestLootSold.price) {
        this.bestLootSold = lh;
      }
    }

    this.soldCount = Object.entries(soldCount)
      .sort(([k1, v1], [k2, v2]) => v2 - v1)
      .map(([k, v]) => ({lootId: k, sold: v}));
  }

  translateKey(lootId: string): string {
    if (!lootId || lootId === 'undefined') {
      return '???';
    }

    return 'LOOT.' + lootId.replace(/-/g, '_').toUpperCase();
  }
}
