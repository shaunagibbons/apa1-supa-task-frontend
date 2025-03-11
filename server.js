// server.js
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

    // Call the Supabase Edge Function for messages
    const response = await fetch(`${SUPABASE_URL}/functions/v1/fish`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// New POST endpoint to add fish
app.post('/api/fish', async (req, res) => {
  try {
    const { Name, Sell, Shadow, Where } = req.body;

    console.log("Called POST Endpoint: ", req.body)

    // Validate input
    if (!Name || !Sell || !Shadow || !Where) {
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
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ message: 'Fish added successfully!', fish: data });

  } catch (error) {
    console.error('POST /api/add_fish error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/fish", async (req, res) => {
  try {
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
      return res.status(response.status).json({ error: data.error });
    }

    res.json(data);
  } catch (error) {
    console.error("Error updating fish:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/fish", async (req, res) => {
  try {
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
      return res.status(response.status).json({ error: data.error });
    }

    res.json(data);
  } catch (error) {
    console.error("Error deleting fish:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});