import { StyleSheet, Text, View } from 'react-native';

import { appConfig } from '../../config/app';
import { colors } from '../../theme/colors';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>FASE 1</Text>
        </View>

        <Text style={styles.title}>{appConfig.name}</Text>

        <Text style={styles.description}>
          Fundação do aplicativo configurada com sucesso.
        </Text>

        <View style={styles.status}>
          <View style={styles.statusIndicator} />

          <Text style={styles.statusText}>
            Projeto pronto para receber a autenticação
          </Text>
        </View>

        <Text style={styles.version}>Versão {appConfig.version}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 28,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 24,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: 10,
  },
  statusText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },
  version: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 32,
  },
});