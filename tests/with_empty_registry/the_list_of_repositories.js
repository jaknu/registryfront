var assert = require('assert')
var Browser = require('zombie')

describe('The list of repositories', function () {
  var browser = new Browser()

  before(function (done) {
    browser.visit('http://registryfront', done)
  })

  it('should tell the user that there are no repositories in the registry', function (done) {
    browser.assert.status(200)
    browser.assert.text('.panel-body', /No repositories/)
    done()
  })
})
