import React from 'react';


class Footer extends React.Component {
  render() {
    return (
      <div id='Footer'>
        <div style={{marginLeft:'30px', marginTop: '50px'}}><img src={this.props.puppy}  height="100" /></div>
        <div style={{marginLeft:'30px'}}>Every time you skip your hack challenge, a puppy dies.</div>
      </div>
    )
  }
}

module.exports = Footer;
