import React from 'react';
import WeatherListBox from './WeatherListBox';
import SearchForm from './SearchForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }


  onSubmitSearchForm = (data) => {
    this.setState(prevState => ({
      cities: prevState.cities.concat(data)
    }));
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h2>Weather app</h2>
          <SearchForm onSubmitSearchForm={this.onSubmitSearchForm}/>
        </div>
        <WeatherListBox cities={this.state.cities}/>
      </div>
    );
  }
}

export default App;