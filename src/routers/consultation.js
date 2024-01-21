import express from 'express'
const Router = express.Router()

import ConsultationController from '../controllers/Consultation.js'

Router.get('/', ConsultationController.GetAll)
Router.get('/:id', ConsultationController.GetOne)
Router.get('/:id/finished', ConsultationController.Finished)
Router.get('/search/:text', ConsultationController.SearchByText);

Router.post('/', ConsultationController.Register)

export default Router