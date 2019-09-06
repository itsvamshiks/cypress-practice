import { Given } from "cypress-cucumber-preprocessor/steps";

const googleUrl = "http://google.com";
const cypressUrl = "https://www.cypress.io";

Given("I open Google page", () => {
    cy.request(googleUrl);
});

Then(`I see {string} in the title`, () => {
    cy.title().should("include", "google");
});


Given(`I kinda open cypress page`, () => {
    cy.visit(cypressUrl);
});

// This is the same step that we have in news/Google/different.js, but you don't have to worry about collisions!
Then(`I see "Cypress" in the title`, () => {
    cy.title().should("include", "cypress.io");
});