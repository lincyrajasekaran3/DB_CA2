const express = require('express');
const router= express.Router();
const Restaurant = require('../models/Restaurant');

router.post('/', async (req,res) => {
    const {name, location, cuisine, rating, menu}= req.body;
    if(!name||!location||!cuisine){
        return res.status(404).send({error:'Missing required fields'});
    }

    try {
        const restaurant = new Restaurant({name, location, cuisine, rating, menu});
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        if(error==='ValidationError'){
            return res.status(400).send({error: `Validation failed: ${error.message}`});
        }
        res.status(500).send({error:'Something went wrong'});
    }
});

router.get('/', async (req,res) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
    } catch (error) {
        res.status(500).send({error:'Something went wrong'});
    }
});

router.get('/:id', async (req,res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).send({error:'Restaurant not found'});
        res.send(restaurant);
    } catch (error) {
        res.status(400).send({error:'Invalid restaurant ID'})
    } 
});

router.put('/:id', async (req,res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!restaurant) return res.status(404).send({error:'Restaurant not found'});
        res.send(restaurant);
    } catch (error) {
        if(error==='ValidationError'){
            return res.status(400).send({error: `Validation failed: ${error.message}`});
        }
        res.status(500).send({error:'Something went wrong'});
    } 
});

router.delete('/:id', async (req,res) => {
    try {
        const restaurant= await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) return res.status(404).send({error:'Restaurant not found'});
        res.send({message:'Restaurant deleted successfully'});
    } catch (error) {
        res.status(400).send({error:'Invalid restaurant ID'})
    }
});

module.exports=router;