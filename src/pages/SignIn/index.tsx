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
      <div className="w-full max-w-screen-sm h-screen flex flex-col px-5 items-center justify-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="min-w-full focus:outline-none focus:border-gray-500 p-3 border bg-gray-50 rounded-md text-sm border-gray-200 transition-colors mb-3"
              name="email"
              id-="email"
              type="email"
              placeholder="이메일을 입력해 주세요."
              required
              ref={register({ required: '이메일을 입력해 주세요.' })}
            ></input>
            {errors.email?.message && <span>{errors.email?.message}</span>}
          </div>
          <div>
            <input
              className="min-w-full focus:outline-none focus:border-gray-500 p-3 border bg-gray-50 rounded-md text-sm border-gray-200 transition-colors mb-3"
              name="password"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              required
              ref={register({ required: '비밀번호를 입력해 주세요.' })}
            ></input>
            {errors.password?.message && (
              <span>{errors.password?.message}</span>
            )}
          </div>
          <div className="text-right">
            <span className="w-full text-blue-400 text-xs">
              Forgotten password?
            </span>
          </div>
          <div>
            <button
              className="min-w-full focus:outline-none p-3 bg-blue-300 rounded-md text-sm text-white transition-colors my-6"
              disabled={!formState.isValid}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
            {signInMutationResult?.signIn.error && (
              <span>{signInMutationResult?.signIn.error}</span>
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
      </div>
    </>
  );
};
