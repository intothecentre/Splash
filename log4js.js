const log4js = require('log4js');

// log4js configuration
/*log4js.configure({
    appenders: {
        OdXel: {
            type: 'file', filename: '/home/pi/Splash/Splash-logs.txt', maxLogSize: 512 * 1024, numBackups: 10,
            layout: { type: 'pattern', pattern: '[%z] [%d] [%p] %c - %m' }
        },
        Output: { 
            type: 'stdout' 
        },
    },
    categories: { 
        default: { appenders: ['Splash', 'Output'], level: 'debug' } 
    }
});

var log = log4js.getLogger('Splash');
*/
var log=log4js.getLogger();
log.level='debug';
module.exports = { log };