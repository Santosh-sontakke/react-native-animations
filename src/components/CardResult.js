import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
} from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
} from "react-native-reanimated";
const minSize = 120;
const tarotCardSize = {
    width: minSize,
    height: minSize * 1.67,
    borderRadius: 12,
};
const CardResult = ({resultCardImageData}) => {
    const fadeInOpacity = useSharedValue(0);
    useEffect(() => {
        fadeInOpacity.value = withTiming(1, {
            duration: 500,
            easing: Easing.linear,
        });
        return () => {

        }
    }, [])


    // const fadeIn = () => {
    //     fadeInOpacity.value = withTiming(1, {
    //         duration: 1000,
    //         easing: Easing.linear,
    //     });
    // };

    // const fadeOut = () => {
    //     fadeInOpacity.value = withTiming(0, {
    //         duration: 1000,
    //         easing: Easing.linear,
    //     });
    // };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeInOpacity.value, // Use the value directly
        };
    });


    return (
        <View style={styles.container}>
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

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#164aa1',
        // alignSelf:'flex-end',
        position: 'absolute',
        top: 20,
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
    button: {
        marginTop: 20,
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
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