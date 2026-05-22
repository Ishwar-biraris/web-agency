import "./Contact.css";

export default function Contact() {
  return (
    <section className="quotation-section">

      <div className="quotation-header">
        <h1 className="quotation-title">Get a free Quotation</h1>
      </div>

      <div className="quotation-body">

        {/* LEFT — Info */}
        <div className="quotation-info">
          <p className="quotation-tagline">
            Let's start a<br />conversation
          </p>

          <p className="quotation-description">
            Whether you're launching a new venture or elevating an existing brand,
            we're here to bring your vision to life with creativity and precision.
          </p>
        </div>

        {/* RIGHT — Form */}
        <div className="quotation-form-card">

          <form
            className="quotation-form"
            action="https://api.web3forms.com/submit"
            method="POST"
          >

            {/* Web3Forms Access Key */}
            <input
              type="hidden"
              name="access_key"
              value="791dafa6-079a-456a-82e7-18a8dec241df"
            />

            {/* Optional Subject */}
            <input
              type="hidden"
              name="subject"
              value="New Quotation Request"
            />

        

            <div className="quotation-form-row">

              <div className="quotation-field">
                <label
                  className="quotation-label"
                  htmlFor="q-name"
                >
                  Name <span className="required">*</span>
                </label>

                <input
                  className="quotation-input"
                  id="q-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="quotation-field">
                <label
                  className="quotation-label"
                  htmlFor="q-email"
                >
                  Email <span className="required">*</span>
                </label>

                <input
                  className="quotation-input"
                  id="q-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

            </div>

            <div className="quotation-field">
              <label
                className="quotation-label"
                htmlFor="q-instagram"
              >
                Instagram <span className="required">*</span>
              </label>

              <input
                className="quotation-input"
                id="q-instagram"
                name="instagram"
                type="text"
                placeholder="@yourhandle"
                required
              />
            </div>

            <div className="quotation-field">
              <label
                className="quotation-label"
                htmlFor="q-description"
              >
                Project Description
              </label>

              <textarea
                className="quotation-textarea"
                id="q-description"
                name="project_description"
                rows="6"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              className="quotation-submit"
              type="submit"
            >
              Send Request →
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}