
import React from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        <View style={styles.welcomeCard}>
          <Text style={styles.title}>Welcome to Fart Clicker! 💨</Text>
          <Text style={styles.description}>
            Tap the "Fart Game" tab below to start your fart-clicking adventure!
          </Text>
          <Text style={styles.description}>
            Click the fart cloud to collect farts and purchase upgrades to increase your fart production.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>How to Play:</Text>
          <Text style={styles.bulletPoint}>- Tap the fart cloud to collect farts</Text>
          <Text style={styles.bulletPoint}>- Buy upgrades to increase farts per click</Text>
          <Text style={styles.bulletPoint}>- Purchase passive generators for automatic farts</Text>
          <Text style={styles.bulletPoint}>- Watch your fart empire grow!</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Upgrade Types:</Text>
          <Text style={styles.bulletPoint}>🫘 Better Beans - Increases farts per click</Text>
          <Text style={styles.bulletPoint}>🌯 Spicy Burrito - Big boost to click power</Text>
          <Text style={styles.bulletPoint}>🤖 Auto Farter - Generates farts automatically</Text>
          <Text style={styles.bulletPoint}>🏭 Fart Factory - Mass fart production</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  welcomeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.accent,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 28,
    paddingLeft: 8,
  },
});
