import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurComponent } from './entrepreneur.component';

describe('EntrepreneurComponent', () => {
  let component: EntrepreneurComponent;
  let fixture: ComponentFixture<EntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
