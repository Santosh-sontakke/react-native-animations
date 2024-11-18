import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Gesture, GestureDetector, Pressable, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FlippedContent, FlipSingleCard } from './FlipSingleCard';
import CardResult from './CardResult';
import CurvedLineWithArrows from './CurvedLineWithArrows';

const tarodCardImg = `https://img.freepik.com/free-vector/hand-drawn-esoteric-pattern-design_23-2149346196.jpg?size=500&ext=jpg`;
const { width, height } = Dimensions.get('window');

const numberOfCards = 30;
const tarotCards = [...Array(numberOfCards).keys()].map((i) => ({
  key: `tarot-card-${i}`,
  uri: tarodCardImg,
}));

const minSize = 120;
const tarotCardSize = {
  width: minSize,
  height: minSize * 1.67,
  borderRadius: 12,
};

const TWO_PI = 2 * Math.PI;
const theta = TWO_PI / numberOfCards;
const tarotCardSizeVisiblePercentage = 0.9;
const tarotCardSizeOnCircle =
  tarotCardSizeVisiblePercentage * tarotCardSize.width;
const circleRadius = Math.max(
  (tarotCardSizeOnCircle * numberOfCards) / TWO_PI,
  width,
);
const circleCircumference = TWO_PI * circleRadius;
const changeFactor = circleCircumference / width;
const imageUrl = [{ title: "Ace of Spade", url: 'https://w0.peakpx.com/wallpaper/712/862/HD-wallpaper-aces-of-spades-aces-ace-ace-of-spade-black-jack-bridge-card-fire-gamble-gambling-joker-las-vegas-poker-sandevil-vegas-thumbnail.jpg' },
{
  title: "Ace of spade", url: 'https://thumbs.dreamstime.com/z/flaming-ace-spades-playing-card-engulfed-fire-striking-image-ace-spades-playing-card-engulfed-vibrant-flames-328325187.jpg',
},
{ title: "Nine of Cups", url: 'https://as1.ftcdn.net/v2/jpg/04/15/79/90/1000_F_415799009_CoIxzQM2i8lTsk2o357WHGXFBTfDQRCT.jpg' },
{ title: "Queen", url: 'https://w0.peakpx.com/wallpaper/675/848/HD-wallpaper-queen-and-king-cards-diamond-king-poker-queen-skulls.jpg', }]



function TarotCard({ card, cardIndex, index, activeCardIndex, setIsCardSelected }) {
  const mounted = useSharedValue(0);
  const randomIndex = activeCardIndex % 3;

  useEffect(() => {
    mounted.value = withTiming(1, { duration: 500 });
  }, []);

  const isFlipped = useSharedValue(false);
  const [isActiveCardFlipped, setIsActiveCardFlipped] = useState(false)

  const getImageUrl = () => {
    if (activeCardIndex != cardIndex) return card.uri
    if (isActiveCardFlipped) return imageUrl[randomIndex].url
    return card.uri
  }

  const handleCardPress = () => {
    isFlipped.value = !isFlipped.value
    setIsActiveCardFlipped(!isActiveCardFlipped)
    setTimeout(() => {
      setIsCardSelected(true, imageUrl[randomIndex])
      setIsActiveCardFlipped(!isActiveCardFlipped)
    }, 1000);
  };

  const stylez = useAnimatedStyle(() => {
    const clampedIndex = Math.max(0, Math.min(numberOfCards - 1, cardIndex)); // Clamping index
    return {
      transform: [
        {
          rotate: `${interpolate(
            mounted.value,
            [0, 1],
            [0, theta * clampedIndex],
          )}rad`,
        },
        {
          translateY: interpolate(
            index.value,
            [clampedIndex - 1, clampedIndex, clampedIndex + 1],
            [0, -tarotCardSize.height / 2, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (

    <TapGestureHandler onActivated={activeCardIndex == cardIndex ? handleCardPress : null}>
      <Animated.View
        style={[
          {
            width: tarotCardSize.width,
            height: circleRadius * 2,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
          },
          stylez,
        ]}
      >

        {/* <Pressable onPress={activeCardIndex == cardIndex ? handleCardPress : null}> */}
        <FlipSingleCard
          isFlipped={isFlipped}
          cardStyle={styles.flipCard}
          RegularContent={<Image
            key={card.key}
            source={{ uri: getImageUrl() }}
            style={styles.tarotCardBackImage}
          />}
        />

        {/* </Pressable> */}
      </Animated.View>
    </TapGestureHandler>
  );
}


function TarotWheel({ cards, onCardChange, setIsCardSelected }) {
  const distance = useSharedValue(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const angle = useDerivedValue(() => {
    return distance.value / circleCircumference;
  });

  const normalizedAngle = useDerivedValue(() => {
    return (angle.value % TWO_PI + TWO_PI) % TWO_PI;
  });

  const interpolatedIndex = useDerivedValue(() => {
    const x = Math.abs(normalizedAngle.value / theta);
    return normalizedAngle.value < Math.PI ? x : numberOfCards - x;
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(interpolatedIndex.value);
  });

  useDerivedValue(() => {
    runOnJS(setActiveCardIndex)(activeIndex.value);
  });

  const pan = Gesture.Pan()
    .onChange((ev) => {
      distance.value += ev.changeX * changeFactor;
    })
    .onFinalize((ev) => {
      distance.value = withDecay(
        {
          velocity: ev.velocityX * changeFactor,
        },
        () => {
          const newAngle = -activeIndex.value * theta;
          distance.value = withSpring(newAngle * circleCircumference, { damping: 10 });
          runOnJS(onCardChange)(activeIndex.value);
        }
      );
    });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${angle.value}rad`,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            width: circleRadius * 2,
            height: circleRadius * 2,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            top: height - tarotCardSize.height * 2,
          },
          stylez,
        ]}
      >

        {cards.map((card, cardIndex) => {
          return (
            <TarotCard
              card={card}
              key={card.key}
              index={interpolatedIndex}
              cardIndex={cardIndex}
              activeCardIndex={activeCardIndex}
              setIsCardSelected={setIsCardSelected}
            />
          );
        })}
      </Animated.View>
    </GestureDetector>
  );
}


export function TarotCards() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [imageData, setImageData] = useState("")
  const [numberOfCardTobBePickedUp, setNumberOfCardTobBePickedUp] = useState(1)

  useEffect(() => {
    setActiveCardIndex(0);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (isCardSelected) setIsCardSelected(!isCardSelected)
    }, 2000);
  }, [isCardSelected]);

  const handleCardSelection = (isSelected, imageData) => {
    setIsCardSelected(isSelected)
    setImageData(imageData)
    setNumberOfCardTobBePickedUp(numberOfCardTobBePickedUp + 1)
  }
  if (isCardSelected) return <CardResult resultCardImageData={imageData} />
  const suffix = numberOfCardTobBePickedUp == 1 ? 'st' : numberOfCardTobBePickedUp == 2 ? 'nd' : numberOfCardTobBePickedUp == 3 ? 'rd' : 'th'
  const headlineText = `Tap to pick your ${numberOfCardTobBePickedUp}${suffix} card`
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StatusBar hidden />
      {activeCardIndex !== null && (
        <View
          style={{
            position: 'absolute',
            top: 100,
          }}
        >
          <Text style={styles.headerText}>{headlineText}</Text>
          <View style={styles.headerDecoration}>
            <View style={styles.line} />
            <View style={styles.triangle} />
            <View style={styles.line} />
          </View>

        </View>
      )}

      <TarotWheel
        cards={tarotCards}
        onCardChange={(cardIndex) => setActiveCardIndex(cardIndex)}
        setIsCardSelected={handleCardSelection}
      />
      <CurvedLineWithArrows />
    </View>
  );
}

const styles = StyleSheet.create({
  tarotCardBackImage: {
    width: tarotCardSize.width,
    height: tarotCardSize.height,
    borderRadius: tarotCardSize.borderRadius,
    resizeMode: 'cover', // Use 'cover' for proper scaling
    borderWidth: 4,
    borderColor: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 15,
  },
  headerDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center'
  },
  line: {
    width: 50,
    height: 2,
    backgroundColor: 'white',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginHorizontal: 10,
  },
});
