class FooterPage {
  elements = {
    footerSection: () => cy.get("footer"),
    privacyPolicyLink: () => cy.contains("footer a", "Privacy Policy", { matchCase: false }),
    termsOfServiceLink: () => cy.contains("footer a", "Terms of Service", { matchCase: false }),
    linkedInLink: () => cy.get("footer a[href*='linkedin.com']"),
  };

  scrollToFooter() {
    cy.scrollTo("bottom", { duration: 1000 });
    this.elements.footerSection().should("be.visible");
  }

  clickLink(linkName) {
    switch (linkName.toLowerCase()) {
      case "privacy policy":
        this.elements.privacyPolicyLink().scrollIntoView().should("be.visible").click({ force: true });
        break;
      case "terms of service":
        this.elements.termsOfServiceLink().scrollIntoView().should("be.visible").click({ force: true });
        break;
      case "linkedin":
        this.elements.linkedInLink().scrollIntoView().should("be.visible").invoke("attr", "href").then((href) => {
          cy.log(`LinkedIn profile URL: ${href}`);
          expect(href).to.include("linkedin.com/in/vadim-liavitski");
        });
        break;
      default:
        throw new Error(`Unknown footer link: ${linkName}`);
    }
  }

  verifyRedirection(expectedUrlFragment) {
    cy.url().should("include", expectedUrlFragment);
  }

  verifyTextVisible(expectedText) {
    cy.contains(expectedText, { matchCase: false }).should("be.visible");
  }
}

export const footerPage = new FooterPage();