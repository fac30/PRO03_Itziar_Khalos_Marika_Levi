class User {
  save(usersFilePath: string, arg1: (err: NodeJS.ErrnoException | null) => import("express").Response<any, Record<string, any>> | undefined) {
    throw new Error("Method not implemented.");
  }
  id: number;
  name: string;
  points: number;

  constructor(id: number, name: string, points: number) {
    this.id = id;
    this.name = name;
    this.points = points;
  }

   // Simulate the POST request using console.log
   static postUser(
    name: string,
    points: number,
  ): void {
    // Simulate logging the POST request
    console.log(`[server]: Received POST request to /users`);
    console.log(`[server]: User submitted:`);
    console.log(`    name: ${name}`);
    console.log(`    points: ${points}`);
  }
}

export { User };
