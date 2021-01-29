import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { FormError } from '../../components/common/FormError';
import { Header } from '../../components/Header';
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '../../__generated__/createAccountMutation';
import { UserRole } from '../../__generated__/globalTypes';

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const SignUp: React.FC = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Listener,
    },
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert('Account Created! Log in now!');
      history.push('/');
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    },
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <Header />
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        {/* <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" /> */}
        <span className="w-full ftext-left text-base text-gray-500 mb-5">
          Enter email address
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          <div className="mb-3">
            <select
              name="role"
              ref={register({ required: true })}
              className="input"
            >
              {Object.keys(UserRole).map((role, index) => (
                <option key={index}>{role}</option>
              ))}
            </select>
          </div>
          <div className="my-6">
            <Button
              canClick={formState.isValid}
              loading={loading}
              actionText={'Sign Up'}
            />
            {createAccountMutationResult?.createAccount.error && (
              <FormError
                errorMessage={createAccountMutationResult.createAccount.error}
              />
            )}
          </div>
        </form>
        <div className="absolute min-w-full inset-x-0 bottom-0 mb-5 text-center">
          <hr className="my-5" />
          <span className="text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-400">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
