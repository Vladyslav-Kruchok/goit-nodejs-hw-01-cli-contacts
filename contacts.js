const {nanoid} = require("nanoid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname,"db", "contacts.json");

const updateData = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
};

getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contactIdStr = String(contactId);
    const currContactById = contacts.find(
        item => item.id === contactIdStr
    );
    return currContactById || null;
};

removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contactIdStr = String(contactId);
    const delContactIndex = contacts.findIndex(item => item.id === contactIdStr);
    if (delContactIndex === -1) {
        return null;
    };
    const [delContact] = contacts.splice(delContactIndex, 1);
    await updateData(contacts);
    return delContact;
};

addContact = async ({name, email, phone}) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateData(contacts);
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};