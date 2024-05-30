import MarkdownIt from 'markdown-it';
import { ContentItem, Metadata, ParsedContent } from '../types/Post.type';

export class MarkdownParser {
  private md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt();
  }

  public extractMetadata(markdown: string): Metadata {
    const metadataRegex = /^---\n([\s\S]+?)\n---/;
    const match = markdown.match(metadataRegex);

    if (!match) {
      throw new Error('Invalid markdown format: No metadata block found');
    }

    const metadataString = match[1];
    const metadataLines = metadataString.split('\n');
    const metadata: any = {};

    for (const line of metadataLines) {
      const [key, value] = line.split(':').map(s => s.trim().replace(/"/g, ''));
      metadata[key] = value;
    }

    return metadata as Metadata;
  }

  private parseMarkdownContent(markdownContent: string): ContentItem[] {
    const parsed = this.md.parse(markdownContent, {});
    const content: ContentItem[] = [];

    for (const token of parsed) {
      if (token.type === 'heading_open') {
        content.push({
          type: 'heading',
          content: parsed[parsed.indexOf(token) + 1].content,
          level: parseInt(token.tag.slice(1))
        });
      } else if (token.type === 'paragraph_open') {
        content.push({
          type: 'text',
          content: parsed[parsed.indexOf(token) + 1].content
        });
      } else if (token.type === 'image') {
        content.push({
          type: 'image',
          content: token.attrGet('src') || ''
        });
      }
    }

    return content;
  }

  public parseAllMarkdown(markdown: string): ParsedContent {
    const metadata = this.extractMetadata(markdown);
    const markdownContent = markdown.replace(/^---\n([\s\S]+?)\n---/, ''); // Remove os metadados do conteúdo
    const content = this.parseMarkdownContent(markdownContent);

    return {
      metadata,
      content
    };
  }
}
