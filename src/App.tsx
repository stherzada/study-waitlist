import './App.css'
import 'animate.css';

import useWaitList from './hooks/useWaitlist';

function App() {
  const { data, error, loading, submit, reset } = useWaitList()

  return (
    <>
    <h1 className="animate__animated animate__backInRight text-3xl font-bold text-white text-center">Waitlist da <i>Stherzada</i> 🌹</h1>
    <div className="flex w-full h-full p-6 ">
      {!data ? (
        <form className="w-full" onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement)
          const email = formData.get("email") as string

          submit({ email })
        }}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-normal">
                Qual é o seu email?
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Por favor, insira seu email"
                autoComplete="email"
                onChange={(e) => e.stopPropagation()}
                required
                className="rounded-md border border-gray-200 text-base p-2 text-gray-700"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300"
            >
              {loading ? (
                <h3>Carregando...</h3>
              ) : (
                "Entre no waitlist da Stherzada"
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
        <div className="text-base">
          <div>
            <p>Obrigada por se inscrever no waitlist da Stherzada. Sua prioridade</p>
            <b>{data.priority}</b> na waitlist.
          </div>
          <div className="mt-4">
            <button
              type="button"
              disabled={loading}
              onClick={reset}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300"
            >
              Retorne para se inscrever com outro email
            </button>
          </div>
        </div>
      )}
      
    </div>
    </>
  )
}

export default App
