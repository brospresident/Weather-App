import express from 'express';
import IController from './controller';
import axios from 'axios';

export class WeatherController implements IController {
    public router: express.Router;
    public path: string;

    constructor() {
        this.router = express.Router();
        this.path = '/weather';
        this.init();
        console.log('Initialized WeatherController');
    }

    private init(): void {
        this.router.get(this.path, this.getWeather);
    }

    private async getWeather(req: express.Request, res: express.Response): Promise<void> {
        const { long, lat } = req.query;
        if (!long || !lat) {
            res.status(400).json({
                error: 'Longitude and Latitude required'
            });
            return;
        }
        
        const weather = await axios.get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`);
        res.status(200).json(weather.data);
    }
}
