import React, { Component } from 'react';

class ReferralSendEmails extends Component {
    /*<section className="app">
            <Tokenizer
              tokens={this.state.tokens}
              tokenize={this._tokenize}
              removeToken={this._removeToken} />
          </section> );
          */
    state = {  }
    render() { 
        return ( 
            <div className="referralContainer">
                <div className="emailForm inlineBlock">
                    <input className="form-control  form-control-lg " type="text" placeholder="Enter Email Addresses"/>
                </div>

                <div className="inlineBlock">
                    <button type="button" className="btn btn-primary">Send</button>
                </div>

            </div>
        );
    }
}
 
export default ReferralSendEmails;