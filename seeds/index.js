const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // author: '66a9ae22f1dbebd0154c23fd',
            author: '66b255a8455b4b4f5389cbb6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sint! Atque esse fugit nulla, quia reprehenderit nesciunt unde maxime et quibusdam assumenda error nobis explicabo eligendi ea culpa harum ad.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwaouvbrt/image/upload/v1722912593/YelpCamp/ip5ftddv06uwctq1nl5h.jpg',
                    filename: 'YelpCamp/ip5ftddv06uwctq1nl5h'
                },
                {
                    url: 'https://res.cloudinary.com/dwaouvbrt/image/upload/v1722912658/YelpCamp/mfxqivejo69tal3aq8ic.jpg',
                    filename: 'YelpCamp/mfxqivejo69tal3aq8ic'
                }
            ]
        })
        await camp.save();
    }
    // const c = new Campground({title: 'purple field'});
    // await c.save();
}

seedDB().then(() => {
    mongoose.connection.close();
});