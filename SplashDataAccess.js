const {log} = require("./log4js");
const config = require("./Config.json");
const sql = require('mssql');
const{connection} = require('./db.js');

class SplashDataAccess{
    static ShouldUseLocalMedia(ClientName)
    {
	return new Promise((resolve, reject) => {
	    var conn = new String();
	    sql.connect(connection).then(pool => {
		conn = pool;
		return pool.request()
		    .input('NodeName', sql.NVarChar, ClientName)
		    .execute('GetNodeSettings')
	    }).then(result => {
		resolve(result.recordset[0].UseLocalMedia);
		console.log(result.recordset[0].UseLocalMedia)
		conn.close();
	    }).catch(err => {
		// ... error checks
		reject(new Error('Error while retrieving ShouldUseLocalMedia(ClientName)'))
		console.log('Error while retrieving ShouldUseLocalMedia(ClientName): '+ err);
	    })
		sql.on('error', err => {
		    // ... error handler
		    reject(new Error('Error while retrieving ShouldUseLocalMedia(ClientName)'))
		    console.log('Error while retrieving ShouldUseLocalMedia(ClientName): '+ err);
		})
	});
    }//End of static ShouldUseLocalMedia
    
}//End of class SplashDataAccess
module.exports = { SplashDataAccess };
