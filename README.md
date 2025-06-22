# SOLID Principle Tutorial

SOLID is an acronym for five design principles used in OOP for designing a software. The benefit of following these principles involves:

- Makes your software easy to maintain
- Easy to scale (Scalability)
- Easy to understand (Comprehensible)
- Resilient to change

#### S - Single Responsibility Principle

A class should do only one thing or have only one responsibility, ergo have only one reason to change or be modified. an example is a class that handles user should not also handle logging of users, because if it does, it now has two reasons to change "User" and "logging". **Note:** that in a more complex app where the user logic becomes more complex you can further split into "UserQueryService" and "UserCommandService" (Command Query Responsibility Segregation).

#### O - Open/Closed Principles (OCP)

Software entities(classes, modules, functions) should be open for extension, but closed for modification. You can make use of interfaces or abstract classes to add new features by creating new classes, not modifying the existing ones.
e.g in a situation where you have different messaging strategies, you can create an interface.

```bash
//notification-strategy.interface.ts
/**
 * With this interface there is room for extension, but not modifying the existing classes implementing this interface.
 * If there is a need to add new notification strategy all we need do is to add new classes.
 */
export interface NotificationStrategy {
    type: string;
    notify(message: string): void;
}
```

Now, create an email class implementing this interface.

```bash
import { NotificationStrategy } from "./notification-strategy.interface";

/**
 * @field type: This field is used to identify the class to call, since we have several classes implementing "NotificationStrategy"
 * @function notify The logic of how the user is to be notified, here we are using E-mail.
 */
export class EmailStrategy implements NotificationStrategy {
    type: string = "email"

    /**
     *
     * @param message message to send.
     * @description logic to send the email goes here.
     */
    notify(message: string): void {
        console.log("Email: ", message);
    }
}
```

You can add more features by creating new classes, which does not modify the existing class, but serves as an extension. For example, if you want to add a sms strategy or a push strategy, here are the steps to follow.

**Step 1:** Create the class:

```
// push.strategy.ts

import { NotificationStrategy } from "./notification-strategy.interface";

/**
* @field type: This field is used to identify the class to call, since we have several classes implementing "NotificationStrategy"
* @function notify The logic of how the user is to be notified, here we are using Push Notification.
*/
export class PushStrategy implements NotificationStrategy {
    type: string = "push";

    /**
    *
    * @param message message to send.
    * @description logic to send the Push notification goes here.
    */
    notify(message: string): void {
        console.log("Push: ", message);
    }

}
```

**Step 2:** Register Push Notification using multi-provider.

```
// app.config.ts

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
```

**Step 3:** Call notificationService from template

```
// app.component.html

<router-outlet></router-outlet>
<button (click)="send('Email', 'Message via Email')">
    Send Email
</button>
<button (click)="send('SMS', 'Message via SMS')">
    Send SMS
</button>
<button (click)="send('Push', 'Message via Push Notification')">
    Send Push Notification
</button>
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
