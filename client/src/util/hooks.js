<<<<<<< HEAD
// improving Code Reusability for Login and Register Page 

=======
>>>>>>> 0404f58f6a816d5f8a183939ea25395e1ed0cb2d
import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback(); // we use callback depending on the function that we need from the page example: our Register Page Callback is AddUser();.
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
