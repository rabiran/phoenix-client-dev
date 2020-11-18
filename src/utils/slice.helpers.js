export const createIdMap = (entries, path = 'id') => {
  const mapArr = entries.map(e => ({ [e[path]]: e }));
  return Object.assign({}, ...mapArr);
};

export const insertToIdMap = (idMap, newEntriesArray, idPath = 'id') => {
  // const mapArr = newEntriesArray.map(e => ({ [e[idPath]]: e }))
  return Object.assign(idMap, ...newEntriesArray.map(e => ({ [e[idPath]]: e })))
}
