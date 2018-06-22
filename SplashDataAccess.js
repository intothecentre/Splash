const {log} = require("./log4js");
const config = require("./Config.json");
const date = require('date-and-time');
const sql = require('mssql');
const{connection} = require('./db.js');
var dateFormat = require('dateformat');


//let time = new Date();
//date.format(time, 'h:m A');
let now = new Date();

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
    
    
    
    static /* PlaySchedule*/ GetScheduleFileAndTime(NodeID,UseLocalMedia)
    {
	var FileName;
	var PlaySource = "";
        var Dt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        var timeNow = dateFormat(now,'mediumTime');//to do -1 to minute
        var DayOfTheWeek =dateFormat(now,'dddd');
        //var timeNow =date.addMinutes(time, -1);
        var IntDayOfWeek = dateFormat(now,"N");
	console.log(IntDayOfWeek);
        console.log("Looking for Schedules from: " + timeNow+" for Day: "+ DayOfTheWeek);
	return new Promise((resolve, reject) => {
	    var conn = new String();
	    var conn1 = new String();
	    sql.close();
	    sql.connect(connection).then(pool => {
		
		//Making a sql call for scheduled events
		conn = pool;
		return pool.request()
		    .input('NodeID', sql.Int, config.ClientID)
		    .query("SELECT [StartTime], [StopTime], [FileName] From [SchEvents] WHERE [StopTime] >= '" + timeNow + "'" + " AND " + "[StartTime] <= '" + timeNow + "'" + " AND " + "[NodeID] = " + NodeID + " AND " + "[DayOfWeek] = " + IntDayOfWeek)
	    }).then(result => {
		resolve(result.recordset[0]);
		FileName =result.recordset[0].FileName;
		//resolve(result);
		//  console.log(FileName);
		

		
		
		if(!UseLocalMedia)
		{
		    
		    //making a sql call fot NodeData
		    sql.close();
		    sql.connect(connection).then(pool1 => {
			conn1 = pool1;
			return pool1.request()
			    .input('NodeID', sql.Int, config.ClientID)
			    .input('FileName', sql.NVarChar,FileName) 
			    .query("select [Type],[Data] from [NodeData]" + " where [FileName]=@FileName AND NodeID=@NodeID")
		    }
						).then(result1 => {
						    console.log(result1);
						    resolve(result1);
						    
						    conn1.close();
						    
						}).catch(err => {
							// ... error checks
						    reject(new Error('Error while retrieving GetScheduleFileAndTime()'))
						    console.log('Error while retrieving GetScheduleFileAndTime(): '+ err);
						})
						    sql.on('error', err => {
							// ... error handler
							reject(new Error('Error while retrieving GetScheduleFileAndTime()'))
							console.log('Error while retrieving GetScheduleFileAndTime(): '+ err);
						    })
		}
		else
		    console.log(1);
		conn.close();
	    }).catch(err => {
		// ... error checks
		reject(new Error('Error while retrieving GetScheduleFileAndTime()'))
		console.log('Error while retrieving GetScheduleFileAndTime(): '+ err);
	    })
		sql.on('error', err => {
		    // ... error handler
		    reject(new Error('Error while retrieving GetScheduleFileAndTime()'))
		    console.log('Error while retrieving GetScheduleFileAndTime(): '+ err);
		});
	});
    }//End of GetScheduleFileAndTime()
    
    static GetNextScheduledEventTime(NodeID){
	var Dt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        var timeNow = dateFormat(now,'mediumTime');//to do -1 to minute
	var DayOfTheWeek =dateFormat(now,'dddd');
        //var timeNow =date.addMinutes(time, -1);
        var IntDayOfWeek = dateFormat(now,"N");
//	console.log("Looking for Next Schedules from: "+timeNow+"to: "+DayOfTheWeek);

	return new Promise((resolve, reject) => {
	    var conn = new String();
	    sql.close();
	    sql.conn = pool;
		return pool.request()
		    .input('NodeID', sql.Int, config.ClientID)
		    .query("SELECT TOP (1) [StartTime] From [SchEvents] WHERE [StartTime] >= '" + timeNow + "'" + " AND " + "[NodeID] = " + NodeID + " AND " + "[DayOfWeek] = " + IntDayOfWeek + " ORDER BY [StartTime] ASC")
	    }).then(result => {
		resolve(result);
		console.log(result);
		conn.close();
	    }).catch(err => {
		// ... error checks
		reject(new Error('Error while retrieving GetNextScheduledEventTime(NodeID)'))
		console.log('Error while retrieving GetNextScheduledEventTime(NodeID): '+ err);
	    })
		sql.on('error', err => {
		    // ... error handler
		    reject(new Error('Error while retrieving GetNextScheduledEventTime(NodeID)'))
		    console.log('Error while retrieving GetNextScheduledEventTime(NodeID): '+ err);
		})
	});
}//End of GetNextScheduledEventTime(NodeID)
    
}//End of class SplashDataAccess

module.exports = { SplashDataAccess };
