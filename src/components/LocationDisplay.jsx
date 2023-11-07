import React from "react";
import { useSelector } from "react-redux";

function LocationDisplay() {
  const locationData = useSelector((state) => state.location.locationData);
  const error = useSelector((state) => state.location.error);
  const loading = useSelector((state) => state.location.loading);

  return (
    <div className="flex flex-col justify-center items-center p-4 lg:flex-row">
      {loading && (
        <p className="w-16 h-16 border-t-4 border-blue-500 border-solid border-t-blue-500 rounded-full animate-spin"></p>
      )}
      {error && (
        <p className="border-red-700 border-2 w-full lg:w-1/2 p-4 lg:p-7 rounded-md text-red-700 bg-red-50 text-center text-xl">
          Error: {error}
        </p>
      )}

      {locationData && (
        <div className="text-center w-full lg:w-9/12 border border-black p-4 lg:px-32 pt-12 rounded-md bg-gray-600 text-white">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Location Data:</h2>
          <div className="mb-4 lg:mb-8">
            <p className="text-base lg:text-lg">
              <span className="font-semibold mr-1">Country:</span>{" "}
              {locationData.country}
            </p>
            <p className="text-base lg:text-lg">
              <span className="font-semibold mr-1">State:</span>{" "}
              {locationData.places[0]["state"]}
            </p>
            <p className="text-base lg:text-lg">
              <span className="font-semibold mr-1">Postal Code:</span>{" "}
              {locationData["post code"]}
            </p>
          </div>
          <h4 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-8">Place Names:</h4>
          {locationData.places.map((place, index) => (
            <div
              key={index}
              className=" mb-4 lg:mb-7 py-4 lg:py-5 pl-4 lg:pl-10 bg-white text-black rounded-lg text-base lg:text-lg border border-black text-left"
            >
              <p >Place Name: {place["place name"]}</p>
              <p >Latitude: {place.latitude}</p>
              <p >Longitude: {place.longitude}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationDisplay;
