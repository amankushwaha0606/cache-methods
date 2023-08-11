import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public m_6: any;
  public isCachedData: boolean = false;

  constructor(private cacheService: CacheService) {

  }

  ngOnInit(): void {
    this.cacheService.compareHashes('m_6','').then((res) => {
      this.m_6 = res.data;
      this.isCachedData = res.isCachedData;
    });
  }
}
