export const getDirections = (cities, setDirections) => {
  if (cities.length < 2) return;

  const directionsService = new window.google.maps.DirectionsService();
  directionsService.route(
    {
      origin: cities[0].city,
      destination: cities[cities.length - 1].city,
      waypoints: cities
        .slice(1, -1)
        .map((city) => ({ location: city.city, stopover: true })),
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error("Error fetching directions:", status);
      }
    }
  );
};
