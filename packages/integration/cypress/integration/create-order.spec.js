/// <reference types="cypress" />
describe("create new order", () => {
  before(() => {
    cy.server();
    cy.route("**/api/Items**", "fixture:items.json").as("items");
    cy.route("**/api/Addresses**", "fixture:addresses.json");
    cy.route("**/api/Telephones**", "fixture:telephones.json");
    cy.route("**/api/ClientAddresses**", "fixture:client-addresses.json");
    cy.login("teste", "123");
    cy.visit("#/orders/add");
  });

  describe("provide client, phone and address", () => {
    before(() => {
      cy.get("#phoneSearchType").type("92991095426{enter}");
    });

    it("should have the address provided", () => {
      cy.get("#create-order-address-card").should(
        "contain.text",
        "Rua 41, nº 839 - Japiim I"
      );
    });

    it("should have the phone number provided", () => {
      cy.get("#create-order-phone-number").should(
        "contain.text",
        "(92) 99109-5426"
      );
    });
  });

  describe("provide a single order item", () => {
    before(() => {
      cy.get("#order-search-item-add [data-item-id='1']").click();
    });

    it("should result R$ 4,00 due to a single order item", () => {
      cy.get("#create-order-total-amount").should("contain.text", "R$4,00");
    });
  });

  describe("provide exact amount for payment", () => {
    before(() => {
      cy.get("#paidAmount").click();
      cy.get("#paid-amount-exact-value").click();
    });

    it("should have R$ 4,00 of paid amount", () => {
      cy.get("#create-order-paid-amount-value").should(
        "contain.text",
        "R$4,00"
      );
    });
  });

  describe("persist order", () => {
    before(() => {
      cy.get("md-icon").contains("send").click();
    });

    it("should be able to persist", () => {
      cy.url().should("include", "/print");
    });
  });
});
