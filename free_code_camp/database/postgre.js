import PG from 'pg';
import format from 'pg-format';

var pg_hostname = 'localhost',
  pg_port = 5432,
  pg_database = 'mydb',
  pg_username = 'admin',
  pg_password = 'P@ssw0rd',
  retry_ms = 5000,
  interval = null; //. retry every 5 sec

var connectionString = `postgres://${pg_username}:${pg_password}@${pg_hostname}:${pg_port}/${pg_database}`; //+ "?sslmode=verify-full";
var pg = new PG.Pool({ connectionString });
console.log( 'connecting...' );

const pg = new PG.pool('postgres://localhost:5432/mydb');
pg.on('error', function (err) {
  console.log('db error on starting', err);
  if (err.code && err.code.startsWith('5')) {
    try_reconnect(retry_ms); //. terminated by admin?
  }
});

function try_reconnect(ts) {
  if(!!interval) clearInterval(interval);
  interval = setTimeout(function () {
    console.log('reconnecting...');
    pg = new PG.Pool({ connectionString });
    pg.on('error', function (err) {
      console.log('db error on working', err);
      if (err.code && err.code.startsWith('5')) {
        try_reconnect(ts); //. terminated by admin?
      }
    });
  }, ts);
}

export async function connectDb() {
  try {
    const conn = await pg.connect();
  } catch (err) {
    throw Error(err.message);
  }
}

export async function initDb() {
  if (pg) {
    var conn = await pg.connect(); // Connection assignment
    if (conn) {
      try {
        var sql = 'insert into table1( name, num ) values ( $1, $2 )',
          query = { text: sql, values: ['yamaha', 100] }; // SQL parameters
        conn.query(query, (err, result) => console.log(err || result));
      } catch (e) {
        console.log(e); // An exception has occurred
      } finally {
        if (conn) {
          conn.release(); // Releasing the connection
        }
      }
    }
  }
}

export async function insert() {
  var records = [
    ['yamaha', 100],
    ['suzuki', 101],
    ['yamaha', 102],
  ];

  if (pg) {
    var conn = await pg.connect(); // Connection assignment
    if (conn) {
      try {
        var sql = format('insert into table1( name, num ) values %L', records),
          query = { text: sql, values: [] }; // SQL parameters
        conn.query(query, (err, result) => console.log(err || result));
      } catch (e) {
        console.log(e); // An exception has occurred
      } finally {
        if (conn) {
          conn.release(); // Releasing the connection
        }
      }
    }
  }
}

export async function select() {
  var records = [
    // Prepare an array of records to insert.
    ['yamaha', 100],
    ['suzuki', 101],
    ['yamaha', 102],
  ];

  if (pg) {
    var conn = await pg.connect();
    if (conn) {
      try {
        // Create an SQL that ignores data that violates the UNIQUE constraint.
        var sql = 'insert into table1( name, num ) ';
        var selects = [];
        for (var i = 0; i < records.length; i++) {
          selects.push("select '" + records[i][0] + "', " + records[i][1]);
        }
        sql += selects.join(' union all') + ' on conflict ( name, num ) do nothing';

        var query = { text: sql, values: [] };
        conn.query(query, (err, result) => console.log(err || result));
      } catch (e) {
        console.log(e);
      } finally {
        if (conn) {
          conn.release();
        }
      }
    }
  }
}
