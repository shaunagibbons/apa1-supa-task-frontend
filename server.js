const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// New GET endpoint
app.get('/api/fish', async (req, res) => {
  try {
    console.log('GET /api/fish called'); // Debugging: Log when endpoint is accessed

    // Call the Supabase Edge Function for messages
    const response = await fetch(`${SUPABASE_URL}/functions/v1/fish`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (!response.ok) {
      console.error(`Supabase returned ${response.status}: ${response.statusText}`); // Debugging: Log API response errors
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Fetched fish data:', data); // Debugging: Log retrieved data
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error); // Debugging: Log any caught errors
    res.status(500).json({ error: error.message });
  }
});

// New POST endpoint to add fish
app.post('/api/fish', async (req, res) => {
  try {
    console.log("POST /api/fish called with body:", req.body); // Debugging: Log request payload

    const { Name, Sell, Shadow, Where } = req.body;

    // Validate input
    if (!Name || !Sell || !Shadow || !Where) {
      console.warn("POST request missing required fields:", req.body); // Debugging: Warn if missing fields
      return res.status(400).json({ error: 'Missing required fish fields' });
    }

    // Call the Supabase function to add fish
    const response = await fetch(`${SUPABASE_URL}/functions/v1/fish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Name, Sell, Shadow, Where })
    });

    if (!response.ok) {
      console.error(`Supabase returned ${response.status}: ${response.statusText}`); // Debugging: Log API response errors
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fish added successfully:", data); // Debugging: Log successful addition
    res.json({ message: 'Fish added successfully!', fish: data });

  } catch (error) {
    console.error('POST /api/fish error:', error); // Debugging: Log errors
    res.status(500).json({ error: error.message });
  }
});

// PUT endpoint to update fish
app.put("/api/fish", async (req, res) => {
  try {
    console.log("PUT /api/fish called with body:", req.body); // Debugging: Log request payload

    const response = await fetch(`${SUPABASE_URL}/functions/v1/fish`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error updating fish:", data.error); // Debugging: Log API response errors
      return res.status(response.status).json({ error: data.error });
    }

    console.log("Fish updated successfully:", data); // Debugging: Log successful update
    res.json(data);
  } catch (error) {
    console.error("Error updating fish:", error); // Debugging: Log errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE endpoint to remove fish
app.delete("/api/fish", async (req, res) => {
  try {
    console.log("DELETE /api/fish called with body:", req.body); // Debugging: Log request payload

    const response = await fetch(`${SUPABASE_URL}/functions/v1/fish`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error deleting fish:", data.error); // Debugging: Log API response errors
      return res.status(response.status).json({ error: data.error });
    }

    console.log("Fish deleted successfully:", data); // Debugging: Log successful deletion
    res.json(data);
  } catch (error) {
    console.error("Error deleting fish:", error); // Debugging: Log errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`); // Log when server starts
});
