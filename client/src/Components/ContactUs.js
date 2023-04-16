import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div>
        <h1>Contact Us</h1>
        <p>
          If you have any questions or comments, please feel free to get in touch
          with us using the form below:
        </p>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Contact;
