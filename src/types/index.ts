export enum EPages {
    LIST_POKEMON = 'ListPokemon',
    MAIN = 'Main',
    MODIFY_POKEMON = 'ModifyPokemon',
}

export interface IPageDefaultProps {
    setPage: React.Dispatch<React.SetStateAction<EPages>>
}