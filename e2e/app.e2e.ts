/// <reference path="../typings/main.d.ts" />

import { CoursesFrontPage } from './app.po';

describe('courses-front App', function() {
  let page: CoursesFrontPage;

  beforeEach(() => {
    page = new CoursesFrontPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('courses-front Works!');
  });
});
