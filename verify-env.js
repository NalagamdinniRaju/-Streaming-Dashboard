// Quick script to verify environment variables are loaded
// Run with: node verify-env.js

require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.OMDB_API_KEY;

if (apiKey) {
  console.log('✅ API Key found:', apiKey.substring(0, 4) + '...');
} else {
  console.log('❌ API Key not found');
  console.log('Make sure .env.local exists with: OMDB_API_KEY=your_key');
}

