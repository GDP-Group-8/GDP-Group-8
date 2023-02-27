export type Navigation = {
  navigate: (scene: string) => void;
  // getParent: () => {
  //     setOptions: (options: {
  //         tabBarStyle: {
  //             display: string;
  //         } | undefined;
  //     }) => void;
  //   };
  setOptions: (options: {
    tabBarStyle:
      | {
          display: string;
        }
      | undefined;
  }) => void;
};
