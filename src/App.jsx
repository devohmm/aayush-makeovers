import { useEffect, useState } from "react";
import Enquiry from "./Enquiry.jsx";
import {
  artist,
  looks,
  personalUrl,
  phoneDisplay,
  services,
  whatsappUrl,
  workDm,
  workUrl,
} from "./site.js";

const promises = [
  ["At the venue", "Ayush comes to you for the function morning."],
  ["A paid trial", "Test the base, the eyes, and the photographs first."],
  ["A quiet glow", "Natural, fresh, and dewy — skin that still looks like skin."],
];

const steps = [
  ["01", "Send the date", "Function, area, and the look you have in mind."],
  ["02", "Book a trial", "See the finish in daylight before the wedding week."],
  ["03", "Hold the morning", "A 30% advance confirms Ayush at your venue."],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestedChannel, setRequestedChannel] = useState("whatsapp");
  const [showDock, setShowDock] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowDock(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function chooseChannel(channel) {
    setRequestedChannel(`${channel}:${Date.now()}`);
    closeMenu();
  }

  return (
    <>
      <a className="skip" href="#book">Skip to enquiry</a>
      <div className="noise" aria-hidden="true" />

      <header className="nav">
        <a className="wordmark" href="#top" onClick={closeMenu}>
          Aayush <em>Makeovers</em>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
        </button>
        <nav id="site-nav" className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#looks" onClick={closeMenu}>Looks</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#instagram" onClick={closeMenu}>Instagram</a>
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Lucknow · {artist.name}</p>
            <h1>Dewy bridal makeup, ready for the whole wedding week.</h1>
            <p className="lede">
              Roka, engagement, mehendi, wedding, and reception. Ayush finishes the
              face so it still looks like you — soft in person, clear in photographs.
            </p>
            <div className="hero-actions">
              <a className="btn btn-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp {phoneDisplay}
              </a>
              <a className="btn btn-ghost" href="#book">Write a full note</a>
            </div>
            <p className="hero-note">
              Work lives on <a href={workUrl} target="_blank" rel="noopener noreferrer">@{artist.workHandle}</a>
            </p>
          </div>

          <aside className="stage">
            <div className="stage-panel">
              <p>The finish</p>
              <strong>Natural. Fresh. Dewy.</strong>
              <ul>
                <li>North Indian bridal</li>
                <li>Bengali bridal</li>
                <li>Muslim bridal</li>
              </ul>
            </div>
            <a className="stage-link" href={workUrl} target="_blank" rel="noopener noreferrer">
              <span>Latest faces</span>
              <strong>Open Instagram</strong>
            </a>
          </aside>
        </section>

        <section className="promises" aria-label="How a booking feels">
          {promises.map(([title, detail]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{detail}</p>
            </article>
          ))}
        </section>

        <section className="about" id="about">
          <div className="about-grid">
            <div>
              <p className="section-index">The artist</p>
              <h2>{artist.name} keeps the glam close to the person wearing it.</h2>
            </div>
            <div className="about-copy">
              <p>
                Aayush Makeovers is his freelance studio in Lucknow. He travels to the
                venue, and he builds the look around the outfit, the hour, and the
                photographs you will keep.
              </p>
              <blockquote>
                “The beauty industry fascinates me because it’s constantly evolving with
                new trends, products, and techniques. I wanted to be at the forefront of it all.”
                <cite>{artist.name}</cite>
              </blockquote>
              <p>
                Self-taught, working with Huda Beauty, NARS, and Lakmé. Bridal edits are
                on @{artist.workHandle}. He is @{artist.personalHandle} on his own account.
              </p>
            </div>
          </div>
        </section>

        <section className="looks" id="looks">
          <div className="section-head">
            <div>
              <p className="section-index">The edit</p>
              <h2>Looks he is booked for.</h2>
            </div>
            <a href={workUrl} target="_blank" rel="noopener noreferrer">See them on Instagram</a>
          </div>
          <div className="look-rail">
            {looks.map(([index, title, detail]) => (
              <a key={title} className="look-card" href={workUrl} target="_blank" rel="noopener noreferrer">
                <span>{index}</span>
                <div>
                  <strong>{title}</strong>
                  <em>{detail}</em>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-head">
            <div>
              <p className="section-index">Services</p>
              <h2>Starting rates. The quote follows the function.</h2>
            </div>
          </div>
          <div className="price-grid">
            {services.map((item) => (
              <article key={item.title} className="price-card">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span>
                  {item.price}
                  {item.unit ? <small>{item.unit}</small> : null}
                </span>
              </article>
            ))}
          </div>
          <p className="fine">
            A 30% advance holds the date. Ask about the cancellation policy before you pay —
            the published term is no refund. The final price depends on the look, the number of people, and travel.
          </p>
        </section>

        <section className="instagram" id="instagram">
          <div className="section-head light">
            <div>
              <p className="section-index">Instagram</p>
              <h2>The faces are posted where you can see the real finish.</h2>
            </div>
          </div>
          <div className="profile-grid">
            <a className="profile profile-dark" href={workUrl} target="_blank" rel="noopener noreferrer">
              <small>Makeup</small>
              <strong>@{artist.workHandle}</strong>
              <span>Bridal, engagement, and party looks</span>
            </a>
            <a className="profile" href={personalUrl} target="_blank" rel="noopener noreferrer">
              <small>{artist.name}</small>
              <strong>@{artist.personalHandle}</strong>
              <span>His own account</span>
            </a>
          </div>
          <div className="ig-actions">
            <a className="btn btn-gold" href={workDm} target="_blank" rel="noopener noreferrer">Message on Instagram</a>
            <a className="btn btn-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Or WhatsApp</a>
          </div>
          <ol className="steps">
            {steps.map(([index, title, detail]) => (
              <li key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="booking" id="book">
          <div className="booking-intro">
            <p className="section-index">Enquire</p>
            <h2>Saw an ad? Tell Ayush how to reach you.</h2>
            <p>
              WhatsApp is the fastest reply. You can also send the same note on Instagram,
              as a text, or by email. Nothing is stored on this page.
            </p>
            <a className="direct" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <small>Skip the form</small>
              <strong>Open WhatsApp {phoneDisplay}</strong>
            </a>
          </div>
          <Enquiry requestedChannel={requestedChannel} />
        </section>
      </main>

      <footer className="footer">
        <div>
          <p className="wordmark">Aayush <em>Makeovers</em></p>
          <p>{artist.name} · {artist.city}</p>
        </div>
        <div className="footer-links">
          <a href={workUrl} target="_blank" rel="noopener noreferrer">@{artist.workHandle}</a>
          <a href={personalUrl} target="_blank" rel="noopener noreferrer">@{artist.personalHandle}</a>
          <a href="#book" onClick={() => chooseChannel("whatsapp")}>WhatsApp</a>
          <a href="#book" onClick={() => chooseChannel("text")}>Text</a>
          <a href="#book" onClick={() => chooseChannel("instagram")}>Instagram</a>
          <a href="#book" onClick={() => chooseChannel("email")}>Email</a>
        </div>
        <p className="fine">© {year} {artist.brand}</p>
      </footer>

      <div className={showDock ? "dock dock-visible" : "dock"}>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href="#book">Book a look</a>
      </div>
    </>
  );
}
