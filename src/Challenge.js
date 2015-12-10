import React from 'react';




class Challenge extends React.Component {



  render() {
    return (
      <div id='Challenge'>
        <div dangerouslySetInnerHTML={{__html:this.props.title}}></div>
        <div dangerouslySetInnerHTML={{__html:this.props.question}}></div>
      
        <form onSubmit={this.props.checkSolution}><input type='text'placeholder="Enter your answer here" ></input></form>
      </div>

    )
  }
}

module.exports = Challenge;


