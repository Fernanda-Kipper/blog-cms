import { Component, LOCALE_ID } from '@angular/core';
import { FeaturedArticleComponent } from '../../components/featured-article/featured-article.component';
import { CommonArticleComponent } from '../../components/common-article/common-article.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedArticleComponent, CommonArticleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
