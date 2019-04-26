import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';

import YelpDisplay from '../components/yelpCol.jsx';
import TicketMasterDisplay from '../components/TicketMasterDisplay.jsx';
import WeatherDisplay from '../components/weatherDisplay.jsx';

// import HeaderContainer from './HeaderContainer';
// import HeaderContainer from './HeaderContainer';

// NEED TO CREATE AND IMPORT CHILDREN COMPONENTS
// import TotalsDisplay from '../components/TotalsDisplay.jsx';
// import MarketsContainer from './MarketsContainer.jsx'
// import marketsReducer from '../reducers/marketsReducer.js';
// import reducers from '../reducers/index.js';

// const mapStateToProps = store => ({
//     // user = store.location.user,
//     // city = store.location.city,
//     // state = store.location.state
    
// });
  
// const mapDispatchToProps = dispatch => ({

//     // add pertinent state here...

//     });


    class MainContainer extends Component {
    constructor(props, state) {
      super(props, state);
      this.state = {
          user: '',
          city: '',
          state: '',
          yelpArr: [],
          ticketArr: [],
          weatherArr: [],
      }
    }

    componentDidMount() {
        // let user = Cookies.get('user');
        // console.log(user)
        console.log('it tried to fetch');
        fetch('http://localhost:3000/getAll')
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)

            let user = res.user;
            let city = res.city;
            let state = res.state;

            let foodArr = res.yelp;
            let foodDivs = dataCol(foodArr)

            let ticketDivs;
            if (res.ticket) {
              let ticketArr = res.ticket;
              ticketDivs = dataColTick(ticketArr);
            } else {
              console.log('no events')
              ticketDivs = 'No data for your city!'
            }

            let weatherArr = res.weather;
            let weatherDivs = dataColWeather(weatherArr);
            // console.log(res.weather)
            
            // console.log(ticketDivs)
            this.setState({
                user: user,
                city: city,
                state: state,
                yelpArr: foodDivs,
                ticketArr: ticketDivs,
                weatherArr: weatherDivs,
            })
        })
    }
  
    render() {

      return(
        <div className="container">
          <span className="outerBox">
            <h2 id="header">Hey {this.state.user}, let's explore <span className="city">{this.state.city}</span>.</h2>
            <center><WeatherDisplay weatherArr = {this.state.weatherArr} /></center>

            <div className="row">
            <div className="column">
            <YelpDisplay yelpArr = {this.state.yelpArr} />
            </div>
            <div className="column">
            <TicketMasterDisplay ticketArr = {this.state.ticketArr} />
            </div>
            </div>

            </span>
        </div>
      )
    }
  
  }


// YELP data parser
function dataCol (data) {
    const dataDivArr = data.map(el => {
        return (
        <div className="yelpUnit">
        <p className="unitTitle">{el.name}</p>
        <img src={el.image_url} style={{height: 100 }}></img>
        <p>Rating: {el.rating}</p>
        <p>Reviews: {el.review_count}</p>
        </div>
        )
    })
    return dataDivArr;
}


// TICKETMASTER data parser
function dataColTick (data) {
    const dataDivArr = data.map(el => {
        return (
        <div className="eventUnit">
        <p className="unitTitle">{el.event}</p>
        <img src={el.image} style={{height: 100 }}></img>
        <p>Venue: {el.venue}</p>
        </div>
        )
    })
    return dataDivArr;
}


// WEATHER data parser
function dataColWeather (data) {
    const dataDivArr = data.map(el => {
        return (
        <div className="weatherUnit">
        <p>High: {el.high}F</p>
        <p>Low: {el.low}F</p>
        <p>Description: {el.desc}</p>
        </div>
        )
    })
    return dataDivArr;
}


//   export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
export default MainContainer;