import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionBorradoComponent } from './confirmacion-borrado.component';

describe('ConfirmacionBorradoComponent', () => {
  let component: ConfirmacionBorradoComponent;
  let fixture: ComponentFixture<ConfirmacionBorradoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionBorradoComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
