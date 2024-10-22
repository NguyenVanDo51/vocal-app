import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddWord() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Word</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter word"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter meaning"
      />
      <Button title="Save" onPress={() => { /* Save word logic here */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
