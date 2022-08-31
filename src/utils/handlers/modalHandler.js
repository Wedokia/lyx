async function loadModals(client) {
  const { loadFiles } = require("../structures/functions/fileLoader");

  const ascii = require('ascii-table');
  const table = new ascii().setHeading("✅", "modals", "status");

  await client.modals.clear();

  const Files = await loadFiles("src/interactions/modals");

  Files.forEach((file) => {
    const modal = require(file)
    
    let emoji = "✅"
    let status = "MODAL LOADED"
    if (!modal.id) {
      emoji = "🟥"
      status = "missing Id"
    } else {
      client.modals.set(modal.id, modal)
    }

    table.addRow(emoji, file.replace(".js", "").replace(`${process.cwd()}/src/interactions/modals/`, ""), status);
  })

  return console.log(table.toString(),  `\n Loaded ${client.modals.size} Modals\n`);

}

module.exports = { loadModals };