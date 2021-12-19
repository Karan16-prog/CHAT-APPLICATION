import './App.css';
import React, {useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ChatRoom from './chatRoom';
import Screen from './firstScreen';


//React router used to link different chat rooms 
//test
function App() {
  const [user,setUser] = useState('ram');
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/'>
            <header> 
              <h2>Chats</h2>
            </header>
              <div className='router__body'>
              <Link to='/Python'>
                <Screen topic='Python Developer Beta Pvt Ltd' title='P'/>
              </Link>
              <Link to='/Java'>
                <Screen topic='Java Developer Johnson Pvt Ltd' title='J'/>
              </Link>
              <Link to='/React'>
                <Screen topic='React Developer Swar Yantra Technologies' title='R'/>
              </Link>
              </div>
          </Route>
          <Route path='/Python'>
            <ChatRoom user={user} collection='Python' topic='Python Developer Beta Pvt Ltd' reciever='Ghanshyam'/>
          </Route>
          <Route path='/React'>
            <ChatRoom user={user} collection='React' topic='React Developer Swar Yantra Technologies' reciever='Ghanshyam'/>
          </Route>
          <Route path='/Java'>
            <ChatRoom user={user} collection='Java' topic='Java Developer Johnson Pvt Ltd'/>
          </Route>
        </Switch>
      </Router>
    
    </div>
  );
}




export default App;


