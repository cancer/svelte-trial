export const mapClasses = (classMap: { [key: string]: boolean }): string => {
  return Object.entries(classMap).reduce((output, [key, value]) => {
    if (!value) {
      return output;
    }

    return `${output} ${key}`;
  }, '');
};
