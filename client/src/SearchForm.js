import React, { Component } from 'react';
import axios from 'axios';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '', cityFound: true };
  }

  handleInputChange = event => {
    this.setState({ city: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const url = `http://api.apixu.com/v1/current.json?key=9e1eb59b80a94ee59dc95108182107&q=${this.state.city}`;

    axios.get(url)
      .then(({ data }) => {
        console.log(data);
        let structure = {
          name: data.location.name,
          country: data.location.country,
          icon: data.current.condition.icon,
          feelslike_c: data.current.feelslike_c,
          feelslike_f: data.current.feelslike_f,
          text: data.current.condition.text,
          comments: []
        };

        this.props.onSubmitSearchForm(structure);
        this.setState({
          city: '',
          cityFound: true });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({ cityFound: false });
      });
  }

  render() {
    return (
      <form action="#" id="getWeatherForm" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter city"
            required
            value={this.state.city}
            onChange={this.handleInputChange}/>
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit">Go!</button>
          </span>
        </div>
        { !this.state.cityFound && <p>We could not find any city that matches your search</p>}
      </form>
    );
  }
}

export default SearchForm;

