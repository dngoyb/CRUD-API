const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log("successful connected to MongoDB..."))
  .catch(err => console.error("could not conect to MongoDB...", err));

const schemaCourse = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', schemaCourse);

// async function createCourse() {
   
//     const course = new Course({
//     name: 'Angular',
//     author: 'Ngoy',
//     tags: ['Angular', 'Frontend'],
//     isPublished: true
// })

//     const result = await course.save();
//     console.log(result);
// }

async function getCourses() {
    return await Course
    .find({ isPublished: true })
    .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort({ price: -1})
    .select({name: 1, author: 1, price: 1});
}

async function run() {
    const courses = await getCourses()
console.log(courses);
}

run()