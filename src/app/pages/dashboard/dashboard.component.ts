import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public m_5_1: any;
  public isCachedData: boolean = false;

  constructor(private cacheService: CacheService) {

  }

  ngOnInit(): void {
    this.cacheService.compareHashes('m_5_1','').then((res) => {
      this.m_5_1 = res.data;
      this.isCachedData = res.isCachedData;
    });
  }
}
