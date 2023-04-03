import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button, TextInput, StyleSheet, SafeAreaView} from 'react-native';

type Data = {
  id: string;
  ph: string;
};

const url = 'http://192.168.10.100:8080'

const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [number, onChangeNumber] = React.useState('');

  const sendData = async () => {
    try {
      const response = await fetch(url, {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'text/html',
        },
        body: JSON.stringify({
          ph:number
        })
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //useEffect(() => {getData();}, []);

  return (
    
    <View style={{flex: 1, padding: 24}}>
      
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Text>
              Medida #{item.id}  Ph: {item.ph}
            </Text>
          )}
        />
      )}
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Valor de PH"
        keyboardType="numeric"
      />

     <Button
      onPress={getData}
      title="Get request"
      color="#841584"
      />

      <Button
      onPress={sendData}
      title="Post request"
      color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    marginVertical: 8,
    borderRadius: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


export default App;