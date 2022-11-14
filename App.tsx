import React from 'react';
import { StyleSheet, View } from 'react-native';
import Upload from './routes/upload';
import Result from './routes/result';
import { NativeRouter, Route, Routes } from 'react-router-native';
import ContextProvider from './context';

export default function App() {
  return (
    <ContextProvider>
      <NativeRouter>
        <View style={styles.container}>
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </View>
      </NativeRouter>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
