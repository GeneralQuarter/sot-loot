import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gold',
  templateUrl: './gold.component.html',
  styleUrls: ['./gold.component.scss']
})
export class GoldComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {}

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
