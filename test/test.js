describe('index page', function() {
  var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  };
  it('button should has class active', function() {
    browser.get('http://localhost:3000/build/');
    var btn = element(by.css('.btn'));
    expect(hasClass(btn, 'active')).toBe(true);
  });
  
  it('svg should be exist', function() {
    browser.get('http://localhost:3000/build/');
    var svg = element(by.css('.nvd3-svg'));    
    expect(svg.isDisplayed());    
  });
});