import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPwPage } from './recuperar-pw.page';

describe('RecuperarPwPage', () => {
  let component: RecuperarPwPage;
  let fixture: ComponentFixture<RecuperarPwPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarPwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
