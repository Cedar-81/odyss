import { useState } from "react";
import "./App.css";
import clsx from "clsx";

function App() {
  const [findATrip, setFindATrip] = useState(true);
  return (
    <main>
      <section className="h-[100vh] flex justify-center w-[100vw] relative overflow-clip">
        <img
          src="./assets/herobkg.png"
          className="absolute object-cover h-full w-full"
          alt="map route image"
        />
        <div className="relative space-y-4 px-8 top-[50%] h-min flex flex-col justify-center items-center -translate-y-[50%]">
          <h1 className="lg:w-[60%] leading-tight font-bold text-4xl lg:text-7xl text-center">
            Cut costs on your next inter-city trip with{" "}
            <br className="hidden lg:block" />
            <span className="griffy-regular text-brand">Odyss</span>
          </h1>
          <p className="text-lg lg:text-2xl text-center">
            Find and share costs with a{" "}
            <span className="text-brand font-medium">“travel buddy”</span>. It's
            simple and easy.
          </p>
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {
                setFindATrip(false);
                document
                  .getElementById("trip")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-[10rem] text-lg py-2 rounded-lg cursor-pointer bg-brand text-white"
            >
              Create a trip
            </button>
            <button
              onClick={() => {
                setFindATrip(true);
                document
                  .getElementById("trip")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-[10rem] text-brand rounded-lg cursor-pointer text-lg py-2 border border-brand"
            >
              Find a trip
            </button>
          </div>
        </div>
      </section>

      <section
        id="trip"
        className="my-32 flex flex-col justify-center gap-20 px-4"
      >
        <div className="flex mx-auto border border-brand rounded-lg overflow-clip w-max">
          <button
            onClick={() => setFindATrip(false)}
            className={clsx(
              "w-max px-8 text-base lg:text-lg py-2 cursor-pointer",
              !findATrip ? "bg-brand text-white" : "bg-transparent text-brand"
            )}
          >
            Create a trip
          </button>
          <button
            onClick={() => setFindATrip(true)}
            className={clsx(
              "w-max px-8 text-base lg:text-lg py-2 cursor-pointer",
              findATrip ? "bg-brand text-white" : "bg-transparent text-brand"
            )}
          >
            Find a trip
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full max-w-6xl mx-auto gap-10">
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl">
              {findATrip ? "Find a trip" : "Create a trip"}
            </h3>
            {findATrip ? (
              <p className="text-sm sm:text-base md:text-lg text-gray leading-tight">
                Find the right travel companion for your next
                <br />
                inter-city trip on us.
              </p>
            ) : (
              <p className="text-sm sm:text-base md:text-lg text-gray leading-tight">
                Create a trip to share with a travel companion,
                <br />
                we’d help you.
              </p>
            )}
          </div>

          <div className="w-full max-w-md">
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <input
                placeholder="from-> eg. Enugu"
                type="text"
                className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
              />
              <div className="h-[2rem] border-r w-0 border-dotted text-light-gray" />
              <input
                placeholder="to-> eg. Abuja"
                type="text"
                className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
              />
              <div className="h-[2rem] border-r w-0 border-dotted text-light-gray" />
              <input
                placeholder="date"
                type="date"
                className="outline-none bg-white py-2 w-full border border-light-gray px-3 rounded-lg"
              />
            </div>
            <button
              disabled
              className="w-max px-8 float-right mt-6 text-base sm:text-lg py-2 rounded-lg disabled:bg-light-gray cursor-pointer bg-brand text-white"
            >
              {/* {findATrip ? "Search" : "Create"} */}
              {"Coming soon ;)"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
