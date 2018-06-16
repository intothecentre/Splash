
const config = require('./Config.json');
const {log} = require("./log4js");
const Promise = require('promise');


const connection = {
    user: config.DBUser,
    password: config.DBPassword,
    server: config.Server,
    database: config.Database,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}



/* var express = require('express');

 var sql = require('mssql');

 var http = require('http');
 var app = express();

 var port = process.env.PORT || 8000;

var connection = new sql.Connection(connect, function(err) {
var request = new sql.Request(connect); 
request.query('select * from Users', function(err, recordset) {
   if(err)      // ... error checks 
        console.log('Database connection error');

console.dir("User Data: "+recordset);
});
 });



module.exports = { connection};*/












/*var connection = new Connection(conn);
connection.on('connect', function(err) {
    // If no error, then good to go...
    //executeStatement();
    console.log('done');
    // Read all rows from table
    request = new Request(
    'select * from Events;',
    function(err, rowCount, rows) {
    if (err) {
	console.log(err);
    } else {
        console.log(rowCount + ' row(s) returned');
      }
    });

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    // Execute SQL statement
    connection.execSql(request);
    }
);*/



/*poolAccess().then((pool) => {
    module.exports = { pool };
}).catch((err) => {
    log.error(": " + err.message);
});

function poolAccess(){
    return new Promise((resolve, reject) => {
	const pool = new mssql.ConnectionPool(connection, err => {
	    
	    if(err) {
		console.log("Error: " + err);
		reject(new Error('Application already running. Only one instance of this application is allowed'));
	    } else {
		console.log('Connected to Database');
		resolve(pool);
	    }
	})

    });
}
 */
module.exports = { connection};
