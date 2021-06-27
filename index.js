const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose
.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database Connected');
})
.catch((err) => {
    if(err) {
        console.log('Unable to connect to Database');
    }
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));