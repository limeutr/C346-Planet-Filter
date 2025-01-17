import React,{useState} from 'react';
import { FlatList, StatusBar, Text, TextInput, View} from 'react-native';

const App = () => {
  const [mydata, setMydata] = useState([]);

  const renderItem = ({item, index}) => {
    return (
    <View>
    <Text style={{borderWidth:1}}>{item.title}</Text>
    </View>
    );
  };

  return (
    <View>
      <StatusBar/>
      <Text>Search:</Text>
      <TextInput style={{borderWidth:1}}/>
      <FlatList data={mydata} renderItem={renderItem} />
    </View>
  );
}

export default App;
