import {Schema, model} from "mongoose";

const SchemaConsultation = new Schema({
    name:String,
    email:String,
    cpf:String,
    description:String,
    date: Date,
    time: String,
    finished: Boolean,
    tags:Array,
    notified: Boolean,
})

const ModelConsultation = model('Consultation', SchemaConsultation)

export default ModelConsultation