import {StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
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
    }
  });