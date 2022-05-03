import { useState } from 'react';

const useForm = (callback, defaultValues={}) => {

  const [values, setValues] = useState(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    // I'm using the spread operator here so the callback function cannot manipulate state directly
    callback(...values);
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
