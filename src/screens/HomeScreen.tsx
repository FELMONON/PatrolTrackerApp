import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Card, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../theme/theme';

const {width} = Dimensions.get('window');

export default function HomeScreen({navigation}: any) {
  const quickActions = [
    {
      id: 1,
      title: 'Start Patrol',
      icon: 'play-arrow',
      color: theme.colors.success,
      onPress: () => navigation.navigate('Patrol'),
    },
    {
      id: 2,
      title: 'Emergency',
      icon: 'warning',
      color: theme.colors.error,
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Report Issue',
      icon: 'report-problem',
      color: theme.colors.warning,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Check In',
      icon: 'location-on',
      color: theme.colors.primary,
      onPress: () => {},
    },
  ];

  const stats = [
    {label: 'Today\'s Patrols', value: '3', icon: 'security'},
    {label: 'Hours Logged', value: '6.5', icon: 'schedule'},
    {label: 'Incidents', value: '2', icon: 'report'},
    {label: 'Check Points', value: '12', icon: 'location-on'},
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.name}>Officer Johnson</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</Text>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, {backgroundColor: action.color}]}
              onPress={action.onPress}
              activeOpacity={0.8}>
              <Icon name={action.icon} size={32} color="#fff" />
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <View style={styles.statContent}>
                <Icon name={stat.icon} size={24} color={theme.colors.primary} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <Card style={styles.statusCard}>
        <View style={styles.statusContent}>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, {backgroundColor: theme.colors.success}]} />
            <Text style={styles.statusText}>On Duty</Text>
          </View>
          <Text style={styles.statusTime}>Started at 8:00 AM</Text>
        </View>
      </Card>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Card style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>Checkpoint Alpha completed</Text>
              <Text style={styles.activityTime}>2 minutes ago</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Icon name="report" size={20} color={theme.colors.warning} />
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>Incident reported at Gate B</Text>
              <Text style={styles.activityTime}>15 minutes ago</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  quickActions: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 48) / 2 - 8,
    height: 100,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 48) / 2 - 8,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  statContent: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  statusCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    elevation: 2,
  },
  statusContent: {
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  statusTime: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  recentActivity: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  activityCard: {
    marginBottom: theme.spacing.sm,
    elevation: 1,
  },
  activityItem: {
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityText: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
});