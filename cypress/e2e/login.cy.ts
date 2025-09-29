/// <reference types="cypress" />

describe("Login flow", () => {
  it("should log in successfully", () => {
    // Arrange
    cy.visit("/");

    // Act - abrir página de login
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.contains("Welcome :)").should("be.visible");

    // Act - preencher credenciais e submeter
    cy.get('input[placeholder="user@example.com"]').type("l@gmail.com");
    cy.get('input[placeholder="Your password"]').type("abc");
    cy.get('[data-testid="login-button"]').click();

    // Assert - o botão de login na navbar mudará para logout se o login for bem-sucedido
    cy.contains("Logout").should("be.visible");

    // Act - o produto será adicionado ao carrinho caso esteja logado
    cy.contains("Add to cart").click();

    // Assert - o carrinho terá 1 item
    cy.get('[data-testid="cart-total-products"]')
      .should("be.visible")
      .and("have.text", "1");
  });

  it("should display error on invalid login", () => {});

  it("should display field error on submitting empty form", () => {
    // Arrange - acessar a página inicial
    cy.visit("/");

    // Act - abrir a página de login
    cy.contains("Login").click();

    // Assert - garantir que a rota e a saudação estejam corretas
    cy.url().should("include", "/login");
    cy.contains("Welcome :)").should("be.visible");

    // Act - submeter o formulário sem preencher campos
    cy.get('[data-testid="login-button"]').click();

    // Assert - verificar mensagens de erro para o campo de email
    cy.get('input[placeholder="user@example.com"]')
      .parent()
      .contains("Email is required")
      .should("be.visible");

    // Assert - verificar mensagens de erro para o campo de senha
    cy.get('input[placeholder="Your password"]')
      .parent()
      .contains("Password is required")
      .should("be.visible");
  });

  it("should display email error on submitting with invalid e-mail format", () => {});
});
