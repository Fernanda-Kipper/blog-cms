import { Component, OnInit } from '@angular/core';
import { ParsedContent } from '../../types/Post.type';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from '../../services/cms.service';
import { MarkdownParser } from '../../utils/MarkdownParser.utils';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [CmsService, MarkdownParser]
})
export class PostComponent implements OnInit {
  post: ParsedContent | null = null;
  title: string = "";

  constructor(
    private route: ActivatedRoute,
    private cmsService: CmsService,
    private markdownParser: MarkdownParser
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const page = await this.cmsService.getById(Number(id));
      if (page) {
        const content = page.localizeInfos["plainContent"];
        console.log(content)
        this.post = this.markdownParser.parseAllMarkdown(content);
        this.title = page.localizeInfos["title"];
      }
    }
  }
}
