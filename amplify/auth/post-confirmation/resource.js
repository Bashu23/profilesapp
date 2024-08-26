"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.postConfirmation = void 0;
// Import necessary modules
var backend_1 = require("@aws-amplify/backend");
// Define and export the postConfirmation function
exports.postConfirmation = (0, backend_1.defineFunction)({
    name: 'post-confirmation',
});
// Then, in other files, import it as needed:
var resource_1 = require("../auth/post-confirmation/resource");
// Define your schema
var backend_2 = require("@aws-amplify/backend");
var schema = backend_2.a
    .schema({
    UserProfile: backend_2.a
        .model({
        email: backend_2.a.string(),
        profileOwner: backend_2.a.string(),
    })
        .authorization(function (allow) { return [
        allow.ownerDefinedIn("profileOwner"),
    ]; }),
})
    .authorization(function (allow) { return [allow.resource(exports.postConfirmation)]; });
exports.data = (0, backend_2.defineData)({
    schema: schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
