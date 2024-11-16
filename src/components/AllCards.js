import React from 'react'
import { Pressable, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TarotCards } from './TarotCards';
import FlipCard from './FlipCard';
const FlippedContent = () => {
    return null;
    return (
      <View style={flippedContentStyles.card}>
        <Text style={flippedContentStyles.text}>Flipped content 🚀</Text>
      </View>
    );
  };
  
  const flippedContentStyles = StyleSheet.create({
    card: {
      flex: 0.6,
      backgroundColor: '#baeee5',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#001a72',
    },
  });
  
const AllCards = () => {
    const isFlipped = useSharedValue(false)
    const handlePress = () => {
      isFlipped.value = !isFlipped.value;
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlipCard
          isFlipped={isFlipped}
          cardStyle={styles.flipCard}
          FlippedContent={<FlippedContent />}
          RegularContent={<TarotCards handlePress={handlePress} />}
        />
      </SafeAreaView>
    );
}

export default AllCards

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#164aa1',

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