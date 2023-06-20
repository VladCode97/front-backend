import {HttpService} from "../communication/services/http.service";
import {IPokemon} from "../../domain/models/pokemon.model";

const httpService = HttpService.Instance;
export async function handlerGetForm(urlFormsPokemon: string): Promise<string> {
    try {
        const response = (await (httpService.get(urlFormsPokemon))).data
        const {forms} = response;
        return forms[0].url;
    } catch (exception) {
        throw exception;
    }
}

export async function handlerGetPokemon(urlPokemon: string): Promise<IPokemon> {
    try {
        const response = (await (httpService.get(urlPokemon))).data
        let pokemon: IPokemon;
        pokemon = {
            name: response.name,
            photo: response.sprites.front_default,
            versionPokemon: response.version_group.name
        };
        return pokemon;
    } catch (exception) {
        throw exception;
    }
}