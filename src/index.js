require('dotenv').config();
require('./database');

const port = process.env.PORT
const app = require('./app');

app.listen(port, () => {
    console.log('Server listen on port', port);
});