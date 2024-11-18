import React from 'react';
import { Pressable, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const RegularContent = () => {
  return (
    <View style={regularContentStyles.card}>
      <Text style={regularContentStyles.text}>Regular content ✨</Text>
    </View>
  );
};

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#b6cff7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#001a72',
  },
});

export const FlippedContent = () => {
  return (
    <View style={flippedContentStyles.card}>
      <Text style={flippedContentStyles.text}>Flipped content </Text>
    </View>
  );
};

const flippedContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#baeee5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#001a72',
  },
});

export const FlipSingleCard = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
}) => {
    const isDirectionX = direction === 'x';
    const regularCardAnimatedStyle = useAnimatedStyle(() => {
      const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
      const rotateValue = withTiming(`${spinValue}deg`, { duration });
  
      return {
        transform: [
          isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
        ],
      };
    });
  
  
    return (
      <View>
        <Animated.View
          style={[
            flipCardStyles.regularCard,
            cardStyle,
            regularCardAnimatedStyle,
          ]}>
          {RegularContent}
        </Animated.View>
      </View>
    );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: 'hidden',
    zIndex: 2,
    backgroundColor:'red'
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flipCard: {
    width: 170,
    height: 200,
  },
});