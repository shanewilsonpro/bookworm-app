import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <View style={{ height: 70, borderBottomWidth: 0.5, borderBottomColor: '#E9E9E9', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24 }}>Book Worm</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ height: 70, borderBottomWidth: 0.5, borderBottomColor: '#E9E9E9', flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Total</Text>
            <Text>0</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Reading</Text>
            <Text>0</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Read</Text>
            <Text>0</Text>
          </View>
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
