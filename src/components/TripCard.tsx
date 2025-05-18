function TripCard() {
  return (
    <div className="bg-brand/5 rounded-2xl space-y-6 p-6">
      <div className="flex justify-between">
        <p className="text-xs">morning</p>
        <p className="text-sm">8th Jan, 2023</p>
      </div>

      <div className="flex justify-between gap-8 items-center">
        <h3 className="text-2xl">Enugu</h3>
        <svg
          width="61"
          height="29"
          viewBox="0 0 61 29"
          fill="none"
          className="h-3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M61 14.5L36 0.0662432V28.9338L61 14.5ZM0 14.5V17H38.5V14.5V12H0V14.5Z"
            fill="black"
          />
        </svg>
        <h3 className="text-2xl">Abuja</h3>
      </div>

      <button className="w-max px-8 float-right text-xs lg:text-base py-2 rounded-lg disabled:bg-light-gray cursor-pointer bg-brand text-white">
        Book trip
      </button>
    </div>
  );
}

export default TripCard;
