import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Service For logging users.
 * According to Single Responsibility Principle(SRP) the only reason this class has to change
 * is if there is a change in the logic of how to log the users.
*/

export class UserLoggingService {

  constructor() { }

  log(message: string){
    console.log(message);
  }
}
