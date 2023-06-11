interface BaseData {
    id: number
}

export interface UserData {
    id: number;
    password: number;
    nickname: string;
    followers: number; 
}

interface Database<T extends BaseData> {
    set(value: T): void;
    get(id: number): T | undefined;
}


export function createDatabase<T extends BaseData>() {
    class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {};

        public set(value: T): void{
            this.db[value.id] = value;
        }
    
        public get(id: number): T | undefined {
            return this.db[id];
        }
    }

    const db = new InMemoryDatabase();
    return db;
}