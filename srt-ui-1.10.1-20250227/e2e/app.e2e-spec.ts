import { SrtPage } from './app.po';

describe('srt App', () => {
  let page: SrtPage;

  beforeEach(() => {
    page = new SrtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
