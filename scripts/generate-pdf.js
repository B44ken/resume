import { join } from 'path';
import puppeteer from 'puppeteer';

const htmlPath = join(process.cwd(), 'dist', 'index.html');
const url = 'file://' + htmlPath;

async function run() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.pdf({path: join('dist', 'resume.pdf'), format: 'A4', printBackground: true});
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
