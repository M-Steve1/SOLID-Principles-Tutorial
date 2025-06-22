/**
 * With this interface there is room for extension, but not modifying the existing classes implementing this interface.
 * If there is a need to add new notification strategy all you need do is to add new classes.
 */
export interface NotificationStrategy {
    type: string;
    notify(message: string): void;
}