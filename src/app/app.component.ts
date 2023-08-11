import { Component, OnInit } from '@angular/core';
import { CacheService } from './cache-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cache-methods';

  constructor(public cacheService: CacheService) {}

  ngOnInit(): void {
    this.cacheService.getHashsFromServer();
  }

  deleteAllData = () => {
    this.cacheService.deleteAllData();
  }

}
