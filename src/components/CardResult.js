import React, { useEffect } from "react";
import {
    Text,
    StyleSheet,
    Image,
    StatusBar,
} from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
const minSize = 120;
const tarotCardSize = {
    width: minSize,
    height: minSize * 1.67,
    borderRadius: 12,
};
const CardResult = ({ resultCardImageData }) => {
    const fadeInOpacity = useSharedValue(0);
    const scale = useSharedValue(0.4); // Initial scale

    useEffect(() => {
        fadeInOpacity.value = withTiming(1, {
            duration: 100,
            easing: Easing.linear,
        });
        scale.value =withTiming(1, {
            duration: 100,
            easing: Easing.linear,
        });
        return () => {
            fadeInOpacity.value = withTiming(0, {
                duration: 100,
                easing: Easing.linear,
            })
        }
    }, [])


    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeInOpacity.value,
            transform: [{ scale: withSpring(scale.value) }]
        };
    });


    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <StatusBar hidden />
            <Text style={styles.headerText}>You have selected card</Text>
            <Text style={styles.headerText}>{resultCardImageData.title}</Text>


            <Animated.View
                style={[
                    styles.imageContainer,
                    animatedStyle,
                ]}
            >
                <Image
                    source={{ uri: resultCardImageData.url }}
                    style={styles.tarotCardBackImage}
                />
            </Animated.View>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-start",
        position: 'absolute',
        top: 100,
        flex: 1,
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },

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
});

export default CardResult;