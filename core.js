const Discord = require('discord.js');
const fs = require('fs');

const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let rawdata = require("./configs/settings.json");

client.commands = new Collection();
client.cooldown = new Map();
require("./handlers/eventHandler");
require("./handlers/mongoHandler");
require("./handlers/functionHandler")(client);

const TOKEN = rawdata.token;
const prefix = rawdata.prefix;

const mongoose = require("mongoose");
const settings = require("./configs/settings.json");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = settings.mongoUrl;
const clientDB = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
clientDB.connect(err => {
  const collection = clientDB.db("test").collection("devices");
  clientDB.close();
});

client.once('ready', () => {
    console.log("Discord bot online")

});

client.login(TOKEN)