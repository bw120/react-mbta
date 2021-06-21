const mbtaApi = process.env.API_MBTA_URL || 'https://api-v3.mbta.com';

const headers = {
  'Accept': 'application/json',
};

export const getLines = (types = []) => {
  const typesParam = types && `?filter[type]=${types.join(',')}`;
  return fetch(`${mbtaApi}/routes${typesParam}`, { headers })
    .then(res => res.json())
    .then(json => json.data);
}

export const getStopsByRoute = (routes = []) => {
  const routesParam = routes && `?filter[route]=${routes.join(',')}`;
  return fetch(`${mbtaApi}/stops${routesParam}`, { headers })
    .then(res => res.json())
    .then(json => json.data);
}

export const getPredictionsByStop = (line, stop) => {
  const params = [
    stop && `filter[stop]=${stop}`,
    line && `filter[route]=${line}`,
    `include=trip`,
  ];
  const combinedParams = `?${params.join('&')}`;
  return fetch(`${mbtaApi}/predictions${combinedParams}`, { headers })
    .then(res => res.json())
    .then((json) => {
      const resPredictions = json?.data;
      const tripInfo = json?.included;
      const predictionInfo = {};

      if (!resPredictions) {
        return [];
      }

      // create object with trip ID as key
      resPredictions.forEach((item) => {
        const {id} = item.relationships.trip.data;
        predictionInfo[id] = item;
      })

      // add headsign and other trip data to each prediction
      tripInfo.forEach((trip) => {
        const {id} = trip;

        predictionInfo[id].attributes = {
          ...predictionInfo[id].attributes,
          ...trip.attributes,
        }
      });

      return Object.values(predictionInfo);
    });
}