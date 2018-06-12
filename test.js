const psList = require('ps-list');
const ps = require('ps-node');






//Step1
psList().then(data => {
    // console.log(data);
    /*Step2*/ ps.lookup({
	command: 'node',
	// arguments: '--debug',
    }, function(err, resultList ) {
	if (err) {
            throw new Error( err );
	}
	
	resultList.forEach(function( process ){
            if( process ){
		
		console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s ', process.pid, process.command, process.arguments );
		
            }
	data.forEach((d) => {
	    console.log(process.pid+ '  ' + d.pid );
	    if(d.pid==process.pid)
		console.log(d.name);
	
	/*Step3*/  data.forEach((d) => {
	    if(d.name==process.command)
	    {
		if(process.pid!=d.pid)
		    console.log('Already Running');
		else
		{
		    console.log('Welcome');
		    while(true)
		    {
		//	console.log('1');
		    }
		}
	    }
	});
	});
	});
    });
});

