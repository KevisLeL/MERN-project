import React, { useState, useContext } from 'react';
import { useForm } from '../../Shared/hooks/form-hooks';

import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import Card from '../../Shared/components/UIElements/Card';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';

import './Auth.css';
    
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
 const { isLoading, error, sendRequest, clearError } = useHttpClient();
   

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
      
  const authSubmitHandler = async event => {
    event.preventDefault();
    
    if (isLoginMode) {
      try {
       const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {};
  
    } else {
      try {
        const responseData = await sendRequest(
         "http://localhost:5000/api/users/signup",
         "POST",
         JSON.stringify({
           name: formState.inputs.name.value,
           email: formState.inputs.email.value,
           password: formState.inputs.password.value,
         }),
         {
           "Content-Type": "application/json",
         }
       );
        
        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay/>}
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
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password (min. 6 characters)."
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
    </React.Fragment>
  );
  };

export default Auth;