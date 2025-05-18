function Signup() {
  return (
    <form className="fixed h-[100vh] w-[100vw] top-0 right-0 shadow-lg bg-black/40 z-30 flex justify-center items-center">
      <div className="w-[25rem] h-max rounded-md bg-white space-y-6 p-8">
        <h1 className="text-3xl">Create an account</h1>

        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Firstname</label>
            <input
              className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
              type="text"
              placeholder="eg. Judith"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Lastname</label>
            <input
              className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
              type="text"
              placeholder="eg. Okorie"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="">Email</label>
          <input
            className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
            type="email"
            placeholder="eg. judithokorie@gmail.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="">Phone number</label>
          <input
            className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
            type="number"
            placeholder="eg. +2348033328156"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="">Password</label>
          <input
            className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
            type="password"
            placeholder="************"
          />
        </div>

        <button className="w-max px-8 float-right text-base sm:text-lg py-2 rounded-lg disabled:bg-light-gray cursor-pointer bg-brand text-white">
          Create account
        </button>
      </div>
    </form>
  );
}

export default Signup;
