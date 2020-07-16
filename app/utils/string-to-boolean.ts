/**
 * This function explicitly converts the string 'true' to the boolean true
 * and the string 'false' to the boolean false. Everything else falls back
 * to the boolean false. The string comparison is NOT case sensitive.
 */
const stringToBoolean = (stringValue: string | undefined | null): boolean => {
  if (typeof stringValue !== 'string') {
    return false;
  }

  switch (stringValue.toLowerCase()) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return false;
  }
};

export default stringToBoolean;
