const {log} = require("./log4js");
const config = require("./Config.json");
const date = require('date-and-time');
const psList = require('ps-list');
const psNode = require('ps-node');
const process = require('process');
const Promise = require('promise');
const  { SplashDataAccess } = require("./SplashDataAccess.js");
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
	endOfProgram(); 
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


function endOfProgram(){
    while(true)
    {
  	//End of the program
    }
}

