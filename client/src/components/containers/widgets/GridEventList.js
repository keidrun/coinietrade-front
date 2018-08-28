import React from 'react';
import styled from 'styled-components';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import GridIcon from 'material-ui/svg-icons/action/open-in-new';

const GridEventListWrapper = styled.div`
  margin: 20px;
  width: 500;
  height: 450;
  overflowy: 'auto';

  div {
    color: white;
  }

  span {
    color: white;
  }
`;

const randomIndex = () => Math.floor(Math.random() * 10) + 0;

const GridEventList = ({ events }) => (
  <GridEventListWrapper>
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
  </GridEventListWrapper>
);

export default GridEventList;
