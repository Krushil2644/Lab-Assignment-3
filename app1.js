const express = require('express');  
const app = express();  

// Home route that displays group names in HTML
app.get('/', (req, res) => {  
    res.send('<h1>Group Members</h1><ul><li>Alice</li><li>Bob</li><li>Charlie</li></ul>');  
});  

// Start the server
const PORT = 3000;  
app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
});
