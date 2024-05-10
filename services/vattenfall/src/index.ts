import dotenv from 'dotenv';
import axios from 'axios';
import { ServiceEnv, verifyConfig } from '../../shared/verifyConfig';
import cron from 'node-cron';
import { ServiceIncident } from '@globalTypes/ServiceDataRequest';
import { sendServiceData } from '../../shared/sendServiceData';

dotenv.config();

const vars: ServiceEnv[] = [
  { name: 'VATTENFALL_API_URL', value: process.env.VATTENFALL_API_URL },
  { name: 'FETCH_INTERVALL', value: process.env.FETCH_INTERVALL },
  { name: 'SERVICE_TOKEN', value: process.env.SERVICE_TOKEN },
  { name: 'ENDPOINT_URL', value: process.env.ENDPOINT_URL },
];

const [VATTENFALL_API_URL, FETCH_INTERVALL, SERVICE_TOKEN, ENDPOINT_URL] =
  verifyConfig(vars);

const skippedDescriptions = ['Kommande planerat avbrott'];

console.log('Service started at', new Date().toISOString());

async function fetchData() {
  console.log('Requesting raw data at', new Date().toISOString());
  try {
    return await axios.get(VATTENFALL_API_URL).then(res => res.data);
  } catch (err) {
    console.error('Error while fetching data:', err);
    throw new Error(err);
  }
}

cron.schedule(FETCH_INTERVALL, () => {
  fetchData().then(async res => {
    const relevantData = res.warnings.warning.filter(
      item => !skippedDescriptions.includes(item.description),
    );

    if (!relevantData.length) {
      console.log('No data to report at', new Date().toISOString());
      return;
    }

    console.log(
      'Transforming',
      relevantData.length,
      'data entries for reporting',
    );

    const transformedData: ServiceIncident[] = relevantData.map(
      item =>
        ({
          location: !!item.placenames.length
            ? item.placenames?.split(', ')
            : undefined,
          affected_customers: item.affectedCustomers,
          description: item.description,
          additional_information: item.freeText,
          start_time: item.startTime,
          end_time: !!item.completionTime.length
            ? item.completionTime
            : undefined,
          area_codes: item.affectedAreas.map(
            (area: { areacode: number }) => area.areacode,
          ),
          planned: false,
        }) satisfies ServiceIncident,
    );

    if (!!transformedData.length) {
      await sendServiceData(
        axios,
        SERVICE_TOKEN,
        ENDPOINT_URL,
        transformedData,
      );
    }
  });
});
