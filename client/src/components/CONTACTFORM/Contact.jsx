import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.scss";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ezyxyns", "template_ipziv4f", form.current, {
        publicKey: "tsKTpvHowgRlRyfzj",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form className="contact_form" ref={form} onSubmit={sendEmail}>
      <div className="head">
        <h1>Contact US</h1>
        
      </div>

      <hr />
     
      <div>
        <label>Name</label>
        <input type="text" name="user_name" placeholder="Type your name..." />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          placeholder="Please provide your email..."
        />
      </div>

      <div>
        <label>Message</label>
        <textarea name="message" />
      </div>

      <div>
        <button className="send_btn" type="submit" value="Send">
          {" "}
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
