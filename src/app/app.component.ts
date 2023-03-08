import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private metaTagService: Meta, private titleService: Title) {}

  ngOnInit(): void {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Angular SEO Integration, foods, diary, lifestyle',
      },
      { name: 'robots', content: 'index' },
      { name: 'author', content: 'Tomasz Sokalski' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2023-03-08', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);

    this.titleService.setTitle('Diet Tracker')
  }
}
