import { Component } from '@angular/core';
import { AdBoardComponent } from './ad-board/ad-board.component'; 

@Component({
  selector: 'app-root',
  standalone: true,           
  imports: [AdBoardComponent], 
  template: `<app-ad-board></app-ad-board>` 
})
export class AppComponent {
  title = 'bulletin-board-client';
}
