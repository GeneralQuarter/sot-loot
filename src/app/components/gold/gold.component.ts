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

  constructor() { }

  ngOnInit() {}

}
