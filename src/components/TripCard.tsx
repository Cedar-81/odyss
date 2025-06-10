"use client";

interface TripCardProps {
  origin: string;
  destination: string;
  tripDate: string;
  phoneNumber: string;
  onBook?: () => void;
}

function TripCard({
  origin,
  destination,
  tripDate,
  onBook,
  phoneNumber,
}: TripCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  console.log("phoneNumber: ", phoneNumber);

  // Determine time of day
  const getTimeOfDay = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();

    if (hours < 12) return "morning";
    if (hours < 17) return "afternoon";
    return "evening";
  };

  console.log("date: ", tripDate);

  return (
    <div className="bg-brand/5 rounded-2xl space-y-6 p-6">
      <div className="flex justify-between">
        <p className="text-xs">{getTimeOfDay(tripDate)}</p>
        <p className="text-sm">{formatDate(tripDate)}</p>
      </div>

      <div className="flex justify-between gap-8 items-center">
        <h3 className="text-xl">{origin}</h3>
        <svg
          width="61"
          height="29"
          viewBox="0 0 61 29"
          fill="none"
          className="h-3 min-h-3 min-w-max"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M61 14.5L36 0.0662432V28.9338L61 14.5ZM0 14.5V17H38.5V14.5V12H0V14.5Z"
            fill="black"
          />
        </svg>
        <h3 className="text-xl">{destination}</h3>
      </div>

      <a
        target="_blank"
        href={phoneNumber ? `https://wa.me/${phoneNumber.slice(1)}` : ""}
      >
        <button
          onClick={onBook}
          disabled={!phoneNumber}
          className="w-max disabled:bg-gray px-8 float-right text-xs lg:text-base py-2 rounded-lg disabled:bg-light-gray cursor-pointer bg-brand text-white"
        >
          Book trip
        </button>
      </a>
    </div>
  );
}

export default TripCard;
