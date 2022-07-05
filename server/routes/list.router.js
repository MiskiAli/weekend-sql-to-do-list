const { request } = require('express');
const express  = require('express')
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('in router.get');
    let queryText = 'SELECT * FROM "list" ORDER BY "id";';
    pool.query(queryText).then((results) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error is in get list', error)
        res.sendStatus(500)
    })
})

// Router POST request
router.post('/', (req, res) => {
    let newTaskData = req.body;
    console.log('adding a task', newTaskData)
    let queryText = `INSERT INTO "list" ("task", "date", "time", "notes") VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [newTaskData.title, newTaskData.date, newTaskData.time, newTaskData.notes])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('ERROR in post req for newTaskData', error);
        request.sendStatus(500);
    });
});

// Router PUT request
router.put('/', (req, res) => {
    console.log('PUT request');
    let queryText = `UPDATE "list" SET "completed" = NOT "completed" where id = $1;`;
    let values = [req. params.id]
    pool.query(queryText, values)
    .then((dbresponse)=>{
        res.send(dbresponse.rows);
    }).catch((error)=>{
        console.log(`ERROR in put req for updating database ${queryText}, ${error}`);
        request.sendStatus(500);
    });
});

module.exports = router;