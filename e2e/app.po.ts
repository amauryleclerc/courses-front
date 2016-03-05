export class CoursesFrontPage {
  navigateTo() { return browser.get('/'); }
  getParagraphText() { return element(by.css('CoursesFront-app p')).getText(); }
}
