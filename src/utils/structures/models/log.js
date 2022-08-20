const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  guild: String,


  moderatorCommand: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Message Events /////
    ///////////////////////
    messageDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    messageUpdate: {
      toggle: { type: 'boolean', default: true },
      channel: { type: String, default: '863523106249506836' }
    },
    bulkMessageDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    messageDeleteBulk: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    imageDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Member Events //////
    ///////////////////////
    guildMemberAdd: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    guildMemberRemove: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    memberRoleAdd: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    memberRoleRemove: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    nicknameChange: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // User Events ////////
    ///////////////////////
    presenceUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    userUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Moderation Events //
    ///////////////////////
    guildBanAdd: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    guildBanRemove: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Roles Events ///////
    ///////////////////////
    roleCreate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    roleDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    roleUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Channel ////////////
    ///////////////////////
    channelCreate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    channelDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    channelUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    webhookUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Thread Events //////
    ///////////////////////
    threadCreate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    threadDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    threadUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    threadMemberUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    threadMemberUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Voice Events ///////
    ///////////////////////
    voiceChannelJoin: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    voiceChannelLeave: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    voiceChannelMove: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    voiceStateUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Emoji Events ///////
    ///////////////////////
    emojiCreate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    emojiDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    emojiUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    stickerCreate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    stickerDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    stickerUpdate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    ///////////////////////
    // Invite Events //////
    ///////////////////////
    inviteCreate: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
    inviteDelete: {
      toggle: { type: 'boolean', default: false },
      channel: { type: String }
    },
  
});

module.exports = mongoose.model('Log', LogSchema);