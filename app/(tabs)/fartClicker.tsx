
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  effect: number;
  type: 'click' | 'passive';
}

interface GameState {
  fartCount: number;
  fartsPerClick: number;
  fartsPerSecond: number;
  totalFartsEarned: number;
  upgrades: Upgrade[];
}

const STORAGE_KEY = '@fart_clicker_game_state';

const initialUpgrades: Upgrade[] = [
  {
    id: 'click1',
    name: 'Better Beans',
    description: '+1 fart per click',
    cost: 10,
    level: 0,
    effect: 1,
    type: 'click',
  },
  {
    id: 'click2',
    name: 'Spicy Burrito',
    description: '+5 farts per click',
    cost: 100,
    level: 0,
    effect: 5,
    type: 'click',
  },
  {
    id: 'passive1',
    name: 'Auto Farter',
    description: '+1 fart per second',
    cost: 50,
    level: 0,
    effect: 1,
    type: 'passive',
  },
  {
    id: 'passive2',
    name: 'Fart Factory',
    description: '+5 farts per second',
    cost: 500,
    level: 0,
    effect: 5,
    type: 'passive',
  },
];

export default function FartClickerScreen() {
  const [fartCount, setFartCount] = useState(0);
  const [fartsPerClick, setFartsPerClick] = useState(1);
  const [fartsPerSecond, setFartsPerSecond] = useState(0);
  const [totalFartsEarned, setTotalFartsEarned] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load game state from AsyncStorage on mount
  useEffect(() => {
    loadGameState();
  }, []);

  // Save game state to AsyncStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveGameState();
    }
  }, [fartCount, fartsPerClick, fartsPerSecond, totalFartsEarned, upgrades, isLoaded]);

  const loadGameState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedState !== null) {
        const gameState: GameState = JSON.parse(savedState);
        console.log('Loading saved game state:', gameState);
        setFartCount(gameState.fartCount);
        setFartsPerClick(gameState.fartsPerClick);
        setFartsPerSecond(gameState.fartsPerSecond);
        setTotalFartsEarned(gameState.totalFartsEarned);
        setUpgrades(gameState.upgrades);
      } else {
        console.log('No saved game state found, starting fresh');
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveGameState = async () => {
    try {
      const gameState: GameState = {
        fartCount,
        fartsPerClick,
        fartsPerSecond,
        totalFartsEarned,
        upgrades,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      console.log('Game state saved');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  // Passive fart generation
  useEffect(() => {
    if (fartsPerSecond > 0) {
      const interval = setInterval(() => {
        setFartCount((prev) => prev + fartsPerSecond);
        setTotalFartsEarned((prev) => prev + fartsPerSecond);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [fartsPerSecond]);

  const handleFartClick = () => {
    console.log('Fart clicked!');
    setFartCount((prev) => prev + fartsPerClick);
    setTotalFartsEarned((prev) => prev + fartsPerClick);
    
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find((u) => u.id === upgradeId);
    if (!upgrade) {
      console.log('Upgrade not found');
      return;
    }

    const cost = Math.floor(upgrade.cost * Math.pow(1.15, upgrade.level));

    if (fartCount >= cost) {
      console.log(`Purchasing upgrade: ${upgrade.name}`);
      setFartCount((prev) => prev - cost);

      setUpgrades((prev) =>
        prev.map((u) => {
          if (u.id === upgradeId) {
            return { ...u, level: u.level + 1 };
          }
          return u;
        })
      );

      if (upgrade.type === 'click') {
        setFartsPerClick((prev) => prev + upgrade.effect);
      } else {
        setFartsPerSecond((prev) => prev + upgrade.effect);
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      console.log('Not enough farts for upgrade');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toString();
  };

  // Don't render until state is loaded
  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        {/* Header Stats */}
        <View style={styles.header}>
          <Text style={styles.title}>💨 Fart Clicker 💨</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Farts</Text>
              <Text style={styles.statValue}>{formatNumber(fartCount)}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Per Click</Text>
              <Text style={styles.statValue}>{formatNumber(fartsPerClick)}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Per Second</Text>
              <Text style={styles.statValue}>{formatNumber(fartsPerSecond)}</Text>
            </View>
          </View>
        </View>

        {/* Main Fart Button */}
        <View style={styles.fartButtonContainer}>
          <TouchableOpacity
            style={styles.fartButton}
            onPress={handleFartClick}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="cloud.fill"
              android_material_icon_name="cloud"
              size={120}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.clickText}>Tap to Fart!</Text>
        </View>

        {/* Upgrades Section */}
        <View style={styles.upgradesSection}>
          <Text style={styles.sectionTitle}>Upgrades</Text>
          {upgrades.map((upgrade, index) => {
            const cost = Math.floor(upgrade.cost * Math.pow(1.15, upgrade.level));
            const canAfford = fartCount >= cost;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.upgradeCard,
                  !canAfford && styles.upgradeCardDisabled,
                ]}
                onPress={() => handleUpgrade(upgrade.id)}
                disabled={!canAfford}
                activeOpacity={0.7}
              >
                <View style={styles.upgradeInfo}>
                  <Text style={styles.upgradeName}>{upgrade.name}</Text>
                  <Text style={styles.upgradeDescription}>
                    {upgrade.description}
                  </Text>
                  <Text style={styles.upgradeLevel}>Level: {upgrade.level}</Text>
                </View>
                <View style={styles.upgradeCost}>
                  <Text style={[styles.costText, !canAfford && styles.costTextDisabled]}>
                    {formatNumber(cost)}
                  </Text>
                  <IconSymbol
                    ios_icon_name="cloud.fill"
                    android_material_icon_name="cloud"
                    size={20}
                    color={canAfford ? colors.primary : colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Stats Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total Farts Earned: {formatNumber(totalFartsEarned)}
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: colors.text,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  fartButtonContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  fartButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.primary,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    elevation: 5,
  },
  clickText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  upgradesSection: {
    width: '100%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  upgradeCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  upgradeCardDisabled: {
    opacity: 0.5,
    borderColor: colors.textSecondary,
  },
  upgradeInfo: {
    flex: 1,
  },
  upgradeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  upgradeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  upgradeLevel: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  upgradeCost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  costText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  costTextDisabled: {
    color: colors.textSecondary,
  },
  footer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
