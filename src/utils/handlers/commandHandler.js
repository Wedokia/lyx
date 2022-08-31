async function loadCommands(client) {
  const { loadFiles } = require("../structures/functions/fileLoader");

  const ascii = require('ascii-table');
  const table = new ascii().setHeading("✅", "commands", "status");

  await client.commands.clear();

  const Files = await loadFiles("src/messages/commands");

  Files.forEach((file) => {
    const command = require(file)
    
    if (command.ownerOnly == undefined) command.ownerOnly = false

    let emoji = "✅"
    let status = "COMMAND LOADED"
    if (!command.name) {
      emoji = "🟥"
      status = "missing name"
    } else {
      client.commands.set(command.name, command);
    }

    table.addRow(emoji, file.replace(".js", "").replace(`${process.cwd()}/src/messages/commands/`, ""), status);
  })

  return console.log(table.toString(),  `\n Loaded ${client.commands.size} Commands\n`);

}

module.exports = { loadCommands };