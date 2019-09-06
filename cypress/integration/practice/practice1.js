describe('Some sample test cases',function () {


    it('opening google.com',function(){
        cy.visit('www.google.com');
    });

    it('retrieving a webpage based on user input',function () {
        cy.visit('www.amazon.com');
        //cy.get('[name=field-keywords]').type('smart plugs');
        /*
        const textBox = cy.get('[name=field-keywords]');
        textBox.type('smart plugs') //doesnt work
        */
        cy.get('#twotabsearchtextbox').type('Smart plugs').should('have.value','Smart plugs')
            .type('{leftarrow}{del}').clear();

        cy.get('.nav-search-submit > .nav-input').click();
        cy.title().should('include','Amazon.com');

        //You can also dblclick, check or uncheck the checkboxes,
    });

    it('Traverse in browser history',function () {
        cy.visit('www.amazon.com');
        cy.get('#twotabsearchtextbox').type('Smart plugs').should('have.value','Smart plugs')//assertions - (and for chaining assertions)
        //can also pass regular expressions in assertions.
        cy.get('.nav-search-submit > .nav-input').click();
        cy.location('pathname').then((response)=>{
            cy.log(response)
        });
        cy.go('back'); //can check status using pathname and checking URL
        cy.go('forward');
        //cy.screenshot();
        cy.reload();


    });

    //cy.submit  - submit form.
    //You can also dblclick, check or uncheck the checkboxes,

    it('Aliasing and waiting ',function () {
        cy.visit("https://example.cypress.io/commands/aliasing");
        cy.get('.as-table')
            .find('tbody>tr').first()
            .find('td').first()
            .find('button').as('firstBtn');
        cy.get('@firstBtn').click();

        cy.server();
        //cy.route('GET', 'comments/*',["Raman"]).as('getComment');
        //cy.route('GET', 'comments/*','fixture:example.json').as('getComment');//fixtures
        cy.fixture('example.json').as('exampleJSON');
        cy.route('GET', '/comments/*','@exampleJSON').as('getComment');

        cy.get('.network-btn').click();
        cy.wait('@getComment').its('status').should('eq', 200);
        //cy.visit("www.amazon.com") //- doesnt work, as you can visit only one unique domain in a single test.

    });


    it('REST API calls headless mode',function () {

        cy.request({
            method: 'POST',
            url: 'https://slack.com/signin',
            form: true,
            body: {
                name: 'hbsmith',
                job: 'password123'
            }
        }).as('POSTcall').then((response)=>{
            //process response

        });//cy.route()  doesnt work with this call

        //cy.get('@POSTcall')

    });

    it('cookies',function () {
        cy.visit('https://example.cypress.io/commands/cookies');
        cy.get('#getCookie .set-a-cookie').click();
        cy.getCookie('token').then(function (res) {
            console.log(res);
        });


    })


});



/*describe('Querying', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/querying')
    });

    it('cy.get() - query DOM elements', () => {
        cy.get('#query-btn').should('contain', 'Button');

        cy.get('[data-test-id="test-example"]').should('have.class', 'test')

        cy.get(('[data-test-id="test-example"]')).invoke('css','position').should('equal','static');

    });

});*/

describe("Connectors",()=>{
    beforeEach(()=>{
        cy.visit("https://example.cypress.io/commands/connectors")

    });

    it('invoking', function () {
        cy.get('.connectors-div').should('be.hidden')
            .invoke('show')
            .should('be.visible')

    });

    it('then',function () {
        cy.get('.connectors-list>li').then(function(item){
            expect(item).to.have.length(3)
            expect(item.eq(0)).to.contain('Walk the dog')
            expect(item.eq(1)).to.contain('Feed the cat')
            expect(item.eq(2)).to.contain('Write JavaScript')
        })
    });

    //each(),its()

});
