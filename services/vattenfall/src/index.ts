import dotenv from 'dotenv';
import axios from 'axios';
import { verifyConfig } from './verifyConfig';
import cron from "node-cron"
import { ServiceDataRequestBody, ServiceIncident } from '@globalTypes/ServiceDataRequest';

dotenv.config();

const { VATTENFALL_API_URL, FETCH_INTERVALL, SERVICE_TOKEN, ENDPOINT_URL } = process.env;

const skippedDescriptions = ['Kommande planerat avbrott'];

if (!verifyConfig()) {
  process.exit(1);
}

console.log("Service started at", new Date().toISOString());

async function fetchData() {
  console.log('Requesting raw data at', new Date().toISOString());
  try {
    const res = await axios.get(VATTENFALL_API_URL);
    return res.data;
  } catch (err) {
    console.error('Error while fetching data:', err);
    throw new Error(err);
  }
}

async function sendData(data: ServiceIncident[]) {
  await axios.post(ENDPOINT_URL, {
    token: SERVICE_TOKEN,
    incidents: data,
  } satisfies ServiceDataRequestBody)
    .then(() => {
      console.log('Successfully reported', data.length, 'incidents at', new Date().toISOString());
    })
    .catch((err) => {
      console.error('Error while reporting data at', new Date().toISOString() + ':', err.message);
    });
}


cron.schedule(FETCH_INTERVALL, () => {
  fetchData().then(async res => {
    const relevantData = res.warnings.warning.filter(item => !skippedDescriptions.includes(item.description));

    if (!relevantData.length) {
      console.log('No data to report at', new Date().toISOString());
      return;
    }

    console.log("Transforming", relevantData.length, "data entries for reporting");

    const transformedData: ServiceIncident[] = relevantData.map(item => ({
      location: !!item.placenames.length ? item.placenames?.split(', ') : undefined,
      affected_customers: item.affectedCustomers,
      description: item.description,
      additional_information: item.freeText,
      start_time: item.startTime,
      end_time: !!item.completionTime.length ? item.completionTime : undefined,
      area_codes: item.affectedAreas.map((area: { areacode: number; }) => area.areacode),
      planned: false,
    } satisfies ServiceIncident));

    if (!!transformedData.length) {
      await sendData(transformedData);
    }

  });
});

