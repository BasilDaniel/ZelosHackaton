import React from 'react';

export class ThankYouMessage extends React.Component {
  render() {
    return (
      <div className="thankyou-message">
        <div>
          <h1>Thank you</h1>
          <p>
          We have received your request to create a Community Helpdesk account and will confirm and launch your application ASAP. Keep an eye on your email inbox!
          </p>
          <p>
          If you have any additional questions, please get in touch with us via ailan@getzelos.com
          </p>
        </div>
      </div>
    );
  }
}
