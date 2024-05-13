import { Router, Request, Response } from "express";
import CarController from "./controller/car.controllers";


const router = Router()
const carController = new CarController()

router.post('/createCar', async (req: Request, res: Response) => {
    try {
        const response = await carController.createCarData(req.body)
        res.status(response.code).json(response)

    }catch(error){
        res.status(500).json({
            ok: false,
            message: "internal server error",
            error
        })
    }
})

router.get('/getCar/:_id', async (req: Request, res: Response) =>{
    const _id: string = req.params._id
    try {
        const response = await carController.getCarId(_id)
        res.status(response.code).json(response)

        }catch(error){
        res.status(500).json({
          ok:false, 
          message: "internal server error",
          error 
        })
    }
})

router.put('/putCar/:id', async (req: Request, res: Response) =>{
    const {id} = req.params;
    const data = req.body;
    try{
        const response = await carController.updateCarData(String(id),data);
        return res.status(response.code).json(response);

        }catch(error){
            res.status(500).json({
                ok:false,
                message: "Internal server error",
                error
            })
        }
})
router.delete('/deleteCar/:id', async( req: Request, res: Response) =>{
     const {id} = req.params
     

     try {
        const response = await carController.deleteCar(String(id))
        res.status(response.code).json(response)

     }catch(error){
        res.status(500).json({
                ok: false,
                message: "Internal server error",
                error
        })
}
})
export default router