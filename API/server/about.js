let aboutMessage = 'Hello World';

function setAboutMessage(_, { message }) {
  aboutMessage = message;
  return message;
}

function getMessage() {
  return aboutMessage;
}

module.exports = { setAboutMessage, getMessage };
