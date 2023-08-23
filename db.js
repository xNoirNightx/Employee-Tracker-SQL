const fs = require('fs');
const db = require('./db');

function seedDatabase() {
  const seedsSQL = fs.readFileSync('./sql/seeds.sql', 'utf8');
  
  db.query(seedsSQL, (err, results) => {
    if (err) {
      console.error('Error seeding database:', err);
    } else {
      console.log('Database seeded successfully.');
    }
  });
}

// populate the database
seedDatabase();