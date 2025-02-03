import React, { useState } from "react";
import "./Help.css";  // Ensure the updated styles are added

export default function Help() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");  // New state for Subject
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !subject || !message) {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage(null);
      return;
    }

    // Simulate API call or form submission
    setTimeout(() => {
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage(null);
      setName("");
      setEmail("");
      setSubject("");  // Reset Subject field
      setMessage("");
    }, 1000);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-form-container">
          <h2>Need help?</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

      {/* <div className="contact-info">
        <h3>Our Office</h3>
        <p>
          Nutrify Inc.<br />
          123 Healthy Lane,<br />
          Wellness City, 12345
        </p>

        <h3>Connect with Us</h3>
        <p>Email: <a href="mailto:support@nutrify.com">support@nutrify.com</a></p>
        <p>Phone: +123 456 7890</p>
      </div> */}
    </section>
  );
}
