import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {CoursesFrontApp} from '../app/courses-front';

beforeEachProviders(() => [CoursesFrontApp]);

describe('App: CoursesFront', () => {
  it('should have the `defaultMeaning` as 42', inject([CoursesFrontApp], (app: CoursesFrontApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([CoursesFrontApp], (app: CoursesFrontApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

