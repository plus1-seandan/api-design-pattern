export interface Observer {
    update(data: any): void;
}

export class LoggingObserver implements Observer {
    update(data: any): void {
      console.log("Received data:", data);
    }
}