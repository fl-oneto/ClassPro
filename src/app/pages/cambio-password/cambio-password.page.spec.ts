import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioPasswordPage } from './cambio-password.page';

describe('CambioPasswordPage', () => {
  let component: CambioPasswordPage;
  let fixture: ComponentFixture<CambioPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
