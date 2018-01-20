var Cron = require('cron').CronJob;

new Cron('* * * * * *',function(){
    console.log("Привет");
});