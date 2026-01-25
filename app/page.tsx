export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Next.js with Tailwind CSS
        </h1>
        <div className="text-center space-y-4">
          <p className="text-lg">
            Your project is ready to go! 🚀
          </p>
          <div className="mt-8 p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800">
              Tailwind CSS is configured and working.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
