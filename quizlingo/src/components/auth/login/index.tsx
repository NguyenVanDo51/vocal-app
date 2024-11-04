import { Pressable, Text } from "@/ui";

export default function LoginScreen({
  onPress,
}: {
  onPress: () => Promise<void>;
}) {
  return (
    <Pressable onPress={() => onPress()} className="cursor-pointer">
      <Text>Login with Google</Text>
    </Pressable>
  );
}
