import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationAjoutComponent } from './formation-ajout.component';

describe('FormationAjoutComponent', () => {
  let component: FormationAjoutComponent;
  let fixture: ComponentFixture<FormationAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
