import {
  KeyboardAvoidingView,
  Platform,
  type ViewStyle,
} from "react-native";
import { cn } from "heroui-native";

type KeyboardAvoidingWrapperProps = {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  keyboardVerticalOffset?: number;
};

const KeyboardAvoidingWrapper = ({
  children,
  className,
  style,
  keyboardVerticalOffset = 0,
}: KeyboardAvoidingWrapperProps) => {
  return (
    <KeyboardAvoidingView
      className={cn("flex-1", className)}
      style={style}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? keyboardVerticalOffset : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
