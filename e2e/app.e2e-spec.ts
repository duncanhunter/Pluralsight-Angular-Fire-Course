import { AngularfirePage } from './app.po';

describe('angularfire App', () => {
  let page: AngularfirePage;

  beforeEach(() => {
    page = new AngularfirePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
