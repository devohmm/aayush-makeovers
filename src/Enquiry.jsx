import { useEffect, useState } from "react";
import { artist, channels, occasions, sources } from "./site.js";
import { buildEnquiry, helpText, openChannel, validate } from "./enquiry.js";

const empty = {
  name: "",
  occasion: "",
  date: "",
  area: "",
  source: "Instagram ad",
  message: "",
  replyTo: "",
};

export default function Enquiry({ requestedChannel }) {
  const [channel, setChannel] = useState("whatsapp");
  const [fields, setFields] = useState(empty);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(null);
  const meta = channels[channel];

  useEffect(() => {
    const key = String(requestedChannel || "").split(":")[0];
    if (channels[key]) setChannel(key);
  }, [requestedChannel]);

  function update(event) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function onSubmit(event) {
    event.preventDefault();
    const data = {
      ...fields,
      name: fields.name.trim(),
      area: fields.area.trim(),
      message: fields.message.trim(),
      replyTo: fields.replyTo.trim(),
      channel,
      channelLabel: meta.label,
    };
    const problem = validate(data);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    const text = buildEnquiry(data);
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
    setSent({ text, channel, copied });
    openChannel(channel, text);
  }

  if (sent) {
    return (
      <div className="sent">
        <p className="eyebrow">Ready to send</p>
        <h3>{channels[sent.channel].label} is opening.</h3>
        <p>{helpText(sent.channel, sent.copied)}</p>
        <pre>{sent.text}</pre>
        <div className="hero-actions">
          <button className="btn btn-solid" type="button" onClick={() => openChannel(sent.channel, sent.text)}>
            Open again
          </button>
          <button className="btn btn-line" type="button" onClick={() => setSent(null)}>
            Edit enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder={`What should ${artist.firstName} call you?`}
          value={fields.name}
          onChange={update}
        />
      </div>

      <div className="split">
        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" required value={fields.occasion} onChange={update}>
            <option value="">Select</option>
            {occasions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="date">Event date</label>
          <input id="date" name="date" type="date" value={fields.date} onChange={update} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="area">Venue area</label>
        <input
          id="area"
          name="area"
          type="text"
          placeholder="Lucknow, or another city"
          value={fields.area}
          onChange={update}
        />
      </div>

      <div className="field">
        <label htmlFor="source">Where did you see him?</label>
        <select id="source" name="source" required value={fields.source} onChange={update}>
          {sources.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">What look do you want?</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          placeholder="Outfit colours, the function, and anything you want kept soft or bold."
          value={fields.message}
          onChange={update}
        />
      </div>

      <fieldset className="channels">
        <legend>Connect on</legend>
        {Object.entries(channels).map(([key, item]) => (
          <label className="channel" key={key}>
            <input
              type="radio"
              name="channel"
              value={key}
              checked={channel === key}
              onChange={() => setChannel(key)}
            />
            <span>
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="field">
        <label htmlFor="reply">{meta.replyLabel}</label>
        <input
          id="reply"
          name="replyTo"
          type={meta.type}
          autoComplete={meta.autoComplete}
          placeholder={meta.placeholder}
          value={fields.replyTo}
          onChange={update}
        />
      </div>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="btn btn-solid btn-full" type="submit">
        {meta.button}
      </button>
      <p className="fine form-fine">
        You will confirm the send inside the app you picked. {artist.firstName} only receives it after you press send there.
      </p>
    </form>
  );
}
