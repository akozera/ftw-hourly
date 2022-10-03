export const calculateCleaningTimeMinutes = (numBedrooms, numBathrooms, additionalServices) => {
  const numBedroomsParsed = numBedrooms || 0;
  const numBathroomsParsed = numBathrooms || 0;
  let bedroomCoeff = 60;
  let bathroomCoeff = 75;
  let additionalCoeff = {
    fridge: 30,
    windows: 30,
    oven: 30,
    cabinets: 45,
    laundry: 60,
  };

  let timeAdditionalServices = Object.keys(additionalCoeff).reduce(
    (previousValue, currentValue) =>
      previousValue + additionalServices[currentValue] * additionalCoeff[currentValue],
    0
  );

  let cleaningTimeEstimate =
    numBedroomsParsed * bedroomCoeff + numBathroomsParsed * bathroomCoeff + timeAdditionalServices;

  return cleaningTimeEstimate;
};

export const calculateCleaningTimeHours = cleaningTimeEstimateMinutes => {
  return Math.round((cleaningTimeEstimateMinutes / 60) * 100) / 100;
};

export const calculateCleaningPrice = (price, numHours) => {
  return price * numHours;
};

export const createAdditionalServicesString = additionalServices => {
  let filtered = Object.fromEntries(
    Object.entries(additionalServices).filter(([k, v]) => v === true)
  );
  return '+ ' + Object.keys(filtered).join(', ');
};
