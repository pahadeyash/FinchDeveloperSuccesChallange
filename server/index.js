// Import necessary modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

// Set up middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Initialize a local variable to store the access token
app.locals.access_token = "";

// Define a route for creating an access token
app.get('/create', async (req, res) => {
    try {
        // Define the data to send in the POST request
        const data = {
            'provider_id': req.query.provider_id,
            'products': ['company', 'directory', 'individual', 'employment']
        };
        
        // Make a POST request to create an access token
        const response = await axios.post("https://sandbox.tryfinch.com/api/sandbox/create", data);
        
        // Store the access token locally for future use
        app.locals.access_token = response.data.access_token;
        
        // Respond with a success status code
        res.sendStatus(200);
    } catch (error) {
        // Handle errors and provide an informative error message
        console.error('Error creating access token:', error.message);
        res.status(500).json({ error: 'Failed to create access token' });
    }
});

// Define a route for fetching company information
app.get('/company', async (req, res) => {
    try {
        // Make a GET request to fetch company information with the access token
        const response = await axios.get("https://sandbox.tryfinch.com/api/employer/company", {
            headers: {
                'Authorization': `Bearer ${app.locals.access_token}`,
                'Finch-API-Version': '2020-09-17'
            }
        });
        
        // Respond with the fetched company data
        res.json(response.data);
    } catch (error) {
        // Handle errors and provide an informative error message
        console.error('Error fetching company information:', error.message);
        res.status(500).json({ error: 'Failed to fetch company information' });
    }
});

// Define a route for fetching directory information
app.get('/directory', async (req, res) => {
    try {
        // Make a GET request to fetch directory information with the access token
        const response = await axios.get("https://sandbox.tryfinch.com/api/employer/directory", {
            headers: {
                'Authorization': `Bearer ${app.locals.access_token}`,
                'Finch-API-Version': '2020-09-17'
            }
        });
        
        // Respond with the fetched directory data
        res.json(response.data.individuals);
    } catch (error) {
        // Handle errors and provide an informative error message
        console.error('Error fetching directory information:', error.message);
        res.status(500).json({ error: 'Failed to fetch directory information' });
    }
});

// Define a route for fetching employment information
app.post('/employment', async (req, res) => {
    try {
        // Make a POST request to fetch employment information with the access token and request body
        const response = await axios.post("https://sandbox.tryfinch.com/api/employer/employment", req.body, {
            headers: {
                'Authorization': `Bearer ${app.locals.access_token}`,
                'Finch-API-Version': '2020-09-17'
            }
        });
        
        // Respond with the fetched employment data
        res.json(response.data.responses[0].body);
    } catch (error) {
        // Handle errors and provide an informative error message
        console.error('Error fetching employment information:', error.message);
        res.status(500).json({ error: 'Failed to fetch employment information' });
    }
});

// Define a route for fetching individual information
app.post('/individual', async (req, res) => {
    try {
        // Make a POST request to fetch individual information with the access token and request body
        const response = await axios.post("https://sandbox.tryfinch.com/api/employer/individual", req.body, {
            headers: {
                'Authorization': `Bearer ${app.locals.access_token}`,
                'Finch-API-Version': '2020-09-17'
            }
        });
        
        // Respond with the fetched individual data
        res.json(response.data.responses[0].body);
    } catch (error) {
        // Handle errors and provide an informative error message
        console.error('Error fetching individual information:', error.message);
        res.status(500).json({ error: 'Failed to fetch individual information' });
    }
});

// Start the server and listen on port 8000
app.listen(8000, () => {
    console.log("Server has started on port 8000");
});
