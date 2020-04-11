var expect  = require('chai').expect;
var request = require('request');

it('Root page content', function(done) {
    request('http://localhost:8082' , function(error: Error, response: Response, body: Body) {
        expect(body).to.equal('try GET /filteredimage?image_url={{}}');
        done();
    });
});