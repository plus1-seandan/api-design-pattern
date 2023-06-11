interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

interface BaseRecord {
    id: string;
}

interface Database<T extends BaseRecord>{
    set(newValue: T): void;
    get(id: string): T | undefined;

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;
}

//Observer Pattern
type Listener<EventType> = (ev: EventType) => void;

function createObserver<EventType>(): {
    subscribe: (listener: Listener<EventType>) => () => void;
    publish: (event: EventType) => void;
} {
    let listeners: Listener<EventType>[] = [];
    return {
        subscribe: (listener: Listener<EventType>): () => void => {
            listeners.push(listener);
            return () => {
            listeners = listeners.filter(l => l !== listener)
            }
        },
        publish: (event: EventType) => {
            listeners.forEach((l) => l(event));
        }
    }
} 

interface BeforeSetEvent<T> {
    value: T;
    newValue: T;
}

interface AfterSetEvent<T> {
    value: T;
}

//factory pattern
export function createDatabase<T extends BaseRecord>(){
    
    class InMemoryDatabase implements Database<T> { 
    //Singleton Pattern
    private db: Record<string, T> = {};

    static instance:InMemoryDatabase = new InMemoryDatabase();

    private constructor() {}

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    public set(newValue: T): void {
        this.beforeAddListeners.publish({
        newValue, 
        value: this.db[newValue.id]
        })
        this.db[newValue.id] = newValue;

        this.afterAddListeners.publish({
        value: newValue
        });
    };
    public get(id: string): T {
        return this.db[id];
    }
    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
        return this.beforeAddListeners.subscribe(listener)
    }
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
        return this.afterAddListeners.subscribe(listener)
    }
}
    return InMemoryDatabase;
}

const PokemonDB = createDatabase<Pokemon>();
PokemonDB.instance.onBeforeAdd(({
    newValue,
    value
}) => {
    console.log({newValue, value});
});
PokemonDB.instance.onAfterAdd(({
    value
}) => {
    console.log(value);
});

PokemonDB.instance.set({
    id: "Bulbasaur",
    attack: 50,
    defense: 10,
})

PokemonDB.instance.set({
    id: "Spinosaur",
    attack: 100,
    defense: 20,
})

PokemonDB.instance.set({
    id: "Spinosaur",
    attack: 200,
    defense: 20,
})

//console.log(PokemonDB.instance.get("Bulbasaur"))