/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import getQuizData from './reducers'
import { MainApp } from './components/MainApp'
import rootSaga from './sagas'

const middleware = []
const enhancers = []
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)
enhancers.push(applyMiddleware(...middleware))
const store = createStore(
    combineReducers({
        getQuizData }),
    compose(...enhancers))
sagaMiddleware.run(rootSaga)

const App = () =>
  <Provider store={store}>
    <MainApp />
  </Provider>

export default App
