const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      return console.table([contact]);
    }
    return console.log("Contact not found!");
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const removeContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    removeContacts.forEach((contact, i) => (contact.id = `${i + 1}`));
    fs.writeFileSync(
      contactsPath,
      JSON.stringify(removeContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);

          return;
        }

        console.log(
          `Contact with the id ${contactId} has been removed successfully!`
        );
      }
    );

    listContacts();
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = { id: `${contacts.length + 1}`, name, email, phone };
    const updatedContacts = [...contacts, newContact];

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);

          return;
        }

        console.log("Contact added successfully");
      }
    );

    listContacts();
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
