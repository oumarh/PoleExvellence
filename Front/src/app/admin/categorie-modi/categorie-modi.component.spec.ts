import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieModiComponent } from './categorie-modi.component';

describe('CategorieModiComponent', () => {
  let component: CategorieModiComponent;
  let fixture: ComponentFixture<CategorieModiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieModiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieModiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
