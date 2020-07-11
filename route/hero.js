var express = require('express')
var router = express.Router()
var hero_controller = require('../controller/hero')

// TypeError: Router.use() requires a middleware function but got a Object
// module.exports = function (app) {
    // a simple test url to check that all of our files are communicating correctly
    router.get('/test', hero_controller.test)

    // Example: URL=create, call hero_controller.hero_create
    router.post('/heroes', hero_controller.create)

    router.get('/heroes', hero_controller.heroes)

    router.get('/heroes/:id', hero_controller.read)

    router.put('/heroes', hero_controller.update)
    
    router.delete('/heroes/:id', hero_controller.delete)
// }

module.exports = router