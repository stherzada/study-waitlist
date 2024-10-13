import { useState } from 'react'
import './App.css'

interface WaitlistData {
  email: string;
  waitlist_id?: number;
  referral_link?: string;
}

interface WaitlistResponse {
  priority: number;
  referral_link: string;
  total_referrals: number;
}

function App() {
  const [waitlistData, setWaitlistData] = useState<WaitlistResponse | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  function validateEmail(email: string) {
    //eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  // Function to submit Waitlist data
  function submitWaitlist(data: WaitlistData) {
    if (!data.email) {
      setError("Please enter your email");
      return;
    }
    if (validateEmail(data.email) === false) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    data.waitlist_id = 21224;
    data.referral_link = document.URL;

    fetch("https://api.getwaitlist.com/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setWaitlistData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }
  return (
    <>
    <div className="flex w-full h-full p-6">
      {!waitlistData ? (
        <form className="w-full">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-gray-700">
                What is your email?
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Please enter your email"
                autoComplete="email"
                onChange={(e) => e.stopPropagation()}
                required
                className="rounded-md border border-gray-200 text-base p-2 text-gray-700"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                submitWaitlist({
                  email: (document.getElementById("email") as HTMLInputElement)?.value,
                });
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300"
            >
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                "Sign up for the waitlist"
              )}
            </button>
            {error && (
              <div className="text-center mt-2 text-xs text-red-500 px-6">
                {error}
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className="text-gray-700">
          <div>
            Thank you for signing up. Your are waiter{" "}
            <b>{waitlistData.priority}</b> on the waitlist.{" "}
          </div>
          
          <div>
            Total referrals: <b>{waitlistData.total_referrals}</b>
          </div>
          <div className="mt-4">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setWaitlistData(null);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300"
            >
              Return to signup
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default App
