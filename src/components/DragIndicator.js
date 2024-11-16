import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DragIndicator = () => {
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite repeat
      true // Reverse animation
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        {/* Left Arrow */}
        <View style={styles.leftArrow} />
        
        {/* Curved Line */}
        <View style={styles.curvedLineContainer}>
          {Array.from({ length: 20 }).map((_, index) => {
            const progress = index / 19;
            // Quadratic curve approximation
            const y = -Math.sin(progress * Math.PI) * 20;
            return (
              <View
                key={index}
                style={[
                  styles.lineSegment,
                  {
                    left: `${progress * 100}%`,
                    top: y,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Right Arrow */}
        <View style={styles.rightArrow} />

        {/* Text */}
        <Text style={styles.text}>Drag to Move</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: SCREEN_WIDTH,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: SCREEN_WIDTH * 0.8,
    height: '100%',
  },
  curvedLineContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    height: 40,
  },
  lineSegment: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'white',
  },
  leftArrow: {
    position: 'absolute',
    left: -5,
    top: 18,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'white',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '180deg' }],
  },
  rightArrow: {
    position: 'absolute',
    right: -5,
    top: 18,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'white',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  text: {
    position: 'absolute',
    width: '100%',
    bottom: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'System',
  },
});

export default DragIndicator;