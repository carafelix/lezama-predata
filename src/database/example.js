const fs = require('fs')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.USER_KEY

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect();
    const db = client.db('lezama')
    const poems = db.collection('poems');
    const all = await poems.find().toArray()

    const books = {
        
    }

    const result = []

    all.forEach(poem=>{
        books[poem.book] = (books[poem.book]?.concat([poem._id]) ||[poem._id])
    })


    fs.writeFileSync('./books.json',JSON.stringify(books))
    

  } finally {
    await client.close();
  }
}
run().catch(console.dir);

async function updateBookTitleInPoems(collection ,currentBookTitle, updateTitle){
    await collection.updateMany({
        book: currentBookTitle
    },{
        $set: {book: updateTitle}
    })
}
