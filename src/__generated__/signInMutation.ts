/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: signInMutation
// ====================================================

export interface signInMutation_signIn {
  __typename: "SignInOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface signInMutation {
  signIn: signInMutation_signIn;
}

export interface signInMutationVariables {
  signInInput: SignInInput;
}
