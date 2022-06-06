const Discord = require('discord.js'); //The official discord.js codebase
const EM = require('./extramath.js'); //Additional math not included in standard node or js. EM stands for ExtraMath
const fs = require('fs'); //Filesystem functionality


//XP system code

exports.addRandomXP = addRandomXP;

function addRandomXP(id){
    filelocation = "userdata/" + id + ".json";
    if(!fs.existsSync(filelocation)){ //User has no file
        console.log("no file attached to userid " + id + ", generating new one");

        data = {xp:0}; //Default data
        
        fs.writeFileSync(
            filelocation
            ,JSON.stringify(data, null, "\t")
            ,function(err,data){if(err) console.error("Error 003: Could not save user data. \n"); console.error(err);}
            ); //Saves the file. Note to self: Why did I make this so long

        delete data;
        addRandomXP(id); //That's one level of recursion more than I would like (1)
       }
    else {
        //Parse the file
        ufile = fs.readFileSync(filelocation);
        udata = JSON.parse(ufile);

        //Update xp data into file
        udata.xp += EM.getRandomInt(0,10);
        fs.writeFileSync(filelocation,JSON.stringify(udata, null, "\t"));

        delete ufile;
        delete udata;
    }
    delete filelocation;
}



//End of XP system code