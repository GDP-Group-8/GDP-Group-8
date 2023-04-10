import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

export const TabBar = ({ children }) => {
  const [component, setComponent] = useState(null);
  const numOfChildren = React.Children.count(children);
  const sliderWidth = 100 / numOfChildren;
  const [index, setIndex] = useState(0);
  const hasInitRef = useRef(false);
  const { width: screenWidth } = Dimensions.get("window");
  const { current: left } = useRef(
    new Animated.Value(index * (screenWidth / numOfChildren))
  );
  const { current: components } = useRef([]);
  const donePushingRef = useRef(false);
  const animateLeft = (index) => {
    return new Promise((resolve) => {
      Animated.timing(left, {
        toValue: index * (screenWidth / numOfChildren),
        duration: 300,
        useNativeDriver: false,
      }).start(() => resolve(index));
    });
  };
  useLayoutEffect(() => {
    if (components.length === numOfChildren) 
      setComponent(components[index]());
  }, [index]);
  return (
    <View style={{ height: "100%" }}>
      {component}
      <View style={styles.container}>
        <View style={{ height: 4 }}>
          <Animated.View
            style={{
              width: `${sliderWidth}%`,
              height: "100%",
              alignItems: "center",
              position: "absolute",
              left,
            }}
          >
            <View
              style={{
                backgroundColor: "orange",
                height: "100%",
                width: "80%",
              }}
            ></View>
          </Animated.View>
        </View>
        <View style={styles.options}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              handlePress: () => animateLeft(index).then(setIndex),
              index,
              hasInitRef,
              isLast: index === numOfChildren - 1,
              components,
              donePushingRef,
            });
          })}
        </View>
      </View>
    </View>
  );
};

export const TabOption = ({
  name,
  component,
  handlePress,
  index,
  hasInitRef,
  isLast,
  components,
  donePushingRef,
}) => {
  const memoisedComponent = useMemo(() => component, [component]);
  if (!donePushingRef.current) {
    components.push(memoisedComponent);
    if (isLast) donePushingRef.current = true;
  }
  useEffect(() => {
    if (index === 0 && !hasInitRef.current) {
      handlePress();
      hasInitRef.current = true;
    }
  }, [index, handlePress]);

  return (
    <View
      key={name}
      style={{ flex: 1, height: 50, justifyContent: "flex-end" }}
    >
      <TouchableOpacity
        onPress={() => handlePress()}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>{name}</Text>
      </TouchableOpacity>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#2f2f2f",
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  options: {
    flexDirection: "row",
    color: "white",
  },
});
