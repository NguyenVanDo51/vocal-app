'use dom';

export default function LoginScreen({
  onPress,
}: {
  onPress: () => Promise<void>;
}) {
  return (
    <p onClick={() => onPress()} className="cursor-pointer">
      Login with Google
    </p>
  );
}
