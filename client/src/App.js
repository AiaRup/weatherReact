import React, { Component } from 'react';
import WeatherListBox from './WeatherListBox';
import SearchForm from './SearchForm';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }

  componentDidMount = () => {
    axios.get('/cities')
      .then((posts) => {
        this.setState({
          cities: posts.data.reverse() // to get the latest post first
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSubmitSearchForm = (data) => {
    axios.post('/cities', data)
      .then((newPost) => {
        this.setState(prevState => ({
          // cities: [ data ].concat(prevState.cities)
          cities: [ newPost.data, ...prevState.cities ]
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deletePost = (indexToRemove) => {
    const postId = this.state.cities[indexToRemove]._id;
    axios.delete(`/cities/${postId}`)
      .then(() => {
        let filteredArray = this.state.cities.filter((city, index) => index !== indexToRemove);
        this.setState({ cities: filteredArray });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addComment = (indexPost, commentText) => {
    const postId = this.state.cities[indexPost]._id;
    axios.post(`cities/${postId}/comments`, commentText)
      .then((resultCity) => {
        const commentArr = resultCity.data.comments;

        let newArray = this.state.cities.map((city, index) => {
          if (index === indexPost) {
            let commentsArr = city.comments.concat(commentArr[commentArr.length-1]);
            city.comments = commentsArr;
            return city;
          }
          else return city;
        });
        this.setState({ cities: newArray });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteComment = (indexComment, indexPost) => {
    const postId = this.state.cities[indexPost]._id;
    const commentId = this.state.cities[indexPost].comments[indexComment]._id;
    axios.delete(`cities/${postId}/comments/${commentId}`)
      .then(() => {
        let newArray = this.state.cities.map((city, index) => {
          if (index === indexPost) {
            let commentsArr = city.comments.filter((comment, index) => index !== indexComment);
            city.comments = commentsArr;
            return city;
          }
          else return city;
        });

        this.setState({ cities: newArray }); })
      .catch(function (error) {
        console.log(error);
      });
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

