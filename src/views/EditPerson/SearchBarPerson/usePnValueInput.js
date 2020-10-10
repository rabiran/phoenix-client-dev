import { useState, useMemo } from 'react'

const ERROR_LABEL = 'יש להכניס 6-9 ספרות בלבד!'; // todo: shouldn't be here
const validPnRegex = /^\d{5,9}$/;
const validInputRegex = /^\d{0,9}$/; 

export default function usePnValueInput({ search }) {
  const [errorLabel, setErrorLabel] = useState('');
  const [value, setValue] = useState('');

  const disableSearch = useMemo(() => !validPnRegex.test(value), [value]);

  const onChange = value => {
    if(validInputRegex.test(value)) {
      setValue(value);
    }
    if(validPnRegex.test(value)) {
      setErrorLabel('');
    } else {
      setErrorLabel(ERROR_LABEL);
    }
  };

  const handleKeyUp = key => {
    if (key === 'Enter' && !disableSearch) {
      handleSearch();
    }
  };

  const handleSearch = () => search(value);

  return {
    models: { disableSearch, value, errorLabel },
    operations: { handleSearch ,handleKeyUp, onChange }
  };
}