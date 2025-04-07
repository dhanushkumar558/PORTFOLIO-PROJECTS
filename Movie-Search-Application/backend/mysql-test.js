const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',         // put your actual MySQL password
  database: 'moviesa'   // make sure this DB actually exists
});

db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    return;
  }
  console.log('✅ MySQL connection successful!');

  // Optional: test a simple query
  db.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('❌ Query failed:', err.message);
    } else {
      console.log('📋 Tables:', results);
    }

    db.end(); // Close the connection
  });
});
