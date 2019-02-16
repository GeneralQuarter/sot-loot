import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gold',
  templateUrl: './gold.component.html',
  styleUrls: ['./gold.component.scss']
})
export class GoldComponent implements OnInit, OnDestroy {
  _digitsInfo = '1.0-2';
  _lang = 'en-US';

  low: number;
  high: number;
  value: number;

  @Input()
  set amount(value: number | number[] | null) {
    this.low = null;
    this.high = null;
    this.value = null;

    if (Array.isArray(value)) {
      if (value[1] && value[0] !== value[1]) {
        this.low = value[0];
        this.high = value[1];
      } else {
        this.value = value[0];
      }
    } else {
      this.value = value;
    }
  }

  @Input() range: {low: number, high: number, divideByTwo: boolean};

  private _sub: Subscription;

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    this._lang = this.translateService.getBrowserLang();
    this._sub = this.translateService.onLangChange.subscribe(t => {
      this._lang = t.lang;
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  get color() {
    if (!this.value) {
      return '';
    }

    if (!this.range) {
      return '';
    }

    const high = this.range.divideByTwo ? this.range.high / 2 : this.range.high;
    const low = this.range.divideByTwo ? this.range.low / 2 : this.range.low;

    const diff = high - low;

    if (diff < 5) {
      return '';
    }

    const fraction = diff / 4;

    if (this.value > high - fraction) {
      return 'secondary';
    }

    if (this.value < low + fraction) {
      return 'danger';
    }
  }

}
