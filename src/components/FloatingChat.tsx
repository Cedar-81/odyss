import { useState } from "react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Replace this with real submission logic
    console.log("Email:", email);
    console.log("Message:", message);
    setEmail("");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 flex justify-baseline items-end gap-6 right-6 z-50">
      {/* Chat form */}
      {open && (
        <div className=" bg-white p-6 rounded-xl shadow-xl w-72">
          <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            rows={3}
          />
          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-brand text-white py-2 rounded hover:bg-brand-dark"
          >
            Send
          </button>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-brand hover:bg-brand-dark h-max cursor-pointer text-white p-4 rounded-full shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28c-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2c.55 0 1-.45 1-1v-4.81c0-3.83 2.95-7.18 6.78-7.29a7.007 7.007 0 0 1 7.22 7V19h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62"
          />
          <circle cx="9" cy="13" r="1" fill="currentColor" />
          <circle cx="15" cy="13" r="1" fill="currentColor" />
          <path
            fill="currentColor"
            d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.07 8.07 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47"
          />
        </svg>
      </button>
    </div>
  );
}
