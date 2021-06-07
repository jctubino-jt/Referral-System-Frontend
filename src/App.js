import React from 'react';
import './App.css';
//Success POPUP
import Swal from 'sweetalert2'
//For API Requests
import axios from 'axios';
import {BrowserRouter, Route,useParams,Switch} from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import ReferralPage from './pages/ReferralPage';
import SignInPage from './pages/SignInPage';
import Protected from './Protected';

class App extends React.Component
{
  state = {
  }
  
  render()
  {
    return (
      <div>
        <BrowserRouter>

        <Switch>
        <Route exact path="/">
          <SignInPage />
        </Route>


        <Route path={["/signin"]} >
          <SignInPage/>
        </Route>
        
        <Route path="/referrals">
          {/* <ReferralPage/> comment out*/}
          <Protected Cmp={ReferralPage}/>
        </Route>
        
          <Route path={["/refer=:referrerId", "/signup"]} children={<SignUpPage/>} />
        </Switch>

        </BrowserRouter>
      </div>
    )
    
    /*
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
    //axios.get('http://localhost/laravel8/public/api/send/email'
    axios.post('http://localhost:8000/api/send/email'
    //http://localhost:8000/api/register
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