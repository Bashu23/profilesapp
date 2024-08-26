// Import necessary modules
import { defineFunction } from '@aws-amplify/backend';

// Define and export the postConfirmation function
export const postConfirmation = defineFunction({
  name: 'post-confirmation',
});

// Then, in other files, import it as needed:
import { postConfirmation } from '../auth/post-confirmation/resource';

// Define your schema
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

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
