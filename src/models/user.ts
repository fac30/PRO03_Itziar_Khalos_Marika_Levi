import * as fs from 'fs';
import * as path from 'path';


class User {
  id: number;
  name: string;
  points: number;

  constructor(id: number, name: string, points: number) {
    this.id = id;
    this.name = name;
    this.points = points;
  }

  // Method to save a user to the JSON file
  save(userFilePath: string, callback: (err: NodeJS.ErrnoException | null) => void): void {
    // Ensure the directory exists
    const dir = path.dirname(userFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Ensure the file exists
    if (!fs.existsSync(userFilePath)) {
      fs.writeFileSync(userFilePath, '[]');
    }
    // Read the existing users from the JSON file
    fs.readFile(userFilePath, 'utf8', (err, data: string) => {
      if (err) {
        return callback(err);
      }

      // Parse the JSON data
      const users: User[] = JSON.parse(data);

      // Add the new user to the list
      users.push(this);

      // Write the updated users array back to the file
      fs.writeFile(userFilePath, JSON.stringify(users, null, 2), callback);
    });
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
