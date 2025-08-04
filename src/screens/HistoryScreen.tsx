import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, Chip, SearchBar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../theme/theme';

interface PatrolRecord {
  id: string;
  date: string;
  duration: string;
  checkpoints: number;
  incidents: number;
  status: 'completed' | 'incomplete';
  notes: string;
}

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const patrolHistory: PatrolRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      duration: '8h 30m',
      checkpoints: 12,
      incidents: 2,
      status: 'completed',
      notes: 'Routine patrol completed successfully',
    },
    {
      id: '2',
      date: '2024-01-14',
      duration: '7h 45m',
      checkpoints: 10,
      incidents: 0,
      status: 'completed',
      notes: 'All clear, no incidents reported',
    },
    {
      id: '3',
      date: '2024-01-13',
      duration: '6h 15m',
      checkpoints: 8,
      incidents: 1,
      status: 'incomplete',
      notes: 'Early termination due to emergency call',
    },
    {
      id: '4',
      date: '2024-01-12',
      duration: '8h 00m',
      checkpoints: 11,
      incidents: 3,
      status: 'completed',
      notes: 'Multiple security concerns addressed',
    },
  ];

  const filters = [
    {key: 'all', label: 'All'},
    {key: 'completed', label: 'Completed'},
    {key: 'incomplete', label: 'Incomplete'},
    {key: 'incidents', label: 'With Incidents'},
  ];

  const getFilteredHistory = () => {
    let filtered = patrolHistory;

    if (selectedFilter !== 'all') {
      if (selectedFilter === 'incidents') {
        filtered = filtered.filter(record => record.incidents > 0);
      } else {
        filtered = filtered.filter(record => record.status === selectedFilter);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(record =>
        record.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.date.includes(searchQuery)
      );
    }

    return filtered;
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? theme.colors.success : theme.colors.warning;
  };

  const getStatusIcon = (status: string) => {
    return status === 'completed' ? 'check-circle' : 'warning';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search patrol history..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}>
          {filters.map((filter) => (
            <Chip
              key={filter.key}
              selected={selectedFilter === filter.key}
              onPress={() => setSelectedFilter(filter.key)}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.selectedFilterChip,
              ]}
              textStyle={[
                styles.filterText,
                selectedFilter === filter.key && styles.selectedFilterText,
              ]}>
              {filter.label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
        {getFilteredHistory().map((record) => (
          <TouchableOpacity key={record.id} activeOpacity={0.8}>
            <Card style={styles.historyCard}>
              <View style={styles.cardHeader}>
                <View style={styles.dateSection}>
                  <Text style={styles.date}>
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text style={styles.duration}>{record.duration}</Text>
                </View>
                
                <View style={styles.statusSection}>
                  <Icon
                    name={getStatusIcon(record.status)}
                    size={20}
                    color={getStatusColor(record.status)}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      {color: getStatusColor(record.status)},
                    ]}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Icon name="location-on" size={16} color={theme.colors.primary} />
                  <Text style={styles.statText}>{record.checkpoints} checkpoints</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="report" size={16} color={theme.colors.warning} />
                  <Text style={styles.statText}>{record.incidents} incidents</Text>
                </View>
              </View>

              <Text style={styles.notes} numberOfLines={2}>
                {record.notes}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}

        {getFilteredHistory().length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="history" size={64} color={theme.colors.placeholder} />
            <Text style={styles.emptyTitle}>No patrol history found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || selectedFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start your first patrol to see history here'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  searchBar: {
    marginBottom: theme.spacing.md,
    elevation: 0,
    backgroundColor: theme.colors.background,
  },
  searchInput: {
    fontSize: 14,
  },
  filtersContainer: {
    marginBottom: theme.spacing.sm,
  },
  filtersContent: {
    paddingRight: theme.spacing.lg,
  },
  filterChip: {
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  selectedFilterChip: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  selectedFilterText: {
    color: '#fff',
  },
  historyList: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  historyCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  dateSection: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  duration: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  statText: {
    fontSize: 12,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  notes: {
    fontSize: 14,
    color: theme.colors.placeholder,
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.placeholder,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});