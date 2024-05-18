const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;


/**
 * constants
 */
const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("cars").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
        console.info("deleting collection");
        await db.collection("cars").drop();
    }

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing cars collect").start();

    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "cars.json"), "utf8");
    await db.collection("cars").insertMany(JSON.parse(data));

    load.stop();
    console.info(
      `Created Car database`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}
main();