import { NgModule } from '@angular/core';
import { GoldComponent } from './gold.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [GoldComponent],
  exports: [GoldComponent]
})
export class GoldModule {}
