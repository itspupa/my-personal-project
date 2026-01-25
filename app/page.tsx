import LoginButton from './component/button/LoginButton';
import GetstartedButton from './component/button/GetstartedButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <div className="mt-6">
            <LoginButton />
          </div>
          <div className="mt-6">
            <GetstartedButton />
          </div>
        </div>
    </main>
  )
}
