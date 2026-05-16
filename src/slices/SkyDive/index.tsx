import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";

// Hardcoded content (replaces Prismic CMS data)
const skyDiveData = {
  sentence: "Unlock the Perfect Sip",
  flavor: "watermelon" as const,
};

export default function SkyDive() {
  return (
    <Bounded className="skydive h-screen">
      <View className="h-screen w-screen">
        <Scene flavor={skyDiveData.flavor} sentence={skyDiveData.sentence} />
      </View>
      <h2 className="sr-only">{skyDiveData.sentence}</h2>
    </Bounded>
  );
}
