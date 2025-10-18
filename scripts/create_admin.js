/*
 * Script to create or update an admin user in MongoDB.
 * Usage:
 *   MONGODB_URI="..." node scripts/create_admin.js
 *
 * This script will upsert a user with username 'jmenichole' and the provided password hash.
 * Make sure the MONGODB_URI points to your database and that the JWT_SECRET environment variable
 * is set if you rely on JWTs elsewhere.
 */

const mongoose = require('mongoose')

async function main() {
  const mongoURI = process.env.MONGODB_URI
  if (!mongoURI) {
    console.error('Please set MONGODB_URI in the environment')
    process.exit(1)
  }

  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    bio: String,
    achievements: [String],
    rockCount: Number,
    huntCount: Number,
    role: String,
    isAdmin: Boolean,
    isModerator: Boolean
  }, { timestamps: true })

  const User = mongoose.models.User || mongoose.model('User', userSchema)

  const username = 'jmenichole'
  const passwordHash = '$2a$10$HG9wAYzf5jDBVeOqNU9k3.A768zVlNjzQDKZz6nWke6n9zSIUZscC' // generated hash for 'jmenichole'
  const email = 'admin+manual@rockspotter.local'

  const update = {
    username,
    email,
    password: passwordHash,
    role: 'admin',
    isAdmin: true
  }

  const opts = { upsert: true, new: true, setDefaultsOnInsert: true }
  const user = await User.findOneAndUpdate({ username }, update, opts)

  console.log('Upserted admin user:', user.username, 'isAdmin:', user.isAdmin)
  await mongoose.disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
