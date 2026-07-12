import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { Session } from '@supabase/supabase-js';

import { AuthScreen } from './src/features/auth/AuthScreen';
import { HomeScreen } from './src/features/home/HomeScreen';
import { CreateSpaceScreen } from './src/features/spaces/CreateSpaceScreen';
import { supabase } from './src/services/supabase/client';
import { colors } from './src/theme/colors';

type ActiveSpace = {
  id: string;
  name: string;
  space_type: string;
};

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [activeSpace, setActiveSpace] = useState<ActiveSpace | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isLoadingSpace, setIsLoadingSpace] = useState(false);

  const loadActiveSpace = useCallback(async () => {
    setIsLoadingSpace(true);

    const { data, error } = await supabase
      .from('financial_space_members')
      .select(
        `
          financial_spaces (
            id,
            name,
            space_type
          )
        `,
      )
      .eq('membership_status', 'active')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('Erro ao carregar espaço financeiro ativo:', error.message);
      setActiveSpace(null);
      setIsLoadingSpace(false);
      return;
    }

    const financialSpace = Array.isArray(data?.financial_spaces)
      ? data.financial_spaces[0]
      : data?.financial_spaces;

    setActiveSpace(financialSpace ?? null);
    setIsLoadingSpace(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoadingSession(false);

      if (data.session) {
        loadActiveSpace();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);

      if (currentSession) {
        loadActiveSpace();
        return;
      }

      setActiveSpace(null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadActiveSpace]);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  function handleSpaceCreated() {
    loadActiveSpace();
  }

  if (isLoadingSession || isLoadingSpace) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />

      {!session ? (
        <AuthScreen />
      ) : !activeSpace ? (
        <CreateSpaceScreen onSpaceCreated={handleSpaceCreated} />
      ) : (
        <HomeScreen
          activeSpaceId={activeSpace.id}
          activeSpaceName={activeSpace.name}
          userEmail={session.user.email ?? 'Usuário autenticado'}
          onSignOut={handleSignOut}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
});