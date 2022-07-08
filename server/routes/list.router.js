// const { query } = require('express');
const express  = require('express')
// const { Pool } = require('pg');
const router = express.Router();
const pool = require('../modules/pool.js');

// Router GET request
router.get('/', (req, res) => {
    console.log('in router GET');
    let queryText = 'SELECT * FROM "list" ORDER BY "id";';
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error is in get list', error)
        res.sendStatus(500)
    });
});

// Router POST request
router.post('/', (req, res) => {
    let tasksNew = req.body;
    console.log(`adding a task`, tasksNew);
    let queryText = `INSERT INTO "list" ("task", "date", "time", "notes") 
        VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [tasksNew.name, tasksNew.date, tasksNew.time, tasksNew.notes])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('ERROR in post req for newTaskData', error);
        request.sendStatus(500);
    });
});

// Router PUT request
router.put('/:id', (req, res) => {
    console.log('PUT request in router');
    let queryText = `UPDATE "list" SET "completed" = NOT "completed" where id = $1;`;
    let values = [req. params.id]
    pool.query(queryText, values)
    .then((dbResponse)=>{
        res.send(dbResponse.rows);
    }).catch((error)=>{
        console.log(`ERROR in put req for updating database ${queryText}, ${error}`);
        request.sendStatus(500);
    });
});
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log(`Delete request sent for id ${reqId}`);
    let queryText = 'DELETE FROM "list" WHERE id = $1;';
    pool.query(queryText, [reqId])
    .then(() => {
    console.log('task has been Deleted!');
    res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in deleting ${queryText}: ${error}`);
        res.sendStatus(500);
    });
});
module.exports = router;