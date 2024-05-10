import dotenv from 'dotenv';
import { ServiceEnv, verifyConfig } from '../../shared/verifyConfig';
import { InitializationPair, initialize } from './initialize';
import { ServiceIncident } from '@globalTypes/ServiceDataRequest';
import { sendServiceData } from '../../shared/sendServiceData';
import axios from 'axios';
import cron from 'node-cron';

dotenv.config();

function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d as unknown as number);
}

const vars: ServiceEnv[] = [
  { name: 'ELLEVIO_CITY_PAGE', value: process.env.ELLEVIO_CITY_PAGE },
  { name: 'ELLEVIO_COUNTRY_PAGE', value: process.env.ELLEVIO_COUNTRY_PAGE },
  { name: 'ELLEVIO_PAGE_URL', value: process.env.ELLEVIO_PAGE_URL },
  { name: 'FETCH_INTERVALL', value: process.env.FETCH_INTERVALL },
  { name: 'SERVICE_TOKEN', value: process.env.SERVICE_TOKEN },
  { name: 'ENDPOINT_URL', value: process.env.ENDPOINT_URL },
];

const [
  ELLEVIO_CITY_PAGE,
  ELLEVIO_COUNTRY_PAGE,
  ELLEVIO_PAGE_URL,
  FETCH_INTERVALL,
  SERVICE_TOKEN,
  ENDPOINT_URL,
] = verifyConfig(vars);

console.log('Service started at', new Date().toISOString());

async function acceptCookie({ page }: InitializationPair) {
  try {
    const cookieAcceptButton = await page.$(
      '#CybotCookiebotDialogBodyButtonDecline',
    );
    if (cookieAcceptButton) {
      await cookieAcceptButton.click();
      await page.waitForSelector('#CybotCookiebotDialog', { hidden: true });
      console.log('Page: Cookie accepted');
    }
  } catch (error) {
    console.log('Page: Cookie already accepted');
  }
}

function formatCountyName(countyName: string): string {
  let county = countyName;
  if (county === 'V Götalands län') {
    county = 'Västragötaland';
  } else {
    county = county.split(' ')[0];
  }

  if (county.endsWith('s')) {
    county = county.substring(0, county.length - 1);
  }

  return county.toLowerCase();
}

async function getCountries({ page }: InitializationPair): Promise<string[]> {
  const countries = [];
  console.log('Fetching Counties with outages');
  //Get table where class starting with InfoBox_locationList
  const table = await page.$('table[class^="InfoBox_locationList"]');
  if (!table) {
    console.log('Country table could not be found.');
    process.exit(1);
  }
  const rows = await table.$$('tbody > tr');
  for (const row of rows) {
    const columns = await row.$$('td');
    const unplanned = await columns[1].evaluate(el => el.textContent);
    const planned = await columns[2].evaluate(el => el.textContent);

    // Skip if no outages in country
    if (!+unplanned && !+planned) continue;

    const name = formatCountyName(
      await columns[0].evaluate(el => el.textContent),
    );
    countries.push(name);
  }
  console.log('Fetched', countries.length, 'countries with outages');
  return countries;
}

async function getMunicipalities(
  { page }: InitializationPair,
  countries: string[],
): Promise<string[]> {
  const municipalities = [];
  console.log('Fetching municipalities with outages from', countries.length);
  for (const country of countries) {
    await page.goto(`${ELLEVIO_COUNTRY_PAGE + country}/idag`);
    await page.waitForSelector('div[class^="InfoBox_selectedCountyTitle"]');
    const locationsTable = await page.$('table[class^="InfoBox_locationList"]');
    const rows = await locationsTable.$$('tbody > tr');
    for (const row of rows) {
      const columns = await row.$$('td');
      const unplanned = await columns[1].evaluate(el => el.textContent);
      const planned = await columns[2].evaluate(el => el.textContent);

      // Skip if no outages in location
      if (!+unplanned && !+planned) continue;

      municipalities.push(
        await columns[0].evaluate(el => el.textContent.toLowerCase()),
      );
    }
  }

  console.log('Fetched', municipalities.length, 'municipalities with outages');
  return municipalities;
}

async function getOutageInformation(
  { page }: InitializationPair,
  municipalities: string[],
): Promise<ServiceIncident[]> {
  const outages: ServiceIncident[] = [];
  console.log(
    'Fetching outage information from',
    municipalities.length,
    'municipalities',
  );
  for (const location of municipalities) {
    await page.goto(`${ELLEVIO_CITY_PAGE + location}/idag`);

    await page.waitForSelector(
      'div[class^="InfoBox_selectedMunicipalityTitle"]',
    );
    const informationContainer = await page.$(
      'div[class^="InterruptInfo_timestampsContainer"]',
    );
    const informationItems = await informationContainer
      .$('div')
      .then(el => el.$$('div'));

    const information = [];
    for (const infoItem of informationItems) {
      const text = await infoItem.evaluate(el => el.innerText.split(': '));
      information.push(text);
    }

    let startTime: string;
    try {
      startTime = information[0][1].split(' ')[1];
      if (!isValidDate(new Date(information[0][1].split(' ')[1]))) {
        startTime = new Date(
          new Date().toDateString() + ' ' + startTime.replace('.', ':') + ':00',
        ).toISOString();
      }
    } catch (e) {
      startTime = new Date(0).toISOString();
    }

    let endTime: string | undefined;
    try {
      endTime = information[1][1];
      if (endTime.includes('Uppdateras')) endTime = undefined;
      else {
        if (!isValidDate(new Date(endTime))) {
          endTime = new Date(
            new Date().toDateString() + ' ' + endTime.replace('.', ':') + ':00',
          ).toISOString();
        }
      }
    } catch (e) {
      endTime = new Date(0).toISOString();
    }

    let affected = 0;
    try {
      affected = Number(information[2][1].split(' ')[0]);
    } catch (e) {
      affected = undefined;
    }

    outages.push({
      location: [location],
      planned: false,
      description: await page
        .$('div[class^="InterruptInfo_title"]')
        .then(async el => await el.evaluate(ele => ele.textContent)),
      start_time: startTime,
      end_time: endTime,
      area_codes: [],
      affected_customers: affected,
      additional_information: await page
        .$('div[class^="InterruptInfo_customerInformationText"]')
        .then(async el => await el.evaluate(ele => ele.textContent)),
    });
  }

  console.log(
    `Fetched outage information (${outages.length}) for`,
    municipalities.length,
    'municipalities',
  );
  return outages;
}

initialize(ELLEVIO_PAGE_URL).then(async res => {
  await acceptCookie(res);
  cron.schedule(FETCH_INTERVALL, async () => {
    const countries = await getCountries(res);
    const municipalities = await getMunicipalities(res, countries);
    const reports = await getOutageInformation(res, municipalities);
    if (reports.length) {
      await sendServiceData(axios, SERVICE_TOKEN, ENDPOINT_URL, reports);
    }
  });
  await res.browser.close();
});
