import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import GridIcon from 'material-ui/svg-icons/action/open-in-new';

import styles from './GridEventList.css';

const randomIndex = () => Math.floor(Math.random() * 10) + 0;

const GridEventList = ({ events }) => (
  <div className={styles.grid_event_list}>
    <GridList cellHeight={180}>
      {events.map(event => (
        <GridTile
          key={event.id}
          title={event.name}
          subtitle={
            event.date ? (
              <span>
                On {event.date} {event.time}
              </span>
            ) : (
              <span />
            )
          }
          actionIcon={
            <IconButton>
              <a href={event.link} target="_blank">
                <GridIcon color="white" />
              </a>
            </IconButton>
          }
        >
          <img
            src={`/assets/events/bitcoin_grid_${randomIndex()}.jpg`}
            alt={event.name}
          />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridEventList;
