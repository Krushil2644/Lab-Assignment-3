const express = require('express');  
const fs = require('fs');  
const app = express();  

// Route to display JSON content
app.get('/employees', (req, res) => {  
    fs.readFile('./data/data.json', (err, data) => {  
        if (err) {  
            res.status(500).send('Error reading file');  
        } else {  
            res.setHeader('Content-Type', 'application/json');  
            res.send(data);  
        }  
    });  
});  

const PORT = 3000;  
app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
});