import React, { Component } from 'react'
import { render } from 'react-dom'

class UserProfile extends Component {








  render() {
    return (
      <div>
      <div className="container box" style={{ maxWidth: '800px' }}>
        <table>
 <tr>
   <th>Info</th>
   <th></th>
 </tr>
 <tr>
   <td>First Name:</td>
   <td>
   <div>James</div> </td>
 </tr>
 <tr>
   <td>Last Name:</td>
   <td>
   <div>Bond</div> </td>
 </tr>
 <tr>
   <td>Age:</td>
   <td>
   <div>28</div> </td>
 </tr>
 <tr>
   <td>Phone:</td>
   <td>
   <div>206.444.2343</div> </td>
 </tr>
 <tr>
   <td>Address:</td>
   <td>
   <div>444 E. Madison St, Seattle, WA 98112</div> </td>
 </tr>
</table>
      </div>
      <div className="container box" style={{ maxWidth: '800px' }}>
        <table>
 <tr>
   <th>Membership</th>
   <th></th>
 </tr>
 <tr>
   <td>Status:</td>
   <td>
   <div>active</div> </td>
 </tr>
 <tr>
   <td>Start Date:</td>
   <td>
   <div>07/18/18</div> </td>
 </tr>
 <tr>
   <td>End Date:</td>
   <td>
   <div>07/18/19</div> </td>
 </tr>
 <tr>
   <td>Membership Fee:</td>
   <td>
   <div>$100</div> </td>
 </tr>
 <tr><td>Card Info:</td>
 <td>
 <div>Visa</div> </td>
 <td>
 <div>...7689</div> </td>
</tr>
</table>
      </div>
      <div className="container box" style={{ maxWidth: '800px' }}>
      <h1>My Events</h1>
        <table>
 <tr>
   <th>My Up Coming Events</th>
   <th></th>
 </tr>
 <tr>
   <td>Venue:</td>
   <td>
   <div>2343 Denny Way</div> </td>
 </tr>
 <tr>
   <td>Event Name:</td>
   <td>
   <div>Rock It Out</div> </td>
 </tr>
 <tr>
   <td>Date:</td>
   <td>
   <div>08/28/19</div> </td>
 </tr>
 <tr>
   <td>Band:</td>
   <td>
   <div>The Lizards</div> </td>
 </tr>
 <tr>
   <td>Genre:</td>
   <td>
   <div>Rock</div> </td>
 </tr>
</table>
        <table>
 <tr>
   <th>Past Events</th>
   <th></th>
 </tr>
 <tr>
   <td>Venue:</td>
   <td>
   <div>2343 Denny Way</div> </td>
 </tr>
 <tr>
   <td>Event Name:</td>
   <td>
   <div>Rock It Out</div> </td>
 </tr>
 <tr>
   <td>Date:</td>
   <td>
   <div>08/28/19</div> </td>
 </tr>
 <tr>
   <td>Band:</td>
   <td>
   <div>The Lizards</div> </td>
 </tr>
 <tr>
   <td>Genre:</td>
   <td>
   <div>Rock</div> </td>
 </tr>
</table>
      </div>
        </div>
    );
  }
  }
export default UserProfile;
