import mongoose from "mongoose";
import consultation from "../models/consultation.js";
import StatusError from "../utils/Error/Error.js";
import slugify from "slugify";


class Consultation {
  async Create({ name, email, description, cpf, date, time }) {
    try {
      const tags = await this.CreateTags({name, email, description, cpf})
      const data = new consultation({
        name,
        email,
        description,
        cpf,
        date,
        time,
        finished: false,
        tags,
        notified: false
      });
      await data.save();
    } catch (err) {
      throw new Error("Não foi possivel adicionar a consulta");
    }
  }
  async FindAll() {
    try {
      const data = await consultation.find()
      return data;
    } catch (err) {
      throw new Error("Não foi possivel retornar as consultas");
    }
  }
  async FindOne(_id) {
    try {
      const data = await consultation.findById(_id);
      if(!data) throw new StatusError('Não foi encontrado nenhuma consulta com esse id').NotExistValue
      return data;
    } catch (err) {
      throw new Error("Não foi possivel retornar as consultas");
    }
  }
  async Finished(_id) {
    try {
      await consultation.findByIdAndUpdate(_id, {finished:true});
    } catch (err) {
      throw new Error("Não foi possivel retornar as consultas");
    }
  }
  async FindIndiceText(query){
    try{
      const data = await consultation.find({ tags: { $all: query }})
      return data;
    }catch (err) {
      throw new Error("Não foi possivel retornar as consultas");
    }
  }
  async CreateTags({cpf, name, email, description}){
    var DATA_TAGS = []
    const CPF_FORMAT = cpf.split('.').join('-').split('-')
    const NAME_UPPER_FORMAT = (slugify(name).toUpperCase()).split('-')
    const EMAIL_UPPER = (slugify(email).toUpperCase())
    const EMAIL_UPPER_FORMAT = EMAIL_UPPER.split('@')[0]
    const DESCRIPTION_UPPER_FORMAT = (slugify(description).toUpperCase()).split('-')
    
    DATA_TAGS.push(...CPF_FORMAT, ...NAME_UPPER_FORMAT, EMAIL_UPPER, EMAIL_UPPER_FORMAT, ...DESCRIPTION_UPPER_FORMAT)
    return DATA_TAGS
  }
}

export default new Consultation();
