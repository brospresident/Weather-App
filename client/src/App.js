import './App.css';
import { Component } from 'react';
import { getWeatherData } from './requests'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      location: '',
      weather: '',
      temp: 0,
      tempData: 'C',
      loading: true,
      gotData: false,
    }
  }

  componentWillMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      });
      
  }

  componentDidMount() {
    const interval = setInterval(() => {
      if (this.state.lat !== 0 && this.state.long !== 0) {
        this.setState({
          gotData: true
        })
      }
      if (this.state.gotData === true) {
        getWeatherData(this.state.lat, this.state.long)
          .then((data) => {
            console.log(data)
            this.setState({
              location: data.name,
              weather: data.weather[0].description,
              temp: data.main.temp,
              loading: false
            })
          })
        clearInterval(interval);
      }
    }, 1000)
  }

  render() {
    return (
      <div className = "container">
        <h1>Weather App</h1>
        {
          this.state.loading === false ?
            <div>
              <p>{this.state.location}</p>
              <p>{this.state.weather}</p>
              <p>{this.state.temp} C</p>
            </div>
            :
            <p>No weather data available</p>
        }
      </div>
    );
  }
}

export default App;
