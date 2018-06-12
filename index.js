const {log} = require("./log4js");
const config = require("./Config.json");

var UseLocalMedia = false;
var WorkingDir = "";
var MediaDir = "";
var ClientName = config.ClientName;
var NodeID = config.ClientID;
var BufferSize = config.BufferSize;

//start program
log.info("Begin - Starting Splash Scheduler - Version 2.0");

//stop existing instances
log.info("Begin - Stop existing instances: " + ClientName);

