import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Service For modifying users.
 * According to Single Responsibility Principle(SRP) the only reason this class has to change
 * is if there is a change in the logic used for modifying users in the db.
*/

export class UserCommandService {

  constructor() { }

  /**
   * 
   * @param user user to be created
   * @description logic to create user goes here.
  */
  createUser(user: {}) {
    console.log("User Created");
  }

  /**
   * 
   * @param id id of user to be updated
   * @param user user to be updated
   * @description logic to update user goes here.
  */
  updateUser(id: number, user: {}) {
    console.log("User Updated");
  }

  /**
   * 
   * @param id id of user to be deleted
   * @description logic to delete user goes here.
  */
  deleteUser(id: number) {
    console.log("User Deleted");
  }

}
