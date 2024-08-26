// /Users/ashwinibhandari/profilesapp/amplify/auth/post-confirmation/resource.ts

import { defineFunction } from '@aws-amplify/backend';

// Define and export the postConfirmation function
export const postConfirmation = defineFunction({
  name: 'post-confirmation',
});
// /Users/ashwinibhandari/profilesapp/amplify/data/resource.ts

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource"; // Correct relative path

const schema = a
  .schema({
    UserProfile: a
      .model({
        email: a.string(),
        profileOwner: a.string(),
      })
      .authorization((allow) => [
        allow.ownerDefinedIn("profileOwner"),
      ]),
  })
  .authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
