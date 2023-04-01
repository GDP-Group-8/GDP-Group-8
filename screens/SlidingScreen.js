import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyRecordsScreen } from "./MyRecords";
import { MyDataScreen } from "./WearableData";
export const SlidingScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "myRecords", title: "My Records" },
    { key: "myData", title: "My Data" },
  ]);

  const renderScene = SceneMap({
    myRecords: MyRecordsScreen,
    myData: MyDataScreen,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
        renderTabBar={renderTabBar}
        renderPager={(props) => <PagerView {...props} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#FFF", // Adjust the background color of the tab bar
  },
  label: {
    color: "#000", // Adjust the color of the tab labels
  },
  indicator: {
    backgroundColor: "#000", // Adjust the color of the active tab indicator
  },
});
