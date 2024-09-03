export const checkMissingFields = (body, requiredFields) => {
  return requiredFields
    .map((field) => {
      if (!body[field]) {
        return `${field} is required`;
      }
      return null;
    })
    .filter((error) => error !== null); // Remove null values from the array
};
