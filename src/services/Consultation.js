import mongoose from "mongoose";
import consultation from "../models/consultation.js";

class Consultation {
  async Create({ name, email, description, cpf, date, time }) {
    try {
      const data = new consultation({
        name,
        email,
        description,
        cpf,
        date,
        time,
        finished: false,
      });
      await data.save();
    } catch (err) {
      throw new Error("Não foi possivel adicionar a consulta");
    }
  }
  async FindAll() {
    try {
      const data = consultation.find();
      return data;
    } catch (err) {
        console.log(err)
      throw new Error("Não foi possivel retornar as consultas");
    }
  }
}

export default new Consultation();
