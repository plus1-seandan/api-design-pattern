import { Observer } from "./observer";

interface BaseData {
    id: string
}

export interface PokemonData {
    id: string;
    attack: number;
    defense: number;
}

interface Database<T extends BaseData> {
    set(value: T): void;
    get(id: string): T | undefined;
}


export function createDatabase<T extends BaseData>() {
    class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {};
        private observers: Observer[] = [];

        public set(value: T): void{
            this.db[value.id] = value;
            this.notifyObservers(value);
        }
    
        public get(id: string): T | undefined {
            const value = this.db[id];
            this.notifyObservers(value);
            return value;
        }

        public addObserver(observer: Observer): void {
            this.observers.push(observer);
          }
        
          public removeObserver(observer: Observer): void {
            const index = this.observers.indexOf(observer);
            if (index > -1) {
              this.observers.splice(index, 1);
            }
          }
        
          private notifyObservers(data: T | undefined): void {
            this.observers.forEach((observer) => {
              observer.update(data);
            });
          }
    }

    const db = new InMemoryDatabase();
    return db;
}