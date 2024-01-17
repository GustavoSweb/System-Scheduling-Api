import express from 'express'
const Router = express.Router()

import ConsultationController from '../controllers/Consultation.js'

Router.get('/', ConsultationController.GetAll)
Router.post('/', ConsultationController.Register)

export default Router