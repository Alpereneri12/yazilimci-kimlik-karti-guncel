import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

// 20 SORULUK GENİŞLETİLMİŞ HAVUZ
const QUESTIONS = [
  {
    q: "React Native hangi şirket tarafından geliştirildi?",
    a: "Google",
    b: "Facebook",
    correct: "b",
  },
  {
    q: "JS'de sabit değişken hangisi ile tanımlanır?",
    a: "let",
    b: "const",
    correct: "b",
  },
  {
    q: "HTML'de link ekleme etiketi hangisidir?",
    a: "<a>",
    b: "<link>",
    correct: "a",
  },
  { q: "Hangisi bir backend dilidir?", a: "Python", b: "CSS", correct: "a" },
  {
    q: "Node.js ne üzerinde çalışır?",
    a: "V8 Engine",
    b: "Java VM",
    correct: "a",
  },
  {
    q: "Git'te değişiklikleri kaydetme komutu?",
    a: "push",
    b: "commit",
    correct: "b",
  },
  { q: "SQL ne için kullanılır?", a: "Veritabanı", b: "Tasarım", correct: "a" },
  {
    q: "TypeScript neyin üst kümesidir?",
    a: "Java",
    b: "JavaScript",
    correct: "b",
  },
  {
    q: "API neyin kısaltmasıdır?",
    a: "Interface",
    b: "Integration",
    correct: "a",
  },
  { q: "JSON veri formatı neye benzer?", a: "Obje", b: "Dizi", correct: "a" },
  {
    q: "MongoDB ne tür bir veritabanıdır?",
    a: "SQL",
    b: "NoSQL",
    correct: "b",
  },
  {
    q: "Docker ne için kullanılır?",
    a: "Konteynerleştirme",
    b: "Tasarım",
    correct: "a",
  },
  {
    q: "HTTP 404 hatası nedir?",
    a: "Sunucu Hatası",
    b: "Sayfa Bulunamadı",
    correct: "b",
  },
  {
    q: "Python'da liste ekleme metodu?",
    a: "append()",
    b: "add()",
    correct: "a",
  },
  {
    q: "Hangisi bir siber güvenlik terimidir?",
    a: "Phishing",
    b: "Rendering",
    correct: "a",
  },
  {
    q: "CSS'te 'flex' ne işe yarar?",
    a: "Yerleşim Düzeni",
    b: "Veri Çekme",
    correct: "a",
  },
  {
    q: "Kotlin hangi platform için asıl dildir?",
    a: "iOS",
    b: "Android",
    correct: "b",
  },
  { q: "Swift hangi şirketindir?", a: "Apple", b: "Microsoft", correct: "a" },
  { q: "Linux'ta dosya listeleme komutu?", a: "ls", b: "cd", correct: "a" },
  {
    q: "Siber saldırıda 'Brute Force' nedir?",
    a: "Kaba Kuvvet Denemesi",
    b: "Veri Sızıntısı",
    correct: "a",
  },
];

const SPECIALIZATIONS = [
  { id: 1, name: "Frontend Uzmanı", icon: "🎨" },
  { id: 2, name: "Backend Ustası", icon: "⚙️" },
  { id: 3, name: "Veritabanı Gurusu", icon: "📊" },
  { id: 4, name: "Mobil Mimar", icon: "📱" },
  { id: 5, name: "Siber Muhafız", icon: "🛡️" },
];

export default function App() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [energy, setEnergy] = useState(100);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [stats, setStats] = useState({
    frontend: 0,
    backend: 0,
    mobile: 0,
    cyber: 0,
  });

  const cardScale = useSharedValue(1);
  const titles = [
    "Stajyer",
    "Junior",
    "Mid-Level",
    "Senior",
    "Tech Lead",
    "Yazılım Mimarı",
  ];
  const currentTitle = titles[Math.min(level - 1, titles.length - 1)];

  useEffect(() => {
    if (xp >= 100) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const nextLevel = level + 1;
      setXp(0);
      setLevel(nextLevel);
      cardScale.value = withSequence(withSpring(1.2), withSpring(1));
      Alert.alert(
        "TEBRİKLER! 🎉",
        `${titles[Math.min(nextLevel - 1, titles.length - 1)]} rütbesine yükseldin!`,
      );
    }
  }, [xp]);

  const handleWork = (gain: number, cost: number, type: keyof typeof stats) => {
    if (energy < cost) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Yorgunsun!", "Soru çözerek enerji toplamalısın. ☕");
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setXp((p) => p + gain);
    setEnergy((e) => Math.max(0, e - cost));
    setStats((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleQuiz = (isCorrect: boolean) => {
    setCurrentQuestion(null);
    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setEnergy((e) => Math.min(100, e + 20));
      Alert.alert("Doğru! ✅", "+20 Enerji eklendi.");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Yanlış! ❌", "Enerji kazanamadın.");
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* KART PANELİ */}
        <Animated.View
          style={[styles.card, animatedStyle]}
          entering={FadeInDown}
        >
          <Text style={styles.lvlBadge}>SEVİYE {level}</Text>
          <Text style={styles.name}>Alperen</Text>
          <Text style={styles.titleText}>{currentTitle}</Text>

          <View style={styles.barsContainer}>
            <Text style={styles.barLabel}>TECÜBE (XP): {xp}/100</Text>
            <View style={styles.barBg}>
              <View style={[styles.xpFill, { width: `${xp}%` }]} />
            </View>

            <Text style={[styles.barLabel, { marginTop: 10 }]}>
              ENERJİ: %{energy}
            </Text>
            <View style={styles.barBg}>
              <View style={[styles.energyFill, { width: `${energy}%` }]} />
            </View>
          </View>
        </Animated.View>

        {/* YETENEK DAĞILIMI PANELİ */}
        <View style={styles.statsPanel}>
          <Text style={styles.sectionTitle}>Yetenek Dağılımı</Text>
          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{stats.frontend}</Text>
              <Text style={styles.statLabel}>Front</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{stats.backend}</Text>
              <Text style={styles.statLabel}>Back</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{stats.mobile}</Text>
              <Text style={styles.statLabel}>Mob</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{stats.cyber}</Text>
              <Text style={styles.statLabel}>Cyber</Text>
            </View>
          </View>
        </View>

        {/* ROZETLER */}
        <View style={styles.specArea}>
          <Text style={styles.sectionTitle}>Kazanılan Rozetler</Text>
          <View style={styles.badgeGrid}>
            {SPECIALIZATIONS.map((s) => (
              <View
                key={s.id}
                style={[styles.badgeItem, level <= s.id && styles.locked]}
              >
                <Text style={styles.badgeIcon}>
                  {level > s.id ? s.icon : "🔒"}
                </Text>
                <Text style={styles.badgeText}>
                  {level > s.id ? s.name : "Kilitli"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* GÖREVLER KISMI */}
        <View style={styles.tasksArea}>
          <Text style={styles.sectionTitle}>Görevler</Text>

          <View style={styles.workGrid}>
            <TouchableOpacity
              style={[styles.workBtn, { borderColor: "#00D2FF" }]}
              onPress={() => handleWork(15, 20, "frontend")}
            >
              <Text style={styles.workTitle}>🎨 Frontend</Text>
              <Text style={styles.workSub}>+15 XP / -20⚡</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.workBtn, { borderColor: "#FF4B2B" }]}
              onPress={() => handleWork(25, 35, "backend")}
            >
              <Text style={styles.workTitle}>⚙️ Backend</Text>
              <Text style={styles.workSub}>+25 XP / -35⚡</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.workGrid}>
            <TouchableOpacity
              style={[styles.workBtn, { borderColor: "#A7FF83" }]}
              onPress={() => handleWork(20, 25, "mobile")}
            >
              <Text style={styles.workTitle}>📱 Mobile</Text>
              <Text style={styles.workSub}>+20 XP / -25⚡</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.workBtn, { borderColor: "#FF00D4" }]}
              onPress={() => handleWork(35, 45, "cyber")}
            >
              <Text style={styles.workTitle}>🛡️ Cyber</Text>
              <Text style={styles.workSub}>+35 XP / -45⚡</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.quizBtn}
            onPress={() => {
              const randomQ =
                QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
              setCurrentQuestion(randomQ);
            }}
          >
            <Text style={styles.quizBtnTxt}>❓ Enerji Topla (+20⚡)</Text>
          </TouchableOpacity>

          {currentQuestion && (
            <View style={styles.quizCard}>
              <Text style={styles.quizQ}>{currentQuestion.q}</Text>
              <View style={styles.quizOptions}>
                <TouchableOpacity
                  style={styles.opt}
                  onPress={() => handleQuiz(currentQuestion.correct === "a")}
                >
                  <Text style={styles.optTxt}>A) {currentQuestion.a}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.opt}
                  onPress={() => handleQuiz(currentQuestion.correct === "b")}
                >
                  <Text style={styles.optTxt}>B) {currentQuestion.b}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505" },
  scroll: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  card: {
    backgroundColor: "#111",
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "#333",
  },
  lvlBadge: { color: "#00FF9D", fontWeight: "bold", fontSize: 12 },
  name: { color: "#fff", fontSize: 28, fontWeight: "bold", marginTop: 5 },
  titleText: { color: "#00FF9D", fontSize: 18, marginBottom: 20 },
  barsContainer: { marginTop: 5 },
  barLabel: { color: "#666", fontSize: 10, marginBottom: 4 },
  barBg: {
    height: 8,
    backgroundColor: "#222",
    borderRadius: 4,
    overflow: "hidden",
  },
  xpFill: { height: "100%", backgroundColor: "#00FF9D" },
  energyFill: { height: "100%", backgroundColor: "#FFD700" },
  statsPanel: {
    marginTop: 25,
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statRow: { flexDirection: "row", justifyContent: "space-between" },
  statBox: { alignItems: "center" },
  statNum: { color: "#00FF9D", fontSize: 16, fontWeight: "bold" },
  statLabel: { color: "#555", fontSize: 9 },
  specArea: { marginTop: 25 },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeItem: {
    width: SCREEN_WIDTH * 0.27,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#222",
  },
  locked: { opacity: 0.2 },
  badgeIcon: { fontSize: 24 },
  badgeText: { color: "#fff", fontSize: 8, marginTop: 5, textAlign: "center" },
  tasksArea: { marginTop: 15 },
  workGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  workBtn: {
    width: "48%",
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
  },
  workTitle: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  workSub: { color: "#666", fontSize: 9, marginTop: 4 },
  quizBtn: {
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "#FFD700",
    padding: 18,
    borderRadius: 20,
    marginTop: 10,
  },
  quizBtnTxt: { color: "#FFD700", fontWeight: "bold", textAlign: "center" },
  quizCard: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 20,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  quizQ: { color: "#fff", textAlign: "center", marginBottom: 20, fontSize: 14 },
  quizOptions: { flexDirection: "row", justifyContent: "space-between" },
  opt: { backgroundColor: "#333", padding: 12, borderRadius: 10, width: "48%" },
  optTxt: { color: "#fff", fontSize: 12, textAlign: "center" },
});
