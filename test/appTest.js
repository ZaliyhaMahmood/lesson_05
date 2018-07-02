var result = require('../app')();
var expect = require('chai').expect;
var jq = require('jquery');

var jsdom;
try {
  jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
  jsdom = require("jsdom"); // jsdom <= 9.x
}

describe('jQuery tests', function() {
 
  before(function(done) {
    jsdom.env({
      html: '<div',
      done: function(errors, window) {
        global.window = window;
        global.document = window.document;      
        global.$ = jq(window);
        done();
      }
    });
  });

  it('Creates two elements: class .button and class .content', function() {
    document.body.innerHTML = '<div id="root"></div>';
    result('#root');
    var root = document.getElementById('root');
    var btn = root.getElementsByClassName('button')[0];
    var content = root.getElementsByClassName('content')[0];
    expect(btn).to.exist;
    expect(btn).to.be.an.instanceof(window.HTMLElement);
    expect(btn.innerHTML).to.not.be.empty;
    expect(btn.innerHTML).to.equal('hide');
    
    expect(content).to.exist;
    expect(content).to.be.an.instanceof(window.HTMLElement);
    expect(content.innerHTML).to.not.be.empty;
    expect(content.innerHTML).to.equal('This is the Content'); 

  });
  
  it('content should initially be visible', function() {
    document.body.innerHTML = '<div id="root"></div>';
    result('#root');
    var root = document.getElementById('root');
    var btn = root.getElementsByClassName('button')[0];
    var content = root.getElementsByClassName('content')[0];
    
    //check if they are defined
    expect(btn).to.exist;
    expect(content).to.exist;   
    expect(btn.innerHTML).to.equal('hide');
    expect(content.innerHTML).to.equal('This is the Content');   
    //visible
    expect(content.style.display).to.equal('');

  });

  it('hide content when button is clicked', function() {
    document.body.innerHTML = '<div id="root"></div>';
    result('#root');
    var root = document.getElementById('root');
    var btn = root.getElementsByClassName('button')[0];
    var content = root.getElementsByClassName('content')[0];
        
    var event = new window.MouseEvent('click');
    btn.dispatchEvent(event);    
    
    expect(btn.innerHTML).to.equal('show');
    expect(content.style.display).to.equal('none');

    btn.dispatchEvent(event);
    
    expect(btn.innerHTML).to.equal('hide');
    expect(content.style.display).to.equal('');
 
  });


});
