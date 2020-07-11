// Require the express package and use express.Router()
var Hero = require('../model/hero')

exports.test = function (req, res) {
    console.log('test')
    res.send('Greetings from My Hero controller!')
}

exports.create = function (req, res, next) {
    console.log('create in controller')
    console.log('body:')
    console.log(req.body)
    console.log('params:')
    console.log(req.params)

    var hero = new Hero(
        {
            name: req.body.name,
            id: 1
        }
    )

    Hero.countDocuments(function (err, count) {
        hero.id = count++
        hero.save(function (err) {
            if (err) {
                return next(err)
            }

            console.log('Hero id: ' + hero.id)
            console.log('Hero name: ' + hero.name)
            res.send(hero)
        })
    })
}

exports.read = function (req, res, next) {
    console.log("read in controller. id: " + req.params.id)
    Hero.findOne({ id: req.params.id }, (err, hero) => {
        if (err)
            return next(err)
        res.json(hero)
    })
}

exports.heroes = function (req, res, next) {
    console.log("heroes in controller")
    Hero.find({}, (err, docs) => {
        if (err) {
            return console.error(err)
        }
        console.log("heroes in controller: " + docs[0])
        console.log('count: ' + docs.length)
        // console.log(docs)
        res.json(docs)
    })
}

exports.update = function (req, res, next) {
    console.log("update in controller. id: " + req.body.id)
    Hero.findOneAndUpdate({ id: req.body.id }, { $set: req.body }, (err, hero) => {
        if (err) return next(err)
        res.json("hero updated.")
    })
}

exports.delete = function (req, res, next) {
    console.log("delete in controller. id: " + req.params.id)
    // Delete by id not _id
    Hero.deleteOne({ id: req.params.id }, (err) => {
        if (err) return next(err)
        res.json("Hero Deleted")
    })
}