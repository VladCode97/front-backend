import PokedexAPI from "pokedex-promise-v2";
import { HttpService } from "./http.service";
import { IPokemon } from "../../../domain/models/pokemon.model";
import { URL_ENVIROMENT } from "../../../utils/enviroment";

export class PokemonService {
  private static pokemonService: PokemonService;
  private static pokedex: PokedexAPI;
  private static httpService: HttpService;

  private constructor() {}

  static get Instance(): PokemonService {
    if (PokemonService.pokemonService === undefined) {
      PokemonService.pokemonService = new PokemonService();
      PokemonService.pokedex = new PokedexAPI();
      PokemonService.httpService = HttpService.Instance;
    }
    return PokemonService.pokemonService;
  }

  async getAllPokemon() {
    try {
      return await PokemonService.pokedex.getPokemonsList({
        limit: 1281,
        offset: 0,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async addPokemon(pokemon: IPokemon, token: string) {
    try {
      return (
        await PokemonService.httpService.post(
          `${URL_ENVIROMENT}/favorites`,
          pokemon,
          token
        )
      ).data;
    } catch (exception) {
      throw exception;
    }
  }

  async viewPokemonByUser(idUser: number, token: string) {
    try {
      return (
        await PokemonService.httpService.get(
          `${URL_ENVIROMENT}/favorites/${idUser}`,
          token
        )
      ).data;
    } catch (exception) {
      throw exception;
    }
  }
  async deletePokemonByUser(
    id: string,
    token: string
  ) {
    try {
      return (
        await PokemonService.httpService.delete(
          `${URL_ENVIROMENT}/favorites/${id}`,
          token
        )
      ).data;
    } catch (exception) {
      throw exception;
    }
  }
}
