import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const { VATTENFALL_API_URL, FETCH_INTERVALL } = process.env;

if (!VATTENFALL_API_URL || !FETCH_INTERVALL) {
  console.error('Missing VATTENFALL_API_URL or FETCH_INTERVALL');
  process.exit(1);
} else {
  console.log('Loaded required env variables');
}

async function fetchData() {
  try {
    const res = await axios.get(VATTENFALL_API_URL);
    return res.data;
  } catch (err) {
    console.error('Error while fetching Data:', err);
  }
}

fetchData().then(res => {
  console.log(res);
});

/*

cron.schedule(FETCH_INTERVALL, () => {
  console.log('test');
});
*/
