import React, { useState, useContext } from 'react';
import { useForm } from '../../Shared/hooks/form-hooks';

import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import Card from '../../Shared/components/UIElements/Card';
import { AuthContext } from '../../Shared/context/auth-context';

import './Auth.css';
    
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
       email: {
         value: '',
         isValid: false
       },
       password: {
          value: '',
         isValid: false
       }
      },
      true
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    };
    setIsLoginMode(prevMode => !prevMode);
  };
      
  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };
    
  return (
    <Card className="authentication">
      <h2>LOGIN REQUIRED</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
          
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MAXLENGTH(10), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (min. 5 characters, max 10)."
          onInput={inputHandler}
          
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOG IN" : "SIGN UP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGN UP" : "LOG IN"}
      </Button>
    </Card>
  );
  };

export default Auth;