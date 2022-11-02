const { buttonError } = require('./defaultButtonError');
const { modalError } = require('./defaultModalError');
const { selectError } = require('./defaultSelectError');
const { onMentionMessage } = require('./onMention');


module.exports = {
  buttonError: buttonError,
  modalError: modalError,
  selectError: selectError,
  onMentionMessage: onMentionMessage
}