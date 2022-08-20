const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { User, Message, GuildMember, ThreadMember } = Partials;


const { loadButtons } = require("./utils/handlers/buttonHandler");
const { loadEvents } = require("./utils/handlers/eventHandler");
const { loadCommands } = require("./utils/handlers/commandHandler");

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember]
});


client.commands = new Collection(); 
client.buttons = new Collection();
client.events = new Collection();

client.config = require("./utils/config.js");

require("./utils/functions")(client);

client.login(client.config.bot.token)
  .then(() => {
    console.clear
    loadCommands(client);
    loadEvents(client);
    loadButtons(client);
  })
  .catch(
    (err) => console.log(err)
  );
