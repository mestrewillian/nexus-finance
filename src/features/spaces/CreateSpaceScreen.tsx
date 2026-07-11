import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../../services/supabase/client';
import { colors } from '../../theme/colors';

type CreateSpaceScreenProps = {
  onSpaceCreated: () => void;
};

const spaceTypes = [
  { label: 'Familiar', value: 'family' },
  { label: 'Pessoal', value: 'personal' },
  { label: 'Empresarial', value: 'business' },
  { label: 'Projeto', value: 'project' },
  { label: 'Outro', value: 'other' },
] as const;

type SpaceType = (typeof spaceTypes)[number]['value'];

export function CreateSpaceScreen({ onSpaceCreated }: CreateSpaceScreenProps) {
  const [spaceName, setSpaceName] = useState('Família Zingoni');
  const [spaceType, setSpaceType] = useState<SpaceType>('family');
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateSpace() {
    const trimmedSpaceName = spaceName.trim();

    if (!trimmedSpaceName) {
      Alert.alert('Informe o nome do espaço financeiro.');
      return;
    }

    setIsCreating(true);

    const { error } = await supabase.rpc('create_financial_space', {
      space_name: trimmedSpaceName,
      space_type: spaceType,
    });

    setIsCreating(false);

    if (error) {
      Alert.alert(
        'Não foi possível criar o espaço financeiro.',
        error.message,
      );
      return;
    }

    onSpaceCreated();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Espaço Financeiro</Text>
        </View>

        <Text style={styles.title}>Crie seu primeiro espaço</Text>

        <Text style={styles.subtitle}>
          O espaço financeiro organiza contas, membros, categorias e
          movimentações. Para começar, vamos criar o espaço principal da família.
        </Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Nome do espaço</Text>
            <TextInput
              autoCapitalize="words"
              onChangeText={setSpaceName}
              placeholder="Ex: Família Zingoni"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={spaceName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tipo</Text>

            <View style={styles.typeGrid}>
              {spaceTypes.map((type) => {
                const isSelected = type.value === spaceType;

                return (
                  <Pressable
                    key={type.value}
                    onPress={() => setSpaceType(type.value)}
                    style={[
                      styles.typeButton,
                      isSelected && styles.typeButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        isSelected && styles.typeButtonTextSelected,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            disabled={isCreating}
            onPress={handleCreateSpace}
            style={[
              styles.primaryButton,
              isCreating && styles.primaryButtonDisabled,
            ]}
          >
            {isCreating ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>
                Criar espaço financeiro
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    padding: 24,
  },
  field: {
    gap: 8,
  },
  form: {
    gap: 18,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  typeButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  typeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  typeButtonTextSelected: {
    color: colors.white,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});