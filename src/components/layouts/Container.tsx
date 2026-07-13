import { View, type ViewStyle } from "react-native";
import { cn } from "heroui-native";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
};

const Container = ({ children, className, style }: ContainerProps) => {
  return (
    <View className={cn("flex-1 items-center w-full px-6", className)} style={style}>
      <View className="w-full max-w-[480px] flex-1">{children}</View>
    </View>
  );
};

export default Container;
