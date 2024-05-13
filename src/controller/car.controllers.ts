import {ICar} from "../interface/car.interface";
import IResponse from "../interface/response.interface";
import CarModel from "../models/car.models";
import Server from "../class/server.class";

export default class CarController{ 

    private server: Server
    private connection = null
  
    constructor() {
      this.server = Server.instance
    }

    async createCarData (carData: ICar): Promise <IResponse>{
        try{ 
            this.connection = this.server.getApp().locals.dbConnection
            const existingCar = await CarModel.findOne({serialNumber: carData.serialNumber})
            if (existingCar) {
                return { ok: false, 
                    message: "A car with the same model already exist", 
                    response: null , 
                    code: 400 
                }} 


            const createdCar = await CarModel.create(carData)
            return {
                ok: true, 
                message: "car created", 
                response: createdCar, 
                code: 200}
            
            } catch (error){
            return {
                ok: false, 
                message: "error creating car", 
                response: error, 
                code: 500}
            }finally{
                if (this.connection){
                    await this.server.getApp().locals.dbConnection.release(this.connection)
                }
            }
    }
    
 
    async getCarId (id: String): Promise <IResponse> {
        try{
                this.connection = this.server.getApp().locals.dbConnection

            const carFound = await CarModel.findOne({_id:id})
            return {
                ok: true,
                message: " id car  is correct",
                response: carFound,
                code: 200
            }
        } catch (error){
            return {
                ok: false,
                message: "error server",
                response: error,
                code: 500
            }                 
        }finally {
            if (this.connection) {
              await this.server.getApp().locals.dbConnection.release(this.connection)
            }
          }
    }

    async updateCarData (id: string, updateCar: ICar): Promise <IResponse> {
        
            try {
                this.connection = this.server.getApp().locals.dbConnection

                
                const carFound = await CarModel.findOneAndUpdate({_id:id}, updateCar); 
                
                if(!updateCar){
                    return{
                        ok: false,
                        message: "data not found",
                        response: null,
                        code: 404};
                }
                return{
                    ok:true,
                    message: "updated data",
                    response: carFound,
                    code: 200
                }
                
            }catch(error){
                return {
                    ok: false,
                    message: "error server ",
                    response: error,
                    code: 500
                }            
            } finally {
      if (this.connection) {
        await this.server.getApp().locals.dbConnection.release(this.connection)
      }
    }
        }   
    
     async deleteCar (id: string): Promise <IResponse> {
        
            try{
                this.connection = this.server.getApp().locals.dbConnection
                
                const eliminitCar = await CarModel.findOneAndDelete({_id:id});

                    if (!eliminitCar){
                        return{
                            ok: false,
                            message: "carro no eliminado",
                            response: null,
                            code: 404
                        }
                    }

                    return{
                        ok: true,
                        message: "cart successfully deleted",
                        response: eliminitCar,
                        code: 200
                    }

                }catch (error){
                    return{
                        ok: false,
                        message: "server error",
                        response: error,
                        code: 500
                    }
                }finally {
                        if (this.connection) {
                          await this.server.getApp().locals.dbConnection.release(this.connection)
                        }
                    }
        }
}
