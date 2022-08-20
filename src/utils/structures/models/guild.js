const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
  id: String,

  moderatorRolesIDs: { type: [], default: [] },
  moderatorUsersIDs: { type: [], default: [] },
  users: { type: [], default: [] },

  commands: {
    moderation: { 'type': "boolean", 'default': true },
    logging: { 'type': "boolean", 'default': true },
    context: { 'type': "boolean", 'default': true },
    utils: { 'type': "boolean", 'default': true }
  },
});

module.exports = mongoose.model('Guild', guildSchema);