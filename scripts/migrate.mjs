import { MongoClient } from 'mongodb';

// Configuration
const localUri = 'mongodb://localhost:27017';
const atlasUri = process.env.MONGODB_URI;
const dbName = 'LOGIN';
const collectionsToMigrate = ['COMPLANITS', 'admins', 'ROOM_ALLOCATION', 'LOGIN_DETAILS'];

if (!atlasUri) {
  console.error('Error: MONGODB_URI environment variable is not set.');
  process.exit(1);
}

async function migrate() {
  const localClient = new MongoClient(localUri);
  const atlasClient = new MongoClient(atlasUri);

  try {
    console.log('Connecting to databases...');
    await Promise.all([localClient.connect(), atlasClient.connect()]);
    console.log('Connected!');

    const localDb = localClient.db(dbName);
    const atlasDb = atlasClient.db(dbName);

    for (const collectionName of collectionsToMigrate) {
      console.log(`Migrating collection: ${collectionName}...`);

      const localCollection = localDb.collection(collectionName);
      const atlasCollection = atlasDb.collection(collectionName);

      // 1. Get data from local
      const documents = await localCollection.find({}).toArray();
      const count = documents.length;

      if (count === 0) {
        console.log(`  - No documents found in local ${collectionName}. Skipping.`);
        continue;
      }

      console.log(`  - Found ${count} documents in local.`);

      // 2. Clear existing data in Atlas (Optional: Remove this if you want to merge)
      // For a full migration/sync, clearing is usually safer to avoid duplicates.
      await atlasCollection.deleteMany({});
      console.log(`  - Cleared existing documents in Atlas.`);

      // 3. Insert into Atlas
      await atlasCollection.insertMany(documents);
      console.log(`  - Successfully inserted ${count} documents into Atlas.`);
    }

    console.log('\nMigration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await Promise.all([localClient.close(), atlasClient.close()]);
  }
}

migrate();
