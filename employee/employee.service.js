const {pool} = require('../config/database.js');
const bcrypt = require("bcrypt");

module.exports={
    getalluser: (data, callback) => {
        console.log("sssssss");
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection: ', err);
                return callback(err, null);
            }

            
            connection.query(`CALL get_emp_details()`, (error, results, fields) => {
                connection.release(); 
                if (error) {
                    console.error('Error executing stored procedure: ', error);
                    return callback(error, null);
                }
                console.log("cccc", results);
                callback(null, results); 
            });
        });
    },
    adduser: (data, callback) => {
        
        console.log("sssssssadd user",data);
        const name = data.name;
        const city = data.city;
        const email = data.email;
        const passwords=data.passwords;


      

        pool.getConnection((err, connection) => {

            bcrypt.hash(passwords, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return;
                }
                console.log('original password:', passwords)
                console.log('Hashed password:', hashedPassword);
    
            


            if (err) {
                console.error('Error getting MySQL connection: ', err);
                return res.status(500).send('Error getting MySQL connection');
            }
    
            connection.query('CALL insert_emp_details(?, ?, ?,?)', [name, city, email,hashedPassword], (error, results, fields) => {
                connection.release(); 
                if (error) {
                    console.error('Error executing stored procedure: ', error);
                    return callback(error, null);
                }
                console.log("cccc", results);
                callback(null, results);
            });
        });
    });
    },
    updateuser: (data, callback) => {
        
        console.log("sssssssadd user",data);
        const id = data.id;
        const name = data.name;
        const city = data.city;
        const email = data.email;
        const passwords=data.passwords;
    
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection: ', err);
                return res.status(500).send('Error getting MySQL connection');
            }
    
            connection.query('CALL update_emp_details(?,?,?,?,?)', [name,city,email,passwords,id], (error, results, fields) => {
                connection.release();
                if (error) {
                    console.error('Error executing stored procedure: ', error);
                    return callback(error, null);
                }
                console.log("cccc", results);
                callback(null, results); 
            });
        });
    },
    deleteuser: (data, callback) => {
        
        console.log("sssssssadd user",data);
        const id = data.id;
    
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection: ', err);
                return res.status(500).send('Error getting MySQL connection');
            }
    
            connection.query('CALL delete_emp_details(?)', [id], (error, results, fields) => {
                connection.release(); // Release the connection back to the pool
                if (error) {
                    console.error('Error executing stored procedure: ', error);
                    return callback(error, null);
                }
                console.log("cccc", results);
                callback(null, results); // Pass the query result to the callback function
            });
        });
    },
    loginvalidate: (data, callback) => {
        console.log("srinivas");
        
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection: ', err);
                return callback(err, null);
            }

            connection.query(`SELECT *
                                FROM emptable
                                JOIN roleassign ON emptable.id=roleassign.user_id 
                                WHERE email="${data.email}"`, (error, results, fields) => {
                connection.release(); 
                if (error) {
                    console.error('Error executing stored login validate: ', error);
                    return callback(error, null);
                }


                if(results.length>0){
                
                bcrypt.compare(data.passwords, results[0].passwords, (err, result) => {
                    if (err) {
                        console.error('Error executing  login validate for compare: ', err);
                        return callback(err, null);
                    }

                    if(result){
                          return  callback(null, results);
                    }
                    else{
                        return  callback("password wrong");
                    }

                });
                }
                else{
                    return  callback("Invalid user");
                }

                
            });
        });
    },
    tokenget:(data,callback)=>{
        console.log(data);
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection: ', err);
                return callback(err, null);
            }

            connection.query(`SELECT emp.name,rt.role
            FROM emptable as emp
            JOIN roleassign as ra ON emp.id=ra.user_id
            JOIN roletable as rt ON ra.userrole_id=rt.id
             WHERE emp.id="${data.id}"`, (error, results, fields) => {
                connection.release(); 
                if (error) {
                    console.error('Error executing stored login validate: ', error);
                    return callback(error, null);
                }
 
                if(results.length>0){
                  return  callback(null, results);
                }
                else{
                    return  callback("Invalid user");
                }

                
            });
        });
    },
    changepassword:(data,callback)=>{
        // console.log(data,"srinivas");
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection: ', err);
                return callback(err, null);
            }
            
            connection.query(`SELECT * 
            FROM emptable 
            WHERE email='${data.email}'`, (error, results, fields) => {

if (error) {
    console.error('Error executing stored login validate: ', error);
    return callback(error, null);
}
// console.log("by getting",results[0].passwords);
if(results.length>0 &&  results[0].passwords != data.passwords){



    connection.query(`INSERT INTO changed_passwords (old_password, new_password,user_id) VALUES ('${results[0].passwords}','${data.passwords}','${results[0].id}')`, (error, results, fields) => {

if (error) {
console.error('Error executing stored login validate: ', error);
return callback(error, null);
}

if(results){
    connection.query(`UPDATE emptable 
    SET passwords='${data.passwords}'
    WHERE email="${data.email}"`, (error, results, fields) => {
connection.release(); 
if (error) {
console.error('Error executing stored login validate: ', error);
return callback(error, null);
}

if(results){
return  callback(null, results);
}
else{
return  callback("Invalid user");
}


});
}
else{
return  callback("Invalid user");
}


});
}
else{
     return callback(error, null);
}


});


      
        });
    },
    forgotpassword:(data,callback)=>{

        pool.getConnection((err,connection)=>{
            if(err){
                return callback(err,null)
            }

            connection.query(`SELECT * FROM emptable WHERE email='${data.email}'`,(err,results)=>{
                if(err){
                    return callback(err,null)
                }

                if(results.length>0){
                    
                    const passwords=data.passwords;

                    bcrypt.hash(passwords, 10, (err, hashedPassword) => {
                        if (err) {
                            console.error('Error hashing password:', err);
                            return;
                        }

                        connection.query(`UPDATE emptable SET passwords='${hashedPassword}' WHERE email='${data.email}'`,(err,results)=>{
                            if(err){
                                return callback(err,null)
                            }
                            if(results){
                                return  callback(null, results);
                            }
    
                            else{
                                return  callback("Invalid user");
                            }
    
                        })


                    });


                


                }

                else{
                    return  callback("Invalid user");
                }

            })
        })
    }

}





