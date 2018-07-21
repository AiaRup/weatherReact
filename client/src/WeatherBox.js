import React, { Component } from 'react';
import CommentsListBox from './CommentsListBox';

class WeatherBox extends Component {
  render() {
    return (
      <div>
        <div>
          <span className="glyphicon glyphicon-trash pull-right"></span>
          <div className="media-left">
            <img src={this.props.item.icon} alt={this.props.item.name} className="media-object" style={{ width: 60 }}/></div>
          <div className="media-body">
            <h4 className="media-heading">{this.props.item.name}</h4>
            <p>{this.props.item.text}- {this.props.item.feelslike_c} &nbsp;| C</p>
          </div>
        </div>
        <CommentsListBox comments={this.props.comments}/>
        <hr/>
      </div>
    );
  }
}

export default WeatherBox;