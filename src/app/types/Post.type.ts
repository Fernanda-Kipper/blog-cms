export type Post = {
    title: string,
    id: number,
    metadata: Metadata
}

export interface Metadata {
    description: string;
    date: string;
    author: string;
}
  
export interface ContentItem {
    type: 'heading' | 'text' | 'image';
    content: string;
    level?: number;
}
  
export interface ParsedContent {
    metadata: Metadata;
    content: ContentItem[];
}