import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {Card, Button, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../theme/theme';

const {width} = Dimensions.get('window');

export default function PatrolScreen({navigation}: any) {
  const [isPatrolActive, setIsPatrolActive] = useState(false);
  const [patrolTime, setPatrolTime] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('Loading...');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPatrolActive) {
      interval = setInterval(() => {
        setPatrolTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPatrolActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startPatrol = () => {
    setIsPatrolActive(true);
    setPatrolTime(0);
    setCurrentLocation('Main Entrance - Gate A');
  };

  const endPatrol = () => {
    Alert.alert(
      'End Patrol',
      'Are you sure you want to end the current patrol?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'End Patrol',
          style: 'destructive',
          onPress: () => {
            setIsPatrolActive(false);
            setPatrolTime(0);
            setCurrentLocation('Off Duty');
          },
        },
      ]
    );
  };

  const quickActions = [
    {
      id: 1,
      title: 'Check Point',
      icon: 'location-on',
      color: theme.colors.primary,
      onPress: () => navigation.navigate('PatrolDetail', {type: 'checkpoint'}),
    },
    {
      id: 2,
      title: 'Report Incident',
      icon: 'report-problem',
      color: theme.colors.warning,
      onPress: () => navigation.navigate('PatrolDetail', {type: 'incident'}),
    },
    {
      id: 3,
      title: 'Emergency',
      icon: 'emergency',
      color: theme.colors.error,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Take Photo',
      icon: 'camera-alt',
      color: theme.colors.accent,
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <Card style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.statusIndicator}>
            <View 
              style={[
                styles.statusDot, 
                {backgroundColor: isPatrolActive ? theme.colors.success : theme.colors.placeholder}
              ]} 
            />
            <Text style={styles.statusText}>
              {isPatrolActive ? 'Patrol Active' : 'Off Duty'}
            </Text>
          </View>
          <Text style={styles.patrolTime}>{formatTime(patrolTime)}</Text>
        </View>
        
        <View style={styles.locationInfo}>
          <Icon name="location-on" size={20} color={theme.colors.primary} />
          <Text style={styles.locationText}>{currentLocation}</Text>
        </View>

        <View style={styles.patrolControls}>
          {!isPatrolActive ? (
            <Button
              mode="contained"
              onPress={startPatrol}
              style={styles.startButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}>
              Start Patrol
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={endPatrol}
              style={styles.endButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}>
              End Patrol
            </Button>
          )}
        </View>
      </Card>

      {isPatrolActive && (
        <>
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.actionCard, {backgroundColor: action.color}]}
                  onPress={action.onPress}
                  activeOpacity={0.8}>
                  <Icon name={action.icon} size={28} color="#fff" />
                  <Text style={styles.actionText}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Card style={styles.statsCard}>
            <Text style={styles.statsTitle}>Today's Progress</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Checkpoints</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Incidents</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3.2</Text>
                <Text style={styles.statLabel}>Miles</Text>
              </View>
            </View>
          </Card>
        </>
      )}

      {isPatrolActive && (
        <FAB
          icon="add"
          style={styles.fab}
          onPress={() => navigation.navigate('PatrolDetail', {type: 'quick'})}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  statusCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
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
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  patrolTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontFamily: 'monospace',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  locationText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  patrolControls: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: theme.colors.success,
    width: '100%',
  },
  endButton: {
    backgroundColor: theme.colors.error,
    width: '100%',
  },
  buttonContent: {
    paddingVertical: theme.spacing.sm,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsSection: {
    marginBottom: theme.spacing.lg,
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
    height: 80,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    elevation: 2,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  statsCard: {
    padding: theme.spacing.lg,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});