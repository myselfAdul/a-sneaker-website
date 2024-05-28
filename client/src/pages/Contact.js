import React from "react";
import Layout from "../components/Layout/Layout";
import ContactForm from "../components/CONTACTFORM/Contact";

const Contact = () => {
  return (
    <Layout>
      <div className="c-form">
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Contact;
