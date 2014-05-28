/*global describe, it*/
'use strict';

var should = require('should'),
    Ractive = require('ractive'),
    modella = require('modella'),
    adaptor = require('..'),
    Adaptor,
    User,
    user,
    view;

User = modella('User')
    .attr('name')
    .attr('email');

user = new User({name: 'River', email: 'river.grimm@gmail.com'});

Adaptor = Ractive.adaptors.Modella = adaptor([User]);

view = new Ractive({
    template: '{{name}} - {{email}}',
    data: user,
    adapt: ['Modella']
});

describe('Ractive Modella', function () {
    it('defines the required Ractive operations', function (done) {
        Adaptor.filter.should.be.a.function;
        Adaptor.wrap.should.be.a.function;
        done();
    });

    it('attaches onchange handler to model', function (done) {
        user._callbacks.change.length.should.equal(1);
        done();
    });

    it('wraps the get method', function (done) {
        view.toHTML().should.equal('River - river.grimm@gmail.com');
        done();
    });

    it('wraps the set method', function (done) {
        user.name('River Grimm');

        view.toHTML().should.equal('River Grimm - river.grimm@gmail.com');
        done();
    });

    it('wraps the teardown method', function (done) {
        view.teardown();
        user._callbacks.change.length.should.equal(0);
        done();
    });
});