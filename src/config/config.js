// The first element is the default value of who need rank
export const RANK = ['unknown', 'rookie', 'champion', 'ultimate', 'mega'];

// the last element makes the 'domainUsers' field required (at least 1 value in the array)
// the second to last element makes the 'rank' field required
export const ENTITY_TYPE = ['digimon', 'agumon', 'tamar'];
// the first element is the default value
export const RESPONSIBILITY = ['none', 'HR', 'SO'];
// If there is no ADFS you will write an empty string value ('')
export const DOMAIN_MAP = [
  ['rabiran.com', 'rabiranuid'],
  ['somedomain.com', 'somedomainuid'],
  ['jello.com', 'jellouid'],
  ['jello2.com', 'jellouid'],
  ['yoda.sw', ''],
  ['turtle.com', ''],
  ['donatelo.turtle.com', ''],
  ['rafael.turtle.com', ''],
];