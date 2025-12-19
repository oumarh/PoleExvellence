import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatDetailsComponent } from './candidat-details.component';

describe('CandidatDetailsComponent', () => {
  let component: CandidatDetailsComponent;
  let fixture: ComponentFixture<CandidatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
