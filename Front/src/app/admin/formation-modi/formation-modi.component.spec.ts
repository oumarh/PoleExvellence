import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationModiComponent } from './formation-modi.component';

describe('FormationModiComponent', () => {
  let component: FormationModiComponent;
  let fixture: ComponentFixture<FormationModiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationModiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationModiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
