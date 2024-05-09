export function verifyConfig(): boolean {
  const { VATTENFALL_API_URL, FETCH_INTERVALL, SERVICE_TOKEN, ENDPOINT_URL } = process.env;

  const vars = [
    { name: 'VATTENFALL_API_URL', value: VATTENFALL_API_URL },
    { name: 'FETCH_INTERVALL', value: FETCH_INTERVALL },
    { name: 'SERVICE_TOKEN', value: SERVICE_TOKEN },
    { name: 'ENDPOINT_URL', value: ENDPOINT_URL },
  ];

  for (let i = 0; i < vars.length; i++) {
    const v = vars[i];
    if (!v.value) {
      console.error('Environment variable:', v.name, 'is missing');
      return false;
    }
  }

  console.log('Loaded required env variables');
  console.log('Loaded service token successfully');
  console.log('Endpoint url set to', ENDPOINT_URL);
  console.log('Set fetch interval to ' + FETCH_INTERVALL);
  return true;
}