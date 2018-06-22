class PlaySchedule{

 /*   constructor(pEventID, pEventName, pNodeID, pStartTime, pStopTime, pFileName,pDontCopyToDB,pDayOfWeek,pAppliesToDOW){
        this.EventID =pEventID ;
        this.NodeID = pNodeID;
        this.StartTime = pStartTime;
        this.StopTime = pStopTime;
        this.FileName = pFileName;
	this.DontCopyToDB = pDontCopyToDB;
	this.DayOfWeek = pDayOfWeek;
	this.AppliesToDOW = pAppliesToDOW;
    }
*/
constructor(pObject){
        this.StartTime = pObject.StartTime;
        this.StopTime = pObject.StopTime;
        this.FileName = pObject.FileName;
	
    }

}

module.exports = {PlaySchedule};
