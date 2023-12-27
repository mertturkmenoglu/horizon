import { cn } from '@/lib/cn';
import Redirect from './Redirect';

interface LoginFormProps {
  className?: string;
}

function LoginForm({ className }: LoginFormProps): React.ReactElement {
  return (
    <form className={cn('flex flex-col', className)}>
      <input
        type="email"
        className="bg-gray-900/10 py-2 rounded px-2 focus:ring focus:ring-sky-500 focus:outline-none"
        placeholder="Email"
      />

      <input
        type="password"
        className="bg-gray-900/10 py-2 rounded px-2 focus:ring focus:ring-sky-500 focus:outline-none mt-4"
        placeholder="Password"
      />

      <Redirect
        className="mt-8"
        href="/register"
        text="If you are new"
        targetText="Create Account"
      />

      <Redirect
        className="mt-1"
        href="/reset-password"
        text="Forgot password?"
        targetText="Reset"
      />

      <button className="bg-red-700 rounded text-white font-bold py-2 mt-8 focus:ring focus:ring-red-700 focus:outline-none focus:ring-offset-2">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
