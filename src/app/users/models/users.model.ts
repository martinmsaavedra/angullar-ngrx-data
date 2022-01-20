
export class UsersModel {
  constructor (
      public id: number,
      public email: string,
      public first_name: string,
      public last_name: string,
      public avatar?: string
  ){}
  }


  export function compareUsers(u1:UsersModel, u2: UsersModel) {

    if (u1.first_name > u2.first_name) {
      return 1;
    }
    else if (u1.first_name < u2.first_name) {
      return -1;
    }
    else return 0;

  }
