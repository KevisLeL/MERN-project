import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'; 
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/util/validators';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../Shared/context/auth-context';
import { useForm } from '../../Shared/hooks/form-hooks';
import { useHttpClient } from '../../Shared/hooks/http-hook';


import './PlaceForm.css';



const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
  
  const history = useHistory();
  
  const placeSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        {'Content-Type': 'application/json'}
      );
        history.push('/');
    } catch (err) {}
  };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
      </React.Fragment>
    );
};

export default NewPlace;

