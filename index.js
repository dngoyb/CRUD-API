const express = require('express');
const Joi = require('joi');

const app = express()

app.use(express.json());

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
]
app.get('/', (req, res) => {
    res.send("Hello Monday");
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(400).send(`The course with the ${req.param.id} ID $ was not found`)
    res.send(course);
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);   
}

//add course

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

//update course

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(400).send(`The course with the ID number ${req.params.id} was not found`)

    const { error } = validateCourse(req.body);
    if (error) return (res.status(400).send(error.details[0].message));

    course.name = req.body.name
    res.send(course);
});

//Delete course

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(400).send(`The course with the ID number ${req.params.id}  was not found`)

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].details);

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.status(400).send(course)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`))

