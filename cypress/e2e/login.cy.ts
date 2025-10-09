/// <reference types="cypress" />

describe("Login flow", () => {
  it("should log in successfully", () => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.contains("Welcome :)").should("be.visible");

    cy.get('input[placeholder="user@example.com"]').type("l@gmail.com");
    cy.get('input[placeholder="Your password"]').type("abc");
    cy.get('[data-testid="login-button"]').click();

    cy.contains("Logout").should("be.visible");
    cy.contains("Add to cart").click();

    cy.get('[data-testid="cart-total-products"]')
      .should("be.visible")
      .and("have.text", "1");
  });

  it("should display error on invalid login", () => {
    cy.visit("/");
    cy.contains("Login").click();

    cy.url().should("include", "/login");
    cy.contains("Welcome :)").should("be.visible");

    cy.get('input[placeholder="user@example.com"]').type("wrongemail@gmail.com");
    cy.get('input[placeholder="Your password"]').type("wrongpassword");
    cy.get('[data-testid="login-button"]').click();

    cy.contains("Wrong email or password.").should("be.visible");
  });

  it("should display field error on submitting empty form", () => {
    cy.visit("/");
    cy.contains("Login").click();

    cy.url().should("include", "/login");
    cy.contains("Welcome :)").should("be.visible");

    cy.get('[data-testid="login-button"]').click();

    cy.get('input[placeholder="user@example.com"]')
      .parent()
      .contains("Email is required")
      .should("be.visible");

    cy.get('input[placeholder="Your password"]')
      .parent()
      .contains("Password is required")
      .should("be.visible");
  });

  it("should display email error on submitting with invalid e-mail format", () => {});
});
