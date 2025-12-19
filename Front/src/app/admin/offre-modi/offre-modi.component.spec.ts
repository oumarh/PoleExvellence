import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreModiComponent } from './offre-modi.component';

describe('OffreModiComponent', () => {
  let component: OffreModiComponent;
  let fixture: ComponentFixture<OffreModiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreModiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreModiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
