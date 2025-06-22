import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './notifications/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SOLID_Principles';

  constructor(private notificationService: NotificationService){

  }

  send(type: string, message: string) {
    this.notificationService.send(type, message)
  }
}
