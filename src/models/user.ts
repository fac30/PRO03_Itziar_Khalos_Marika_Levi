class User {
  id: number;
  name: string;
  points: number;

  constructor(id: number, name: string, points: number) {
    this.id = id;
    this.name = name;
    this.points = points;
  }

  // You can call the function using the class --> User.createUsersFromJSON()
  static createUsersFromJSON(jsonData: any[]): User[] {
    const usersList: User[] = [];
    for (const user of jsonData) {
      usersList.push(new User(user.id, user.name, user.points));
    }
    return usersList;
  }
}

export { User };
