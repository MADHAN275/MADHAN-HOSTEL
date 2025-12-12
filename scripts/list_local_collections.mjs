import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function listCollections() {
  try {
    await client.connect();
    const db = client.db('LOGIN');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (error) {
    console.error('Error listing collections:', error);
  } finally {
    await client.close();
  }
}

listCollections();
