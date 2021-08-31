const express = require('express')

const router = new express.Router()

const items = [{
    "age": 26,
    "name": "Susanta Gautam",
    "country": "Nepal",
    "email": "susanta@example.com",
    "id": 1
},{
    "age": 33,
    "name": "Ayush Paudel",
    "country": "China",
    "email": "ayush@example.com",
    "id": 2
},{
    "age": 26,
    "name": "Adam Lee",
    "country": "Canada",
    "email": "susanta@example.com",
    "id": 3
},{
    "age": 33,
    "name": "Garp Buffon",
    "country": "China",
    "email": "ayush@example.com",
    "id": 4
}]

router.get("/", async (req, res) => {
    res.status(200).json({
        "sucess": true,
        "message": "Hello World! I am response from user application."
    })
})

router.get("/users", async(req, res) => {
    res.status(200).json({
        "success": true,
        "message": items
    })
})

router.get("/users/names", async(req, res) => {
    let users = []
    for(let i = 0; i < items.length; i++) {
        users[i] = items[i].name
    }
    res.status(200).json({
        "success": true,
        "message": users
    })
})

router.get("/users/:id", async(req, res) => {
    res.status(200).json({
        "success": true,
        message: items[req.params.id - 1]
    })
})

module.exports = router