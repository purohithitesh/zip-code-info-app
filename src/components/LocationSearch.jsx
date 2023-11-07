import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountryCode,
  setPostalCode,
  receiveData,
  setError,
  setLoading,
} from "../features/location/locationSlice";

function LocationSearch() {
  const dispatch = useDispatch();
  const countryCode = useSelector((state) => state.location.countryCode);
  const postalCode = useSelector((state) => state.location.postalCode);

  const handleSearch = () => {
    dispatch(receiveData(null));
    dispatch(setError(null));

    if (countryCode && postalCode) {
      dispatch(setLoading(true));

      fetch(`https://api.zippopotam.us/${countryCode}/${postalCode}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid country code, postal code, or API error.");
          }
          return response.json();
        })
        .then((data) => {
          dispatch(receiveData(data));
        })
        .catch((err) => {
          dispatch(setError(err.message));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setError("Country code and postal code are required."));
    }
  };

  const clearLocation = () => {
    dispatch(setCountryCode(""));
    dispatch(setPostalCode(""));
    dispatch(receiveData(null));
    dispatch(setError(null));
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl lg:text-4xl font-bold text-center m-2 lg:m-4">
        ZIP Code Information
      </h1>
      <div className="mt-2 mb-2 lg:mb-4 space-y-2">
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <p className="font-medium text-base lg:text-lg self-center">Enter Country Code:</p>
          <input
            className="px-2 py-1 border-2 rounded placeholder-slate-800 text-gray-800 text-base lg:text-lg"
            type="text"
            placeholder="Country Code (e.g., IN)"
            value={countryCode}
            onChange={(e) => dispatch(setCountryCode(e.target.value))}
            maxLength="2"
          />
        </div>
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-12">
          <p className="font-medium text-base lg:text-lg self-center">Enter ZIP Code:</p>
          <input
            className="px-2 py-1 border-2 rounded placeholder-slate-800 text-gray-800 text-base lg:text-lg"
            type="text"
            placeholder="ZIP Code"
            value={postalCode}
            onChange={(e) => dispatch(setPostalCode(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 mt-2 lg:mt-4 lg:space-x-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white w-full lg:w-40 text-base lg:text-xl font-bold py-2 px-4 rounded-full"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white w-full lg:w-40 text-base lg:text-xl font-bold py-2 px-4 rounded-full mt-2 lg:mt-0"
          onClick={clearLocation}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default LocationSearch;
