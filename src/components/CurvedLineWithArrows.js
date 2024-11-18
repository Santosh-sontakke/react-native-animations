import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path  } from 'react-native-svg';

export default function CurvedLineWithArrows() {
  return (
    <View style={styles.container}>
      <Svg height="200" width="100%" viewBox="0 0 100 100">
        <Path
          d="M10 70 A40 40 0 0 1 90 70" stroke="white"
          strokeWidth="2"
          fill="transparent"
        />
      </Svg>
      <Text style={styles.dragText}>Drag to Move</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  dragText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    position: 'absolute',
    bottom: 60
  },
});
