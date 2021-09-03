const { response } = require('express')
const express = require('express')
const request = require('request')


const router = new express.Router()

booksURL = process.env.BOOKSURL || "http://books:5000/books"
// const bookURL = "http://localhost:7000/books"

const items = [{
    "name": "Harry Library",
    "address": "Hogwards Street",
    "id": 1,
    "administrator": "Lary Potter"
},{
    "name": "National Library",
    "address": "Kingdom Roda",
    "id": 2,
    "administrator": "Capital Road"
},{
    "name": "Capital Library",
    "address": "Hogwards Street",
    "id": 3,
    "administrator": "Lary Potter"
},{
    "name": "Historical Library",
    "address": "Kingdom Roda",
    "id": 4,
    "administrator": "Capital Road"
}]

router.get("/", async (req, res) => {
    res.status(200).json({
        "sucess": true,
        "message": "Hello World! I am response from library application."
    })
})

router.get("/library", async(req, res) => {
    res.status(200).json({
        "success": true,
        "message": items
    })
})

router.get("/library/:id/book", async(req, res) => {
    console.log(booksURL)
    if(booksURL==undefined){
        res.status(500).json({
            "success": false,
            "message": "Something went wrong. Please try again."
        })
    }else {
        console.log(booksURL)
        books = request({method: 'GET', uri: booksURL, json: true}, (error, response, body) => {
            if (error){
                res.status(400).json({
                    "success": false,
                    "message": "Something went wrong when fetching books."
                })
            } else if(body.error){
                res.status(404).json({
                    "success": false,
                    "message": body.error
                })
            } else {
                res.status(200).json({
                    "success": true,
                    "message": body.message[req.params.id - 1]
                })
            }
        })
    }
})



module.exports = router