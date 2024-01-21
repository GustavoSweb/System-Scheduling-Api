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
    if(err?.status) return res.status(err.status).json({err:err.message})
    res.sendStatus(INTERNAL_SERVER_ERROR)
    }
  }
async GetOne(req, res){
  try{
    const {id} = req.params
    const data = await ConsultationServices.FindOne(id)
    res.json(data)
  }catch(err){
    if(err?.status) return res.status(err.status).json({err:err.message})
    res.sendStatus(INTERNAL_SERVER_ERROR)
    }
  }
async Finished(req, res){
  try{
    const {id} = req.params
    await ConsultationServices.Finished(id)
    res.sendStatus(200)
  }catch(err){
    if(err?.status) return res.status(err.status).json({err:err.message})
    res.sendStatus(INTERNAL_SERVER_ERROR)
}
}
async SearchByText(req, res){
  var {text} = req.params
  try{
    var textSimplifyArray = []
    text = text.toUpperCase().replace(/@.+\..+$/, '')
    text = text.split('.').join('-').split(' ').join('-').split('-')
    textSimplifyArray.push(...text)
    console.log(textSimplifyArray)
    
    const data = await ConsultationServices.FindIndiceText(textSimplifyArray)
    res.status(200).json(data)
    }catch(err){
      console.log(err)
      if(err?.status) return res.status(err.status).json({err:err.message})
      res.sendStatus(INTERNAL_SERVER_ERROR)
    }
  }
}

export default new Consultation();
