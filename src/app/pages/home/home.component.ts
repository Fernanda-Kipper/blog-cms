import { Component, OnInit } from '@angular/core';
import { FeaturedArticleComponent } from '../../components/featured-article/featured-article.component';
import { CommonArticleComponent } from '../../components/common-article/common-article.component';
import { CmsService } from '../../services/cms.service';
import { MarkdownParser } from '../../utils/MarkdownParser.utils';
import { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { Post } from '../../types/Post.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedArticleComponent, CommonArticleComponent],
  providers: [
    CmsService,
    MarkdownParser
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredPost: Post | null = null;
  posts: Post[] = [];

  constructor(private cmsService: CmsService, private markdownParser: MarkdownParser) {}

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    const pages: IPagesEntity[] = await this.cmsService.getAllPages();
    let parsedPosts = pages.filter(page => page.templateIdentifier === 'blog')
    .map(page => {
        const content = page.localizeInfos;
        return {
          id: page.id,
          title: content['title'] as string,
          metadata: this.markdownParser.extractMetadata(content['plainContent'])
        }
      }
    );

    if (parsedPosts.length > 0) {
      this.featuredPost = parsedPosts.pop() || null;
      this.posts = parsedPosts;
    }
  }
}
