import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DailyTasks';
  items: MenuItem[];
  

  constructor() {
    this.items = [
      {label: 'Audio Player', routerLink: ['/audioplayer']},
      {label: 'Video Player', routerLink: ['/videoplayer']},
      
  ];
  }

 

 

}
