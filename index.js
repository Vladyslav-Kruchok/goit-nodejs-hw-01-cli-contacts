/**
 * Step 1 form default package.json
 * npm init -y
 * Step 2 edit package.json, add scripts such as:
 * "start": "node index" - for start in console
 * "start:dev": "nodemon index" - for next changes in the code
 * Step 3 run
 * npm run start:dev - script
 * node index - app
 * 

 */
//yargs
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

//commander
const { program } = require("commander");

const { listContacts,
        getContactById,
        removeContact,
        addContact
} = require("./contacts");

const fileAction = {
    getAll: "getAll",
    getById: "getById",
    delById: "delById",
    addNew: "addNew"
};

console.log("\n Доброго дня everybody, i`m Borys Johnson from London :-)\n");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case fileAction.getAll:
            {
                const allContacts = await listContacts();
                console.log(allContacts);
            }
            break;
        case fileAction.getById:
            {
                const сontactsById = await getContactById(id);
                console.log(сontactsById);
            }
            break;
        case fileAction.delById:
            {
                const delContactsById = await removeContact(id);
                console.log(delContactsById);
            }
            break;
        case fileAction.addNew:
            {
                const addContacts = await addContact({name, email, phone});
                console.log(addContacts);
            }
            break;
        default:
            console.warn("Unknown action");
    }
};

//#region First_variant # 
// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//     const action = process.argv[actionIndex + 1];
//     invokeAction({action});
// }
//#endregion #

//#region Second_variant_yargs #
/**
 * example:
 * node index --action getAll or node index --action="getAll"
 * node index --action getById --id 1 or
 * node index --action delById --id 1 or 
 * 
 * node index --action addNew --id null --name "Allen Raymond" --email nulla.ante@vestibul.co.uk --phone "(992) 914-3792"
 * or
 * * node index --action="addNew" --id="null" --name="Allen Raymond" --email="nulla.ante@vestibul.co.uk" --phone="(992) 914-3792"
 */
// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);
// invokeAction(argv);
//#endregion #

//#region Third_variant_commander #
program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>");
program.parse();
const options = program.opts();

invokeAction(options);
//#endregion