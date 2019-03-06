const express = require('express');
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const GraphQLHttp = require('express-graphql');
const schema = require('./graphql/public/schema')

const app = express();


// Connect to MongoDB Database
mongoose.connect(
    'mongodb://mrrbrilliant:Aa-098370921@ds161345.mlab.com:61345/araahaan',
    {
        useNewUrlParser: true
    },
    (err) => {
        if (err) {
            console.log('Connection Error!!!', err)
        } else {
            console.log('Connected Successfully...');
        }
    }
);

// HTTP Traffic Logger
// Show log in console
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}))

// log all requests to access.log
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))

// Production Only
//
// const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000', 'http://localhost'];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS '))
//         }
//     }
// }
// app.use(cors(corsOptions)); 

// Dev Only Cors
app.use(cors('*'));

app.use('/graphql', GraphQLHttp({
    graphiql: true,
    schema: schema
}))

app.get('/', (req, res) => {
    res.send('Hello');
    res.end();
});

const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));