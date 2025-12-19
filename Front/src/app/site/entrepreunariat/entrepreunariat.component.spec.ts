import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreunariatComponent } from './entrepreunariat.component';

describe('EntrepreunariatComponent', () => {
  let component: EntrepreunariatComponent;
  let fixture: ComponentFixture<EntrepreunariatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreunariatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreunariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
