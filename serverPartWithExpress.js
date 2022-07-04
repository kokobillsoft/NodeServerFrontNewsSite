const express = require('express');
const morgan = require('morgan');
const { urlencoded } = require('body-parser');
const { title } = require('process');
const mongoose = require('mongoose');
var methodOverride = require('method-override');  // method for override flag
const postRouter = require('./routes/post-routes');
const contactRouter = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs'); //подключение к приложению шаблнизатора для динамической отрисовки

const PORT = 3000;
const DB ='mongodb+srv://kokobillApp1:dnqdLEh7555545@cluster0.jcpdr.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(DB)
    .then((res) => console.log('Connect to DB'))
    .catch((error) => console.log(error));



app.listen (PORT, (error) => {
    error ? console.log(error) : console.log(`Server starting on port ${PORT}`); 
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // добавление логирования в консоли

app.use(express.urlencoded({extended:false})); //добавление парсера для страницы (что б post запросом добавлять данные)

app.use(express.static('styles')); //подключение к приложению папки со стилями

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});

app.get('about-us', (req, res) => {
    res.redirect('/contacts');
});

app.use(postRouter);
app.use(contactRouter);

app.use((req, res) => {
    const title = 'Error';
    res
    .status(404)
    .render(createPath('error'), {title});
});