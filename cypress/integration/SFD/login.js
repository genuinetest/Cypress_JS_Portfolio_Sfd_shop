/// <reference types = "Cypress"/>

describe('User registration & Login testing', () => {

    let randomString = Math.random().toString(36).substring(2);
    let login = "netguru404" + randomString;
    let email = login + "@niepodam.pl";
    let password = "WyplynalemNaSuchegoPrzestworOceanu" + randomString;
    
    beforeEach(() => {
        cy.visit('https://sklep.sfd.pl/');
        cy.get('.account-menu__text').click();
    });
    it('User Valid registration test', () => {
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlZaloguj').click();
        cy.get('#ctl00_ContentPlaceHolder1_hlRejestracjaBefore').click();
        cy.get('#ctl00_ContentPlaceHolder1_tbLogin').type(login);
        cy.get('#ctl00_ContentPlaceHolder1_tbEmail').type(email);
        cy.get('#ctl00_ContentPlaceHolder1_tbEmailPowt').type(email);
        cy.get('#ctl00_ContentPlaceHolder1_tbHaslo').type(password);
        cy.get('#ctl00_ContentPlaceHolder1_tbHasloPowt').type(password);
        cy.get('.asp-checkbox').contains('Oświadczam').click();
        cy.get('#ctl00_ContentPlaceHolder1_btnZarejestruj').click();
        cy.get('.account-menu__text').click();
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlWyloguj').should('be.be.visible');

    });

    it('User not valid registration test / checkbox not checked', () => {
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlZaloguj').click();
        cy.get('#ctl00_ContentPlaceHolder1_hlRejestracjaBefore').click();
        cy.get('#ctl00_ContentPlaceHolder1_tbLogin').type(login + "a");
        cy.get('#ctl00_ContentPlaceHolder1_tbEmail').type(email + "a");
        cy.get('#ctl00_ContentPlaceHolder1_tbEmailPowt').type(email + "a");
        cy.get('#ctl00_ContentPlaceHolder1_tbHaslo').type(password);
        cy.get('#ctl00_ContentPlaceHolder1_tbHasloPowt').type(password);
        cy.get('#ctl00_ContentPlaceHolder1_btnZarejestruj').click();
        cy.get('.validator-msg').should('be.be.visible');
    });

    it('Login test with valid credentials', () => {
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlZaloguj').click();
        cy.get('#ctl00_ContentPlaceHolder1_Login1_UserName').type(login);
        cy.get('#ctl00_ContentPlaceHolder1_Login1_Password').type(password);
        cy.get('#ctl00_ContentPlaceHolder1_Login1_lbLoginButton').click();
        cy.get('.account-menu__text').click();
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlWyloguj').should('be.be.visible');
    });

    it('Login test with invalid credentials', () => {
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlZaloguj').click();
        cy.get('#ctl00_ContentPlaceHolder1_Login1_UserName').type(login);
        cy.get('#ctl00_ContentPlaceHolder1_Login1_Password').type(password + "123");
        cy.get('#ctl00_ContentPlaceHolder1_Login1_lbLoginButton').click();
        cy.get('#ctl00_panFlash').should('contain.text', 'Niepoprawny login lub hasło, spróbuj ponownie');
    });
});