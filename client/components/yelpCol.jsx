
import React from 'react';


const YelpDisplay = (props) => (
    <div>
    <h3>Best Restaurants</h3>
    <div className="apiBox">
    {props.yelpArr}
    </div>
    </div>
  );
  
  export default YelpDisplay;