import { NotificationStrategy } from "./notification-strategy.interface";

/**
 * @field type: This field is used to identify the class to call, since we have several classes implementing "NotificationStrategy"
 * @function notify The logic of how the user is to be notified, here we are using SMS.
 */
export class SmsStrategy implements NotificationStrategy{
    type: string = "sms"

     /**
     * 
     * @param message message to send.
     * @description logic to send the SMS goes here.
     */
    notify(message: string): void {
        console.log("SMS: ", message);
    }
}