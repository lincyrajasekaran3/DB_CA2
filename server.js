const express= require('express');
const mongoose= require('mongoose');
const restaurantRoutes = require('./routes/restaurant');
require('dotenv').config();

const app= express();
app.use(express.json());

const PORT=process.env.PORT||5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected Successfully'))
.catch((err)=>console.error('MongoDB connection Failed',err));

app.use('/restaurants', restaurantRoutes);

app.use((req,res)=>{
    res.status(404).send('Routes not found');
})

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`));