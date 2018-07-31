const axios = require('axios');
const qs = require('qs');
const auth = require('../../middleware/auth');
const keys = require('../../../config/keys').get(process.env.NODE_ENV);

const RESOURCE_NAME = 'events';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;

const PAGE = 20;
const RADIUS_MILE = 6;

module.exports = app => {
  app.get(URI, auth, async (req, res) => {
    const query = qs.parse(req.query);

    const searchText = !query.text ? '' : `&text=${query.text}`;
    const latitude = !query.lat ? '' : `&lat=${query.lat}`;
    const longitude = !query.lon ? '' : `&lon=${query.lon}`;
    const begin = parseInt(query.index, 10);
    const end = begin + parseInt(query.num, 10);

    try {
      const response = await axios.get(
        `https://api.meetup.com/find/upcoming_events?key=${
          keys.meetupApiKey
        }&photo-host=public&page=${PAGE}&radius=${RADIUS_MILE}&order=time${searchText}${latitude}${longitude}`,
      );

      return res.send({
        total: response.data.events.length,
        events: response.data.events.slice(begin, end).map(event => ({
          id: event.id,
          name: event.name,
          date: event.local_date,
          time: event.local_time,
          venue: event.venue
            ? {
                id: event.venue.id,
                name: event.venue.name,
                latitude: event.venue.lat,
                longitude: event.venue.lon,
              }
            : {},
          group: event.group
            ? {
                id: event.group.id,
                name: event.group.name,
              }
            : {},
          link: event.link,
          description: event.description,
        })),
      });
    } catch (err) {
      return res.status(400).json({
        errors: [
          {
            message: err.message,
            errorType: 'clientError',
          },
        ],
      });
    }
  });
};
