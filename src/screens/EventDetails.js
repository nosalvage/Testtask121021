import React from 'react';
import {ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: white;
`;

const ContainerArea = styled(SafeAreaView)`
  flex: 1;
`;

const ContainerCenter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
  background: white;
`;

const Title = styled.Text`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const Image = styled.Image`
  width: 150px;
  height: 150px;
`;

const TextBold = styled.Text`
  font-weight: bold;
`;

const Body = styled.View`
  padding-top: 14px;
`;

const Row = styled.View`
  padding-bottom: 10px;
`;

export const EventDetails = ({route}) => {
  const data = route.params?.data;

  if (!data) {
    return (
      <ContainerCenter>
        <Text>Нет данных</Text>
      </ContainerCenter>
    );
  }
  const {actor, repo} = data;

  return (
    <Container>
      <ContainerArea edges={['bottom']}>
        <ScrollView>
          <Title>{actor.login}</Title>
          <Image source={{uri: actor.avatar_url}} resizeMode="cover" />
          <Body>
            <Row>
              <TextBold>Репозиторий:</TextBold>
              <Text>{repo.name}</Text>
            </Row>
            <Row>
              <TextBold>Url репозитория:</TextBold>
              <Text>{repo.url}</Text>
            </Row>
          </Body>
        </ScrollView>
      </ContainerArea>
    </Container>
  );
};
