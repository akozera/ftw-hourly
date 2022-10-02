export const calculateCleaningTimeMinutes = (numBedrooms, numBathrooms, additionalServices) => {
  const numBedroomsParsed = numBedrooms || 0;
  const numBathroomsParsed = numBathrooms || 0;
  let bedroomCoeff = 60;
  let bathroomCoeff = 75;
  let cleaningTimeEstimate = numBedroomsParsed * bedroomCoeff + numBathroomsParsed * bathroomCoeff;

  return cleaningTimeEstimate;
};

export const calculateCleaningTimeHours = cleaningTimeEstimateMinutes => {
  return Math.round((cleaningTimeEstimateMinutes / 60) * 100) / 100;
};
