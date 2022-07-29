export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteHeroById = (id) => {
    return {
        type: 'DELETE_HERO_BY_ID',
        payload: id
    }
}

export const addHero = (heroes) => {
    return {
        type: 'ADD_HERO',
        payload: heroes
    }
}