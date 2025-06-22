import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NOTIFICATION_STRATEGIES } from './notifications/notification-token';
import { EmailStrategy } from './notifications/strategies/email.strategy';
import { SmsStrategy } from './notifications/strategies/sms.strategy';
import { PushStrategy } from './notifications/strategies/push.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    {provide: NOTIFICATION_STRATEGIES, useClass: EmailStrategy, multi: true},
    {provide: NOTIFICATION_STRATEGIES, useClass: SmsStrategy, multi: true},
    {provide: NOTIFICATION_STRATEGIES, useClass: PushStrategy, multi: true},
  ]
};
