import { DatePipe, registerLocaleData } from '@angular/common';
import { Component, Input } from '@angular/core';
import localePt from '@angular/common/locales/pt';

@Component({
  selector: 'app-common-article',
  standalone: true,
  imports: [],
  providers: [
    DatePipe
  ],
  templateUrl: './common-article.component.html',
  styleUrl: './common-article.component.scss'
})
export class CommonArticleComponent {
  @Input() date!: string;
  @Input() title!: string;
  @Input() link!: string;
  @Input() description!: string;
  @Input() author!: string;

  dateISO!: string;
  dateFormatted!: string;

  constructor(private datePipe: DatePipe) {
    registerLocaleData(localePt);
  }

  ngOnInit(): void {
    this.dateISO = this.date;
    this.dateFormatted = this.datePipe.transform(this.date, 'dd MMMM yyyy', '', 'pt-BR')!;
  }
}
