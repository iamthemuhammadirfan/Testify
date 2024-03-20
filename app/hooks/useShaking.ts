import {useCallback} from 'react';

import {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Define the type for your custom hook's return value
type HookReturnValue = {
  isShaking: Readonly<SharedValue<boolean>>;
  shakingStyle: ReturnType<typeof useAnimatedStyle>;
  shake: () => void;
};

const useShaking = (): HookReturnValue => {
  const shakeTranslateX = useSharedValue(0);

  const shake = useCallback(() => {
    const shakeValue = 10;
    const shakeDuration = 100;

    const timingConfig = {
      duration: shakeDuration,
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
    };

    shakeTranslateX.value = withSequence(
      withTiming(shakeValue, timingConfig),
      withRepeat(withTiming(-shakeValue, timingConfig), 3, true),
      withSpring(0, {
        mass: 0.5,
      }),
    );
  }, []);

  const shakingStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: shakeTranslateX.value}],
    };
  });

  const isShaking = useDerivedValue(() => {
    return shakeTranslateX.value !== 0;
  }, []);

  return {isShaking, shakingStyle, shake};
};

export default useShaking;
