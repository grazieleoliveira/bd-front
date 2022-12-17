import { request } from "../utils/request";

export default class PokemonService {
  static getPokemons(queryString: string) {
    return request({
      url: `/pokemon${queryString}`,
      method: "GET",
    });
  }

  static getEggGroups() {
    return request({
      url: "/egg-group/",
      method: "GET",
    });
  }

  static getTypes() {
    return request({
      url: `/types/`,
      method: "GET",
    });
  }

  static postPokemon() {
    return request({
      url: "/pokemon/",
      method: "POST",
    });
  }

  static getPokemonByEggGroupId(eggGroupId: number) {
    return request({
      url: `/pokemon?eggGroupId=${eggGroupId}`,
      method: "GET",
    });
  }

  static getPokemonByTypeId(type: number) {
    return request({
      url: `/pokemon?typesIds=[${type}]`,
      method: "GET",
    });
  }


}