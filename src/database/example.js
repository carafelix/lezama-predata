
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.USER_KEY

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect();
    const db = client.db('lezama')
    const poems = db.collection('poems');
    console.dir(
        await poems.updateMany()
    )
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
