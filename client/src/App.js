import React, { Component } from 'react';
import WeatherListBox from './WeatherListBox';
import SearchForm from './SearchForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }

  onSubmitSearchForm = (data) => {
    this.setState(prevState => ({
      // cities: [ data ].concat(prevState.cities)
      cities: [ data, ...prevState.cities ]
    }));
  }

  deletePost = (indexToRemove) => {
    let filteredArray = this.state.cities.filter((city, index) => index !== indexToRemove);
    this.setState({ cities: filteredArray });
  };

  addComment = (indexPost, commentText) => {
    let newArray = this.state.cities.map((city, index) => {
      if (index === indexPost) {
        let commentsArr = city.comments.concat(commentText);
        city.comments = commentsArr;
        return city;
      }
      else return city;
    });

    this.setState({ cities: newArray });
  };

  deleteComment = (indexComment, indexPost) => {
    let newArray = this.state.cities.map((city, index) => {
      if (index === indexPost) {
        let commentsArr = city.comments.filter((comment, index) => index !== indexComment);
        city.comments = commentsArr;
        return city;
      }
      else return city;
    });

    this.setState({ cities: newArray });
  }


  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h2 >Weather app</h2>
          <SearchForm onSubmitSearchForm={this.onSubmitSearchForm}/>
        </div>
        <WeatherListBox cities={this.state.cities} deletePost={this.deletePost} addComment={this.addComment} deleteComment={this.deleteComment}/>
      </div>
    );
  }
}

export default App;