<h1 align="center">Herobase Application ✨</h1>

![Demo App](/frontend/public/home-page.jpg)

<h1 align="center">🛠️ Setup & Running the Solution</h1>

<h3>Prerequisites</h3>
<p>Node.js (v16 or higher)</p>

<h3>1. Install Dependencies</h3>
<p>This command installs all dependencies for both frontend and backend:</p>

```bash
npm run develop
```

<h3>2. Environment Variables</h3>
<p>Create a .env file in the project root.</p>

### Setup .env file in _project_ folder

```bash
PORT=5000

MONGO_URI=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

<p>Create a .env file in the frontend root.</p>

### Setup .env file in _frontend_ folder

```bash
VITE_API_URL="http://localhost:5000"
```

<h3>3. Start the Application</h3>
<p>Once environment variables are configured, start both frontend and backend:</p>

```bash
npm run dev
```

<h1>📌 Assumptions</h1>

Node.js are installed and properly configured on the system.

The command npm run develop sets up both backend and frontend by installing all required dependencies.

The application requires a .env file with environment variables like MONGODB_URI, PORT, etc.

MongoDB (or the relevant database) is already running and accessible.

npm run dev will concurrently start both backend and frontend development servers.

<h1>Unit Tests Report</h1>

Unit tests were written for the Superhero controllers to verify the core logic and functionality:

![Demo App](/frontend/public/tests.jpg)

```bash
Verified fetching the list of superheroes along with the total count.

Tested creating a superhero with mocked image upload using Cloudinary.

Tested updating superhero data and saving changes to the database.

Tested deleting a superhero’s image.

Tested deleting a superhero from the database.

Tested fetching a superhero by ID, including handling the case when the superhero is not found.

The tests mock the database operations and external Cloudinary service, allowing them to run independently without a real database or network connection.
```

### _Result_: All tests passed successfully.
