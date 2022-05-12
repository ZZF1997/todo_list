describe('Story 1: TODO list layout', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should render title lines', () => {
        cy.contains('TODO List');
        cy.contains('Use this TODO list to manage your work');
    });

    it('should render input box', () => {
        cy.get('input').first()
            .should('have.attr', 'placeholder', 'Enter your TODO item');
    });

    it('should render add button', () => {
        cy.get('button')
            .should('contain', '+')
            .should('have.css', 'background-color', 'rgb(0, 100, 0)');
    });
});
