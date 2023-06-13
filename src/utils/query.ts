interface Pokemon {
    id: string;
    type: string;
    attack: number;
    defense: number;
}

interface FirePokemon extends Pokemon {
    fireSpecial: number;
}

class FirePokemon implements FirePokemon {
    id: string;
    type: string;
    attack: number;
    defense: number;
    fireSpecial: number;

    constructor(id: string, attack: number, defense: number, fireSpecial: number) {
      this.id = id;
      this.type = "fire";
      this.attack = attack;
      this.defense = defense;
      this.fireSpecial = fireSpecial
    }
}

interface WaterPokemon extends Pokemon {
    waterSpecial: number;
}
  

class WaterPokemon implements WaterPokemon {
    id: string;
    type: string;
    attack: number;
    defense: number;
    waterSpecial: number;

    constructor(id: string, attack: number, defense: number, waterSpecial: number) {
      this.id = id;
      this.type = "water";
      this.attack = attack;
      this.defense = defense;
      this.waterSpecial = waterSpecial
    }
}
  
export class PokemonFactory {
    createPokemon(id: string, type: string, attack: number, defense: number, special: number): Pokemon {
        switch (type.toLowerCase()) {
        case "fire":
            return new FirePokemon(id, attack, defense, special);
        case "water":
            return new WaterPokemon(id, attack, defense, special);
        default:
            throw new Error("Invalid Pokémon type");
        }
    }
}
  