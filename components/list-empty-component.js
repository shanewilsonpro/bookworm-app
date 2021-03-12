import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ListEmptyComponent = ({ text }) => (
  <View style={styles.listEmptyComponent}>
    <Text style={styles.listEmptyComponentText}>{text}</Text>
  </View>
);

ListEmptyComponent.propTypes = {
  text: PropTypes.string.isRequired
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  listEmptyComponent: {
    marginTop: 50,
    alignItems: 'center'
  },
  listEmptyComponentText: {
    fontWeight: 'bold',
    color: 'white'
  }
});