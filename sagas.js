import {put, call, take, fork, all} from 'redux-saga/effects'

const fetchQuiz = () => {
  return fetch('https://opentdb.com/api.php?amount=10').then(function(response) {
      return response.json().then(function(json) {
          return json.results;
      })
  })
};

function* getQuizData(){
  try{
    const quiz = yield fetchQuiz();
    yield put({type: 'QUIZ_LOADED', data: quiz, loading: false})
  }catch(error){
    yield put({type: 'QUIZ_ERROR', error})
  }
}

export function* loadQuiz(){
  while(true){
    yield take('GET_QUIZ')
    yield call(getQuizData)
  }
}

export default function* rootSaga(){
  yield all([
    fork(loadQuiz)
  ])
}