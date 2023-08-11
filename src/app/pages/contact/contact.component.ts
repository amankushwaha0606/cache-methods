import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public m_4: any;
  public isCachedData: boolean = false;

  constructor(private cacheService: CacheService) {

  }

  ngOnInit(): void {
    this.cacheService.compareHashes('m_4','').then((res) => {
      this.m_4 = res.data;
      this.isCachedData = res.isCachedData;
    });
  }
}
