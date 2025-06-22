import { Inject, Injectable } from '@angular/core';
import { NotificationStrategy } from './strategies/notification-strategy.interface';
import { NOTIFICATION_STRATEGIES } from './notification-token';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    @Inject(NOTIFICATION_STRATEGIES) private notificationStrategies: NotificationStrategy[]
  ) { }

  send(type: string, message: string): void {
    const strategy = this.notificationStrategies.find(s => s.type === type.toLowerCase())
    if(strategy) strategy.notify(message)
    else throw new Error(`No messaging strategy with this name(${type}).`)
  }
}
