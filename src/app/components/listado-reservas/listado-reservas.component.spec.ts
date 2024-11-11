import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoReservasComponent } from './listado-reservas.component';

describe('ListadoReservasComponent', () => {
  let component: ListadoReservasComponent;
  let fixture: ComponentFixture<ListadoReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoReservasComponent]
    });
    fixture = TestBed.createComponent(ListadoReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
