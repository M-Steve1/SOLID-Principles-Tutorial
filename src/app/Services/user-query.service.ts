import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Service For querying users.
 * According to Single Responsibility Principle(SRP) the only reason this class has to change
 * is if there is a change in the logic used for querying users.
*/

export class UserQueryService {

  constructor() { }

  /**
   * @description logic to find all users gos here
   */
  getUsers() {
    console.log("All Users")
  }

  /**
   * 
   * @param id user id
   * @description logic to find user by id goes here
   */
  getUserByID(id: number) {
    console.log(id)
  }

  /**
   * 
   * @param email user email
   * @description logic to find user by email goes here
   */
  getUserByEmail(email: string) {
    console.log(email)
  }

}
