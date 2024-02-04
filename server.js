const express = require ('express');
const connectDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require("./routes/homeRoutes");
const cors = require('cors');

require('dotenv/config');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/home', homeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server listening on port : ${PORT}`);
});