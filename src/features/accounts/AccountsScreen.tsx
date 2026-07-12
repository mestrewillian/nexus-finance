import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../../services/supabase/client';
import { colors } from '../../theme/colors';

type FinancialAccount = {
  id: string;
  name: string;
  account_type: string;
  initial_balance_cents: number;
  is_active: boolean;
};

type AccountsScreenProps = {
  financialSpaceId: string;
};

const accountTypes = [
  { label: 'Conta corrente', value: 'checking' },
  { label: 'Poupança', value: 'savings' },
  { label: 'Dinheiro', value: 'cash' },
  { label: 'Carteira digital', value: 'digital_wallet' },
  { label: 'Investimento', value: 'investment' },
  { label: 'Outro', value: 'other' },
] as const;

type AccountType = (typeof accountTypes)[number]['value'];

function formatCurrencyFromCents(amountInCents: number) {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(amountInCents / 100);
}

function parseCurrencyToCents(value: string) {
  const onlyDigits = value.replace(/\D/g, '');

  if (!onlyDigits) {
    return 0;
  }

  return Number(onlyDigits);
}

export function AccountsScreen({ financialSpaceId }: AccountsScreenProps) {
  const [accounts, setAccounts] = useState<FinancialAccount[]>([]);
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('checking');
  const [initialBalance, setInitialBalance] = useState('');
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadAccounts = useCallback(async () => {
    setIsLoadingAccounts(true);

    const { data, error } = await supabase
      .from('financial_accounts')
      .select('id, name, account_type, initial_balance_cents, is_active')
      .eq('financial_space_id', financialSpaceId)
      .order('created_at', { ascending: true });

    if (error) {
      Alert.alert('Não foi possível carregar as contas.', error.message);
      setIsLoadingAccounts(false);
      return;
    }

    setAccounts(data ?? []);
    setIsLoadingAccounts(false);
  }, [financialSpaceId]);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  async function handleCreateAccount() {
    const trimmedAccountName = accountName.trim();

    if (!trimmedAccountName) {
      Alert.alert('Informe o nome da conta.');
      return;
    }

    setIsCreatingAccount(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsCreatingAccount(false);
      Alert.alert('Sessão inválida. Entre novamente.');
      return;
    }

    const { error } = await supabase.from('financial_accounts').insert({
      account_type: accountType,
      created_by: user.id,
      financial_space_id: financialSpaceId,
      initial_balance_cents: parseCurrencyToCents(initialBalance),
      name: trimmedAccountName,
    });

    setIsCreatingAccount(false);

    if (error) {
      Alert.alert('Não foi possível criar a conta.', error.message);
      return;
    }

    setAccountName('');
    setAccountType('checking');
    setInitialBalance('');
    setIsModalVisible(false);
    loadAccounts();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Contas</Text>
          <Text style={styles.title}>Contas financeiras</Text>
        </View>

        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {isLoadingAccounts ? (
        <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.primary} />
        </View>
        ) : (
        <View style={styles.listContent}>
            {accounts.length === 0 ? (
            <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Nenhuma conta cadastrada</Text>
                <Text style={styles.emptyText}>
                Cadastre uma conta para começar a organizar os saldos do espaço.
                </Text>
            </View>
            ) : (
            accounts.map((item) => (
                <View key={item.id} style={styles.accountCard}>
                <View>
                    <Text style={styles.accountName}>{item.name}</Text>
                    <Text style={styles.accountType}>{item.account_type}</Text>
                </View>

                <Text style={styles.accountBalance}>
                    {formatCurrencyFromCents(item.initial_balance_cents)}
                </Text>
                </View>
            ))
            )}
        </View>
        )}

      <Modal
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
        transparent
        visible={isModalVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova conta</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                onChangeText={setAccountName}
                placeholder="Ex: Nubank Will"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                value={accountName}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Saldo inicial</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={setInitialBalance}
                placeholder="Ex: 125000 para R$ 1.250,00"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                value={initialBalance}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Tipo</Text>

              <View style={styles.typeGrid}>
                {accountTypes.map((type) => {
                  const isSelected = type.value === accountType;

                  return (
                    <Pressable
                      key={type.value}
                      onPress={() => setAccountType(type.value)}
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

            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                disabled={isCreatingAccount}
                onPress={handleCreateAccount}
                style={[
                  styles.primaryButton,
                  isCreatingAccount && styles.primaryButtonDisabled,
                ]}
              >
                {isCreatingAccount ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.primaryButtonText}>Salvar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  accountBalance: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  accountCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 16,
  },
  accountName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  accountType: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 28,
    lineHeight: 30,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 22,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  field: {
    gap: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 12,
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
  listContent: {
    gap: 12,
    padding: 24,
    paddingTop: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(23, 32, 51, 0.45)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 18,
    padding: 24,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    flex: 1,
    paddingVertical: 14,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  typeButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  typeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  typeButtonTextSelected: {
    color: colors.white,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});