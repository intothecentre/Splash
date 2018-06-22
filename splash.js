const {log} = require("./log4js");
const config = require("./Config.json");
const date = require('date-and-time');
const psList = require('ps-list');
const psNode = require('ps-node');
const includes = require('array-includes');
const process = require('process');
const Promise = require('promise');
const toLower = require('to-lower');
const split = require('split-string');
const fileExtension = require('file-extension'); 
const  { SplashDataAccess } = require("./SplashDataAccess.js");
const  { Helper } = require("./Helper.js");
const { PlaySchedule } = require("./PlaySchedule.js");
var fs = require('fs');

let now = new Date();
var UpdatesDir = config.UpdatesFolder;
var MediaDir = config.MediaFolder;
var WorkingDir = config.WorkingFolder;
var TimeToWaitForSchedulerWhenNothingOnDisplay = Number(config.TimeToWaitForSchedulerWhenNothingOnDisplay);

//start program
log.info("Begin - Starting Splash Scheduler - Version 2.0");

//stop existing instances
log.info("Begin - Stop existing instances ");

//Check more than one instance running at a time
CheckingInstances().then(() => {
    log.info("Digital Signage Version : "+ config.Version+ " Running started at "+ date.format(now, 'YYYY/MM/DD HH:mm:ss') );
    CreateFolders();
    console.log(config.ClientName);
    SplashDataAccess.ShouldUseLocalMedia(config.ClientName).then((uselocalmedia) => {
	var UseLocalMedia = Boolean(uselocalmedia);
	SplashDataAccess.GetScheduleFileAndTime(config.ClientID,UseLocalMedia).then((playschedule) => {
	    console.log(playschedule.FileName);
	    endOfProgram(playschedule);
	}).catch((err) => {
	    log.error("Caught Exception SplashDataAccess.GetScheduleFileAndTime(): " + err.message);
	});
    }).catch((err) => {
	log.error("Caught Exception SplashDataAccess.ShouldUseLocalMedia(config.ClientName): " + err.message);
    });
    
}).catch((err) => {
    log.error("Couldnt access local media: " + err.message);
});

//function to check instances
function CheckingInstances(){
    return new Promise((resolve, reject) => {
	//Step1
   	psList().then(data => {
	    //Step2
	    psNode.lookup({ pid: process.pid }, function(err, resultList ) {
		if (err) {
		    throw new Error( err );
		}
		
		var CurrentProcess = resultList[ 0 ];
		
		/*	if( process ){
			
			console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', CurrentProcess.pid, CurrentProcess.command, CurrentProcess.arguments );
			}
			else {
			console.log( 'No such process found!' );
			}*/
		
		//Step3
		data.forEach((d) => {
		    if(d.cmd==CurrentProcess.command+' '+CurrentProcess.arguments)
		    {
			//	console.log(process.pid +' ' +d.pid);
			if(process.pid!=d.pid)
			{
			    console.log('Application already running. Only one instance of this application is allowed');
			    reject(new Error('Application already running. Only one instance of this application is allowed'));
			    process.exit(0);
			}
			else
			{
			    resolve(true);
			}	
		    }	    
		});//data.Foreach
	    });//end of Ps-lookup
	});// End of PS list
    });//Promise ends
}//CheckingInstance function ends here.

//Functions to Create Folders
function CreateFolders(){
    log.info("In Create Folders");
    try
    {
	if (!fs.existsSync(WorkingDir)){
	    fs.mkdirSync(WorkingDir);
	    console.log('Working Directory created');
	}
	
	if (!fs.existsSync(MediaDir)){
	    fs.mkdirSync(MediaDir);
	    console.log('Media Directory created');
	}
	
	if (!fs.existsSync(UpdatesDir)){
	    fs.mkdirSync(UpdatesDir);
	    console.log('Updates Directory created');
	}
	
    }
    catch (e)
    {
	log.Error("Exception in Create folders", e);
    }
}//End of function  CreateFolder();

function ValidExtensions(){
    var ValidExtensions = config.ValidExtenstions;
    var validExtensions = ValidExtensions.split(",");
    return validExtensions ;
}// End of ValidExtensions();


function IsValidFileType(FileExt){
    var Extensions = ValidExtensions();
    return Extensions.includes(""+FileExt+"");
}//End of function IsValidFileType(FileExt);


function endOfProgram(ps){
    while(true)
    {
	var HasSchedule;
	if(ps=="NONE")
	    HasSchedule=false;
	else
	    HasSchedule=true;
	//console.log(HasSchedule);
	if (HasSchedule)
	{
	    
	    var FileExt = "."+toLower(fileExtension(ps.FileName));
	    var IsValidExtension = IsValidFileType(FileExt);
	     if (!IsValidExtension)
                        {
                            console.log("Invalid File Extension Detected .....Cannot run file");
                            HasScheduele = false;
                        }
                        else
                        {
                            ps.Type = Helper.GetEventFileType(FileExt);
			} 
        }//End of if(HasSchedule)
  	if (!HasSchedule)
                    {
                        //console.log("Starting Schedule for File: "+ ps.FileName+ at "+DateTime.Now );
                        //StartSchedule(ps);
                       // console.log("Completed Schedule for File: "+ ps.FileName+ at "+DateTime.Now );
                    }//End of if(HasSchedule)
	else
	{
	    SplashDataAccess.GetNextScheduledEventTime(config.ClientID).then((NextScheduleTime) => {
		  console.log("1");
	}).catch((err) => {
	    log.error("Caught Exception  SplashDataAccess.GetNextScheduledEventTime(config.NodeID): " + err.message);
	});
	}//End of Else
    }// End of While Loop
}//End of EndOfPrograms

