const getQuizData = (state = {data:[], loading: false}, action) => {
    switch (action.type){
        case 'QUIZ_LOADED':
            return {...state, data: action.data, loading: action.loading};
        case 'QUIZ_ERROR':
            return {...state, error: action.error, loading: action.loading};
        case 'GET_QUIZ':
            return {...state, loading: true};
        default:
            return state
    }
}

export default getQuizData