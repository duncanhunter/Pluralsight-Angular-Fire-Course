import { AngularfirePage } from './app.po';

describe('angularfire App', () => {
  let page: AngularfirePage;

  beforeEach(() => {
    page = new AngularfirePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
