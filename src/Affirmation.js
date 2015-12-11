import React from 'react';


class Affirmation extends React.Component {
 	constructor(props){
 		super(props);
 	}


  render = () => {
  	console.log('IN AFFIRMATION: ', this.props.adjective)
    return (
      <h1 id='Affirmation' style={{textAlign: 'center', marginBottom: '30px'}}>
        You are a{this.props.adjective} developer!
        
      </h1>

    )
  }
}

module.exports = Affirmation;
