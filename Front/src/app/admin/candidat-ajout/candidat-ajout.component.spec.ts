import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatAjoutComponent } from './candidat-ajout.component';

describe('CandidatAjoutComponent', () => {
  let component: CandidatAjoutComponent;
  let fixture: ComponentFixture<CandidatAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
