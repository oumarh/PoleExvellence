import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurAjoutComponent } from './entrepreneur-ajout.component';

describe('EntrepreneurAjoutComponent', () => {
  let component: EntrepreneurAjoutComponent;
  let fixture: ComponentFixture<EntrepreneurAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
