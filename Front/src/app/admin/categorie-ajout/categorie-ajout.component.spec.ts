import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieAjoutComponent } from './categorie-ajout.component';

describe('CategorieAjoutComponent', () => {
  let component: CategorieAjoutComponent;
  let fixture: ComponentFixture<CategorieAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
