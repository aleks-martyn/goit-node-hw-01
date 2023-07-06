const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

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
      const contactById = contacts.filter(
        (contact) => contact.id === contactId
      );
      if (contactById.length > 0) console.table(contactById);
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
        return;
      }

      const removedContact = contacts.splice(contactIndex, 1);
      if (removedContact.length > 0) console.table(removedContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts));
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  const contact = {
    id: nanoid.nanoid().toString(),
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
      contacts.unshift(contact);
      const updatedContacts = JSON.stringify(contacts);
      fs.writeFile(contactsPath, updatedContacts);
    })
    .catch((error) => console.log(error.message));

  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
