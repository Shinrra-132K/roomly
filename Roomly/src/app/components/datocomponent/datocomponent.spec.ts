import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datocomponent } from './datocomponent';

describe('Datocomponent', () => {
  let component: Datocomponent;
  let fixture: ComponentFixture<Datocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Datocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
