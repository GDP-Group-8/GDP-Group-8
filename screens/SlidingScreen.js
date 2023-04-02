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
      indicatorStyle={{ ...styles.indicator, height: 4 }} // Adjust the height property for a thicker indicator
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
    backgroundColor: "#111",
  },
  tabBar: {
    backgroundColor: "#111", // Adjusted the background color of the tab bar to dark
  },
  label: {
    color: "#FFF", // Adjusted the color of the tab labels to white
    fontWeight: "bold",
  },
  indicator: {
    backgroundColor: "orange", // Adjusted the color of the active tab indicator to orange
  },
});
