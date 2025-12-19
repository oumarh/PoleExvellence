import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAjoutComponent } from './blog-ajout.component';

describe('BlogAjoutComponent', () => {
  let component: BlogAjoutComponent;
  let fixture: ComponentFixture<BlogAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
