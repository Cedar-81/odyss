import TripCard from "./TripCard";

function Trips() {
  return (
    <section className="space-y-10 lg:px-10">
      <h2 className="text-xl lg:text-3xl font-medium">Available trips</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </section>
  );
}

export default Trips;
