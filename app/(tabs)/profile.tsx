
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        <View style={styles.profileHeader}>
          <IconSymbol 
            ios_icon_name="person.circle.fill" 
            android_material_icon_name="person" 
            size={80} 
            color={colors.primary} 
          />
          <Text style={styles.name}>Fart Master</Text>
          <Text style={styles.email}>fartmaster@example.com</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <IconSymbol 
              ios_icon_name="phone.fill" 
              android_material_icon_name="phone" 
              size={20} 
              color={colors.textSecondary} 
            />
            <Text style={styles.infoText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol 
              ios_icon_name="location.fill" 
              android_material_icon_name="location-on" 
              size={20} 
              color={colors.textSecondary} 
            />
            <Text style={styles.infoText}>Fart City, FC</Text>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementCard}>
            <IconSymbol 
              ios_icon_name="star.fill" 
              android_material_icon_name="star" 
              size={24} 
              color={colors.accent} 
            />
            <Text style={styles.achievementText}>First Fart - Clicked your first fart!</Text>
          </View>
          <View style={styles.achievementCard}>
            <IconSymbol 
              ios_icon_name="star.fill" 
              android_material_icon_name="star" 
              size={24} 
              color={colors.accent} 
            />
            <Text style={styles.achievementText}>Fart Collector - Collected 100 farts</Text>
          </View>
          <View style={styles.achievementCard}>
            <IconSymbol 
              ios_icon_name="star.fill" 
              android_material_icon_name="star" 
              size={24} 
              color={colors.accent} 
            />
            <Text style={styles.achievementText}>Upgrade Master - Purchased your first upgrade</Text>
          </View>
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
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 32,
    marginBottom: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.accent,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 20,
    gap: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
  },
  achievementsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.accent,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  achievementText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
});
