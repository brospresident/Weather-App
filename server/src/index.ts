import express from 'express';
import { WeatherController } from './weather.controller';
import IController from './controller';
import cors from 'cors';

class App {
    private app: express.Application;
    public static appInstance: App;

    private port: number = 3001;

    private constructor (controllers: IController[] = []) {
        this.app = express();

        this.app.use(cors());

        this.setControllers(controllers);
     }

    public listen (): void {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

    public static getInstance (controllers: IController[]): App {
        if (!App.appInstance) {
            App.appInstance = new App(controllers);
        }
        return App.appInstance;
    }

    private setControllers (controllers: IController[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    
}

const appInstance = App.getInstance([
    new WeatherController()
]);
appInstance.listen();
