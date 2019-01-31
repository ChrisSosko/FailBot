const Discord= require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
	console.log('I am ready');
});

client.on("message", message => {
	if (message.author.bot) return; //no bot talk
	if (message.content.indexOf(config.prefix)!== 0) return; //ensures prefix
	if(message.mentions.everyone) return; //no @everyone
	// no @role?
  		//todo make sure @role mentions are handled, 
  		//	   they currently shut off the bot
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

  	if (command === 'ping') {
  		message.channel.send('Pong!');
  	}
  	/*--- Goon only operations ---*/
  	if (message.member.roles.has(config.goonID)) {

		/*---- MACTIME implementation ----*/
		if (command === "mactime"){
			let member = message.mentions.members.first();
			let reason = args.slice(1).join(" ");
			
		  	member.removeRoles(member.roles, reason);
		  	member.addRole(config.macID);
	  	}
	  	if (command === "unmac"){
	  		let member = message.mentions.members.first();
		  	member.removeRole(config.macID);
		  	member.addRole(config.goonID);
	  	}
	  	if (command === "resetRoles"){
		//grab each member, set role to goon. 
		}
  	}
});
client.login(config.token);
	  	/* ---MACTIME proposal ---
	  	send message "x macced y for reason"
	  	mac @goonpacalypse 'spamming chat'
		macd or goonlags people cant do this

	  	remove roles (member.roles)
	  	add roles (mac time)
	  	let sungoon = message.guild.roles.find(role => role.name === config.goon)
	  	if member.role==sungoon
	  	*/