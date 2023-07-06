const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join("./db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((result) => console.table(result))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((result) => {
      const contactById = result.filter((contact) => contact.id === contactId);
      if (contactById.length > 0) console.table(contactById);
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) { 
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then()
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
};
