export const createIdMap = (entries, path = 'id') => {
  const mapArr = entries.map(e => ({ [e[path]]: e }));
  return Object.assign(...mapArr);
};
