import React, { Component } from 'react';
const firebase = require('firebase');
const uuid = require('uuid');

// Initialize Firebase
var config = {
  youApiConfigHere: ''
};
firebase.initializeApp(config);

export default class Usurvey extends Component {

  nameSubmit(e) {
    var studentName = this.refs.name.value;
    this.setState({
      studentName: studentName
    }, () => {
      console.log(this.state);
    });
  }

  answerSelected(e) {
    var answers = this.state.answers;
    if (e.target.name === 'answer1') {
      answers.answer1 = e.target.value;
    } else if (e.target.name === 'answer2') {
      answers.answer2 = e.target.value;
    } else if (e.target.name === 'answer3') {
      answers.answer3 = e.target.value;
    }
    this.setState({answers: answers}, () => {
      console.log(answers);
    });
  }

  questionSubmit() {
    firebase.database().ref('uSurvey' + this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }

  constructor() {
    super();

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  render() {
    var studentName;
    var questions;
    if(this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName =
      <div>
        <h1>What's your name?</h1>
        <form onSubmit={this.nameSubmit}>
          <input type="text" ref="name" placeholder="Your name" />
        </form>
      </div>;
      questions = ''
    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName =
      <h1>Welcome to Usurvey, {this.state.studentName}!</h1>
      questions =
      <div>
        <h2>Here are some questions.</h2>
        <form onSubmit={this.questionSubmit}>
          <label>What kind of courses do you like?</label>
          <input type="radio" value="technology" name="answer1" onChange={this.answerSelected} />Tech
          <input type="radio" value="design" name="answer1" onChange={this.answerSelected} />Design
          <input type="radio" value="marketing" name="answer1" onChange={this.answerSelected} />Marketing

          <label>What kind of movies do you like?</label>
          <input type="radio" value="drama" name="answer2" onChange={this.answerSelected} />drama
          <input type="radio" value="comedy" name="answer2" onChange={this.answerSelected} />comedy
          <input type="radio" value="western" name="answer2" onChange={this.answerSelected} />western

          <label>Helpful?</label>
          <input type="radio" value="yes" name="answer1" onChange={this.answerSelected} />Yes
          <input type="radio" value="no" name="answer3" onChange={this.answerSelected} />No

          <input type="submit" value="Submit" />

        </form>
      </div>
    } else if (this.state.isSubmitted === true) {
      studentName = <h1>Thank you!</h1>
    }
    return(
      <div>
        {studentName}
        -------------
        {questions}
      </div>
    )
  }
}
