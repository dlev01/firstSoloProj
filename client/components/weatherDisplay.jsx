

import React from 'react';


const TicketMasterDisplay = (props) => (
    <div>
    <h3>Today's Weather</h3>
    <img src='http://images.clipartpanda.com/weather-clip-art-LcK785bca.jpeg' alt='weather' style={{height: 100}}></img>
    <div className="apiBox">
    {props.weatherArr}
    </div>
    </div>
  );
  
  export default TicketMasterDisplay;