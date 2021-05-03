import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      callback();
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setSubmitted(true);
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
    setErrors(validate(values))//TODO: how do I change only specific field if I dont wont to get an error about all the fielsd???
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    submitted
  };
};

export default useForm;