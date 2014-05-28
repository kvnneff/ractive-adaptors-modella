/*global describe, it*/
'use strict';

var should = require('should'),
    Ractive = require('ractive'),
    modella = require('modella'),
    adaptor = require('..'),
    Adaptor,
    userView,
    noteView,
    Note,
    note,
    User,
    user;

User = modella('User')
    .attr('name')
    .attr('email');

Note = modella('Note')
    .attr('title')
    .attr('text');

user = new User({name: 'River', email: 'river.grimm@gmail.com'});
note = new Note({title: 'Foo', text: 'Bar'});

Adaptor = Ractive.adaptors.Modella = adaptor([User, Note]);

userView = new Ractive({
    template: '{{name}} - {{email}}',
    data: user,
    adapt: ['Modella']
});

noteView = new Ractive({
    template: '{{title}} - {{text}}',
    data: note,
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
        note._callbacks.change.length.should.equal(1);
        done();
    });

    it('wraps the get method', function (done) {
        userView.get('name').should.equal('River');
        userView.get('email').should.equal('river.grimm@gmail.com');
        noteView.toHTML().should.equal('Foo - Bar');
        done();
    });

    it('syncs the set method on the model', function (done) {
        user.name('River Grimm');
        note.title('Baz');

        userView.get('name').should.equal('River Grimm');
        noteView.get('title').should.equal('Baz');
        done();
    });

    it('syncs the set method on the ractive instance', function (done) {
        userView.set('name', 'River');
        noteView.set('title', 'Foo');

        userView.get('name').should.equal('River');
        noteView.get('title').should.equal('Foo');
        done();
    });

    it('wraps the teardown method', function (done) {
        userView.teardown();
        noteView.teardown();

        user._callbacks.change.length.should.equal(0);
        note._callbacks.change.length.should.equal(0);
        done();
    });

    it('replaces the data object when reset is given a new object ', function (done) {
        user = new User({name: 'Dobs'});
        userView.reset(user);
        userView.get('name').should.equal('Dobs');
        done();
    });

    it('clears the data object when view is reset without a new object', function (done) {
        userView.reset();
        userView.data.should.be.empty;
        done();
    });
});