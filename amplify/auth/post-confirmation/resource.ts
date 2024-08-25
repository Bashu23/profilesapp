import { defineFunction } from '@aws-amplify/backend';
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "/Users/ashwinibhandari/profilesapp/amplify/auth/post-confirmation/resource.ts";

// Define the post-confirmation function
export const postConfirmation = defineFunction({
  name: 'post-confirmation',
});

// Define the schema and authorization
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

// Define data with authorization modes
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
