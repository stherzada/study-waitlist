import './App.css'
import useWaitList from './hooks/useWaitlist';

function App() {
  const { data, error, loading, submit, reset } = useWaitList()

  return (
    <div className="flex w-full h-full p-6">
      {!data ? (
        <form className="w-full" onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement)
          const email = formData.get("email") as string

          submit({ email })
        }}>
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
            <b>{data.priority}</b> on the waitlist.{" "}
          </div>

          <div>
            Total referrals: <b>{data.total_referrals}</b>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              onClick={reset}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300"
            >
              Return to signup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
