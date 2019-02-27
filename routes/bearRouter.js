const router = require('express').Router();
const knex = require('knex')

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig)

router.get('/', async (req, res) => {
    try {
        const bears = await db('bears')
        res.status(200).json(bears)
    } catch(error) {
        console.log(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const bear = await db('bears')
        .where({id})
        if (bear && bear.length > 0) {
            res.status(200).json(bear)
        } else {
            res.status(404).json({ error: "No bears with this ID exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const [id] = await db('bears').insert(req.body)
        const bear = await db('bears')
            .where({ id })
            .first()
        res.status(201).json(bear)    
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const updateInfo = await db('bears').update(req.body)
            .where({ id })
        if (updateInfo > 0) {
            const response = await db('bears')
                // .where({id})
                // .first()
            res.status(200).json(response)
        } else {
            res.status(404).json({error: "No bear with this ID exists"})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await db('bears').where({ id }).del()
        if (deleted > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({error: "No bear with this ID exists"})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router