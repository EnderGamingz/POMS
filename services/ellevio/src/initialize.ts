import puppeteer, { Browser, Page } from 'puppeteer';

export type InitializationPair = { browser: Browser; page: Page };

export async function initialize(url: string): Promise<InitializationPair> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(url);
  return { browser, page };
}
