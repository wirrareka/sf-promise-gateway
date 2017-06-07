# sf-promise-gateway

[![Build Status](https://travis-ci.org/wirrareka/sf-promise-gateway.svg?branch=master)](https://travis-ci.org/wirrareka/sf-promise-gateway)

## About
This is a simple batch processing gateway that returns a promise, simple solver of complex promise batch problems.

## Usage
```
const gateway = require('sf-promise-gateway');
const items = [ "a", "b", "c"];

gateway(items, (item, next) => {
  const onSuccess = (result) => {
    next(null, result);
  };

  const onError = (error) => {
    next(error);
  };

  somethingAsync(onSuccess, onError);
})
.then((results) => {

});
```
