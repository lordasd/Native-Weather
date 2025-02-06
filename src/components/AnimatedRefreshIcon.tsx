import React, { useRef } from 'react';
import { Animated, Easing, TouchableOpacity, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';

interface AnimatedRefreshIconProps {
    onPress: () => void;
    isSpinning: boolean;
    source: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
}

const AnimatedRefreshIcon = ({ onPress, isSpinning, source, style }: AnimatedRefreshIconProps) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const startSpin = () => {
        spinValue.setValue(0);
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const stopSpin = () => {
        spinValue.stopAnimation();
    };

    React.useEffect(() => {
        if (isSpinning) {
            startSpin();
        } else {
            stopSpin();
        }
    }, [isSpinning]);

    return (
        <TouchableOpacity onPress={onPress} disabled={isSpinning}>
            <Animated.Image
                style={[style, { transform: [{ rotate: spin }] }]}
                source={source}
            />
        </TouchableOpacity>
    );
};

export default AnimatedRefreshIcon;