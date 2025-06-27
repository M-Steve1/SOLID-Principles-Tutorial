# SOLID Principle Tutorial

SOLID is an acronym for five design principles used in OOP for designing a software. The benefit of following these principles involves:

- Makes your software easy to maintain
- Easy to scale (Scalability)
- Easy to understand (Comprehensible)
- Resilient to change

#### S - Single Responsibility Principle

A class should do only one thing or have only one responsibility, ergo has only one reason to change or be modified. an example is a class that handles user should not also handle logging of users, because if it does, it now has two reasons to change "User" and "logging". **Note:** that in a more complex app where the user logic becomes more complex you can further split into "UserQueryService" and "UserCommandService" (Command Query Responsibility Segregation).

#### O - Open/Closed Principles (OCP)

Software entities(classes, modules, functions) should be open for extension, but closed for modification. You can make use of interfaces or abstract classes to add new features by creating new classes, not modifying the existing ones.
e.g in a situation where you have different messaging strategies, you can create an interface.

```bash
//notification-strategy.interface.ts
/**
 * With this interface there is room for extension, but not modifying the
 * existing classes implementing this interface.
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
 * @field type: This field is used to identify the class to call, since we have
 * several classes implementing "NotificationStrategy"
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

**OCP in functions:**
A function should be open for extension and closed for modification. Take for example a function that calculates how you intend to spend your income/salary.

```
// ❌ Bad (violates OCP):
// Don’t hardcode logic inside functions

function calculate (expenseType: string, income: number): number {
    if (expenseType === "tithe") return income * 0.1;
    if(expenseType === "game") return income * 0.3;
    return income;
}

// Note: To add a new expenseType the function must change and that violates OCP
```

```
//✅ Good (OCP-compliant):

type SpendingRule = (income: number) => number;

const spendingStrategy: Record<string, SpendingRule> = {
    tithe: income => income * 0.1,
    game: income => income * 0.3,
}

function calculate(expenseType: string, income: number): number {
    const rule = spendingStrategy[expenseType.toLowerCase()];
    return rule ? rule(income) : income;
}

// Note: Now you can add new expenseType without changing the core logic/function.
```

```
// lets add a new expenseType called 'clothing'.
SpendingRule> = {
    tithe: income => income * 0.1,
    game: income => income * 0.3,
    clothing: income => income * 0.4,
}
```

#### L - Liskov Substitution Principle (LSP)

Subclasses should behave correctly when used in place of their base classes. The Notification System will be used as an example here. Imagine you’re building a service that sends different types of notifications: Email, SMS, Push

**Step 1: Define Base Interface**

```
export interface NotificationStrategy {
    notify(message: string): void;
}
```

**Step 2: Implement Concrete Subclasses**

```
export class EmailStrategy implements NotificationStrategy {
    notify(message: string): void {
        console.log("Email: ", message);
    }
}

export class SmsStrategy implements NotificationStrategy {
    notify(message: string): void {
        console.log("SMS: ", message);
    }
}
```

**Step 3: Use Them Interchangeable**

```
function notifyUser(notification: Notification, message: string) {
    notification.notify(message);
}

notifyUser(new EmailStrategy(), "Hope this email finds you well");
notifyUser(new SmsStrategy(), "Hello There");

// Both subclasses can replace base class without breaking the code.
```

#### O - Interface Segregation Principle (ISP)

In ISP clients should not be forced to depend on interfaces they do not use. e.g Imagine a School Management System where different people in the school have different permission.

| Role         | Can Create | Can Edit | Can Delete | Can Publish | Can View |
| ------------ | ---------- | -------- | ---------- | ----------- | -------- |
| HeadOfSchool | ✅         | ✅       | ✅         | ✅          | ✅       |
| Teacher      | ❌         | ✅       | ❌         | ✅          | ✅       |
| Student      | ❌         | ❌       | ❌         | ❌          | ✅       |

```
❌  Bad Design (Violates ISP)

interface SchoolPermission {
    create: () => void,
    edit: () => void,
    delete: () => void,
    publish: () => void,
    view: () => void,
}

// Now every class will have to implement interface they don't need

class Teacher implements SchoolPermission {
    create () {
        throw new Error("Not Allowed");
    }
    edit () {
        console.log("Can edit Student");
    }
    delete() {
        throw new Error("Not Allowed");
    }
    publish () {
        console.log("Can publish Result");
    }
    view () {
        console.log("Can View Result");
    }
}
```

```
✅ Good Design (Applies ISP)

1. Split Interfaces

interface CreatePermission {
    create: () => void,
}

interface EditPermission {
    edit: () => void,
}

interface DeletePermission {
    delete: () => void,
}

interface PublishPermission {
    publish: () => void,
}

interface ViewPermission {
    view: () => void,
}

2. Implement only interface you need

class Teacher implements EditPermission, PublishPermission, ViewPermission {
    edit () {
        console.log("Can edit Student");
    }
    publish () {
        console.log("Can publish Result");
    }
    view () {
        console.log("Can View Result");
    }
}
```

#### D - Dependency Inversion Principle (DIP)

High level module depends on **abstractions**, and not concrete implementation

```
// 1. A concrete EmailService:

export class EmailService {
  sendEmail(message: string) {
    console.log('Sending email:', message);
  }
}

2. NotificationComponent directly depends on EmailService:

export class NotificationComponent {
  constructor(private emailService: EmailService) {}

  send() {
    this.emailService.sendEmail('Hello!');
  }
}
```

"High-level modules (like NotificationComponent) should not depend directly on low-level modules (EmailService). They should depend on abstractions," Just like the example used in Open Closed Principle (OCP).

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
