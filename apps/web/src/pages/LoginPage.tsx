import Logo from '@/components/Logo';

function LoginPage(): React.ReactElement {
  return (
    <div className=" w-full h-screen flex">
      <div className="w-1/2 flex flex-col items-center justify-center relative">
        <img
          src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-[384px] rounded z-50 shadow-2xl"
        />
        <div className="flex flex-col items-start text-start w-[384px] z-50">
          <div className="text-gray-500 text-sm mt-2">Get Started</div>
          <div className="mt-8 font-bold text-2xl">
            People use to turn their ideas into reality with{' '}
            <span className="text-sky-500">Horizon</span>.
          </div>
        </div>

        <div className="bg-red-700 w-[48rem] h-24 -skew-x-[32deg] -rotate-[24deg] absolute top-[26rem] shadow-2xl shadow-red-700/80"></div>
        <div className="bg-sky-500 w-[48rem] h-24 -skew-x-[32deg] -rotate-[24deg] absolute top-[38rem] shadow-2xl shadow-sky-500/80"></div>
      </div>

      <div className="w-[1px] bg-gray-500 h-screen"></div>

      <div className="h-screen w-1/2 flex flex-col justify-center items-start px-64">
        <div className="min-w-96">
          <Logo className="w-16 h-16 -ml-4" />
          <div className="text-2xl font-extrabold mt-16">
            <div>Hey,</div>
            <div>Login Now.</div>
          </div>

          <form
            action=""
            className="flex flex-col mt-8"
          >
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

            <div className="mt-8 flex text-sm text-gray-900">
              <div>If you are new / </div>
              <a
                href="/register"
                className="hover:underline hover:decoration-sky-500 hover:decoration-2 ml-2"
              >
                Create Account
              </a>
            </div>

            <div className="mt-1 flex text-sm text-gray-900">
              <div>Forgot password? / </div>
              <a
                href="/reset-password"
                className="hover:underline hover:decoration-sky-500 hover:decoration-2 ml-2"
              >
                Reset
              </a>
            </div>

            <button className="bg-red-700 rounded text-white font-bold py-2 mt-8">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
