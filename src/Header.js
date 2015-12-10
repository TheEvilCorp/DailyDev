import React from 'react';


class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-brand">{this.props.date}</p>
          </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li><img src={this.props.icon}></img><span id='degree'>{this.props.temp}{String.fromCharCode(176)}F</span></li>
      </ul>
    </div>
  </div>
</nav>


    )
  }
}

module.exports = Header;
