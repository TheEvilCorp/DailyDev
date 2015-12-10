import React from 'react';


class Footer extends React.Component {
  render() {
    return (
      <div id='Footer'>
        <div><img src={this.props.puppy} height="100" /></div>
        <div>
        	<img id='#speechBubble' src='http://thumbnails.billiondigital.com/255/919255/778971_small_checkboard.jpg' />
        	<div>save me!</div>
        </div>
        <div>Every time you skip your hack challenge, a puppy dies.</div>
      </div>
    )
  }
}

module.exports = Footer;


