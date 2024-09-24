
# Wisdom War 

## Project Overview


## Project Setup Instructions

### Prerequisites

Before starting, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v19.x or higher)
- **[npm](https://www.npmjs.com/)** 

### Step 1: Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/fac30/PRO03_Itziar_Khalos_Marika_Levi.git
cd PRO03_Itziar_Khalos_Marika_Levi
```

### Step 2: Install Dependencies

Install all required Node.js packages:

```bash
npm install
npm install express dotenv
npm install -D typescript @types/express @types/node ts-node nodemon
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the project root and define the environment variables:

```bash
touch .env
```

### Step 4: Initialise TypeScript

```bash
npx tsc --init
```

This command will generate the `dist` directory containing the compiled JavaScript files.

###  Step 5: Build and Run the Development Server
Compile the TypeScript files and start the development server:

```bash
npm run build
npm run dev
```

The server will start on the specified port, and you can access it at http://localhost:3000.

### Directory Structure

```
Wisdom_War_API_Backend/
│
├── dist/                    # Compiled JavaScript files (output directory)
│   └── index.js             # Compiled index file
│
├── node_modules/            # Node.js modules
│
├── src/                     # Source files (all TypeScript code will go here)
│   ├── controllers/         # Handle the logic for different endpoints
│   ├── models/              # Define TypeScript interfaces and types
│   ├── routes/              # Define express routes
│   ├── services/            # External API integration and other services
│   ├── data/                # Mock database or JSON files
│   ├── utils/               # Utility functions (e.g., error handling, data processing)
│   ├── index.ts             # Entry point of the application
│   └── app.ts               # Express application setup
│
├── .gitignore               # Ignoring node_modules, dist, etc.
├── nodemon.json             # Nodemon configuration for automatic restarts
├── package-lock.json        # Lock file for npm dependencies
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
└── tsconfig.json            # TypeScript configuration

```