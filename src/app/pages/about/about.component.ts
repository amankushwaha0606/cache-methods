import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public m_3: any;
  public isCachedData: boolean = false;

  constructor(private cacheService: CacheService) {

  }

  ngOnInit(): void {
    this.cacheService.compareHashes('m_3','').then((res) => {
      this.m_3 = res.data;
      this.isCachedData = res.isCachedData;
    });
  }
}
