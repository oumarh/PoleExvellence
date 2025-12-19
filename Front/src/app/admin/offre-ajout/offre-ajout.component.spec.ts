import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreAjoutComponent } from './offre-ajout.component';

describe('OffreAjoutComponent', () => {
  let component: OffreAjoutComponent;
  let fixture: ComponentFixture<OffreAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
