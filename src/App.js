import React from 'react';
import {render} from 'react-dom';
import Moment from 'moment';
import Header from'./Header';
import Affirmation from'./Affirmation';
import Challenge from'./Challenge';
import Footer from'./Footer';
import $ from 'jquery';
import marked from 'marked'
import puppies from './images'

class App extends React.Component {
  state = {
    date: Moment().format('MMMM Do YYYY, h:mm a'),
    temp: null,
    icon: null,
    title: null,
    question: null,
    projectId: null,
    solutionId: null,
    dmid: null,
    adjective: null,
    puppy: null,
    passed: false,
    reason: null,
  }
  getWeather = () => {
    $.get('http://api.openweathermap.org/data/2.5/weather?id=5368361&appid=79bcc7a21cd1451a5d8bcc641220ef70&units=imperial', (data) => {
      var temp = Math.floor(data.main.temp);
      var icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      this.setState({temp: temp, icon: icon});
    });
  }
  getAdjective = () => {
    var adjectives = ['n awesome', 'n amazing', ' kick-ass', ' freakin awesome', ' boss', ' great', ' fantastic', ' wonderful', ' fricking fantasic', ' fantabulous']
    var index = Math.floor(Math.random()*adjectives.length);
    console.log('in get adjectives: ', adjectives[index])
    this.setState({adjective: adjectives[index]})
  }
  getPuppy = () => {
    var index = Math.floor(Math.random()*puppies.length);
    console.log('in get puppy: ', puppies[index])
    this.setState({puppy: puppies[index]}, () => {localStorage.puppy = puppies[index]});
  }
  checkSolution = (e) => {
    e.preventDefault();
    console.log('Check Solution')
    var answer = e.target.children[0].value
    console.log(e.target.children[0].value);
    $.ajax({
      method: 'POST',
      url: `https://www.codewars.com/api/v1/code-challenges/projects/${this.state.projectId}/solutions/${this.state.solutionId}/attempt`,
      data: {code: answer},
      beforeSend: ( xhr ) => {
        xhr.setRequestHeader('Authorization', 'DPKPgUrPnQ3itPPMq2Gm');
      },
      success: (data) => {
        console.log('dmid: ', data.dmid)
        this.setState({dmid: data.dmid}, () => setInterval(() => {this.pullSolution()}, 1500));
      },
      error: (err) => {
        console.log('error: ', err);
      }
    });
  }
  pullSolution = (e) => {
    console.log('PULLING SOLUTION')
    $.ajax({
      method: 'GET',
      url: `https://www.codewars.com/api/v1/deferred/${this.state.dmid}`,
      beforeSend: ( xhr ) => {
        xhr.setRequestHeader('Authorization', 'DPKPgUrPnQ3itPPMq2Gm');
      },
      success: (data) => {
        console.log(data)
        this.setState({
          passed: data.passed,
          reason: data.output[0]
        }, () => localStorage.passed = this.state.passed)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  componentDidMount = () => {

    setInterval(() => {
      this.setState({date: Moment().format('MMMM Do YYYY, h:mm a')});
    }, 60000);
    this.getWeather();
    setInterval(() => {
      this.getWeather();
    }, 180000);
    this.getAdjective();


    if(localStorage.evilCorpDate !== Moment().format('MMMM Do YYYY')) {
      localStorage.evilCorpDate = Moment().format('MMMM Do YYYY')
      this.getPuppy();
      $.ajax({
        method: 'POST',
        url: 'https://www.codewars.com/api/v1/code-challenges/javascript/train',
        beforeSend: ( xhr ) => {
          xhr.setRequestHeader('Authorization', 'DPKPgUrPnQ3itPPMq2Gm');
        },
        success: (data) => {
          var obj = {
            title: marked(data.name),
            question: marked(data.description),
            projectId: data.session.projectId,
            solutionId: data.session.solutionId,
          }
          this.setState(obj, () => {
            localStorage.evilTitle = marked(data.name),
            localStorage.evilQuestion = marked(data.description),
            localStorage.evilProject = data.session.projectId,
            localStorage.evilSolution = data.session.solutionId,
            localStorage.adjective = this.state.adjective,
            localStorage.puppy = this.state.puppy,
            localStorage.passed = null
          });
        }
      });
    } else {
      console.log('in componentDidMount: ', this.state.adjective);
      this.setState({
            title: localStorage.evilTitle ,
            question: localStorage.evilQuestion,
            projectId: localStorage.evilProject,
            solutionId: localStorage.evilSolution,
            passed: localStorage.passed,
            puppy: localStorage.puppy
          });

    }
  }

  render() {
    return (
      <div id='App'>
          <Header date={this.state.date} temp={this.state.temp} icon={this.state.icon} />
          <Affirmation adjective={this.state.adjective} />
          {!JSON.parse(localStorage.passed) ? <div><Challenge passed={this.state.passed} reason={this.state.reason} title={this.state.title} question={this.state.question} checkSolution={this.checkSolution}/>
          <Footer puppy={this.state.puppy}/></div> : <div style={{textAlign:'center'}}><img style={{height: '300px'}} src={localStorage.puppy}/><h1>Great job, puppy saved! </h1></div>}
          <a href='https://overreact.herokuapp.com/'><p id="OverReact">Powered by OverReact</p></a>
      </div>
    )
  }
}

module.exports = App;

render(<App />, document.getElementById('main-container'));
