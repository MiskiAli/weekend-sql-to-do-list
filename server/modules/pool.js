const pg = require('pg');
// const config= {
//     database: 'weekend-todo-list',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000,
//     user: 'postgres',
// }
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-todo-list',
    host: 'localhost',
    port: 5432,
    max: 10, // how many connections or queries at one time.
    idleTimeoutMillis: 30000,
    user: 'postgres',
});
pool.on('connect', () => {
    console.log('connected to postgres');
});
pool.on('error', (err)=>{
    console.log('error connecting to postgres', err)
});

module.exports = pool;