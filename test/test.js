describe('index page test', function() {
  it('button should be exist', function() {
    browser.get('http://localhost:3000/build/');
    expect(element(by.css('.btn')).isPresent()).toBe(false);
    
  });
});