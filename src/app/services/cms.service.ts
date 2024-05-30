import { Injectable } from '@angular/core';
import { defineOneEntry } from 'oneentry';
import { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';

let { Pages } = defineOneEntry('https://kipperdev.oneentry.cloud', {
  userToken: 'user.token',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5ndWxhci1hcHAiLCJzZXJpYWxOdW1iZXIiOjEsImlhdCI6MTcxNzA4MjQ0MSwiZXhwIjoxNzQ4NjE4NDU0fQ.gzqmpk74DqhM7spPaPP2naX28apR4ChOJt1wVJtQiVU',
  langCode: 'en_US'
})

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  constructor() {}

  async getAllPages(): Promise<IPagesEntity[]> {
    try {
      const pages = await Pages.getPages();
      return pages;
    } catch (error) {
      console.error('Erro ao buscar todas as páginas:', error);
      return [];
    }
  }

  async getById(id: number): Promise<IPagesEntity | null> {
    try {
      const page = await Pages.getPageById(id);
      return page;
    } catch (error) {
      console.error(`Erro ao buscar a página com ID ${id}:`, error);
      return null;
    }
  }
}
