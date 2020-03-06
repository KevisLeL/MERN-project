import React from 'react';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/util/validators';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { useForm } from '../../Shared/hooks/form-hooks';

import './PlaceForm.css';


const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      }
    },
    false
  );
  
  
  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); //send this to the Backend
  };

    return (
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
        id='title'
          element="input"
          type="text"
          label="Place title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
        id='description'
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
        id='address'
          element="input"
          type="text"
          label="Address place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
      </form>
    );
};

export default NewPlace;

