import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { authTokenVar, isLoggedInVar } from '../../apollo';
import { LOCALSTORAGE_TOKEN } from '../../constants';
import {
  signInMutation,
  signInMutationVariables,
} from '../../__generated__/signInMutation';

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
export const SignIn = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>이메일</label>
        <input
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
        <label>비밀번호</label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          required
          ref={register({ required: '비밀번호를 입력해 주세요.' })}
        ></input>
        {errors.password?.message && <span>{errors.password?.message}</span>}
      </div>
      <div>
        <button disabled={!formState.isValid}>
          {loading ? 'Loading...' : '로그인'}
        </button>
        {signInMutationResult?.signIn.error && (
          <span>{signInMutationResult?.signIn.error}</span>
        )}
      </div>
    </form>
  );
};
