import { useState } from "react";
import clsx from "clsx";

interface ChatState {
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [chatState, setChatState] = useState<ChatState>({ status: 'idle' });

  const isValid = email.trim() !== "" && message.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid) return;

    setChatState({ status: 'loading' });

    try {
      const response = await fetch(
        "https://odyss-mail-server.onrender.com/api/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, message }),
        }
      );

      if (response.ok) {
        setChatState({ status: 'success' });
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setOpen(false);
          setChatState({ status: 'idle' });
        }, 2000);
      } else {
        const res = await response.json();
        setChatState({ 
          status: 'error', 
          error: res.error || 'Failed to send message' 
        });
      }
    } catch (error) {
      console.error(error);
      setChatState({ 
        status: 'error', 
        error: 'Something went wrong. Please try again.' 
      });
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat form */}
      {open && (
        <div className="w-[90vw] max-w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-slideUp">
          <div className="bg-brand/5 p-4 border-b border-brand/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-800">Send us a message</h3>
              <button 
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-brand/10 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={clsx(
                  "w-full p-3 border rounded-lg outline-none transition-colors",
                  "focus:border-brand focus:ring-1 focus:ring-brand/20",
                  chatState.status === 'error' ? "border-red-300" : "border-gray-200"
                )}
              />
            </div>
            <div>
              <textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={clsx(
                  "w-full p-3 border rounded-lg outline-none transition-colors resize-none",
                  "focus:border-brand focus:ring-1 focus:ring-brand/20",
                  chatState.status === 'error' ? "border-red-300" : "border-gray-200"
                )}
                rows={4}
              />
            </div>

            {chatState.status === 'error' && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {chatState.error}
              </div>
            )}

            {chatState.status === 'success' && (
              <div className="text-sm text-green-500 bg-green-50 p-3 rounded-lg">
                Message sent successfully! Thank you for reaching out.
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!isValid || chatState.status === 'loading'}
              className={clsx(
                "w-full p-3 rounded-lg font-medium transition-all duration-200",
                "flex items-center justify-center gap-2",
                isValid && chatState.status !== 'loading'
                  ? "bg-brand text-white hover:bg-brand/90"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {chatState.status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                "Send message"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "bg-brand hover:bg-brand/90 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-200",
          "hover:shadow-xl hover:-translate-y-0.5",
          "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        )}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
}

// Add this to your global CSS file (src/index.css)
/*
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.2s ease-out;
}
*/
