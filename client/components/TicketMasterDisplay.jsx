
import React from 'react';


const TicketMasterDisplay = (props) => (
    <div>
    <h3>Upcoming Events Nearby</h3>
    <div className="apiBox">
    {props.ticketArr}
    </div>
    </div>
  );
  
  export default TicketMasterDisplay;