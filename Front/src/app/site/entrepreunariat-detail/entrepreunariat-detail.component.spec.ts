import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreunariatDetailComponent } from './entrepreunariat-detail.component';

describe('EntrepreunariatDetailComponent', () => {
  let component: EntrepreunariatDetailComponent;
  let fixture: ComponentFixture<EntrepreunariatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreunariatDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreunariatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
