import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { authTokenVar, isLoggedInVar } from '../../apollo';
import { LOCALSTORAGE_TOKEN } from '../../constants';
import {
  signInMutation,
  signInMutationVariables,
} from '../../__generated__/signInMutation';
import nuberLogo from '../../images/logo.svg';
import facebookLogo from '../../images/facebook.svg';
import { Link } from 'react-router-dom';
import { FormError } from '../../components/common/FormError';
import { Button } from '../../components/common/Button';
import { Header } from '../../components/Header';

const SIGN_IN_MUTATION = gql`
  mutation signInMutation($signInInput: SignInInput!) {
    signIn(input: $signInInput) {
      ok
      token
      error
    }
  }
`;
interface ISignInFrom {
  email: string;
  password: string;
}
export const SignIn: React.FC = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ISignInFrom>({ mode: 'onChange' });
  const onCompleted = (data: signInMutation) => {
    const {
      signIn: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [signInMutation, { data: signInMutationResult, loading }] = useMutation<
    signInMutation,
    signInMutationVariables
  >(SIGN_IN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();

      signInMutation({
        variables: {
          signInInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Nuber Eats</title>
      </Helmet>
      <Header disableBackButton={true} />
      <div className="w-full max-w-screen-sm h-screen flex flex-col px-5 items-center justify-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              className="input"
              name="email"
              id-="email"
              type="email"
              placeholder="email address"
              required
              ref={register({
                required: 'Email is required',
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            ></input>
            {errors.email?.type === 'pattern' && (
              <FormError errorMessage={'Please enter a valid email'} />
            )}
            {errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            )}
          </div>
          <div className="mb-3">
            <input
              className="input"
              name="password"
              id="password"
              type="password"
              placeholder="password"
              required
              ref={register({ required: 'Password is required' })}
            ></input>
            {errors.password?.message && (
              <FormError errorMessage={errors.password?.message} />
            )}
          </div>
          <div className="text-right">
            <span className="w-full text-blue-400 text-xs">
              Forgotten password?
            </span>
          </div>
          <div className="my-6">
            <Button
              canClick={formState.isValid}
              loading={loading}
              actionText={'Sign In'}
            />

            {signInMutationResult?.signIn.error && (
              <FormError errorMessage={signInMutationResult.signIn.error} />
            )}
          </div>
          <div className="min-w-full flex items-center">
            <hr className="flex-1" />
            <span className="flex-0 mx-7">or</span>
            <hr className="flex-1" />
          </div>
          <div className="flex justify-center mt-10">
            <img src={facebookLogo} className="w-4 mr-2" alt="Nuber Eats" />
            <span className="text-blue-400 text-sm">Sign in with Facebook</span>
          </div>
        </form>
        <div className="absolute min-w-full inset-x-0 bottom-0 mb-5 text-center">
          <hr className="my-5" />
          <span className="text-xs text-gray-500">
            Dont't have an account?{' '}
            <Link to="/signup" className="text-blue-400">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
