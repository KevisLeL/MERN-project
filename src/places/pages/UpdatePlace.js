import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hooks';
import Card from '../../Shared/components/UIElements/Card';

import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Victoria Falls',
        description: 'One of the natural wonders of the world, and the biggest African Falls',
        imageUrl: 'https://lp-cms-production.imgix.net/image_browser/victoria-falls-aerial-shot.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4&w=1946',
        address: 'Victoria Falls, Zimbabue',
        location: {
            lat: -17.9253059,
            lng: 25.8527857
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Częstochowa',
        description: 'One of the most beautiful Poland cities. Home of the very handsome Margarita Gajzner',
        imageUrl: 'http://en.czestochowa.pl/page/file.php?id=2034',
        address: 'Królewska 10, 42-202 Częstochowa, Polonia',
        location: {
            lat: 50.7933561,
            lng: 19.1122647
        },
        creator: 'u2'
    },
    {
      id: 'p3',
      title: 'TESTING P3',
      description: '',
      imageUrl: 'http://en.czestochowa.pl/page/file.php?id=2034',
      address: '',
      location: {
          lat: 50.7933561,
          lng: 19.1122647
      },
      creator: 'u2'
  }
    ];

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);

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

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      ); };
      setIsLoading(false); 
    }, [setFormData, identifiedPlace]);
  

    const placeUpdatSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);

    };

    if (!identifiedPlace) {
        return (
          <div className="center">
            <Card>
              <h2>Could not find place!</h2>
            </Card>
          </div>
        );
    }

    if (isLoading) {
      return (
        <div className="center" >
          <h2>Loading...</h2>
        </div>
      );
  }
    return (
      <form className="place-form" onSubmit={placeUpdatSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="text"
          label="Description"
          validators={[VALIDATOR_MAXLENGTH(90), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters, max 90)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    );
};

export default UpdatePlace;