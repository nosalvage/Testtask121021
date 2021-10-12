import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';

import {EventListItem} from './EventListItem';

const keyExtractor = item => item.id;

const EventList = ({data = [], onPress}) => {
  const renderItem = useCallback(
    ({item}) => <EventListItem item={item} onPress={onPress} />,
    [onPress],
  );

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

EventListItem.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
};

export {EventList};
