import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurAjoutComponent } from './administrateur-ajout.component';

describe('AdministrateurAjoutComponent', () => {
  let component: AdministrateurAjoutComponent;
  let fixture: ComponentFixture<AdministrateurAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrateurAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrateurAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
