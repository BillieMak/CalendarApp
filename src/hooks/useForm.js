import { useState } from "react";
export const useForm = (initialForm={}) => {
const [formSumitted, setFormSumitted] = useState(false);

const [formValues, setFormValues] = useState(initialForm);

const onInputChange = ({ target }) => {
  setFormValues({
    ...formValues,
    [target.name]: target.value,
  });
};

const onDateChange = (event, changin) => {
  setFormValues({
    ...formValues,
    [changin]: event,
  });
};


  return {
    ...formValues,
    formValues,
    onInputChange,
    onDateChange,
    formSumitted,
    setFormSumitted,
    setFormValues
  }
}
