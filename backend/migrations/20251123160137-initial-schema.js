module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Create indexes for User collection
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    await db.collection('users').createIndex({ phoneNumber: 1 }, { unique: true, sparse: true });

    // Create indexes for Rock collection
    await db.collection('rocks').createIndex({ user: 1 });
    await db.collection('rocks').createIndex({ createdAt: -1 });
    await db.collection('rocks').createIndex({ rockType: 1 });
    await db.collection('rocks').createIndex(
      { location: '2dsphere' },
      { name: 'location_2dsphere' }
    );

    // Create indexes for Hunt collection
    await db.collection('hunts').createIndex({ creator: 1 });
    await db.collection('hunts').createIndex({ isActive: 1 });
    await db.collection('hunts').createIndex({ startDate: 1, endDate: 1 });

    // Create indexes for Achievement collection
    await db.collection('achievements').createIndex({ type: 1 });
    await db.collection('achievements').createIndex({ rarity: 1 });

    console.log('Initial schema indexes created successfully');
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Drop all custom indexes (keep _id index)
    await db.collection('users').dropIndex('email_1');
    await db.collection('users').dropIndex('username_1');
    await db.collection('users').dropIndex('phoneNumber_1');

    await db.collection('rocks').dropIndex('user_1');
    await db.collection('rocks').dropIndex('createdAt_-1');
    await db.collection('rocks').dropIndex('rockType_1');
    await db.collection('rocks').dropIndex('location_2dsphere');

    await db.collection('hunts').dropIndex('creator_1');
    await db.collection('hunts').dropIndex('isActive_1');
    await db.collection('hunts').dropIndex('startDate_1_endDate_1');

    await db.collection('achievements').dropIndex('type_1');
    await db.collection('achievements').dropIndex('rarity_1');

    console.log('Initial schema indexes dropped successfully');
  },
};
