import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArticleComponent } from './featured-article.component';

describe('FeaturedArticleComponent', () => {
  let component: FeaturedArticleComponent;
  let fixture: ComponentFixture<FeaturedArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
