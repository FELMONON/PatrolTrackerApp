import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {Card, Button, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../theme/theme';

export default function PatrolDetailScreen({route, navigation}: any) {
  const {type} = route.params || {type: 'checkpoint'};
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const getTitle = () => {
    switch (type) {
      case 'checkpoint':
        return 'Checkpoint Report';
      case 'incident':
        return 'Incident Report';
      default:
        return 'Patrol Report';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'checkpoint':
        return 'location-on';
      case 'incident':
        return 'report-problem';
      default:
        return 'note-add';
    }
  };

  const tags = [
    'All Clear',
    'Suspicious Activity',
    'Equipment Issue',
    'Maintenance Needed',
    'Security Concern',
    'Emergency',
    'Routine Check',
    'Follow-up Required',
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const submitReport = () => {
    if (!notes.trim() && selectedTags.length === 0) {
      Alert.alert('Error', 'Please add notes or select at least one tag.');
      return;
    }

    Alert.alert(
      'Report Submitted',
      'Your report has been successfully submitted.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.headerCard}>
        <View style={styles.headerContent}>
          <Icon name={getIcon()} size={32} color={theme.colors.primary} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{getTitle()}</Text>
            <Text style={styles.timestamp}>
              {new Date().toLocaleString()}
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.locationCard}>
        <View style={styles.locationContent}>
          <Icon name="location-on" size={20} color={theme.colors.primary} />
          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>Current Location</Text>
            <Text style={styles.locationAddress}>
              Main Entrance - Gate A{'\n'}
              Building Complex, Floor 1
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.tagsCard}>
        <Text style={styles.sectionTitle}>Tags</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              selected={selectedTags.includes(tag)}
              onPress={() => toggleTag(tag)}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.selectedTag,
              ]}
              textStyle={[
                styles.tagText,
                selectedTags.includes(tag) && styles.selectedTagText,
              ]}>
              {tag}
            </Chip>
          ))}
        </View>
      </Card>

      <Card style={styles.notesCard}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add detailed notes about this checkpoint/incident..."
          placeholderTextColor={theme.colors.placeholder}
          multiline
          numberOfLines={6}
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
        />
      </Card>

      <Card style={styles.actionsCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            icon="camera-alt">
            Take Photo
          </Button>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            icon="mic">
            Voice Note
          </Button>
        </View>
      </Card>

      <View style={styles.submitSection}>
        <Button
          mode="contained"
          onPress={submitReport}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
          labelStyle={styles.submitButtonLabel}>
          Submit Report
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerCard: {
    margin: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  headerContent: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  locationCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    elevation: 1,
  },
  locationContent: {
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  locationAddress: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
    lineHeight: 16,
  },
  tagsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  selectedTag: {
    backgroundColor: theme.colors.primary,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  selectedTagText: {
    color: '#fff',
  },
  notesCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    elevation: 1,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: theme.colors.placeholder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: 14,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    minHeight: 120,
  },
  actionsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    elevation: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  submitSection: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonContent: {
    paddingVertical: theme.spacing.sm,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});