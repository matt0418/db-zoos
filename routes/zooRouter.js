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
        const animals = await db('zoos')
        res.status(200).json(animals)
    } catch(error) {
        console.log(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const animal = await db('zoos')
        .where({ id })
        if (animal.length > 0) {
            return res.status(200).json(animal)
        } else {
            return res.status(404).json({ error: "No such animal exists with this id" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const [id] = await db('zoos').insert(req.body)
        const animal = await db('zoos')
            .where({ id })
            .first()
        res.status(201).json(animal)    
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', async (req, res) => {
    id = req.params.id
    try {
        const updateInfo = await db('zoos').update(req.body)
        .where({ id })
        if (updateInfo > 0) {
            const response = await db('zoos')
                // .where({id})
                // .first()
            res.status(200).json(response)
        } else {
            res.status(404).json({error: "ID bad dog"})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({error: "Could not retrieve info"})
    }
})

router.delete('/:id', async (req, res) => {
    id = req.params.id
    try {
        const count = await db('zoos').where({ id }).del()
        if (count > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({error: "No animal with this id exists"})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router