import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEstanciaComponent } from './modificar-estancia.component';

describe('ModificarEstanciaComponent', () => {
  let component: ModificarEstanciaComponent;
  let fixture: ComponentFixture<ModificarEstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarEstanciaComponent]
    });
    fixture = TestBed.createComponent(ModificarEstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
