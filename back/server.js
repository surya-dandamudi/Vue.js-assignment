const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.put('/update-cars', (req, res) => {
    const updatedCars = req.body;

    
    const jsonFilePath = path.join(__dirname, '..', 'front', 'src', 'components', 'cars.json');

    fs.writeFile(jsonFilePath, JSON.stringify(updatedCars, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Failed to update file.');
        }
        res.send('File updated successfully.');
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
