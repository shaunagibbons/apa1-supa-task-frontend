# Fish Catalog App

This repository contains a simple web application for managing a catalog of fish. It includes a client-side JavaScript application (`client.js`) and an Express.js backend (`server.js`) that acts as a proxy to Supabase Edge Functions.

## Features
- Retrieve a list of fish from Supabase.
- Add new fish entries.
- Update existing fish entries.
- Delete fish entries.
- Search for fish in real-time.

## Tech Stack
- **Frontend:** JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database & API:** Supabase


## Installation & Setup
### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [Supabase](https://supabase.com/) account

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/fish-catalog.git
cd fish-catalog
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```
Replace `your_supabase_url` and `your_supabase_anon_key` with your actual Supabase credentials.

### 4. Start the Server
```sh
node server.js
```
Server will start at `http://localhost:3000`

### 5. Open the Client
Open `index.html` in your browser to use the fish catalog application.


## API Endpoints
### `GET /api/fish`
Retrieves a list of fish from Supabase.

### `POST /api/fish`
Adds a new fish to the database.
#### Request Body:
```json
{
  "Name": "Goldfish",
  "Sell": 100,
  "Shadow": "Small",
  "Where": "Pond"
}
```

### `PUT /api/fish`
Updates an existing fish entry.
#### Request Body:
```json
{
  "Id": 1,
  "Name": "Carp",
  "Sell": 150,
  "Shadow": "Medium",
  "Where": "Lake"
}
```

### `DELETE /api/fish`
Deletes a fish entry.
#### Request Body:
```json
{
  "Id": 1
}
```


# Debugging in client.js
1. DOM Loaded Event
console.log("DOM fully loaded, calling getFish()...");

Ensures that the script is executed only after the DOM is fully loaded. This is crucial to prevent any issues related to accessing DOM elements that are not yet available.

2. API Call Debugging

console.log("Fetching fish data from API...");
console.log("Fish data received:", fishArr);
Tracks when the getFish() function attempts to fetch data from the API and logs the response. This helps verify if the request was successful and if the correct data was received.

3. Event Listener Debugging for Fish Actions

console.log("Filtering fish by query:", query);
console.log("Updating fish with ID:", fishId);
console.log("Deleting fish with ID:", fishId);
Logs key actions (such as filtering, updating, and deleting fish) and the associated data (like query or fish ID). This helps ensure the correct action is being triggered by the user.

4. Error Handling

console.error("Error fetching fish data:", error);
console.error("Error updating fish:", error);
console.error("Error deleting fish:", error);
Logs errors that occur during API calls, allowing you to identify and resolve issues with the server or the request itself.

# Debugging in server.js

1. Logging API Endpoint Access

console.log('GET /api/fish called');
console.log('POST /api/fish called with body:', req.body);
console.log('PUT /api/fish called with body:', req.body);
console.log('DELETE /api/fish called with body:', req.body);
Logs the access and payload for each of the API endpoints (GET, POST, PUT, DELETE). This ensures that the server is receiving and processing requests as expected.

2. Supabase API Interaction

console.log('Fetched fish data:', data);
console.log('Fish added successfully:', data);
console.log('Fish updated successfully:', data);
console.log('Fish deleted successfully:', data);
Logs the results of interactions with Supabase (whether data is fetched, added, updated, or deleted). These logs confirm that the server is interacting correctly with Supabase.

3. Error Handling for API Calls

console.error(`Supabase returned ${response.status}: ${response.statusText}`);
console.error("Error updating fish:", data.error);
console.error("Error deleting fish:", data.error);
console.error("GET request error:", error);
console.error('POST /api/fish error:', error);
console.error("Error deleting fish:", error);
Provides detailed error messages if something goes wrong during the interaction with Supabase or any part of the server's API logic. The specific error messages help pinpoint issues with data fetching, validation, or API integration.

4. Validation Warnings

console.warn("POST request missing required fields:", req.body);
Logs warnings when the incoming request is missing necessary data (e.g., required fields are not provided). This helps identify where user input or client requests may be malformed.

5. Server Start Confirmation

console.log(`Proxy server running on http://localhost:${PORT}`);
Confirms that the server is running and listening for requests on the specified port.


# Additional Debugging Steps
1. Network Monitoring
Use the browser's developer tools (Network tab) to track the API calls and their responses. Look for any failed requests, incorrect HTTP status codes, or missing data in the responses.
2. Supabase Console
Log in to the Supabase console and check the logs or queries to verify that the fish-related data is being correctly stored, fetched, updated, or deleted.
3. Error and Log Review
Regularly review the logs generated by the server (console.error and console.log messages). These logs will help identify what part of the code is causing an issue.
4. Validate Data Integrity
Ensure that the data sent to Supabase (via POST, PUT, DELETE) and the data retrieved (GET) adheres to the expected structure and data types.
By following these debugging steps and reviewing the log messages, you can effectively troubleshoot any issues in both client.js and server.js.