const {log} = require("../log4js");
const config = require("../Config.json");

log.info("In Create Folders");
var UpdatesDir = config.UpdatesFolder;
var MediaDir = config.MediaFolder;
var WorkingDir = config.WorkingFolder;
var mkdirp = require('mkdirp');
 
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
