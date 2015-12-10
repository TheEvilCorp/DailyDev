import React from 'react';


class Header extends React.Component {
  




  render() {
    return (
      <div id='Header'>
        <div>{this.props.date}</div>
        <div><img src={this.props.icon} />{this.props.temp}</div>
      </div>
    )
  }
}

module.exports = Header;


