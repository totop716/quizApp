export const loadQuiz = (loading) => {
    return {
        type: "GET_QUIZ",
        loading
    }
}

export const quizLoaded = (data, loading) => {
    return {
        type: "QUIZ_LOADED",
        data,
        loading
    }
}