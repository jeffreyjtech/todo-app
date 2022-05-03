import { useState } from 'react';

const useForm = (callback, defaultValues={}) => {

  const [values, setValues] = useState(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    // This is such a terrible idea but ok
    // This callback can do whatever it wants with the values state
    // EVEN THOUGH YOU SHOULD NEVER EVER CHANGE STATE DIRECTLY
    callback(values);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };
  
  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
