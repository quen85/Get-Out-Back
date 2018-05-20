let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let EventSchema = new Schema({
    idApi: Number,
    title: String,
    image: String,
    description: String,
    tags: [String],
    categorie: Number,
    place: {
        address: String,
        zipCode: Number,
        city: String,
        lat: Number,
        lon: Number,
    },
    access: {
        metro: String,
        rer: String,
        bus: String
    },
    modality: {
        priceType: String,
        priceDetail: String
    },
    contact: {
        phone: String,
        mail: String,
        facebook: String,
        twitter: String,
        url: String
    },
    date: String,
    hour: String,
    participants: [String]
})

module.exports = mongoose.model('Events', EventSchema);