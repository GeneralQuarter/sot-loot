import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LootTrackerPage } from './home.page';

describe('HomePage', () => {
  let component: LootTrackerPage;
  let fixture: ComponentFixture<LootTrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LootTrackerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LootTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
