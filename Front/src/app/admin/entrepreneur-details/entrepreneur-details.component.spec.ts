import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurDetailsComponent } from './entrepreneur-details.component';

describe('EntrepreneurDetailsComponent', () => {
  let component: EntrepreneurDetailsComponent;
  let fixture: ComponentFixture<EntrepreneurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
