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
