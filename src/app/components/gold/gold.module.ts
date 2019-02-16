import { NgModule } from '@angular/core';
import { GoldComponent } from './gold.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule.forChild()],
  declarations: [GoldComponent],
  exports: [GoldComponent]
})
export class GoldModule {}
