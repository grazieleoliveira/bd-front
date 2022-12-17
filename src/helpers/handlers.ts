import { ESearchType } from "../pages/listPokemon";

export const handleUrlQueryParamsByType = (type: ESearchType, queryParamId?: number) => {

    if(type === ESearchType.TYPE && queryParamId) {
        return `?typesIds=[${queryParamId}]`
    }
    if(type === ESearchType.EGG_GROUP && queryParamId) {
        return `?eggGroupId=${queryParamId}`
    }
    return '/'

}