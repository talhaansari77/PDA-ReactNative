import NetInfo from "@react-native-community/netinfo";

export const netConnection = ( setNetStatus ) => {
  return NetInfo.addEventListener((state) => {
    setNetStatus({ type: state.type, isConnected: state.isConnected });
  });
};
