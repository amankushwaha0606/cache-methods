import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public m_8: any;
  public isCachedData: boolean = false;

  constructor(private cacheService: CacheService) {

  }

  ngOnInit(): void {
    this.cacheService.compareHashes('m_8','').then((res) => {
      this.m_8 = res.data;
      this.isCachedData = res.isCachedData;
    });
  }
}
