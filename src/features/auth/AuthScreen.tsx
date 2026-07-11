import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../../services/supabase/client';
import { colors } from '../../theme/colors';

type AuthMode = 'signIn' | 'signUp';

export function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isSignUp = mode === 'signUp';

  async function handleSubmit() {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = fullName.trim();

    if (isSignUp && normalizedName.length < 2) {
      Alert.alert('Nome inválido', 'Informe seu nome completo.');
      return;
    }

    if (!normalizedEmail || !password) {
      Alert.alert('Dados incompletos', 'Informe o e-mail e a senha.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Senha inválida',
        'A senha deve possuir pelo menos 6 caracteres.',
      );
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              full_name: normalizedName,
            },
          },
        });

        if (error) {
          throw error;
        }

        Alert.alert(
          'Cadastro realizado',
          'Verifique seu e-mail para confirmar o cadastro.',
        );

        setMode('signIn');
        setPassword('');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível concluir a autenticação.';

      Alert.alert('Não foi possível entrar', message);
    } finally {
      setIsLoading(false);
    }
  }

  function toggleMode() {
    setMode(isSignUp ? 'signIn' : 'signUp');
    setPassword('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>NEXUS FINANCE</Text>

        <Text style={styles.title}>
          {isSignUp ? 'Criar sua conta' : 'Acessar sua conta'}
        </Text>

        <Text style={styles.description}>
          {isSignUp
            ? 'Crie uma identidade individual para participar dos Espaços Financeiros.'
            : 'Entre para acessar seus Espaços Financeiros.'}
        </Text>

        {isSignUp && (
          <View style={styles.field}>
            <Text style={styles.label}>Nome completo</Text>

            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Seu nome"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="words"
              editable={!isLoading}
            />
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="voce@exemplo.com"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            editable={!isLoading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo de 6 caracteres"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
            onSubmitEditing={handleSubmit}
          />
        </View>

        <Pressable
          style={[
            styles.primaryButton,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <Text style={styles.primaryButtonText}>
              {isSignUp ? 'Criar conta' : 'Entrar'}
            </Text>
          )}
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={toggleMode}
          disabled={isLoading}
        >
          <Text style={styles.secondaryButtonText}>
            {isSignUp
              ? 'Já possui uma conta? Entrar'
              : 'Ainda não possui conta? Cadastrar'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
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
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 24,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  primaryButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginTop: 6,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});