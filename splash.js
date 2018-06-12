const {log} = require("./log4js");
const config = require("./Config.json");
const date = require('date-and-time');
const mkdirp = require('mkdirp');

let now = new Date();
var UpdatesDir = config.UpdatesFolder;
var MediaDir = config.MediaFolder;
var WorkingDir = config.WorkingFolder;
var TimeToWaitForSchedulerWhenNothingOnDisplay = Number(config.TimeToWaitForSchedulerWhenNothingOnDisplay);

log.info("Digital Signage Version : "+ config.Version+ " Running started at "+ date.format(now, 'YYYY/MM/DD HH:mm:ss') );

CreateFolder();

var UseLocalMedia = Boolean(ShouldUseLocalMedia(config.ClientName) );

while(true){
    try{
	log.info("In while Loop");

    }
    catch(e){
	 log.Error("Exception in While loop", e)
    }
}//End of While loop;
function CreateFolder(){
    log.info("In Create Folders");
try
{
    mkdirp(WorkingDir, function (err)
           {
               // Try to create the directory.
	       if (err) console.error(err)
	       else console.log('Created folder')
           });
           mkdirp(MediaDir, function (err)
                  {
                      // Try to create the directory.
		      if (err) console.error(err)
		      else console.log('Created folder')
                  });
                  mkdirp(MediaDir, function (err)
			 {
			     // Try to create the directory.
			     if (err) console.error(err)
			     else console.log('Created folder')
			 });
			}
			 catch (e)
		  {
		      log.Error("Exception in Create folders", e);
		  }
}//End of function  CreateFolder();

function  ShouldUseLocalMedia(ClientName)
{
    




}//End of the function ShouldUseLocalMedia();
