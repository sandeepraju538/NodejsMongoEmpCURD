require('dotenv').config({ path: './config.env' });
const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');
const EmpRoutes = require('./routes/EmpRoutes');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

// express-handlebars configuration or setup
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'hbs');

app.use(express.json());

app.use('/employee', EmpRoutes);
app.get('/', (req, res) => {
    res.send('App started!!!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
