const Discord = require('discord.js'); //The official discord.js codebase
const EM = require('./extramath.js'); //Additional math not included in standard node or js. EM stands for ExtraMath
const fs = require('fs'); //Filesystem functionality


//XP system code

exports.addRandomXP = addRandomXP;

function addRandomXP(id){   //Adds xp to user
    filelocation = "userdata/" + id + ".json";
    if(!fs.existsSync(filelocation) && (id != 982556482258231296)){ //User has no file.
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
    else if(id != 982556482258231296){  //User has file
        //Parse the file
        udata = JSON.parse(fs.readFileSync(filelocation));

        //Update xp data into file
        udata.xp += EM.getRandomInt(0,25);
        fs.writeFileSync(filelocation,JSON.stringify(udata, null, "\t"));

        delete udata;
    }
    delete filelocation;
}

exports.getXPData = getXPData;

function getXPData(id){ //Gets xp from user
    filelocation = "userdata/" + id + ".json";
    udata = JSON.parse(fs.readFileSync(filelocation));

    return udata.xp;

    delete filelocation;
    delete udata;
}



//End of XP system code

//Help command code

exports.generateHelp = generateHelp;

function generateHelp(msg, args) {
    const defaultHelpEmbed = new Discord.MessageEmbed()
        .setColor('#739122')
        .setTitle('Pomoc s příkazy')
        .setURL('https://github.com/Mendelovo-gymnazium-Opava/mendlak-bot')
        .setThumbnail('https://avatars.githubusercontent.com/u/104827093?s=400&u=65f2b98c5ceacc665282875624cb184bc9a79b4a&v=4')
        .addField('level','Poskytne úroveň a ukáže postup na další úroveň', true);
    
    return defaultHelpEmbed;
}