const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = process.env.URI; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function uploadData() {
    try {
        await client.connect();

        const database = client.db('Restaurant'); 
        const collection = database.collection('restaurants'); 

        const data = JSON.parse(fs.readFileSync('./file1.json/file4.json', 'utf8')); 

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted.`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

uploadData();