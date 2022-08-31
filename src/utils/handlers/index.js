const { loadEvents } = require('./eventHandler');
const {loadCommands} = require('./commandHandler');
const { loadAppCommands } = require('./applicationCommandHandler');
const {loadSelects} = require('./selectMenuHandler');
const {loadButtons} = require('./buttonHandler');
const {loadTriggers} = require('./triggerHandler');
const {loadModals} = require('./modalHandler');

module.exports = {
  loadEvents,
  loadCommands,
  loadAppCommands,
  loadButtons,
  loadTriggers,
  loadModals,
  loadSelects
}