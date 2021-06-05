import React from 'react';
import './App.css';
//Success POPUP
import Swal from 'sweetalert2'
//For API Requests
import axios from 'axios';
import SignInForm from './components/SignInForm';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import {BrowserRouter, Route} from 'react-router-dom';
import ReferralSendEmails from './components/ReferralSendEmails';
import HomepageBanner from './components/HomepageBanner';
import SignUpPage from './pages/SignUpPage';
import ReferralPage from './pages/ReferralPage';
import SignInPage from './pages/SignInPage';
import Protected from './Protected';

class App extends React.Component
{
  
  
  render()
  {

    return (
      <div className="home-container">
        <BrowserRouter>
        
        <Route path="/referrals">
          {/* <ReferralPage/> */}
          <Protected Cmp={ReferralPage}/>
        </Route>
        <Route path="/signin">
          <SignInPage/>
        </Route>
        <Route path="/signup">
          <SignUpPage/>
        </Route>
        </BrowserRouter>
      </div>
    )
    
    /*
    <SignUpPage/>
        <ReferralSendEmails/>

    return (
      <div>
       <h1>Therichpost.com</h1>
         <button onClick={e => {this.sendmail()}}>Click Me!! To Send Mail</button>
        </div>
    )
    */
  }
  
  //send email button click function
  sendmail(){
    axios.get('http://localhost/laravel8/public/api/send/email'
    ).then(res=>
    {
      console.log(res.data['message']);
      //Success Message in Sweetalert modal
      Swal.fire({
        title:  res.data['message'],
        text: "Thanks",
        type: 'success',
        
      });
    
    }
    );
  }
}

 export default App;