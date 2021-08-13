/// <reference types = "Cypress"/>

describe('User filter products & place an order', () => {

    let login = "netguru404";
    let email = login + "@niepodam.pl";
    let password = "WyplynalemNaSuchegoPrzestworOceanu";
    
    beforeEach(() => {
        cy.visit('https://sklep.sfd.pl/');
        cy.get('.account-menu__text').click();
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlZaloguj').click();
        cy.get('#ctl00_ContentPlaceHolder1_Login1_UserName').type(login);
        cy.get('#ctl00_ContentPlaceHolder1_Login1_Password').type(password);
        cy.get('#ctl00_ContentPlaceHolder1_Login1_lbLoginButton').click();
        // cy.get('#basket-popup').then( $popup => {
        //     if($popup.is(':visible')){
        //         cy.get('.basket-popup__item-price--delete__btn').click();
        //         cy.get('.right-panel__close').click({force: true});
        //     }
        // })
        cy.get('#basket-popup').then( $popup => {
            if($popup.is(':visible')){
                cy.get('.basket__amount').then( $amount => {
                    const amount = $amount.text();
                    cy.log(amount);
                    if(amount.includes('0,00')){
                        cy.get('.right-panel__close').click({force: true});
                    } else{
                        cy.get('.basket-popup__item-price-container').find('.basket-popup__item-price--delete__btn').eq(0).click();
                        cy.get('.right-panel__close').click({force: true});
                    }
                })
            }
        })
        
        cy.get('.account-menu__text').click();
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_hlWyloguj').should('be.visible');
    });

    //due to having production environment, placing order process will finish at choosing payment method
    it('User chooses product, add to cart and place an order', () => {
        cy.get('.menu-switch').click();
        cy.get("[href='//sklep.sfd.pl/Żywność_dietetyczna-k150.html']").click();
        cy.get("[href='//sklep.sfd.pl/Masła_orzechowe-k696.html']").click();
        cy.get("[href='//sklep.sfd.pl/Masła_z_orzechów_arachidowych-k892.html']").click();
        cy.get('.close_topbar').click()
        cy.contains('Warianty').parent().within(() => {
            cy.contains('crunch').click({force: true});
            cy.get('.save-filters').click({force: true});
        });
        cy.contains('Peanut Cream').click();
    
    cy.get('.product-name').invoke('text');
        cy.get('.product-name').should('contain.text', 'Peanut Cream');
        cy.get("[content='24.99']").invoke('text').as('peanutCreamPrice');
        
        cy.get('#ctl00_ContentPlaceHolder1_btnDodajDoKoszyka').click();
        cy.get("[data-flavour='Chrupiące']").click();
        cy.get('.add-to-basket-js').click();
        cy.get('#basket-popup').within(() => {
            cy.get('.right-panel__close').click({force: true});
        });
        cy.get('#ctl00_SklepHeaderControl1_DefaultHeaderControl_koszCtrl_hlKoszyk').as('basket');
        cy.get('@basket').should('have.attr', 'data-ilosc', '1');
        cy.get('@basket').click();
        cy.get('.basket-popup__item--name').should('contain.text','Peanut Cream');
        cy.get('.basket-popup__item-price').should('contain.text', '24,99');
        cy.get('#ctl00_KoszykPopupControl_hlPrzejdzDoKasy').click();

        cy.get('#ctl00_ContentPlaceHolder1_lblSuma').should('contain.text', '24,99 zł');
        cy.get('.btn-accept--arrow').click({force: true});
        cy.get('#ctl00_ContentPlaceHolder1_lbTopDalej').scrollIntoView().click();
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_acAdresGlowny_tbImie').type('Netguru');
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_acAdresGlowny_tbNazwisko').type('404');
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_acAdresGlowny_tbTelefon').type('500000000');
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_acAdresGlowny_tbUlica').type('Bohaterow jakosci');
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_acAdresGlowny_tbNumerDomu').type('99');
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_acAdresGlowny_tbKod').type('37-450');
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_acAdresGlowny_tbMiasto').type('Stalowa Wola');
        cy.get("[onclick='scrollToValidator();']").click();
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_StepNavigationTemplateContainerID_StepNextButton').click();
        cy.get('.wysylka-pobranie').within(() => {
            cy.get('.delivery-type__btn').click();
            cy.get("[for='ctl00_ContentPlaceHolder1_wzKreator_rblWysylka_3']").click()
        });
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_StepNavigationTemplateContainerID_StepNextButton').click();
        cy.get('#ctl00_ContentPlaceHolder1_wzKreator_lbZlozZamowienie').scrollIntoView().should('be.visible');
    });
});