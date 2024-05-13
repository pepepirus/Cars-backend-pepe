import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    cylinders: {type: Number}, 
    model: {type: String}, 
    year: {type: Number},
    company: {type: String},
    serialNumber: {type: String},
},{collection: 'cars'})

const CarModel = mongoose.model('Cars', carSchema);

export default CarModel 