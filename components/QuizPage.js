import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { loadQuiz } from '../actions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import { styles } from '../styles/quizPage';

class QuizPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      answers: [],
      answer_selected : 0,
      question_index: 0,
      answer_results: [],
      correct_answers_array: [],
      test_finished: false,
      test_mark: 0,
      test_time: 0,
      time_second: 0,
    }
  }

  componentDidMount() {
    this.props.getQuiz();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.quizData.length > 0){
      let answers = nextProps.quizData[0].incorrect_answers;
      let correct_answer_array = this.state.correct_answers_array;
      let correct_answer_index = Math.floor(Math.random() * (answers.length + 1));
      answers.splice(correct_answer_index, 0, nextProps.quizData[0].correct_answer);
      this.setState({answers});
      correct_answer_array.push(correct_answer_index);
      this.setState({correct_answer_array});

      this.interval = setInterval(
        () => this.setState({ time_second: this.state.time_second + 1 }),
        1000
      );

    }
  }

  nextQuestion = () => {
    const correct_answer = this.state.correct_answer_array[this.state.question_index];
    let time_second = this.state.time_second;
    let test_time = this.state.test_time;
    test_time += time_second;
    this.setState({test_time});
    clearInterval(this.interval);
    this.setState({time_second: 0});
    
    this.setState({question_index: this.state.question_index + 1});

    let answer_results = this.state.answer_results;
    if(answer_results.length <= this.state.question_index){
      if(correct_answer === this.state.answer_selected){
        answer_results.push(true);
      }else{
        answer_results.push(false);
      }
    }else{
      if(correct_answer === this.state.answer_selected)
        answer_results[this.state.question_index] = true;
      else
        answer_results[this.state.question_index] = false;
    }

    let correct_answer_array = this.state.correct_answers_array;
    let answers = this.props.quizData[this.state.question_index + 1].incorrect_answers;
    if(correct_answer_array.length <= this.state.question_index + 1){
      let correct_answer_index = Math.floor(Math.random() * (answers.length + 1));
      answers.splice(correct_answer_index, 0, this.props.quizData[this.state.question_index + 1].correct_answer);
      correct_answer_array.push(correct_answer_index);
      this.setState({correct_answer_array});
    }
    this.setState({answers});
    this.setState({answer_results});
    this.interval = setInterval(
      () => this.setState({ time_second: this.state.time_second + 1 }),
      1000
    );
  }

  selectAnswer = (value) => {
    this.setState({answer_selected: value});
  }

  playAgain = () => {
    this.setState({question_index : 0});
    this.setState({test_finished: false});
    clearInterval(this.interval);
    this.setState({time_second: 0});
    this.setState({test_time: 0});
    this.interval = setInterval(
      () => this.setState({ time_second: this.state.time_second + 1 }),
      1000
    );

    let answers = this.props.quizData[0].incorrect_answers;
    this.setState({answers});
  }

  submitResult = () => {
    let time_second = this.state.time_second;
    let test_time = this.state.test_time;
    test_time += time_second;
    this.setState({test_time});

    const correct_answer = this.state.correct_answers_array[this.state.question_index];
    let answer_results = this.state.answer_results;
    if(correct_answer === this.state.answer_selected){
      answer_results.push(true);
    }else{
      answer_results.push(false);
    }

    this.setState({answer_results});
    const correct_answer_array = this.state.answer_results.filter(value => value === true);
    const test_mark = correct_answer_array.length / 2;
    this.setState({test_finished: true});
    this.setState({test_mark});
  }

  render() {
    const Entities = require('html-entities').Html5Entities;
    const entities = new Entities();

    const radio_props = this.state.answers.map((value, index) => {
      return {label: entities.decode(value), value: index}
    });

    return (
      <View style={styles.container}>
        {
          this.props.loading &&
            <Text>Loading...</Text>
        }
        {
          !this.props.loading && this.props.quizData.length > 0 && !this.state.test_finished &&
            <View>
              <Text style={styles.questionText}>
              {
                (this.state.question_index + 1) + '. ' + entities.decode(this.props.quizData[this.state.question_index].question)
              }
              </Text>
              <View style={styles.quizTimeContainer}>
                <Text style={styles.quizTime}>{ Math.floor(this.state.time_second / 60) < 10 ? '0' + Math.floor(this.state.time_second / 60) : Math.floor(this.state.time_second / 60) }</Text><Text> : </Text><Text style={styles.quizTime}>{this.state.time_second % 60 < 10 ? '0' + this.state.time_second % 60 : this.state.time_second % 60}</Text>
              </View>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={this.selectAnswer}
              />
              <View style={styles.quizbuttonContainer}>
              {
                this.state.question_index < 9 &&
                 <TouchableOpacity onPress={this.nextQuestion} style={styles.quizButton}><Text style={styles.quizButtonText}>Next Question</Text></TouchableOpacity>
              }
              {
                this.state.question_index == 9 &&
                 <TouchableOpacity onPress={this.submitResult} style={styles.quizButton}><Text style={styles.quizButtonText}>Finish</Text></TouchableOpacity>
              }
              </View>
            </View>
        }
        {
          this.state.test_finished && 
            <View>
              <View style = {styles.questionResultContainer}>
                <Text style = {styles.questionText}>You finished the test</Text>
              </View>
              <View style = {styles.questionResultContainer}>
                <Text style = {styles.questionText}>Your mark is </Text>
                <Text style = {[styles.questionText, styles.boldText]}>{this.state.test_mark}</Text>
              </View>
              <View style = {styles.questionResultContainer}>
                <Text style = {styles.questionText}>Time: </Text>
                { this.state.test_time >= 60 && 
                  <View style ={styles.resultTimeContainer}>
                    <Text style = {[styles.questionText, styles.boldText]}>{Math.floor(this.state.test_time / 60)}</Text>
                    <Text style = {styles.questionText}>m </Text>
                  </View>
                }
                <Text style = {[styles.questionText, styles.boldText]}>{this.state.test_time % 60}</Text>
                <Text style = {styles.questionText}>s </Text>
              </View>
              <TouchableOpacity onPress={this.playAgain} style = {styles.quizButton}><Text style={styles.quizButtonText}>Play Again</Text></TouchableOpacity>
            </View>
        }
      </View>
    );
  }
}

QuizPage.propTypes = {
    getQuiz: PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    loading: state.getQuizData.loading,
    quizData: state.getQuizData.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuiz: () => {
      dispatch(loadQuiz());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage)