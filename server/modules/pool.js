const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10, // how many connections or queries at one time.
    idleTimeoutMillis: 30000
});
pool.on('connect', () => {
    console.log('connected to postgres');
});
pool.on('error', (error)=>{
    console.log('error connecting to postgres', error)
});

module.exports = pool;ta