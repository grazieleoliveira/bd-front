export enum EPages {
    LIST_POKEMON = 'ListPokemon',
    MAIN = 'Main',
    MODIFY_POKEMON = 'ModifyPokemon',
    REGISTER_POKEMON = 'RegisterPokemon',

}

export interface IPageDefaultProps {
    setPage: React.Dispatch<React.SetStateAction<EPages>>
    type?: EPages,
}