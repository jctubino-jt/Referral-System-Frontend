import React, { Component } from 'react';

import homepage from './../images/Homepage.png';

function HomepageBanner(){
    return(
        <div className="tagline-banner">
          <span className="webTitle">Refer With Me</span><br/>
          <span className="webTagline">Start referring your friends, colleagues, and family to get dicounts on all of your online transactions</span>
          <img src={homepage} alt="Homepage" />
        </div>
    )
}

export default HomepageBanner;