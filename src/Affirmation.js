import React from 'react';


class Affirmation extends React.Component {
 	constructor(props){
 		super(props);
 	}


  render = () => {
  	console.log('IN AFFIRMATION: ', this.props.adjective)
    return (
      <div id='Affirmation'>
        You are a{this.props.adjective} developer
        
      </div>
    )
  }
}

module.exports = Affirmation;


