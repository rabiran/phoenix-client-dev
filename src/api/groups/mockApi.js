import rootGroup from './rootGroup';

const timeout = 500;

let nextId = 1;

const resolveAfter = (data, timeoutMs = timeout) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(data), timeoutMs);
});

const fetchGroupChildren = id => id === '4' ? 
  resolveAfter([{ id: '5', name: 'חמש', isAleaf: true }, {id: '6', name: 'שש', isAleaf: true}, {id: '4', name: 'ארבע', children: ['5','6']},]) 
  : resolveAfter([]);

const fetchSubtree = async (parentId) => {
  const pId = Number(parentId);
  return resolveAfter([
    { id: `${pId + 1}`, name: `----- ${pId + 1} -----`, children: [`${pId+2}`] },
    { id: `${pId+2}`, name: `----- ${pId+2} -----`, children: [`${pId+3}`]}
  ]);
};

const fetchAll = () => resolveAfter([]);

const getRootGroupId = () => {
 return resolveAfter(rootGroup.id);
};

const fetchGroupById = async id => {
  return resolveAfter(rootGroup);
};

export {
  getRootGroupId,
  fetchGroupById,
  fetchSubtree,
  fetchAll,
};

export default {
  getRootGroupId,
  fetchGroupById,
  fetchSubtree,
  fetchAll
};