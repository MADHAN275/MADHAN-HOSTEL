import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db('LOGIN');
    const adminsCollection = db.collection('admins');

    await adminsCollection.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    await adminsCollection.insertOne({
      email: 'madhan@madhanhostel.org',
      password: hashedPassword,
    });

    console.log('Admin user seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seed();
