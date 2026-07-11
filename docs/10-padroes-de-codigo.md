# Nexus Finance — Padrões de Código

## 1. Objetivo deste documento

Este documento define os padrões de código do Nexus Finance.

Seu objetivo é estabelecer:

* organização dos arquivos;
* convenções de nomes;
* regras de TypeScript;
* padrões para componentes;
* padrões para hooks;
* padrões para casos de uso;
* padrões para repositórios;
* tratamento de erros;
* comentários;
* testes;
* commits;
* branches;
* revisão de código;
* instruções para tarefas executadas pelo Codex.

Estes padrões deverão manter o projeto:

* legível;
* previsível;
* seguro;
* testável;
* documentado;
* compreensível;
* preparado para evolução.

---

# 2. Princípios gerais

Todo código do Nexus Finance deverá seguir estes princípios:

1. clareza antes de concisão;
2. simplicidade antes de abstração;
3. uma responsabilidade principal por módulo;
4. regras financeiras fora da interface;
5. tipagem explícita quando melhorar a compreensão;
6. ausência de segredos no código;
7. funções pequenas e previsíveis;
8. erros tratados de forma padronizada;
9. dependências adicionadas apenas por necessidade;
10. comentários explicando decisões, não o óbvio;
11. testes prioritários para regras financeiras;
12. código formatado de maneira consistente;
13. nenhuma alteração sem compreensão do responsável;
14. documentação atualizada quando a regra mudar;
15. nenhuma duplicação intencional de regra crítica.

---

# 3. Idioma do projeto

## 3.1 Código

O código será escrito em inglês.

Exemplos:

```ts
createTransaction();
financialSpaceId;
accountBalance;
```

## 3.2 Banco de dados

Tabelas e colunas serão escritas em inglês com `snake_case`.

Exemplos:

```text
financial_transactions
financial_space_id
created_at
```

## 3.3 Interface

Textos apresentados ao usuário serão escritos em português do Brasil.

Exemplos:

```text
Salvar despesa
Conta financeira
Movimentação cancelada
```

## 3.4 Documentação

A documentação principal será escrita em português.

Termos técnicos poderão permanecer em inglês quando forem mais reconhecidos no desenvolvimento de software.

---

# 4. Convenções de nomes

## 4.1 Variáveis e funções

Utilizar `camelCase`.

```ts
const activeFinancialSpace = {};
const accountBalanceCents = 150000;

function calculateAccountBalance() {}
```

## 4.2 Tipos, interfaces, classes e componentes

Utilizar `PascalCase`.

```ts
type FinancialTransaction = {};
interface AccountRepository {}
function TransactionCard() {}
```

## 4.3 Constantes globais

Utilizar `UPPER_SNAKE_CASE`.

```ts
const DEFAULT_CURRENCY_CODE = "BRL";
const MAX_RECEIPT_UPLOAD_SIZE = 5_000_000;
```

Constantes locais simples poderão utilizar `camelCase`.

## 4.4 Arquivos de componentes

Utilizar `PascalCase`.

```text
TransactionCard.tsx
CurrencyInput.tsx
ScreenContainer.tsx
```

## 4.5 Arquivos de hooks

Utilizar `camelCase` com prefixo `use`.

```text
useTransactions.ts
useActiveFinancialSpace.ts
useAuth.ts
```

## 4.6 Arquivos de serviços e utilitários

Utilizar `camelCase`.

```text
formatCurrency.ts
mapTransactionRow.ts
validateTransfer.ts
```

## 4.7 Arquivos de teste

Utilizar um destes padrões:

```text
calculateAccountBalance.test.ts
TransactionCard.test.tsx
```

## 4.8 Pastas

Utilizar `kebab-case` ou nomes simples em inglês.

```text
financial-spaces
transactions
shared
services
```

O projeto deverá escolher um padrão e mantê-lo de forma consistente.

---

# 5. Nomes descritivos

Nomes deverão explicar o propósito do valor.

Evitar:

```ts
const data = {};
const item = {};
const value = 100;
const x = true;
```

Preferir:

```ts
const transaction = {};
const selectedAccount = {};
const amountCents = 100;
const isAccountActive = true;
```

Exceções poderão existir em callbacks muito curtos e contextos claros.

---

# 6. Booleanos

Variáveis booleanas deverão, sempre que possível, começar com:

```text
is
has
can
should
was
```

Exemplos:

```ts
const isLoading = true;
const hasPermission = false;
const canCancelTransaction = true;
const shouldShowWarning = false;
```

Evitar:

```ts
const loading = true;
const permission = false;
```

quando isso reduzir a clareza.

---

# 7. Funções

Funções deverão começar com verbos.

Exemplos:

```ts
createAccount();
updateTransaction();
calculateBalance();
validateCategory();
formatCurrency();
```

Evitar nomes vagos:

```ts
account();
transaction();
process();
data();
```

---

# 8. Funções pequenas

Uma função deverá possuir uma responsabilidade principal.

Exemplo adequado:

```ts
function calculateTransactionEffect(
  transaction: FinancialTransaction
): number {
  if (transaction.status !== "confirmed") {
    return 0;
  }

  if (transaction.transactionType === "income") {
    return transaction.amountCents;
  }

  if (transaction.transactionType === "expense") {
    return -transaction.amountCents;
  }

  return 0;
}
```

Uma função muito longa deverá ser analisada para verificar se possui:

* validação;
* transformação;
* persistência;
* navegação;
* feedback visual;

misturados no mesmo bloco.

---

# 9. Parâmetros de funções

Funções com muitos parâmetros deverão receber um objeto.

Evitar:

```ts
createExpense(
  spaceId,
  description,
  amount,
  date,
  categoryId,
  accountId,
  userId,
  notes
);
```

Preferir:

```ts
createExpense({
  financialSpaceId,
  description,
  amountCents,
  transactionDate,
  categoryId,
  sourceAccountId,
  responsibleUserId,
  notes
});
```

Isso melhora:

* leitura;
* manutenção;
* autocompletar;
* evolução do contrato.

---

# 10. Retornos previsíveis

Funções deverão evitar retornar tipos incompatíveis sem estrutura clara.

Evitar:

```ts
return transaction;
return false;
return "error";
```

Preferir:

```ts
type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: AppError;
    };
```

---

# 11. TypeScript

## 11.1 Uso obrigatório

Todo novo código da aplicação deverá utilizar TypeScript.

## 11.2 Evitar `any`

Não utilizar `any` sem justificativa clara.

Evitar:

```ts
function mapData(data: any) {}
```

Preferir:

```ts
function mapTransactionRow(
  row: FinancialTransactionRow
): FinancialTransaction {}
```

Quando o formato for desconhecido, utilizar:

```ts
unknown
```

e validar antes do uso.

## 11.3 Tipos externos

Dados recebidos de:

* Supabase;
* API;
* OpenAI;
* armazenamento local;
* parâmetros de rota;

não deverão ser considerados válidos automaticamente.

Eles deverão ser:

* tipados;
* validados;
* convertidos;
* normalizados.

## 11.4 Tipos literais

Utilizar tipos literais para valores restritos.

```ts
type TransactionStatus =
  | "pending"
  | "confirmed"
  | "cancelled";
```

Evitar:

```ts
status: string;
```

quando os valores possíveis forem conhecidos.

---

# 12. `type` e `interface`

O projeto poderá utilizar ambos.

Recomendação inicial:

## `type`

Para:

* unions;
* aliases;
* composição;
* contratos simples;
* estados.

```ts
type TransactionStatus =
  | "pending"
  | "confirmed"
  | "cancelled";
```

## `interface`

Para contratos que poderão ser implementados ou estendidos.

```ts
interface TransactionRepository {
  create(
    input: CreateTransactionInput
  ): Promise<Result<FinancialTransaction>>;
}
```

A escolha deverá permanecer consistente em contextos semelhantes.

---

# 13. Valores opcionais

Campos opcionais deverão ser tratados explicitamente.

Exemplo:

```ts
type FinancialAccount = {
  ownerUserId: string | null;
};
```

Preferir `null` quando o banco utilizar `null`.

Evitar misturar indiscriminadamente:

```text
undefined
null
string vazia
```

para representar a mesma ausência.

---

# 14. Valores monetários

Valores monetários serão representados em centavos.

Exemplo:

```ts
const amountCents = 18642;
```

Não utilizar:

```ts
const amount = 186.42;
```

para cálculos financeiros centrais.

## 14.1 Nomes

Campos financeiros deverão indicar a unidade.

```ts
amountCents
initialBalanceCents
totalBalanceCents
discountCents
```

## 14.2 Formatação

A formatação deverá ser centralizada.

```ts
formatCurrency(18642);
```

Resultado:

```text
R$ 186,42
```

## 14.3 Conversão

A conversão entre texto e centavos deverá ficar em funções específicas.

Exemplos:

```ts
parseCurrencyInput();
formatCurrencyInput();
formatCurrency();
```

---

# 15. Datas

Datas deverão utilizar formatos previsíveis.

## 15.1 Datas financeiras

```text
YYYY-MM-DD
```

Exemplo:

```ts
const transactionDate = "2026-07-15";
```

## 15.2 Datas com horário

Utilizar ISO 8601.

Exemplo:

```text
2026-07-15T18:30:00.000Z
```

## 15.3 Exibição

A conversão para o formato brasileiro deverá ficar em função específica.

```ts
formatDate("2026-07-15");
```

Resultado:

```text
15/07/2026
```

## 15.4 Regra

Não espalhar manipulação manual de datas pelas telas.

---

# 16. Componentes React

## 16.1 Responsabilidade

Componentes deverão focar na interface.

Eles poderão:

* receber propriedades;
* exibir dados;
* emitir eventos;
* controlar estado visual;
* chamar hooks.

Eles não deverão:

* implementar regra financeira crítica;
* consultar várias tabelas diretamente;
* armazenar segredo;
* decidir autorização definitiva;
* calcular saldos complexos.

## 16.2 Estrutura sugerida

```tsx
type TransactionCardProps = {
  transaction: FinancialTransaction;
  onPress: () => void;
};

export function TransactionCard({
  transaction,
  onPress
}: TransactionCardProps) {
  return (
    // Estrutura visual do componente.
  );
}
```

## 16.3 Propriedades

As propriedades deverão possuir tipos explícitos.

Evitar:

```tsx
export function Card(props: any) {}
```

---

# 17. Componentes de tela

Telas deverão:

* organizar componentes;
* chamar hooks;
* exibir estados;
* coordenar navegação;
* apresentar mensagens.

Exemplo conceitual:

```tsx
export function TransactionsScreen() {
  const {
    transactions,
    isLoading,
    error,
    reload
  } = useTransactions();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ErrorState
        message={error.message}
        onRetry={reload}
      />
    );
  }

  return (
    <TransactionList
      transactions={transactions}
    />
  );
}
```

---

# 18. Estado visual

Estados visuais poderão permanecer no componente.

Exemplos:

```ts
const [isFilterModalOpen, setIsFilterModalOpen] =
  useState(false);

const [searchText, setSearchText] =
  useState("");
```

Dados financeiros remotos não deverão ser copiados sem necessidade para múltiplos estados locais.

---

# 19. Hooks personalizados

Hooks personalizados deverão começar com `use`.

Exemplos:

```ts
useAuth();
useTransactions();
useAccountBalance();
useActiveFinancialSpace();
```

Um hook deverá possuir responsabilidade clara.

Evitar hooks gigantes que controlem:

* autenticação;
* contas;
* movimentações;
* navegação;
* notificações;

ao mesmo tempo.

---

# 20. Contextos

Contextos deverão ser utilizados apenas para estados realmente globais.

Contextos iniciais possíveis:

```text
AuthContext
ActiveFinancialSpaceContext
ThemeContext
```

Evitar um contexto global com todos os dados financeiros.

Problemas de contextos excessivos:

* renderizações desnecessárias;
* alto acoplamento;
* manutenção difícil;
* testes mais complexos.

---

# 21. Casos de uso

Casos de uso deverão representar ações completas.

Exemplos:

```text
CreateExpense
CreateTransfer
CancelTransaction
CreateFinancialSpace
AcceptInvitation
```

## 21.1 Responsabilidade

Um caso de uso deverá:

1. receber entrada tipada;
2. validar a operação;
3. aplicar regras de domínio;
4. chamar repositórios;
5. retornar resultado previsível.

## 21.2 Nomenclatura

Exemplos:

```text
createExpense.ts
createTransfer.ts
cancelTransaction.ts
```

ou:

```text
CreateExpense.ts
CreateTransfer.ts
```

A convenção escolhida deverá ser mantida.

---

# 22. Domínio

O domínio deverá conter código independente da interface e do Supabase.

Exemplos:

* entidades;
* regras;
* validadores;
* erros;
* cálculos;
* políticas financeiras.

O domínio não deverá importar:

```text
react
react-native
expo-router
supabase-js
```

quando não houver necessidade inevitável.

---

# 23. Funções puras

Regras financeiras deverão ser implementadas, sempre que possível, como funções puras.

Exemplo:

```ts
function calculateFinancialResult(
  incomeCents: number,
  expenseCents: number
): number {
  return incomeCents - expenseCents;
}
```

Uma função pura:

* não altera variáveis externas;
* não acessa banco;
* não depende de interface;
* retorna o mesmo resultado para a mesma entrada;
* é simples de testar.

---

# 24. Repositórios

Repositórios deverão definir contratos claros.

Exemplo:

```ts
interface AccountRepository {
  listByFinancialSpace(
    financialSpaceId: string
  ): Promise<Result<FinancialAccount[]>>;

  create(
    input: CreateFinancialAccountInput
  ): Promise<Result<FinancialAccount>>;
}
```

Implementação:

```text
SupabaseAccountRepository
```

Isso permitirá substituir ou simular o acesso aos dados em testes.

---

# 25. Chamadas ao Supabase

Chamadas ao Supabase deverão permanecer em:

* repositórios;
* serviços;
* infraestrutura;
* funções específicas de backend.

Evitar chamadas diretas em:

* componentes;
* telas;
* componentes compartilhados;
* formatadores;
* entidades.

---

# 26. Mapeadores

Dados do banco deverão ser convertidos para o domínio.

Exemplo:

```ts
export function mapAccountRowToDomain(
  row: FinancialAccountRow
): FinancialAccount {
  return {
    id: row.id,
    financialSpaceId: row.financial_space_id,
    name: row.name,
    accountType: row.account_type,
    ownerUserId: row.owner_user_id,
    initialBalanceCents:
      row.initial_balance_cents,
    currencyCode: row.currency_code,
    isActive: row.is_active,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
```

Os nomes do banco não deverão se espalhar pela interface.

---

# 27. Tratamento de erros

Erros deverão ser padronizados.

```ts
type AppError = {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
};
```

## 27.1 Mensagens

Mensagens para o usuário deverão ser:

* claras;
* curtas;
* acionáveis;
* sem jargão técnico.

Evitar:

```text
PostgrestError PGRST116
```

Preferir:

```text
Não foi possível carregar a movimentação.
```

## 27.2 Logs

Detalhes técnicos poderão ser registrados em desenvolvimento.

Não registrar:

* senhas;
* tokens;
* chaves;
* dados financeiros completos;
* imagens privadas.

---

# 28. `try/catch`

Utilizar `try/catch` quando houver possibilidade real de exceção.

Evitar envolver toda função com `try/catch` sem tratamento útil.

Exemplo:

```ts
try {
  return await transactionRepository.create(input);
} catch (error: unknown) {
  return {
    success: false,
    error: mapUnexpectedError(error)
  };
}
```

O erro deverá ser transformado em estrutura conhecida.

---

# 29. Validação

Validações deverão existir em camadas apropriadas.

## 29.1 Interface

* campos obrigatórios;
* formato;
* feedback imediato.

## 29.2 Domínio

* regras financeiras;
* consistência;
* compatibilidade.

## 29.3 Banco

* integridade;
* restrições;
* autorização;
* transações.

A validação visual não substitui as demais.

---

# 30. Comentários

## 30.1 Quando comentar

Comentários serão recomendados para explicar:

* motivo de uma decisão;
* regra de negócio não evidente;
* cuidado de segurança;
* comportamento temporário;
* limitação externa;
* integração complexa;
* solução que poderia parecer incorreta sem contexto.

Exemplo:

```ts
// Transferências internas não entram no cálculo de receitas ou despesas.
```

## 30.2 Quando não comentar

Não repetir o código.

Evitar:

```ts
// Define loading como true.
setIsLoading(true);
```

## 30.3 Comentários temporários

Comentários do tipo:

```text
TODO
FIXME
```

deverão possuir contexto.

Exemplo:

```ts
// TODO: adicionar histórico de edição quando a tabela de auditoria for criada.
```

Evitar:

```ts
// TODO: corrigir depois.
```

---

# 31. Documentação de funções

Funções públicas, contratos e regras importantes poderão utilizar comentários JSDoc.

Exemplo:

```ts
/**
 * Calculates the confirmed balance of an account.
 * Pending and cancelled transactions are ignored.
 */
export function calculateConfirmedBalance() {}
```

JSDoc não deverá ser usado para repetir assinaturas evidentes em toda função simples.

---

# 32. Imports

Imports deverão seguir uma ordem consistente.

Exemplo:

```ts
import { useState } from "react";
import { View } from "react-native";

import { useRouter } from "expo-router";

import { Button } from "@/shared/components/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

import type { FinancialTransaction } from "@/domain/entities/FinancialTransaction";
```

Ordem sugerida:

1. bibliotecas da linguagem ou framework;
2. bibliotecas externas;
3. módulos internos;
4. tipos;
5. estilos ou arquivos locais.

A ferramenta de lint poderá automatizar esse padrão.

---

# 33. Aliases de importação

O projeto deverá utilizar alias para evitar caminhos longos.

Preferir:

```ts
import { Button } from "@/shared/components/Button";
```

Evitar:

```ts
import { Button } from "../../../../shared/components/Button";
```

O alias deverá ser configurado no TypeScript e nas ferramentas relacionadas.

---

# 34. Exports

Preferir exports nomeados.

```ts
export function TransactionCard() {}
```

Em vez de:

```ts
export default function TransactionCard() {}
```

Exports nomeados facilitam:

* refatoração;
* pesquisa;
* autocompletar;
* importação consistente.

Arquivos exigidos por frameworks poderão usar exportação padrão quando necessário.

---

# 35. Arquivos de índice

Arquivos `index.ts` poderão ser usados com cautela.

Exemplo:

```ts
export { Button } from "./Button";
export { Input } from "./Input";
```

Evitar estruturas de exportação que criem:

* dependências circulares;
* importações obscuras;
* carregamento excessivo;
* dificuldade de localizar a origem.

---

# 36. Estilos

A estratégia de estilos será definida durante a Fase 1.

Independentemente da ferramenta escolhida:

* evitar valores repetidos;
* utilizar tokens;
* centralizar espaçamentos;
* centralizar tipografia;
* centralizar cores semânticas;
* evitar cores soltas nos componentes.

Exemplo conceitual:

```ts
theme.colors.income;
theme.colors.expense;
theme.spacing.medium;
theme.typography.title;
```

---

# 37. Acessibilidade

Componentes interativos deverão considerar:

* rótulos;
* papéis;
* área de toque;
* contraste;
* leitores de tela;
* estados desabilitados.

Exemplo:

```tsx
<Button
  accessibilityLabel="Salvar despesa"
  title="Salvar despesa"
/>
```

A implementação exata dependerá do componente compartilhado.

---

# 38. Formulários

Formulários deverão:

* possuir rótulos visíveis;
* mostrar erros por campo;
* evitar submissão duplicada;
* preservar dados quando possível;
* tratar carregamento;
* validar antes de enviar.

## 38.1 Estado de envio

```ts
const [isSubmitting, setIsSubmitting] =
  useState(false);
```

Durante o envio:

* botão desabilitado;
* texto de carregamento;
* nova submissão bloqueada.

---

# 39. Estado remoto

Dados remotos deverão ser obtidos por uma estratégia padronizada.

Exemplos:

* hooks de consulta;
* camada de cache;
* repositórios;
* invalidação após mutações.

Ao criar uma despesa, deverão ser atualizados:

* movimentações;
* saldo da conta;
* painel;
* gastos por categoria.

A atualização não deverá depender de reiniciar o aplicativo.

---

# 40. Operações otimistas

Operações financeiras críticas deverão aguardar confirmação do servidor.

Não apresentar sucesso definitivo antes da resposta em:

* transferências;
* cancelamentos;
* confirmações;
* ajustes;
* convites;
* alterações de papel.

Operações visuais simples poderão utilizar atualização otimista quando seguro.

---

# 41. Segurança

Nunca incluir no código público:

* senha;
* chave da OpenAI;
* chave `service_role`;
* token;
* credencial bancária;
* dado financeiro real;
* imagem privada.

## 41.1 Variáveis públicas

Poderão ser utilizadas no aplicativo:

```text
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
```

## 41.2 Variáveis secretas

Somente no backend:

```text
OPENAI_API_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

# 42. Arquivo `.env.example`

O repositório deverá possuir um modelo sem valores reais.

Exemplo:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

O arquivo real `.env` deverá permanecer ignorado.

---

# 43. Dependências

Antes de instalar uma biblioteca, verificar:

* problema que resolve;
* compatibilidade com Expo;
* manutenção;
* documentação;
* tamanho;
* segurança;
* licença;
* necessidade real.

A instalação deverá ser acompanhada de justificativa quando a dependência afetar a arquitetura.

---

# 44. Atualização de dependências

Dependências não deverão ser atualizadas indiscriminadamente durante a implementação de uma funcionalidade.

Uma atualização relevante deverá:

* possuir branch própria quando necessário;
* ser testada;
* registrar incompatibilidades;
* evitar mistura com alterações de produto.

---

# 45. Testes

## 45.1 Prioridade

Os primeiros testes deverão cobrir:

* valores monetários;
* cálculo de saldo;
* receitas;
* despesas;
* transferências;
* ajustes;
* status;
* períodos;
* painéis;
* permissões críticas.

## 45.2 Estrutura

Os testes poderão permanecer próximos do código.

Exemplo:

```text
calculateAccountBalance.ts
calculateAccountBalance.test.ts
```

Ou em pasta específica quando isso melhorar a organização.

---

# 46. Estrutura de teste

Testes deverão utilizar:

```text
Arrange
Act
Assert
```

Exemplo conceitual:

```ts
describe("calculateAccountBalance", () => {
  it("ignores pending transactions", () => {
    // Arrange
    const initialBalanceCents = 100000;

    // Act
    const balanceCents =
      calculateAccountBalance({
        initialBalanceCents,
        transactions: [
          {
            status: "pending",
            transactionType: "expense",
            amountCents: 20000
          }
        ]
      });

    // Assert
    expect(balanceCents).toBe(100000);
  });
});
```

---

# 47. Nomes de testes

O nome deverá descrever o comportamento esperado.

Preferir:

```text
ignores pending transactions
```

```text
rejects transfers between the same account
```

```text
does not include transfers in expenses
```

Evitar:

```text
test 1
```

```text
works correctly
```

---

# 48. Testes de regressão

Quando um erro for corrigido, deverá ser considerado um teste que reproduza o problema.

Exemplo:

1. reproduzir o erro;
2. escrever teste;
3. corrigir;
4. confirmar que o teste passa;
5. manter o teste para evitar retorno do problema.

---

# 49. Dados de teste

Dados de teste deverão ser fictícios.

Não utilizar:

* extratos reais;
* senhas reais;
* CPF real;
* dados bancários reais;
* recibos privados.

Exemplo:

```ts
const testUser = {
  id: "00000000-0000-0000-0000-000000000001",
  fullName: "Usuário Teste"
};
```

---

# 50. Lint e formatação

O projeto deverá possuir ferramentas para:

* detectar erros comuns;
* padronizar formatação;
* organizar imports;
* impedir padrões problemáticos.

Comandos previstos:

```text
npm run lint
npm run typecheck
npm run test
```

Os nomes exatos poderão ser ajustados no `package.json`.

---

# 51. Typecheck

Antes de concluir uma tarefa, executar:

```bash
npx tsc --noEmit
```

ou o comando equivalente configurado.

Uma tarefa não deverá ser considerada pronta com erros de TypeScript.

---

# 52. Commits

Commits deverão ser pequenos, claros e coerentes.

Formato recomendado:

```text
tipo(escopo): descrição
```

Exemplos:

```text
feat(auth): implementar tela de login
```

```text
fix(accounts): corrigir cálculo de saldo inicial
```

```text
docs(architecture): atualizar regras de transferência
```

```text
test(transactions): cobrir cancelamento de despesa
```

---

# 53. Tipos de commit

Tipos recomendados:

```text
feat
fix
docs
test
refactor
chore
style
perf
build
ci
```

## Exemplos

```text
feat
```

Nova funcionalidade.

```text
fix
```

Correção de erro.

```text
docs
```

Documentação.

```text
test
```

Testes.

```text
refactor
```

Mudança interna sem alterar comportamento esperado.

```text
chore
```

Configuração ou manutenção.

---

# 54. Escopo do commit

O escopo deverá representar a área alterada.

Exemplos:

```text
auth
accounts
transactions
dashboard
docs
supabase
navigation
```

Evitar escopos vagos:

```text
app
changes
update
```

quando houver área mais específica.

---

# 55. Branches

A branch principal será:

```text
main
```

Branches de trabalho poderão seguir:

```text
feat/nome-da-funcionalidade
fix/nome-do-problema
docs/nome-do-documento
refactor/nome-da-area
```

Exemplos:

```text
feat/auth-login
feat/financial-accounts
fix/transaction-balance
docs/code-standards
```

---

# 56. Pull requests

Alterações maiores realizadas pelo Codex deverão, preferencialmente, utilizar pull request.

A descrição deverá incluir:

* objetivo;
* arquivos alterados;
* decisões aplicadas;
* testes realizados;
* riscos;
* pontos para revisão;
* capturas de tela quando relevante.

---

# 57. Revisão de código

Toda revisão deverá verificar:

* requisito atendido;
* tipagem;
* regras financeiras;
* segurança;
* tratamento de erros;
* clareza;
* testes;
* dependências;
* documentação;
* funcionamento no Android.

---

# 58. Checklist de revisão

```text
[ ] O código atende ao requisito?
[ ] A alteração respeita a arquitetura?
[ ] A regra financeira está fora da tela?
[ ] Os tipos estão corretos?
[ ] Existem erros de TypeScript?
[ ] Os erros são tratados?
[ ] A segurança foi considerada?
[ ] Existem segredos no código?
[ ] A funcionalidade foi testada?
[ ] A documentação precisa ser atualizada?
[ ] O código está compreensível?
[ ] O aplicativo funciona no Android?
```

---

# 59. Definição de pronto

Uma tarefa será considerada pronta quando:

1. o objetivo estiver implementado;
2. o código estiver formatado;
3. não houver erros de TypeScript;
4. os testes aplicáveis passarem;
5. o fluxo funcionar no Android;
6. os erros forem tratados;
7. a segurança estiver preservada;
8. a documentação estiver coerente;
9. o commit estiver criado;
10. o responsável compreender a implementação.

---

# 60. Regras para o Codex

Toda tarefa atribuída ao Codex deverá ser limitada e específica.

## 60.1 A tarefa deverá informar

* objetivo;
* arquivos envolvidos;
* documentação relevante;
* escopo permitido;
* escopo proibido;
* critérios de conclusão;
* testes esperados.

## 60.2 Exemplo adequado

```text
Implemente o componente CurrencyInput conforme
docs/05-interface.md e docs/10-padroes-de-codigo.md.

Requisitos:
- trabalhar internamente com centavos;
- exibir moeda no padrão pt-BR;
- utilizar TypeScript;
- receber valueCents e onChangeValueCents;
- adicionar testes de conversão;
- não instalar bibliotecas;
- não alterar outras telas.
```

## 60.3 Exemplo inadequado

```text
Crie o sistema financeiro.
```

---

# 61. Limites para alterações do Codex

O Codex não deverá, sem solicitação explícita:

* alterar arquitetura;
* trocar tecnologias;
* instalar bibliotecas;
* editar vários módulos;
* modificar banco;
* remover testes;
* excluir documentação;
* alterar regras de negócio;
* renomear entidades;
* incluir segredos;
* fazer refatoração ampla.

---

# 62. Resposta esperada do Codex

Ao concluir uma tarefa, o Codex deverá informar:

* o que foi alterado;
* quais arquivos foram modificados;
* quais testes foram executados;
* quais decisões foram tomadas;
* quais limitações permanecem;
* se houve alteração de dependência;
* como testar manualmente.

---

# 63. AGENTS.md

O arquivo `AGENTS.md` deverá resumir instruções essenciais para agentes de código.

Ele poderá incluir:

* documentos obrigatórios;
* arquitetura;
* padrões;
* comandos de teste;
* limites;
* regras de segurança;
* idioma do código;
* critérios de pronto.

O conteúdo deverá permanecer curto o suficiente para consulta frequente.

---

# 64. CLAUDE.md e outros arquivos de agentes

Caso existam arquivos específicos para outras ferramentas, eles deverão:

* apontar para a documentação oficial do projeto;
* evitar repetir documentos inteiros;
* manter instruções consistentes;
* não criar regras conflitantes;
* não conter segredos.

---

# 65. Código gerado por IA

Código gerado por IA deverá receber o mesmo nível de revisão do código escrito manualmente.

A origem do código não altera os critérios de qualidade.

Todo código deverá ser:

* compreendido;
* testado;
* revisado;
* integrado conscientemente.

---

# 66. Refatoração

Uma refatoração deverá:

* preservar comportamento;
* possuir objetivo claro;
* evitar mistura com funcionalidade nova;
* manter ou aumentar testes;
* reduzir complexidade real.

Não refatorar apenas para alterar preferências estéticas sem benefício.

---

# 67. Duplicação

Duplicação pequena poderá ser aceita temporariamente quando uma abstração ainda não estiver clara.

Entretanto, regras críticas não deverão ser duplicadas.

Exemplo proibido:

* cálculo de saldo diferente em duas telas.

Antes de criar abstração, verificar se os trechos realmente representam o mesmo conceito.

---

# 68. Abstrações

Criar abstração quando:

* existir repetição real;
* houver conceito de domínio;
* reduzir acoplamento;
* facilitar testes;
* tornar a intenção mais clara.

Evitar abstração quando:

* existir apenas uma utilização;
* aumentar o número de arquivos sem benefício;
* esconder lógica simples;
* tornar o projeto difícil de aprender.

---

# 69. Desempenho

O desempenho deverá ser observado, mas otimizações prematuras serão evitadas.

Otimizar quando existir:

* problema medido;
* lista grande;
* consulta lenta;
* renderização desnecessária;
* consumo excessivo.

Não introduzir cache, memoização ou bibliotecas complexas sem necessidade comprovada.

---

# 70. Logs de desenvolvimento

Durante o desenvolvimento, poderão existir logs.

Exemplo:

```ts
console.error("Failed to load transactions", error);
```

Antes de produção, os logs deverão ser revisados.

Nunca registrar:

* senha;
* token;
* chave;
* recibo completo;
* dados bancários;
* informações pessoais desnecessárias.

---

# 71. Feature flags futuras

Funcionalidades incompletas não deverão aparecer para usuários reais.

Quando necessário, poderão ser utilizadas flags.

Exemplo conceitual:

```ts
const features = {
  receiptScanning: false,
  financialAssistant: false
};
```

A solução definitiva será escolhida apenas quando houver necessidade.

---

# 72. Código morto

Código não utilizado deverá ser removido.

Evitar manter:

* componentes antigos;
* funções comentadas;
* imports não utilizados;
* telas abandonadas;
* testes obsoletos.

O histórico continuará disponível no Git.

---

# 73. Comentários com código antigo

Não utilizar:

```ts
// const oldValue = calculateOldBalance();
```

Código antigo deverá ser removido.

O Git já preserva versões anteriores.

---

# 74. Documentação de decisões

Quando uma implementação exigir mudança arquitetural, deverá ser criado ou atualizado um ADR.

Exemplos:

* adoção de biblioteca de formulários;
* estratégia offline;
* nova forma de armazenar saldos;
* troca de backend;
* política de retenção de imagens.

---

# 75. Atualização dos documentos

Uma alteração deverá atualizar a documentação quando mudar:

* regra de negócio;
* modelo de dados;
* contrato de API;
* fluxo de interface;
* arquitetura;
* roadmap;
* segurança;
* padrão de código.

A documentação não deverá permanecer contraditória com o sistema.

---

# 76. Comandos previstos

O projeto deverá convergir para comandos como:

```bash
npm run start
npm run android
npm run lint
npm run typecheck
npm run test
npm run test:watch
```

Os comandos disponíveis deverão ser documentados no `README.md`.

---

# 77. Ordem de verificação antes do commit

Antes de criar um commit:

1. salvar arquivos;
2. revisar alterações;
3. executar lint;
4. executar typecheck;
5. executar testes aplicáveis;
6. testar no Android quando necessário;
7. verificar `git status`;
8. confirmar ausência de segredos;
9. criar commit descritivo;
10. enviar ao GitHub.

---

# 78. Segurança antes do push

Executar verificação visual por:

```bash
git diff --cached
```

Verificar principalmente:

* `.env`;
* chaves;
* tokens;
* URLs privadas;
* dados pessoais;
* arquivos de teste reais;
* imagens de recibos;
* logs.

---

# 79. Revisão de dependências antes do push

Ao alterar `package.json`, confirmar:

* biblioteca necessária;
* versão compatível;
* `package-lock.json` atualizado;
* aplicativo funcionando;
* documentação atualizada quando relevante.

---

# 80. Resumo dos padrões

O Nexus Finance utilizará:

* TypeScript;
* código em inglês;
* interface em português;
* `camelCase` para variáveis e funções;
* `PascalCase` para componentes e tipos;
* `snake_case` no banco;
* valores monetários em centavos;
* funções pequenas;
* regras financeiras no domínio;
* repositórios para acesso aos dados;
* erros padronizados;
* testes para regras críticas;
* comentários apenas quando agregarem contexto;
* commits convencionais;
* branches específicas;
* revisão obrigatória de código gerado por IA;
* documentação atualizada.

---

# 81. Conclusão

Os padrões deste documento existem para garantir que o Nexus Finance permaneça compreensível e confiável enquanto cresce.

O objetivo não é criar burocracia.

O objetivo é evitar:

* regras duplicadas;
* erros financeiros;
* código difícil de entender;
* segredos expostos;
* dependências desnecessárias;
* alterações sem controle;
* perda de conhecimento sobre o projeto.

Todo padrão poderá ser revisado quando houver motivo técnico claro e decisão documentada.
