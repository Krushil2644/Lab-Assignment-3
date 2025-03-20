const express = require('express');  
const fs = require('fs');  
const app = express();  

app.use(express.json()); // Middleware to parse JSON requests

const filePath = './data/data.json';

// Read Data
app.get('/employees', (req, res) => {  
    fs.readFile(filePath, (err, data) => {  
        if (err) return res.status(500).send('Error reading file');  
        res.json(JSON.parse(data));  
    });  
});

// Create Data (POST)
app.post('/employees', (req, res) => {  
    fs.readFile(filePath, (err, data) => {  
        if (err) return res.status(500).send('Error reading file');  
        
        let employees = JSON.parse(data);  
        const newEmployee = req.body;  
        employees.push(newEmployee);  

        fs.writeFile(filePath, JSON.stringify(employees, null, 2), (err) => {  
            if (err) return res.status(500).send('Error writing file');  
            res.status(201).send('Employee added');  
        });  
    });  
});

// Update Data (PUT)
app.put('/employees/:id', (req, res) => {  
    fs.readFile(filePath, (err, data) => {  
        if (err) return res.status(500).send('Error reading file');  

        let employees = JSON.parse(data);  
        let empIndex = employees.findIndex(e => e.id == req.params.id);  

        if (empIndex === -1) return res.status(404).send('Employee not found');  

        employees[empIndex] = { ...employees[empIndex], ...req.body };  

        fs.writeFile(filePath, JSON.stringify(employees, null, 2), (err) => {  
            if (err) return res.status(500).send('Error writing file');  
            res.send('Employee updated');  
        });  
    });  
});

// Delete Data (DELETE)
app.delete('/employees/:id', (req, res) => {  
    fs.readFile(filePath, (err, data) => {  
        if (err) return res.status(500).send('Error reading file');  

        let employees = JSON.parse(data);  
        employees = employees.filter(e => e.id != req.params.id);  

        fs.writeFile(filePath, JSON.stringify(employees, null, 2), (err) => {  
            if (err) return res.status(500).send('Error writing file');  
            res.send('Employee deleted');  
        });  
    });  
});

const PORT = 3000;  
app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
});