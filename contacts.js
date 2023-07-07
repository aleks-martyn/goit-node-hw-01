const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("./db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((contacts) => console.table(contacts))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((contacts) => {
      const contactById = contacts.find((contact) => contact.id === contactId);
      if (contactById) {
        return console.log(contactById);
      } else {
        return console.log(null);
      }
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((contacts) => {
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (contactIndex === -1) {
        console.log("No such contact found");
        return console.log(null);
      }

      const [removedContact] = contacts.splice(contactIndex, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return console.log(removedContact);
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  const newContact = {
    id: nanoid().toString(),
    name,
    email,
    phone,
  };

  if (name === undefined || email === undefined || phone === undefined) {
    console.log("All arguments are required!");
    return;
  }

  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((contacts) => {
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    })
    .catch((error) => console.log(error.message));

  return console.log(newContact);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
