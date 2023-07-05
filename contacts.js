const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join("./db", "contacts.json");

function listContacts() {
    fs.readFile(contactsPath)
    .then(data => {return JSON.parse(data)})
}
