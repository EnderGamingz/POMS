import {
  ServiceDataRequestBody,
  ServiceIncident,
} from "../../types/ServiceDataRequest";

/**
 * Sends incident data to specified recv endpoint using axios
 * @param axios axios instance
 * @param token service token
 * @param endpoint recv endpoint
 * @param data incident data
 */
export async function sendServiceData(
  axios: any,
  token: string,
  endpoint: string,
  data: ServiceIncident[],
) {
  await axios
    .post(endpoint, {
      token: token,
      incidents: data,
    } satisfies ServiceDataRequestBody)
    .then(() => {
      console.log(
        "Successfully reported",
        data.length,
        "incidents at",
        new Date().toISOString(),
      );
    })
    .catch((err) => {
      console.error(
        "Error while reporting data at",
        `${new Date().toISOString()}:`,
        err.message,
      );
    });
}
