const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require('ms')
var Scrambo = require('scrambo');
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const request = require('request')
const PREFIX = '!'
var threebythree = new Scrambo(); // Defaults to 3x3
 // Returns 5 scrambles
var memberPoints = new Array();

var knockknock = require('knock-knock-jokes');


var bot = new Discord.Client();
bot.on("ready", async () => {
    console.log('${bot.user.username} is online!');
    bot.user.setActivity("Everyone Chat! !commands",{type: "WATCHING"});

});

bot.on("guildMemberAdd", member=>{
    console.log("Member added");
    //console.log(member);
    var unverfiedRole = member.guild.roles.find('name','unverified');
    //console.log(member.roles.name);
    member.addRole(unverfiedRole);
});




bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice[0];

    console.log("Received message: " + message);
    if (message.content.toLowerCase().includes("fuck") || message.content.toLowerCase().includes("bitch") || message.content.toLowerCase().includes("ass") || 
        message.content.toLowerCase().includes("shit") || message.content.toLowerCase().includes("wtf") || message.content.toLowerCase().includes("niger") ||
        message.content.toLowerCase().includes("sex") || message.content.toLowerCase().includes("penis") || message.content.toLowerCase().includes("anus") ||
        message.content.toLowerCase().includes("subbot") ||message.content.toLowerCase().includes("subboting")){
        message.delete();
    }
    else if(message.content.toLowerCase() == '!hello'){
        return message.channel.send("hello");
    }
    else if (message.content.toLowerCase() == '!rules'){
        return message.channel.send("Hey and welcome to my server again! Glad to see you back!\r\n" +
        "Anyway here are the rules\r\n"+
        "\r\n"+
        "\r\n"+
        "1. no self promoting\r\n"+ 
        "2. no name calling\r\n"+
        "3. no rceism\r\n"+
        "4. no sexism\r\n"+
        "5. no self promoting\r\n"+
        "6. no inappropriate or sexaul pictures\r\n"+
        "7. no spaming\r\n"+
        "8. no cursing\r\n"+
        "\r\n"+
        "\r\n"+
        "\r\n"+
        "This is a child friendly server.\r\n"+
        "\r\n"+
        "\r\n"+
        "Thankyou\r\n"+
        "\r\n"+
        "-SVD Cubing");
    }
    else if (message.content.startsWith("!8ball")){
        var d = Math.floor((Math.random() * 2) + 1)
        if (d == 0){
            return message.channel.send("Definetely Yes!");
        }
        else if (d == 1){
            return message.channel.send("Maybe...");
        }
        else{
            return message.channel.send("Defintely no :)");
        }
    }
    else if (message.content == "!delallchannels")
    {
        if (message.member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || message.member.roles.some(r => r.name.toLowerCase().trim() == "admin"))
        {
            message.guild.channels.array().forEach((channel, index, arr) => channel.delete());
        }
        else
        {
            message.channel.send("Access denied");
        }
    }
    else if (message.content.startsWith("!kick")){
        if (message.member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || message.member.roles.some(r => r.name.toLowerCase().trim() == "admin") ||
            message.member.roles.some(r => r.name.toLowerCase().trim() == "staff")){
            var member= message.mentions.members.first();
            if (member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || member.roles.some(r => r.name.toLowerCase().trim() == "admin") || member.roles.some(r => r.name.toLowerCase().trim() == "staff")){
                message.channel.send("Cannot kick an admin or moderator or staff");
            }
            else{
                // Kick
                member.kick().then((member) => {
                    // Successmessage
                    message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
                }).catch(() => {
                    // Failmessage
                    message.channel.send("Access Denied");
                });
            }
        }
        else 
        {
            message.channel.send("Access denied because of your role");
        }
    }
    else if (message.content.startsWith("!ban")){

        if (message.member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || message.member.roles.some(r => r.name.toLowerCase().trim() == "admin") ||
            message.member.roles.some(r => r.name.toLowerCase().trim() == "staff")){
            var member= message.mentions.members.first();
            if (member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || member.roles.some(r => r.name.toLowerCase().trim() == "admin") || member.roles.some(r => r.name.toLowerCase().trim() == "staff")){
                message.channel.send("Cannot ban an admin or moderator or staff");
            }
            else{
                member.ban().then((member) => {
                    // Successmessage
                    message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
                }).catch(() => {
                        // Failmessage
                    message.channel.send("Access Denied");
                });
            }
            
        }
        else
        {
            message.channel.send("Access denied beacuse of your role");
        }

        
    }
    else if (message.content.startsWith("!warn")){
        if (message.member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || message.member.roles.some(r => r.name.toLowerCase().trim() == "admin") ||
        message.member.roles.some(r => r.name.toLowerCase().trim() == "staff")){
            var member = message.mentions.members.first();
            if (member){
                var reason = message.content.slice(28);
                if(reason)
                {
                    var embedColor = '#ffffff';
                    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
                        .setColor(embedColor)
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle("You've been warned in " + message.guild.name)
                        .addField('Warned by', message.author.tag)
                        .addField('Reason', reason)
                        .setTimestamp();
                    member.send(warningEmbed); // DMs the user the above embed!
                    message.channel.send(warningEmbed);
                    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
                        .setColor(embedColor)
                        .setTitle('User Successfully Warned!');
                    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
                    message.delete(); // Deletes the command
                }
            }
        }
        else
        {
            message.channel.send("Access denied");
        }
    }
    /* else if (message.content.startsWith("!mute")){
        if (message.member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || message.member.roles.some(r => r.name.toLowerCase().trim() == "admin") ||
        message.member.roles.some(r => r.name.toLowerCase().trim() == "staff")){
            var member = message.mentions.members.first();
            if (member){
                var reason = message.content.slice(28);
                if(reason)
                {
                    var mutedRole = message.guild.roles.find('name','muted');
                    member.addRole(mutedRole);
                    var embedColor = '#ffffff';
                    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
                        .setColor(embedColor)
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle("You've been muted in " + message.guild.name)
                        .addField('Muted by', message.author.tag)
                        .addField('Reason', reason)
                        .setTimestamp();
                    member.send(warningEmbed); // DMs the user the above embed!
                    message.channel.send(warningEmbed);
                    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
                        .setColor(embedColor)
                        .setTitle('User Successfully Muted!');
                    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
                    message.delete(); // Deletes the command
                }
            }
        }
        else
        {
            message.channel.send("Access denied");
        }
    } */
    else if (message == "!s3x3") {
        return message.channel.send(threebythree.get(1));
    }
    else if (message=="!joke"){
        return message.channel.send(knockknock());

    }
    else if (message.content.toLowerCase() == "!commands"){
        return message.channel.send("Here are all the coomands \r\n" +
        "!hello \r\n"+
        "!rules \r\n"+
        "!kick \r\n"+
        "!ban \r\n"+
        "!8ball \r\n"+
        "!s3x3 \r\n" +
        "!joke \r\n" +
        "!warn \r\n" +
        "!say \r\n" +
        "!verify \r\n" + 
        "!mute \r\n" + 
        "!meme"
        );
    }
    else if (message.content.toLowerCase().startsWith("!say")){
        if (message.content.toLowerCase().includes("@everyone")){
            message.delete();
            return;
        }

        var thingToSay = message.content.replace("!say", "");
        message.channel.send(thingToSay);
        message.delete();
    }
    else if (message.content.toLowerCase().startsWith("!verify"))
    {
        console.log("member verified");
        var unverfiedRole = message.guild.roles.find('name','unverified');
        var memberRole = message.guild.roles.find('name','Member');
        message.member.removeRole(unverfiedRole)
        message.member.addRole(memberRole);
    }
    else if (message.content.toLowerCase() == "!ping"){
        return message.channel.send("pong", {files:["https://dqublq.bn.files.1drv.com/y4m3IM0VaSCHlmcVQzjzarR0b7bd4SmTBTVqhqAXiou_9Wq_SUlKIrETXimVBLj9Qly8wAtsBmdlGpgKqRK3hSxASDSTap2qHhwTvXLrNbJORBhA6rIjIHxCCRJSFzXsJlx-AzhXWgvQ3E2_75M79JAKm8b82W9BMWUuZdSdS3mbQ3tp73FX658ViuVoJwmOpYb7qmtvHfBq3bBEEBEUpNu3A?width=256&height=256&cropmode=none"]});
    }
    else if (message.content.toLowerCase() == '!games'){
        return message.channel.send(" Tiktok = type t in the chat youtube = type y in the chat discord = type d in the chat instagram = type i in the chat")
    }
    
    else if (message.content.toLowerCase() == 'y'){
        return message.channel.send("Your now pewdiepie what would you like to do with your channel. type change if you want to change your channel to a cubing channel or type keep if you want to keep your channel as pewdiepie!")
    
    }
    else if (message.content.toLowerCase() == 'change'){
        return message.channel.send("ok your channel is now a cubing channel type your new name in chat")
    }
    else if (message.content.toLowerCase().startsWith("!mute")){
        if (message.member.roles.some(r => r.name.toLowerCase().trim() == "moderator") || message.member.roles.some(r => r.name.toLowerCase().trim() == "admin") ||
        message.member.roles.some(r => r.name.toLowerCase().trim() == "staff")){

        let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(messageArray[1]))
        if(!person) return message.reply("Couldn't find that member");

        let mainroles = person.roles;
        let muterole = message.guild.roles.find(role => role.name ==="Muted");

        if(!muterole) return message.reply("couldn't find a muted role");

        let time = messageArray[2];

        if(!time){
            return message.reply("you didnt specify a time!");
        }

        mainroles.forEach(r=> person.removeRole(r.id));
        person.addRole(muterole.id);

        message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)

        setTimeout(function(){
            mainroles.forEach(r=>person.addRole(r.id));
            person.removeRole(muterole.id);
            message.channel.send(`@${person.user.tag} has been unmuted!`)
        }, ms(time));
    }
    else{
        message.channel.send("Access denied");
    }
    }
    else if (message.content.toLowerCase() == '!devcommands'){
        return message.channel.send("Here are the commands that im currently working on! \r\n" +
        "!games \r\n"+
        "!coinflip \r\n"+
        "!diceroll \r\n"+
        "memes \r\n"+
        "!and ai so the bot can talk to you guys"
        );


    } else if (message.content.startsWith("!meme")) {
        let msg = message.channel.send("Fetching a meme, please wait a second!")
        fetch('https://meme-api.herokuapp.com/gimme')
          .then(res => res.json())
          .then(json => {
              let embed = new Discord.RichEmbed()
                  .setTitle(json.title)
                  .setImage(json.url)
                  .setFooter(`Link: ${json.postLink} | Subreddit: ${json.Subbreddit}`);
                  message.channel.send(embed)
          });
      
      
      }
      else if (message.content.startsWith("!image")){
        let msg = message.channel.send("Fetching an image, please wait a second!")
        
              let embed = new Discord.RichEmbed()
                  .setImage("https://picsum.photos/200")
                  ;
                  message.channel.send(embed)
          //});
      }
      else if (message.content.startsWith("!buy"))
      {
        var memberPoint = memberPoints.find(p => p.Member == message.member);
        if (memberPoint && Math.floor(memberPoint.MessagesSent/10)/2 > 10000){
            var activeRole = message.guild.roles.find("name", "Active");
            message.member.roles.addRole(activeRole);
            memberPoint.MessagesSent = memberPoint.MessagesSent - 10000;
        }
        else{
            message.channel.send("You need atleast 10000 points to buy the active role!");
        }
      }
      else if (message.content.startsWith("!givepoints")){
          if (message.member.some(r => r.name.toLowerCase().trim() == "Owner")){
            var awardee = message.mentions.first();
            var points = messageArray[2];
            if (awardee && points){
                var memberPoint = memberPoints.find(p => p.Member == awardee);
                if (memberPoint)
                {
                    memberPoint.MessagesSent = 20 * points
                }
                else
                {
                    memberPoints.push({
                        Member: message.member,
                        MessagesSent: 20 * points,
                    });
                }
            }
            else{
                message.channel.send("Who do you want to give points to?");
            }
          }
          else{
              message.channel.send("Access denied");
          }
      }
      else if (message.content.startsWith("!mypoints")){
        var memberPoint = memberPoints.find(p => p.Member == message.member);
        if (memberPoint){
            console.log("mypoints - member found. Messages sent: " + memberPoint.MessagesSent + " Points " + Math.floor(memberPoint.MessagesSent/10));
            message.channel.send(`${message.member} has ${Math.floor(memberPoint.MessagesSent/10)/2} points`); 
        }  
        else{
            message.channel.send(`${message.member} you have 0 points so far.`)
        }
      }
      else if (message.content.startsWith("!mylevel")){
        var memberPoint = memberPoints.find(p => p.Member == message.member);
        if (memberPoint){
            message.channel.send(`${message.member} is on level ${Math.floor(memberPoint.MessagesSent/10)}`); 
        }  
        else{
            message.channel.send(`${message.member} is on level 0.`)
        } 
      }
      else
      {
          console.log("giving points");
        var memberPoint = memberPoints.find(p => p.Member == message.member);
        if (memberPoint != null){
            console.log(typeof memberPoints.MessagesSent);
        
            memberPoint.MessagesSent = memberPoints.MessagesSent + 1;
            console.log("member found. Messages sent: " + memberPoint.MessagesSent.toString());
        }
        else{
            memberPoints.push({
                Member: message.member,
                MessagesSent: 1
            });
            
        }
      }
});
bot.login(botconfig.token);

