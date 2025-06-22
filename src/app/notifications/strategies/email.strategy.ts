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