const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { User, Message, GuildMember, ThreadMember } = Partials;

const { loadEvents, loadCommands, loadAppCommands, loadButtons, loadTriggers, loadModals, loadSelects } = require('./utils/handlers')

const Util = require("./utils/structures/utils");

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember]
});

// require("./utils/handlers/antiCrash")(client);
// const { loadEvents } = require("./utils/handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection(); 
client.applicationCommands = new Collection();

client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

client.triggers = new Collection();
client.cooldowns = new Collection();

client.tools = require(`./utils/tools`);
client.config = require("./utils/config");

client.utils = Util;

client.login(process.env["TOKEN"])
  .then(async() => {
    await loadEvents(client);
    await loadButtons(client);
    await loadCommands(client);
    await loadTriggers(client);
    await loadModals(client);
    await loadSelects(client);
  })
  .catch(
    (err) => console.log(err)
  );