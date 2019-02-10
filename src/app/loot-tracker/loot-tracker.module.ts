import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LootTrackerPage } from './loot-tracker.page';
import { TranslateModule } from '@ngx-translate/core';
import { GoldModule } from '../components/gold/gold.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LootTrackerPage
      }
    ]),
    TranslateModule.forChild(),
    GoldModule,
  ],
  declarations: [LootTrackerPage]
})
export class LootTrackerModule {}
