import { useState } from "react";
import { supabase } from "../supabaseClient";

const orbStyles = [
  // Pink orb
  {
    background: "radial-gradient(circle at 60% 40%, rgba(245,0,139,0.25) 0%, transparent 70%)",
    top: "-120px",
    left: "-80px",
    width: "340px",
    height: "340px",
    filter: "blur(60px)",
    zIndex: 1,
  },
  // White orb
  {
    background: "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.18) 0%, transparent 70%)",
    bottom: "-100px",
    right: "-60px",
    width: "300px",
    height: "300px",
    filter: "blur(50px)",
    zIndex: 1,
  },
  // Subtle pink orb
  {
    background: "radial-gradient(circle at 20% 80%, rgba(245,0,139,0.12) 0%, transparent 70%)",
    bottom: "-80px",
    left: "-60px",
    width: "220px",
    height: "220px",
    filter: "blur(40px)",
    zIndex: 1,
  },
];

const features = [
  {
    title: "Group Up, Travel Smart",
    text: "Find friends and fellow travelers going your way. Create or join group trips and save more while making the journey more fun.",
  },
  {
    title: "Reliable Transport, No Guesswork",
    text: "Pick from trusted transport partners. No more unverified buses or last-minute scrambles — just smooth, verified trips.",
  },
  {
    title: "Built for Students & Travelers",
    text: "Odyss understands how students move. We've designed it so you can create group trips, choose your ride, and pay only when it's confirmed.",
  },
];

export default function WaitlistLanding() {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { error: supabaseError } = await supabase.from("Waitlist").insert([
        {
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
        },
      ]);
      if (supabaseError) throw supabaseError;
      setSuccess(true);
      setForm({ name: "", email: "", whatsapp: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-between overflow-x-hidden">
      {/* Orbs */}
      {orbStyles.map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...style,
            pointerEvents: "none",
          }}
        />
      ))}

      <main className="relative z-10 flex flex-col items-center justify-center w-full px-8 pt-20 min-h-screen">
        <div className="max-w-2xl w-full text-center mx-auto mb-12">
          <div className="space-y-2 md:space-y-6">
            <div className="flex items-center gap-4 md:mb-6">
              <svg height="54" className="h-4 md:h-5" viewBox="0 0 175 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M173.903 19.3139L165.974 19.8018C165.838 19.1241 165.547 18.5142 165.1 17.9721C164.652 17.4164 164.063 16.9759 163.331 16.6506C162.613 16.3117 161.752 16.1423 160.749 16.1423C159.407 16.1423 158.275 16.4269 157.354 16.9962C156.432 17.5519 155.971 18.2973 155.971 19.2325C155.971 19.978 156.27 20.6082 156.866 21.1233C157.462 21.6383 158.486 22.0517 159.936 22.3634L165.588 23.5019C168.624 24.1254 170.887 25.1284 172.378 26.5108C173.869 27.8933 174.614 29.7095 174.614 31.9594C174.614 34.006 174.011 35.8018 172.805 37.347C171.612 38.8921 169.972 40.0983 167.885 40.9658C165.811 41.8196 163.419 42.2466 160.708 42.2466C156.575 42.2466 153.281 41.3859 150.828 39.6646C148.388 37.9298 146.958 35.5714 146.538 32.5896L155.057 32.1424C155.314 33.4029 155.937 34.3652 156.927 35.0293C157.916 35.6799 159.184 36.0051 160.729 36.0051C162.247 36.0051 163.467 35.7137 164.388 35.1309C165.323 34.5346 165.798 33.7688 165.811 32.8336C165.798 32.0475 165.466 31.4037 164.815 30.9022C164.165 30.3872 163.162 29.9941 161.806 29.723L156.398 28.6455C153.349 28.0356 151.079 26.9784 149.588 25.474C148.11 23.9695 147.372 22.0517 147.372 19.7205C147.372 17.7145 147.914 15.9865 148.998 14.5362C150.096 13.086 151.634 11.9678 153.613 11.1817C155.605 10.3956 157.937 10.0025 160.607 10.0025C164.551 10.0025 167.655 10.8361 169.918 12.5032C172.195 14.1703 173.523 16.4405 173.903 19.3139Z" fill="white"/>
                <path d="M142.041 19.3139L134.112 19.8018C133.977 19.1241 133.686 18.5142 133.238 17.9721C132.791 17.4164 132.201 16.9759 131.47 16.6506C130.751 16.3117 129.891 16.1423 128.888 16.1423C127.546 16.1423 126.414 16.4269 125.492 16.9962C124.571 17.5519 124.11 18.2973 124.11 19.2325C124.11 19.978 124.408 20.6082 125.004 21.1233C125.601 21.6383 126.624 22.0517 128.074 22.3634L133.726 23.5019C136.762 24.1254 139.026 25.1284 140.517 26.5108C142.007 27.8933 142.753 29.7095 142.753 31.9594C142.753 34.006 142.15 35.8018 140.943 37.347C139.751 38.8921 138.111 40.0983 136.024 40.9658C133.95 41.8196 131.558 42.2466 128.847 42.2466C124.713 42.2466 121.42 41.3859 118.966 39.6646C116.527 37.9298 115.097 35.5714 114.677 32.5896L123.195 32.1424C123.453 33.4029 124.076 34.3652 125.065 35.0293C126.055 35.6799 127.322 36.0051 128.867 36.0051C130.385 36.0051 131.605 35.7137 132.527 35.1309C133.462 34.5346 133.936 33.7688 133.95 32.8336C133.936 32.0475 133.604 31.4037 132.954 30.9022C132.303 30.3872 131.3 29.9941 129.945 29.723L124.537 28.6455C121.487 28.0356 119.217 26.9784 117.726 25.474C116.249 23.9695 115.51 22.0517 115.51 19.7205C115.51 17.7145 116.052 15.9865 117.137 14.5362C118.234 13.086 119.773 11.9678 121.752 11.1817C123.744 10.3956 126.075 10.0025 128.745 10.0025C132.689 10.0025 135.793 10.8361 138.057 12.5032C140.334 14.1703 141.662 16.4405 142.041 19.3139Z" fill="white"/>
                <path d="M88.1468 53.3475C87.0489 53.3475 86.0189 53.2594 85.0566 53.0832C84.1078 52.9205 83.3217 52.7104 82.6982 52.4529L84.6499 45.9879C85.6665 46.2996 86.5813 46.469 87.3945 46.4961C88.2213 46.5232 88.9329 46.3335 89.5292 45.9269C90.1391 45.5203 90.6339 44.829 91.0134 43.8532L91.5216 42.5317L80.3196 10.4096H89.4276L95.8926 33.3423H96.2179L102.744 10.4096H111.913L99.7757 45.012C99.1929 46.6926 98.4001 48.1564 97.3971 49.4034C96.4077 50.6639 95.154 51.6329 93.636 52.3106C92.118 53.0018 90.2882 53.3475 88.1468 53.3475Z" fill="white"/>
                <path d="M58.1962 42.145C55.8243 42.145 53.6761 41.5351 51.7515 40.3152C49.8404 39.0819 48.3224 37.2724 47.1975 34.887C46.0861 32.488 45.5304 29.5469 45.5304 26.0636C45.5304 22.4854 46.1064 19.5104 47.2585 17.1386C48.4105 14.7531 49.9421 12.9708 51.8531 11.7916C53.7777 10.5989 55.8853 10.0026 58.1759 10.0026C59.9243 10.0026 61.3813 10.3007 62.5469 10.8971C63.7261 11.4799 64.6748 12.2118 65.3932 13.0928C66.1251 13.9602 66.6808 14.8141 67.0603 15.6544H67.3246V0H75.965V41.6367H67.4262V36.6354H67.0603C66.6537 37.5029 66.0776 38.3635 65.3322 39.2174C64.6003 40.0577 63.6448 40.7557 62.4656 41.3114C61.3 41.8671 59.8769 42.145 58.1962 42.145ZM60.9408 35.253C62.3368 35.253 63.516 34.8735 64.4783 34.1145C65.4542 33.3419 66.1996 32.2644 66.7146 30.8819C67.2432 29.4994 67.5075 27.8798 67.5075 26.0229C67.5075 24.1661 67.25 22.5532 66.735 21.1843C66.2199 19.8154 65.4745 18.7582 64.4986 18.0128C63.5228 17.2673 62.3368 16.8946 60.9408 16.8946C59.5177 16.8946 58.3182 17.2809 57.3423 18.0534C56.3665 18.826 55.6278 19.8967 55.1263 21.2656C54.6249 22.6345 54.3741 24.2203 54.3741 26.0229C54.3741 27.8391 54.6249 29.4452 55.1263 30.8413C55.6414 32.2237 56.38 33.308 57.3423 34.0941C58.3182 34.8667 59.5177 35.253 60.9408 35.253Z" fill="white"/>
                <path d="M1.96639 30.1931C0.655863 27.4438 -0.000115388 24.271 -0.000147896 20.6739C-0.00014731 17.0765 0.65577 13.8967 1.96639 11.134L1.96639 30.1931Z" fill="white"/>
                <path d="M6.88304 36.4518C6.36511 36.0306 5.87313 35.5835 5.40767 35.1097L5.40767 6.2292C5.87321 5.75734 6.36502 5.3115 6.88304 4.89148L6.88304 36.4518Z" fill="white"/>
                <path d="M42.7731 20.6739C42.773 24.866 41.8743 28.4826 40.0764 31.5233C38.2964 34.582 35.797 36.9389 32.5788 38.5942C29.3784 40.2495 25.6386 41.0769 21.3596 41.0769C19.1855 41.0769 17.146 40.8589 15.241 40.4243L15.241 34.6855L11.7991 34.6855L11.7991 39.3438C11.2962 39.1385 10.8046 38.9154 10.3243 38.6737L10.3243 25.2645C10.3868 25.3457 10.4511 25.426 10.5177 25.5048C11.6144 26.7822 13.1067 27.7446 14.9944 28.3923C16.8823 29.0581 19.031 29.3909 21.4403 29.3909C23.8495 29.3909 25.9982 29.0581 27.8861 28.3923C29.7738 27.7446 31.2662 26.7822 32.3629 25.5048C33.4596 24.2274 34.0078 22.6348 34.0078 20.7277C34.0078 18.8025 33.4596 17.1832 32.3629 15.8698C31.2662 14.5744 29.7739 13.5935 27.8861 12.9278C25.9982 12.2801 23.8495 11.9561 21.4403 11.9561C19.031 11.9561 16.8823 12.2801 14.9944 12.9278C13.1067 13.5935 11.6144 14.5744 10.5177 15.8698C10.4511 15.9508 10.3867 16.033 10.3243 16.1163L10.3243 2.67341C10.8046 2.43166 11.2962 2.20857 11.7991 2.0033L11.7991 8.62809L15.241 8.62809L15.241 0.922735C17.146 0.488185 19.1855 0.270142 21.3596 0.270142C25.6386 0.270161 29.3784 1.09759 32.5788 2.75287C35.7971 4.40816 38.2964 6.7562 40.0764 9.79688C41.8743 12.8556 42.7731 16.4816 42.7731 20.6739Z" fill="white"/>
              </svg>
              <p className="text-gray-200 font-bold">|</p> 
              <p className="text-gray-200 text-xs md:text-sm">...because journeys are better shared</p> 
            </div>
            <h1 className="text-white text-3xl sm:text-4xl text-left md:text-5xl font-medium mt-5 lg:mt-0 leading-tight">
              Your Next Trip, Sorted — Together.
            </h1>
            <p className="text-gray-200 text-xs md:text-base text-left leading-tight font-light">
              Tired of booking travel the hard way? With Odyss, you can create or join group trips, travel cheaper, and ride with trusted transport companies — all in one place.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-md rounded-2xl flex flex-col gap-4 items-center mt-10 mx-auto shadow-lg"
            // style={{ boxShadow: "0 4px 32px 0 rgba(245,0,139,0.08)" }}
          >
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="your name"
                className="w-full px-4 py-3 text-sm rounded-lg focus:bg-white/5 text-white placeholder-gray-300 border border-white/20 focus:border-white/30 outline-none transition"
                required
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email address"
                className="w-full px-4 py-3 text-sm rounded-lg focus:bg-white/5 text-white placeholder-gray-300 border border-white/20 focus:border-white/30 outline-none transition"
                required
              />
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="whatsapp line"
                className="w-full px-4 py-3 text-sm rounded-lg focus:bg-white/5 text-white placeholder-gray-300 border border-white/20 focus:border-white/30 outline-none transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !form.name || !form.email || !form.whatsapp}
              className={`w-full py-3 rounded-lg font-medium cursor-pointer text-lg transition-all mt-2
                ${loading || !form.name || !form.email || !form.whatsapp
                  ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                  : "bg-white text-black shadow-lg"}
              `}
            >
              {loading ? "Joining..." : success ? "Joined!" : "Join the Waitlist"}
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-400 text-sm mt-2">Thanks for joining! We'll keep you posted.</p>}
          </form>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 z-10">
          {features.map((f, i) => (
            <div
              key={i}
              style={{ boxShadow: "0 4px 32px 0 rgba(245,0,139,0.08)" }}
              className="backdrop-blur-md rounded-2xl p-6 text-white shadow-md border border-white/5 flex flex-col h-full"
            >
              <h3 className="text-xl mb-3 text-gray-200">{f.title}</h3>
              <p className="text-gray-200 text-xs font-light text-gray-300">{f.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 