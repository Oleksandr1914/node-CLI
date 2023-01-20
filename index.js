const phoneBook = require("./contacts.js");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listPhone = await phoneBook.listContacts();
      console.log(listPhone);
      break;

    case "get":
      const contact = await phoneBook.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newListPhone = await phoneBook.addContact(name, email, phone);
      console.log(newListPhone);
      break;

    case "remove":
      const updateList = await phoneBook.removeContact(id);
      console.log(updateList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
