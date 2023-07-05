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

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  const contactById = result.filter((contact) => contact.id === contactId);

  if (contactById.length > 0) console.table(contactById);
};

module.exports = {
  listContacts,
  getContactById,
};
