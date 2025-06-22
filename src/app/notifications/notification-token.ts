import { InjectionToken } from "@angular/core";
import { NotificationStrategy } from "./strategies/notification-strategy.interface";

export const NOTIFICATION_STRATEGIES = new InjectionToken<NotificationStrategy[]>("NotificationStrategy");