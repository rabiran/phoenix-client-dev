import realApi from './api';
import mockApi from './mockApi';

const useMock = false;
const toExport = useMock ? mockApi : realApi;


export const {
  getRootGroupId,
  fetchSubtree,
  fetchGroupById,
} = toExport;
