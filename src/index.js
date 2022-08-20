const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { User, Message, GuildMember, ThreadMember } = Partials;

const Util = require("./utils/structures/utils");

if (process.env["WEBHOOK_URL"]) {
  require("./utils/handlers/antiCrash")(client);
}

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember]
});

const { loadEvents } = require("./utils/handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

client.config = require("./utils/config");
client.utils = new Util(client);

// require("./utils/functions")(client);

client.login(client.config.bot.token)
  .then(() => {
    loadEvents(client);
  })
  .catch(
    (err) => console.log(err)
  );
