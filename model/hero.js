var mongoose = require('mongoose')

var Schema = mongoose.Schema

const HeroSchema = new Schema(
    {
        name: { type: String, required: true, max: 100 },
        id: { type: Number, required: true }
    }
)

module.exports = mongoose.model('heroes', HeroSchema, 'heroes')