const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
    fs.readFile(contactsPath, "utf-8")
        .then((data) => console.table(JSON.parse(data)))
        .catch((err) => err.message);
}

function getContactById(contactId) {
    const id = contactId.toString();
    return fs
        .readFile(contactsPath)
        .then((data) => {
            const newData = JSON.parse(data).find((item) => item.id === id);
            console.table(newData);
            return newData;
        })
        .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
    const id = contactId.toString();
    fs.readFile(contactsPath, "utf-8")
        .then((data) => {
            const contacts = JSON.parse(data);
            const newContacts = contacts.filter((item) => item.id !== id);
            fs.writeFile(contactsPath, JSON.stringify(newContacts));
        })
        .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath)
        .then((data) => {
            const contacts = JSON.parse(data);
            JSON.stringify(contacts.push({ id: uuidv4(), name, email, phone }));
            console.log(`contacts`, contacts);
            fs.writeFile(contactsPath, JSON.stringify(contacts));
        })
        .catch((err) => console.log(err.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact, };