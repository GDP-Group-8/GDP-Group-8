// import React, { memo, useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const Navbar = () => {
//   const Menus = [
//     { name: "Home", icon: "home-outline", dis: 0 },
//     { name: "Profile", icon: "person-outline", dis: 16 },
//     { name: "Message", icon: "chatbubble-outline", dis: 32 },
//     { name: "Photos", icon: "camera-outline", dis: 48 },
//     { name: "Settings", icon: "settings-outline", dis: 64 },
//   ];
//   const [active, setActive] = useState(0);

//   return (
//     <View className="bg-white rounded-t-xl">
//       <View className="">
//         <View
//           className={[
//             "bg-rose-600 duration-500 border-4 border-gray-900 h-16 w-16 absolute -top-5 rounded-full",
//             { transform: [{ translateX: Menus[active].dis }] },
//           ]}
//         >
//           <View className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-18 rounded-tr-11px " />
//           <View className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-18 rounded-tl-11px " />
//         </View>
//         {Menus.map((menu, i) => (
//           <TouchableOpacity
//             key={i}
//             className="w-16 items-center"
//             onPress={() => setActive(i)}
//           >
//             <Text
//               className={[
//                 "text-xl cursor-pointer duration-500",
//                 i === active && "-mt-6 text-white",
//               ]}
//             >
//               <Ionicons name={menu.icon} />
//             </Text>
//             <Text
//               className={[
//                 "text-center",
//                 active === i
//                   ? "translate-y-4 duration-700 opacity-100"
//                   : "opacity-0 translate-y-10",
//               ]}
//             >
//               {menu.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default memo(Navbar);
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens";
import Dashboard from "../screens/dashboard";
const Tab = createBottomTabNavigator();

export default function NavBar({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={Dashboard} />
    </Tab.Navigator>
  );
}
