import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alojamientocomponent } from './alojamientocomponent';

describe('Alojamientocomponent', () => {
  let component: Alojamientocomponent;
  let fixture: ComponentFixture<Alojamientocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Alojamientocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Alojamientocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
