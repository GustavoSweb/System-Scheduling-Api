import statusCode from "../httpStatusCode.js";
const {BAD_REQUEST, CONFLICT, NOT_FOUND} = statusCode
class StatusError extends Error{
    constructor(message){
        super(message)
    }
     NotValid() {
        this.name = "NotValid";
        this.status = BAD_REQUEST
      }
       NotExistValue() {
        this.status = NOT_FOUND
        this.name = "NotExistValue";
      }
       ConflictData() {
        this.status = CONFLICT
        this.name = "ConflictData";
      }
}

export default StatusError