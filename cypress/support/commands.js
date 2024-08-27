// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("getDataTestEl", selector => {
    return cy.get(`[data-test=${selector}]`);
})

Cypress.Commands.add("login", (url, username, password) => {})

Cypress.Commands.add("loginByApi", (url, username, password) => {
    return cy.request("POST", url, {
        username, password
    })
    // response - status 200
    // check body
})

Cypress.Commands.add("verifyVisibleAndAttributes", (el, placeholder, type) => {
    el
        .should('be.visible')
        .and('have.attr', 'placeholder', placeholder)
        .and('have.attr', 'type', type);
})

Cypress.Commands.add("verifyVisibleAndValue", (btnEl, value) => {
    btnEl
        .should('be.visible')
        .and('have.value', value);
})

Cypress.Commands.add("verifyVisibleAndText", (el, text) => {
    el.should("be.visible");
    el.should('have.text', text);
})

//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
