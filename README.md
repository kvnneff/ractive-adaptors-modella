# Ractive-adaptors-modella
[![Build Status](https://travis-ci.org/staygrimm/ractive-adaptors-modella.svg?branch=master)](https://travis-ci.org/staygrimm/ractive-adaptors-modella)

[Ractive](http://ractivejs.org/) adaptor plugin for [modella](https://github.com/modella/modella).

## Installation

Component:

    component install staygrimm/ractive-adaptors-modella

npm:

  npm install ractive-adaptors-modella

## Example

```js
var modellaAdaptor = require('ractive-adaptors-modella'),
    modella = require('modella'),
    Ractive = require('ractive),
    User,
    user

User = modella('User')
    .attr('name')
    .attr('email');

user = new User({name: 'River', email: 'river.grimm@gmail.com'});

view = new Ractive({
    template: '<span>{{name}} - {{email}}</span>',
    data: user,
    adapt: [modellaAdaptor([User]);]
});

user.name('River Grimm');

view.toHTML(); // <span>River Grimm - river.grimm@gmail.com</span>
```

## API

### Adaptor([constructors])

Unline other Ractive adaptors, we need to initialize this adaptor with an array of Modella constructors.  This is required since there's no easy method to discover if a model has been created by a constructor created by Modella.  Instead, we have to check against the constructor itself. 

## Test

  npm install && make test

## License

GPL v2
