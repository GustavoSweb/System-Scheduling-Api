import ConsultationServices from "../services/Consultation.js";
import Validation from "../utils/Validation.js";
import statusCode from "../utils/httpStatusCode.js";
const {INTERNAL_SERVER_ERROR, OK} = statusCode
class Consultation {
  async Register(req, res) {
    try {
      const { name, email, description, cpf, date, time } = req.body;
      new Validation({ name, email, description, cpf, date, time }).Check()
      await ConsultationServices.Create({ name, email, description, cpf, date, time });
      res.sendStatus(OK)
    } catch (err) {
      if(err?.status) return res.status(err.status).json({err:err.message})
      res.sendStatus(INTERNAL_SERVER_ERROR)
  }
}
async GetAll(req, res){
  try{
    const data = await ConsultationServices.FindAll()
    res.json(data)
  }catch(err){
    res.sendStatus(INTERNAL_SERVER_ERROR)
    }
  }
}

export default new Consultation();
