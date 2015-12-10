import React from 'react';
import {render} from 'react-dom';
import Moment from 'moment';
import Header from'./Header';
import Affirmation from'./Affirmation';
import Challenge from'./Challenge';
import Footer from'./Footer';
import $ from 'jquery';
import marked from 'marked'

class App extends React.Component {
  state = {
    date: Moment().format('MMMM Do YYYY, h:mm a'),
    temp: null,
    icon: null,
    title: null,
    question: null,
    projectId: null,
    solutionId: null,
    dmid: null


  }
  getWeather = () => {
    $.get('http://api.openweathermap.org/data/2.5/weather?id=5368361&appid=79bcc7a21cd1451a5d8bcc641220ef70&units=imperial', (data) => {
      var temp = Math.floor(data.main.temp);
      var icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      this.setState({temp: temp, icon: icon});
    });
  }
  checkSolution = (e) => {
    e.preventDefault();
    console.log(e.target.children[0].value);
    $.ajax({
      method: 'POST',
      url: `https://www.codewars.com/api/v1/code-challenges/projects/${this.state.projectId}/solutions/${this.state.solutionId}/attempt?code=function(){functioncalculate(){return"hello"}}`,
      dataType: 'html',
      beforeSend: ( xhr ) => {
        xhr.setRequestHeader('Authorization', 'DPKPgUrPnQ3itPPMq2Gm');
      },
      success: (data) => {
        console.log('dmid: ', data.dmid)
        this.setState({dmid: data.dmid}, () => setTimeout(() => {this.pullSolution()}, 2000));
      },
      error: (err) => {
        console.log('error: ', err);
      }
    });
  }
  pullSolution = (e) => {
    $.ajax({
      method: 'GET',
      url: `https://www.codewars.com/api/v1/deferred/${this.state.dmid}`,
      beforeSend: ( xhr ) => {
        xhr.setRequestHeader('Authorization', 'DPKPgUrPnQ3itPPMq2Gm');
      },
      success: (data) => {
        console.log(data);
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

    if(localStorage.evilCorpDate !== Moment().format('MMMM Do YYYY')) {
      localStorage.evilCorpDate = Moment().format('MMMM Do YYYY')

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
            solutionId: data.session.solutionId
          }
          this.setState(obj, () => {
            localStorage.evilTitle = marked(data.name),
            localStorage.evilQuestion = marked(data.description),
            localStorage.evilProject = data.session.projectId,
            localStorage.evilSolution = data.session.solutionId
          });
        }
      });
    } else {
      this.setState({
            title: localStorage.evilTitle ,
            question: localStorage.evilQuestion,
            projectId: localStorage.evilProject,
            solutionId: localStorage.evilSolution
          });
    }
  }


  render() {
    return (
      <div id='App'>
          <Header date={this.state.date} temp={this.state.temp} icon={this.state.icon} />
          <Affirmation />
          <Challenge title={this.state.title} question={this.state.question} checkSolution={this.checkSolution}/>
          <Footer />
      </div>
    )
  }
}

module.exports = App;

render(<App />, document.getElementById('main-container'));
