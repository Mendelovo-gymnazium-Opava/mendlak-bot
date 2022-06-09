const Discord = require("discord.js"); //The official discord.js codebase


const MB = require("./MB/mendlakbot.js"); //Bot command code. For organising. MB stands for MendlakBot
const EM = require("./MB/extramath.js"); //Additional math not included in standard node or js. EM stands for ExtraMath
const fs = require('fs'); //Filesystem functionality

//Init code

console.time('init time'); //Times init code


    const client = new Discord.Client({intents: ["GUILDS","GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_BANS"]}); //Sets client and its intents
    const token = fs.readFileSync("./token.txt", "utf-8"); //Gets token from token.txt file
    try {

        client.login(token) //Logs client into discord.
        delete token; //Memory cleanup is important!
    } catch (error) {
        console.error("Error 001: Could not log in client.")
        console.error(error);
        process.exit(001);
    }



    const prefix = ','; //Sets prefix (Remember to maybe set this to a config?)

    try {
        client.on('ready', () =>{   //If the login was succesful, sets up bot
            client.user.setStatus('online');    //Sets bot to appear as online
            client.user.setActivity(prefix + "help");   //Sets status of said bot. This is the default command of it


            xpset = new Set();  //Generates Set() object for checking whether user received xp.

        })
    } catch (error) {
        console.error("Error 002: Could not initialize client.")
        console.error(error);
        process.exit(001);
    }    
    
    //Function init
    function clearXpSet(){
        xpset.clear();
        console.log("xpset cleared!");
    }
    setInterval(clearXpSet,60000); //Resets the set every minute
//Finishes timing init code
console.log("Initialization complete")  
console.timeEnd('init time');

//End of init code




//Message processing code
try {

    client.on('messageCreate', msg => {

        uid = msg.author.id;
        let args = msg.content.substring(1).split(" "); //Splits message into managable substrings
        //Command message processing code
        if(msg.content.startsWith(prefix)){
            
            switch(args[0]){
    
                case "level":   //Shows level data and progress to next level
                    const xpData = MB.getXPData(uid);
    
    
                    msg.channel.send(xpData + "xp");
                break;
    
                case "help":
                    msg.channel.send({embeds: [MB.generateHelp(0,0)]})
                break;
    
            }
    
            
    
        }
        //End of command message processing code
    
        if (!xpset.has(uid)){
            MB.addRandomXP(uid); //Adds random xp for message
            xpset.add(uid); //Adds id to xpset
        }
    
    })

} catch (error) {
    console.warn(error);
}