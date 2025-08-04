import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, Button, Avatar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../theme/theme';

export default function ProfileScreen() {
  const profileData = {
    name: 'Officer Johnson',
    badge: 'Badge #1247',
    department: 'Security Department',
    shift: 'Day Shift (8:00 AM - 4:00 PM)',
    email: 'johnson@security.com',
    phone: '+1 (555) 123-4567',
  };

  const stats = [
    {label: 'Total Patrols', value: '156', icon: 'security'},
    {label: 'Hours Logged', value: '1,248', icon: 'schedule'},
    {label: 'Incidents Handled', value: '23', icon: 'report'},
    {label: 'Perfect Days', value: '89', icon: 'star'},
  ];

  const menuItems = [
    {
      title: 'Notifications',
      icon: 'notifications',
      onPress: () => {},
      showBadge: true,
    },
    {
      title: 'Settings',
      icon: 'settings',
      onPress: () => {},
    },
    {
      title: 'Help & Support',
      icon: 'help',
      onPress: () => {},
    },
    {
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      onPress: () => {},
    },
    {
      title: 'Terms of Service',
      icon: 'description',
      onPress: () => {},
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar.Text
            size={80}
            label="OJ"
            style={styles.avatar}
            labelStyle={styles.avatarLabel}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.badge}>{profileData.badge}</Text>
            <Text style={styles.department}>{profileData.department}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Icon name="schedule" size={20} color={theme.colors.primary} />
            <Text style={styles.contactText}>{profileData.shift}</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="email" size={20} color={theme.colors.primary} />
            <Text style={styles.contactText}>{profileData.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="phone" size={20} color={theme.colors.primary} />
            <Text style={styles.contactText}>{profileData.phone}</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>Performance Overview</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Icon name={stat.icon} size={24} color={theme.colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <Icon name={item.icon} size={24} color={theme.colors.text} />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <View style={styles.menuItemRight}>
              {item.showBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              )}
              <Icon name="chevron-right" size={24} color={theme.colors.placeholder} />
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      <View style={styles.logoutSection}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={styles.logoutButtonContent}
          labelStyle={styles.logoutButtonLabel}
          icon="logout">
          Logout
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>PatrolTracker v1.0.0</Text>
        <Text style={styles.copyright}>© 2024 Security Solutions Inc.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  avatarLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: theme.spacing.lg,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  badge: {
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  department: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  divider: {
    marginVertical: theme.spacing.lg,
  },
  contactInfo: {
    gap: theme.spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  statsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  menuCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  logoutButton: {
    borderColor: theme.colors.error,
  },
  logoutButtonContent: {
    paddingVertical: theme.spacing.sm,
  },
  logoutButtonLabel: {
    color: theme.colors.error,
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  version: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  copyright: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
});