const psList = require('ps-list');
const ps = require('ps-node');
const process = require('process');





//Step1
psList().then(data => {
    // console.log(data);
    data.forEach((d) => {
	// console.log(d);
    });
    //Step2
    ps.lookup({ pid: process.pid }, function(err, resultList ) {
	if (err) {
            throw new Error( err );
	}
	
	var CurrentProcess = resultList[ 0 ];
	
	if( process ){
	    
            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', CurrentProcess.pid, CurrentProcess.command, CurrentProcess.arguments );
	}
	else {
            console.log( 'No such process found!' );
	}
	
	//Step3
	data.forEach((d) => {
	    //console.log(d.cmd +' '+process.command+' '+process.arguments)
	    if(d.cmd==CurrentProcess.command+' '+CurrentProcess.arguments)
	    {
		console.log(process.pid +' ' +d.pid);
		if(process.pid!=d.pid)
		{
		    console.log('Already Running');
		    process.exit(0);
		}
		else
		{
		    console.log('Welcome');
		    while(true)
		    {
			//	console.log('1');
		    }
		}	
	    }	    
	});//data.Foreach1
    });//end of Ps-lookup
});// End of PS list

