import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hooks';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';

import Card from '../../Shared/components/UIElements/Card';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';

import './PlaceForm.css';

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const history = useHistory();
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm(
        {
          title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          }
        },
        true
      );

      useEffect(() => {
        const fetchPlace = async() => {
            try{
              const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
              setLoadedPlace(responseData.place);
              setFormData(
                {
                  title: {
                    value: responseData.place.title,
                    isValid: true,
                  },
                  description: {
                    value: responseData.place.description,
                    isValid: true,
                  },
                },
                true
              ); 
  
            } catch (err){}
        };
        fetchPlace();
      }, [setFormData, sendRequest, placeId]);


    const placeUpdatSubmitHandler = async event => {
        event.preventDefault();

        try {
          await sendRequest(
            `http://localhost:5000/api/places/${placeId}`,
            "PATCH",
            JSON.stringify({
              title: formState.inputs.title.value,
              description: formState.inputs.description.value,
            }),
            {
              "Content-Type": "application/json",
              Authorization: 'Bearer ' + auth.token
            }
          );
          history.push('/' + auth.userId + '/places');
        } catch (err) {}
        

    };
    
    if (isLoading) {
      return (
        <div className="center" >
          <LoadingSpinner />
        </div>
      );
  }

    if (!loadedPlace && !error) {
        return (
          <div className="center">
            <Card>
              <h2>Could not find place!</h2>
            </Card>
          </div>
        );
    }

    return (
      <React.Fragment>
        <ErrorModal error={error} OnClear={clearError} />
      {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdatSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={loadedPlace.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="text"
          label="Description"
          validators={[VALIDATOR_MAXLENGTH(90), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters, max 90)."
          onInput={inputHandler}
          initialValue={loadedPlace.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>}
      </React.Fragment>
    );
};

export default UpdatePlace;