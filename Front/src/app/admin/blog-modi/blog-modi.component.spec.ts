import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogModiComponent } from './blog-modi.component';

describe('BlogModiComponent', () => {
  let component: BlogModiComponent;
  let fixture: ComponentFixture<BlogModiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogModiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogModiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
