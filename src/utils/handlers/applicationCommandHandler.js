async function loadAppCommands(client) {
  const { loadFiles } = require("../structures/functions/fileLoader");
  const ascii = require('ascii-table');
  const table = new ascii().setHeading("✅", "slash-commands", "status");

  await client.applicationCommands.clear();

  let commandsArray = [];
  let developerArray = []


  const Files = await loadFiles("src/interactions/slashCommands");

  Files.forEach((file) => {
    const command = require(file);




    if (command.ownerOnly == undefined) command.ownerOnly = false

    let emoji = "✅"
    let status = "SLASH LOADED"
    if (!command.data.name) {
      emoji = "🟥"
      status = "missing name"
    } else if (!command.data.description) {
      emoji = "🟥"
      status = "missing description"
    } else {
      client.applicationCommands.set(command.data.name, command)
      if (command.developer)
        developerArray.push(command.data.toJSON());
      else
        commandsArray.push(command.data.toJSON());
    }

    table.addRow(emoji, file.replace(".js", "").replace(`${process.cwd()}/src/interactions/slashCommands/`, ""), status);
  })

  client.application.commands.set(commandsArray);

  const guilds = client.config.guilds;
  const devGuild = client.guilds.cache.get(guilds.developerGuild)
  devGuild.commands.set(developerArray)

  return console.log(table.toString(),`\n Loaded ${client.applicationCommands.size} ApplicationCommands\n`);

}

module.exports = { loadAppCommands };