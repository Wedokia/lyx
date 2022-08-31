async function loadEvents(client) {
  const { loadFiles } = require("../structures/functions/fileLoader");

  const ascii = require('ascii-table');
  const table = new ascii().setHeading("✅", "events", "status");

  await client.events.clear();

  const Files = await loadFiles("src/events");

  Files.forEach((file) => {
    const event = require(file)

    const execute = (...args) => event.execute(...args, client);
    client.events.set(event.name, execute);

    let emoji = "✅"
    let status = "EVENT LOADED"
    if (!event.name) {
      emoji = "🟥"
      status = "Missing name"
    } else if (!eventList.includes(event.name)) {
      emoji = "🟥"
      status = "Invalid name"
    } else {
      if (event.rest) {
        if (event.once)
          client.rest.once(event.name, (...args) =>
            event.execute(...args, client)
          );
        else
          client.rest.on(event.name, (...args) =>
            event.execute(...args, client)
          );
      } else {
        if (event.once)
          client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
      }
      table.addRow(emoji, file.replace(".js", "").replace(`${process.cwd()}/src/events/`,""), status);
    }
  })

  return console.log(table.toString(),  `\n Loaded ${client.events.size} Events\n`);

}

module.exports = { loadEvents };

const eventList = [
  "apiRequest",
  "apiResponse",
  "applicationCommandCreate",
  "applicationCommandDelete",
  "applicationCommandUpdate",
  "channelCreate",
  "channelDelete",
  "channelPinsUpdate",
  "channelUpdate",
  "debug",
  "emojiCreate",
  "emojiDelete",
  "emojiUpdate",
  "error",
  "guildBanAdd",
  "guildBanRemove",
  "guildCreate",
  "guildDelete",
  "guildIntegrationsUpdate",
  "guildMemberAdd",
  "guildMemberAvailable",
  "guildMemberRemove",
  "guildMembersChunk",
  "guildMemberUpdate",
  "guildScheduledEventCreate",
  "guildScheduledEventDelete",
  "guildScheduledEventUpdate",
  "guildScheduledEventUserAdd",
  "guildScheduledEventUserRemove",
  "guildUnavailable",
  "guildUpdate",
  "interaction",
  "interactionCreate",
  "invalidated",
  "invalidRequestWarning",
  "inviteCreate",
  "inviteDelete",
  "message",
  "messageCreate",
  "messageDelete",
  "messageDeleteBulk",
  "messageReactionAdd",
  "messageReactionRemove",
  "messageReactionRemoveAll",
  "messageReactionRemoveEmoji",
  "messageUpdate",
  "presenceUpdate",
  "rateLimit",
  "ready",
  "roleCreate",
  "roleDelete",
  "roleUpdate",
  "shardDisconnect",
  "shardError",
  "shardReady",
  "shardReconnecting",
  "shardResume",
  "stageInstanceCreate",
  "stageInstanceDelete",
  "stageInstanceUpdate",
  "stickerCreate",
  "stickerDelete",
  "stickerUpdate",
  "threadCreate",
  "threadDelete",
  "threadListSync",
  "threadMembersUpdate",
  "threadMemberUpdate",
  "threadUpdate",
  "typingStart",
  "userUpdate",
  "voiceStateUpdate",
  "warn",
  "webhookUpdate",
];