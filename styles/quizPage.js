import {StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingLeft: 20,
    paddingRight: 20
  },

  questionText: {
    fontSize: 15,
    marginBottom: 10,
  },

  quizTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20
  },

  quizTime: {
    fontSize: 13,
    fontWeight: 'bold'
  },

  quizbuttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },

  quizButton: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#ccc',
    width: 150,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },

  quizButtonText: {
    fontSize: 15
  },

  questionResultContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },

  resultTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  
  boldText: {
    fontWeight: 'bold'
  }
});