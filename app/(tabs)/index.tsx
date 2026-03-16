import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// PROPS TİPLERİ
interface KimlikKartiProps {
  ad: string;
  uzmanlik: string;
  seviye: string;
  musaitMi: boolean;
}

// ADIM 2: Modernize Edilmiş Component
const KimlikKarti = ({ ad, uzmanlik, seviye, musaitMi }: KimlikKartiProps) => {
  return (
    <View style={[styles.card, !musaitMi && styles.cardPassive]}>
      {/* Durum Göstergesi (Aktif/Pasif Noktası) */}
      <View
        style={[
          styles.statusDot,
          { backgroundColor: musaitMi ? "#4CAF50" : "#9E9E9E" },
        ]}
      />

      <Text style={styles.label}>YAZILIMCI KİMLİĞİ</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{ad}</Text>
        <Text style={styles.specialty}>{uzmanlik}</Text>
        <Text style={styles.level}>{seviye}</Text>
      </View>
    </View>
  );
};

export default function App() {
  const [musaitMi, setMusaitMi] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <KimlikKarti
        ad="Alperen"
        uzmanlik="Full-Stack Developer"
        seviye="3. Sınıf Yazılım Mühendisi"
        musaitMi={musaitMi}
      />

      <TouchableOpacity
        style={[styles.button, !musaitMi && styles.buttonDisabled]}
        onPress={() => setMusaitMi(false)}
        disabled={!musaitMi}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {musaitMi ? "İşe Al" : "Projelerde Çalışıyor"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// STİLLER (StyleSheet.create)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: Dimensions.get("window").width * 0.85,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    elevation: 5, // Android gölge
    shadowColor: "#000", // iOS gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#2196F3",
    position: "relative",
  },
  cardPassive: {
    opacity: 0.7,
    borderLeftColor: "#9E9E9E",
    backgroundColor: "#F0F0F0",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "absolute",
    top: 15,
    right: 15,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#9E9E9E",
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoContainer: {
    gap: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  specialty: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: "600",
  },
  level: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
