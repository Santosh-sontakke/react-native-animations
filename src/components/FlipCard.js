
import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';



const FlippedContent = () => {
    return (
      <View style={flippedContentStyles.card}>
        <Text style={flippedContentStyles.text}>Flipped content 🚀</Text>
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

  const flipCardStyles = StyleSheet.create({
    regularCard: {
    //   position: 'absolute',
      zIndex: 1,
      flex:1,
    },
    flippedCard: {
      backfaceVisibility: 'hidden',
      zIndex: 2,
    },
  });
  
const FlipCard = ({
    isFlipped,
    cardStyle,
    direction = 'y',
    duration = 500,
    RegularContent,
    FlippedContent,
}) => {
    const isDirectionX = direction === 'x';

    const regularCardAnimatedStyle = useAnimatedStyle(() => {
        // const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
        // const rotateValue = withTiming(`${spinValue}deg`, { duration });

        // return {
        //     transform: [
        //         isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
        //     ],
        // };
        return {}
    });

    const flippedCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
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
            <Animated.View
                style={[
                    flipCardStyles.flippedCard,
                    cardStyle,
                    flippedCardAnimatedStyle,
                    {backgroundColor:'red'}
                ]}>
                {FlippedContent}
            </Animated.View>
        </View>
    );
};
export default FlipCard