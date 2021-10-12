import React, {useState, useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import styled from 'styled-components/native';

import {EventList} from 'src/components/EventList';
import {fetchEvents} from 'src/store/events';
import {eventsDataSelector, eventsIsFetchingSelector} from 'src/store/events';
import {useInterval} from 'src/hooks';

const ContainerArea = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  background: white;
`;

const BtnUpd = styled.TouchableOpacity`
  margin-vertical: 10px;
  justify-content: center;
  align-items: center;
  height: 36px;
  border-width: 1px;
  border-color: ${({disabled}) => (disabled ? '#eeeeee' : '#c6c6c6')};
  border-radius: 10px;
`;

const Text = styled.Text`
  font-size: 14px;
  line-height: 16px;
`;

const TextWhite = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: white;
`;

const Loader = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const TIME_MANUAL_UPD = 15;
const TIME_AUTO_UPD = 60;

const BtnUpdate = props => {
  const {disabled = false, onPress} = props;

  return (
    <BtnUpd disabled={disabled} onPress={onPress}>
      <Text>Обновить</Text>
    </BtnUpd>
  );
};

const useUpdate = () => {
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const tick = useRef(0);

  const update = useCallback(() => {
    dispatch(fetchEvents());
    setDisabled(true);

    tick.current = 0;
  }, [dispatch]);

  useInterval(
    () => {
      tick.current += 1;

      if (tick.current >= TIME_AUTO_UPD) {
        update();

        return;
      }

      if (tick.current >= TIME_MANUAL_UPD) {
        setDisabled(false);
      }
    },
    isFocused ? 1000 : null,
  );

  return {
    update,
    disabled,
  };
};

export const Events = ({navigation}) => {
  const data = useSelector(eventsDataSelector);
  const isFetching = useSelector(eventsIsFetchingSelector);

  const {disabled, update} = useUpdate();

  useFocusEffect(update);

  const onPressDetail = useCallback(
    dataByItem => {
      navigation.navigate('EventDetails', {data: dataByItem});
    },
    [navigation],
  );

  return (
    <Container>
      <ContainerArea edges={['bottom']}>
        <BtnUpdate disabled={disabled} onPress={update} />
        <EventList data={data} onPress={onPressDetail} />
      </ContainerArea>
      {isFetching ? (
        <Loader>
          <TextWhite>Обновление</TextWhite>
        </Loader>
      ) : null}
    </Container>
  );
};
