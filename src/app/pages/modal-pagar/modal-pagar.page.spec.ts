import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagarPage } from './modal-pagar.page';

describe('ModalPagarPage', () => {
  let component: ModalPagarPage;
  let fixture: ComponentFixture<ModalPagarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPagarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPagarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
