import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import useShaking from 'hooks/useShaking';

const App = () => {
  const [count, setCount] = useState(0);
  const {isShaking, shake, shakingStyle} = useShaking();

  const onIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const onDecrement = useCallback(() => {
    setCount(prev => {
      if (prev === 0) {
        shake();
        return prev;
      }
      return prev - 1;
    });
  }, []);

  const rErrorStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isShaking.value ? 'red' : 'black', {
        duration: 50,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Animated.Text style={[styles.text, shakingStyle, rErrorStyle]}>
        {count}
      </Animated.Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrement}>
          <Text style={styles.icon}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onIncrement}>
          <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    right: 20,
    columnGap: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 32 * 1.1,
  },
  text: {
    fontSize: 90,
    color: 'black',
    fontWeight: 'bold',
  },
});
