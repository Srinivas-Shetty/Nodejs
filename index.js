const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/database');

const employee=require('./employee/employee.router.js');

dotenv.config();

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/employee',employee);
app.use('/employee',employee);
app.use('/employee',employee);


// app.get('/', (req, res) => {
//     // Call the stored procedure

//     db.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error getting MySQL connection: ', err);
//             return res.status(500).send('Error getting MySQL connection');
//         }

//         connection.query('CALL get_emp_details()', (error, results, fields) => {
//             if (error) {
//                 console.error('Error executing stored procedure: ', error);
//                 return res.status(500).send('Error executing stored procedure');
//             }
//             res.json(results); // Send the results of the stored procedure as JSON response
//         });
//     });
// });

// app.post('/insert', (req, res) => {
//     // Call the stored procedure

//     const name = req.body.name;
//     const city = req.body.city;
//     const email = req.body.email;

//     db.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error getting MySQL connection: ', err);
//             return res.status(500).send('Error getting MySQL connection');
//         }

//         connection.query('CALL insert_emp_details(?, ?, ?)', [name, city, email], (error, results, fields) => {
//             if (error) {
//                 console.error('Error executing stored procedure: ', error);
//                 return res.status(500).send('Error executing stored procedure');
//             }
//             res.json(results); // Send the results of the stored procedure as JSON response
//         });
//     });
// });

// app.put('/update', (req, res) => {
//     // Call the stored procedure
//     const id=req.body.id;
//     const name = req.body.name;
//     const city = req.body.city;
//     const email = req.body.email;

//     db.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error getting MySQL connection: ', err);
//             return res.status(500).send('Error getting MySQL connection');
//         }

//         connection.query('CALL update_emp_details(?, ?, ?,?)', [name, city, email,id], (error, results, fields) => {
//             if (error) {
//                 console.error('Error executing stored procedure: ', error);
//                 return res.status(500).send('Error executing stored procedure');
//             }
//             res.json(results); // Send the results of the stored procedure as JSON response
//         });
//     });
// });

// Start the server

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
