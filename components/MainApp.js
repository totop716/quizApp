import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import QuizPage from './QuizPage';
import { styles } from '../styles/mainApp';

export class MainApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      quizStarted : false
    }
  }

  startQuiz = () => {
    this.setState({quizStarted: true});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.quizStarted && 
          <QuizPage />
        }
        {!this.state.quizStarted && 
          <TouchableOpacity onPress={this.startQuiz} style = {styles.quizButton}><Text style={styles.quizButtonText}>Start Quiz</Text></TouchableOpacity>
        }
      </View>
    );
  }
}