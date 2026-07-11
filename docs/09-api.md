# Nexus Finance — API e Contratos de Integração

## 1. Objetivo deste documento

Este documento define os contratos de comunicação entre:

* aplicativo Android;
* Supabase;
* banco PostgreSQL;
* funções seguras de backend;
* serviços externos;
* futura integração com a OpenAI.

Seu objetivo é estabelecer:

* quais operações poderão ser realizadas diretamente pelo aplicativo;
* quais operações exigirão backend seguro;
* como as requisições deverão ser estruturadas;
* como as respostas deverão ser padronizadas;
* como erros serão representados;
* como autenticação e autorização serão aplicadas;
* como evitar acoplamento excessivo ao Supabase;
* como preparar a futura versão web.

Este documento não representa uma API pública comercial.

Ele descreve a API interna e os contratos da aplicação.

---

# 2. Princípios da API

A API do Nexus Finance deverá seguir estes princípios:

1. autenticação obrigatória para dados privados;
2. autorização baseada em Espaços Financeiros;
3. contratos previsíveis;
4. respostas tipadas;
5. validação de entrada;
6. mensagens de erro compreensíveis;
7. ausência de segredos no aplicativo;
8. operações críticas executadas no backend;
9. idempotência quando necessária;
10. versionamento de contratos;
11. separação entre banco e domínio;
12. registros financeiros auditáveis;
13. nenhuma alteração de saldo sem movimentação;
14. nenhuma resposta da IA utilizada sem validação;
15. compatibilidade futura com aplicação web.

---

# 3. Visão geral da comunicação

A arquitetura inicial terá dois caminhos principais.

## 3.1 Operações comuns

```text
Aplicativo
   ↓
Repositório
   ↓
Cliente Supabase
   ↓
PostgreSQL com RLS
```

Exemplos:

* listar contas;
* listar categorias;
* listar movimentações;
* consultar perfil;
* atualizar dados simples autorizados.

## 3.2 Operações sensíveis

```text
Aplicativo
   ↓
Função segura de backend
   ↓
Validação
   ↓
Banco ou serviço externo
```

Exemplos:

* criar transferência;
* aceitar convite;
* processar recibo;
* chamar OpenAI;
* executar operações administrativas;
* realizar tarefas com chave secreta;
* criar registros que exijam transação atômica.

---

# 4. API interna e repositórios

O aplicativo não deverá depender diretamente da estrutura completa do Supabase em todas as telas.

A comunicação deverá ocorrer por repositórios.

Exemplo:

```ts
accountRepository.listByFinancialSpace(financialSpaceId);
```

Em vez de:

```ts
supabase
  .from("financial_accounts")
  .select("*")
  .eq("financial_space_id", financialSpaceId);
```

espalhado por componentes e telas.

---

# 5. Responsabilidades dos repositórios

Os repositórios deverão:

* conhecer tabelas e consultas;
* converter dados do banco;
* tratar erros técnicos;
* retornar dados tipados;
* esconder detalhes de infraestrutura;
* aplicar filtros obrigatórios;
* impedir duplicação de consultas;
* facilitar testes.

Os repositórios não deverão:

* controlar navegação;
* exibir mensagens;
* armazenar estado visual;
* executar regras de interface;
* decidir sozinho permissões críticas.

---

# 6. Repositórios previstos

```text
AuthRepository
ProfileRepository
FinancialSpaceRepository
MemberRepository
AccountRepository
CategoryRepository
TransactionRepository
InvitationRepository
DashboardRepository
ReceiptRepository
AIRepository
```

Os últimos dois serão implementados apenas em versões futuras.

---

# 7. Convenções de nomes

## 7.1 Banco de dados

```text
snake_case
```

Exemplo:

```text
financial_space_id
created_at
amount_cents
```

## 7.2 TypeScript

```text
camelCase
```

Exemplo:

```text
financialSpaceId
createdAt
amountCents
```

## 7.3 Tipos e componentes

```text
PascalCase
```

Exemplo:

```text
FinancialTransaction
AccountRepository
CreateTransferInput
```

## 7.4 Funções

As funções deverão começar com verbo.

Exemplos:

```text
createAccount
listTransactions
cancelTransaction
calculateDashboard
acceptInvitation
```

---

# 8. Estrutura padrão de resposta

Operações internas deverão retornar estruturas previsíveis.

Exemplo conceitual:

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

Exemplo de sucesso:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Nubank Will"
  }
}
```

Exemplo de erro:

```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_NOT_FOUND",
    "message": "A conta informada não foi encontrada."
  }
}
```

---

# 9. Estrutura de erro

O erro da aplicação deverá possuir, quando aplicável:

```ts
type AppError = {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
};
```

## 9.1 Campos

### `code`

Identificador técnico estável.

### `message`

Mensagem adequada para apresentação ou tradução.

### `field`

Campo do formulário relacionado ao erro.

### `details`

Informações adicionais que não contenham dados sensíveis.

---

# 10. Categorias de erro

## 10.1 Validação

```text
VALIDATION_ERROR
INVALID_EMAIL
INVALID_AMOUNT
INVALID_DATE
```

## 10.2 Autenticação

```text
AUTH_REQUIRED
INVALID_CREDENTIALS
SESSION_EXPIRED
EMAIL_NOT_CONFIRMED
```

## 10.3 Autorização

```text
FORBIDDEN
NOT_FINANCIAL_SPACE_MEMBER
ADMIN_ROLE_REQUIRED
```

## 10.4 Entidade não encontrada

```text
PROFILE_NOT_FOUND
ACCOUNT_NOT_FOUND
CATEGORY_NOT_FOUND
TRANSACTION_NOT_FOUND
```

## 10.5 Regra de negócio

```text
SAME_TRANSFER_ACCOUNT
INACTIVE_ACCOUNT
INVALID_CATEGORY_TYPE
LAST_ADMIN_REQUIRED
```

## 10.6 Conflito

```text
DUPLICATE_INVITATION
MEMBER_ALREADY_EXISTS
DUPLICATE_REQUEST
```

## 10.7 Infraestrutura

```text
NETWORK_ERROR
DATABASE_ERROR
SERVICE_UNAVAILABLE
UNEXPECTED_ERROR
```

---

# 11. Mensagens técnicas e mensagens para o usuário

Erros técnicos não deverão ser exibidos diretamente.

Exemplo técnico:

```text
duplicate key value violates unique constraint
```

Mensagem apresentada:

```text
Já existe um convite pendente para este e-mail.
```

O mapeamento deverá ser centralizado.

---

# 12. Autenticação

A autenticação será gerenciada pelo Supabase Auth.

## 12.1 Operações previstas

```text
signUp
signIn
signOut
resetPassword
getSession
refreshSession
updatePassword
```

## 12.2 Sessão

O aplicativo deverá:

* restaurar a sessão ao abrir;
* renovar quando necessário;
* reagir ao encerramento;
* proteger rotas privadas;
* limpar estados privados após logout.

---

# 13. Autorização por Espaço Financeiro

Toda operação financeira deverá considerar:

* usuário autenticado;
* Espaço Financeiro;
* vínculo do membro;
* status do vínculo;
* papel;
* entidade acessada;
* ação solicitada.

Exemplo conceitual:

```text
Usuário autenticado
+ membro ativo
+ espaço correto
+ papel autorizado
= operação permitida
```

---

# 14. Identificação do Espaço Financeiro

Operações relacionadas ao espaço deverão receber explicitamente:

```text
financialSpaceId
```

Exemplo:

```ts
listAccounts(financialSpaceId);
```

O backend deverá validar o vínculo.

O aplicativo não deverá confiar apenas no espaço salvo localmente.

---

# 15. Contrato de perfil

## 15.1 Tipo

```ts
type Profile = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
```

## 15.2 Operações

```text
getCurrentProfile
updateCurrentProfile
```

## 15.3 Atualização

Entrada:

```ts
type UpdateProfileInput = {
  fullName: string;
  avatarUrl?: string | null;
};
```

---

# 16. Contrato de Espaço Financeiro

## 16.1 Tipo

```ts
type FinancialSpace = {
  id: string;
  name: string;
  spaceType: FinancialSpaceType;
  currencyCode: "BRL";
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
```

## 16.2 Tipo do espaço

```ts
type FinancialSpaceType =
  | "personal"
  | "family"
  | "business"
  | "project"
  | "other";
```

## 16.3 Criação

Entrada:

```ts
type CreateFinancialSpaceInput = {
  name: string;
  spaceType: FinancialSpaceType;
};
```

Resposta:

```ts
type CreateFinancialSpaceResponse = {
  financialSpace: FinancialSpace;
  membership: FinancialSpaceMember;
};
```

## 16.4 Operações

```text
createFinancialSpace
listUserFinancialSpaces
getFinancialSpace
updateFinancialSpace
deactivateFinancialSpace
reactivateFinancialSpace
```

---

# 17. Contrato de membro

## 17.1 Tipo

```ts
type FinancialSpaceMember = {
  id: string;
  financialSpaceId: string;
  userId: string;
  role: MemberRole;
  membershipStatus: MembershipStatus;
  invitedBy: string | null;
  joinedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
```

## 17.2 Papéis

```ts
type MemberRole = "admin" | "member";
```

## 17.3 Estados

```ts
type MembershipStatus =
  | "invited"
  | "active"
  | "declined"
  | "removed";
```

## 17.4 Operações

```text
listFinancialSpaceMembers
updateMemberRole
removeMember
getCurrentMembership
```

---

# 18. Contrato de convite

## 18.1 Tipo

```ts
type FinancialSpaceInvitation = {
  id: string;
  financialSpaceId: string;
  email: string;
  role: MemberRole;
  status: InvitationStatus;
  invitedBy: string;
  expiresAt: string | null;
  acceptedBy: string | null;
  acceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
```

## 18.2 Status

```ts
type InvitationStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "expired"
  | "cancelled";
```

## 18.3 Criação

```ts
type CreateInvitationInput = {
  financialSpaceId: string;
  email: string;
  role: MemberRole;
};
```

## 18.4 Operações

```text
createInvitation
listPendingInvitations
acceptInvitation
declineInvitation
cancelInvitation
```

## 18.5 Backend obrigatório

Aceitar convite deverá ser realizado por função segura.

Motivos:

* validar identidade;
* verificar e-mail;
* atualizar convite;
* criar vínculo;
* impedir operação parcial;
* evitar duplicidade.

---

# 19. Contrato de conta financeira

## 19.1 Tipo

```ts
type FinancialAccount = {
  id: string;
  financialSpaceId: string;
  name: string;
  accountType: FinancialAccountType;
  ownerUserId: string | null;
  initialBalanceCents: number;
  currencyCode: "BRL";
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
```

## 19.2 Tipos

```ts
type FinancialAccountType =
  | "checking"
  | "savings"
  | "cash"
  | "digital_wallet"
  | "investment"
  | "other";
```

## 19.3 Criação

```ts
type CreateFinancialAccountInput = {
  financialSpaceId: string;
  name: string;
  accountType: FinancialAccountType;
  ownerUserId?: string | null;
  initialBalanceCents: number;
};
```

## 19.4 Atualização

```ts
type UpdateFinancialAccountInput = {
  name?: string;
  accountType?: FinancialAccountType;
  ownerUserId?: string | null;
  isActive?: boolean;
};
```

O saldo inicial somente poderá ser alterado dentro das regras definidas.

## 19.5 Operações

```text
createAccount
listAccounts
getAccount
updateAccount
deactivateAccount
reactivateAccount
getAccountBalance
```

---

# 20. Contrato de saldo de conta

```ts
type AccountBalance = {
  accountId: string;
  initialBalanceCents: number;
  confirmedBalanceCents: number;
  calculatedAt: string;
};
```

O saldo deverá ser retornado por consulta centralizada.

A interface não deverá reconstruir o cálculo com listas parciais.

---

# 21. Contrato de categoria

## 21.1 Tipo

```ts
type Category = {
  id: string;
  financialSpaceId: string | null;
  name: string;
  categoryType: CategoryType;
  icon: string | null;
  color: string | null;
  isSystem: boolean;
  isActive: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
};
```

## 21.2 Tipos

```ts
type CategoryType = "income" | "expense" | "both";
```

## 21.3 Criação

```ts
type CreateCategoryInput = {
  financialSpaceId: string;
  name: string;
  categoryType: CategoryType;
  icon?: string | null;
  color?: string | null;
};
```

## 21.4 Operações

```text
listAvailableCategories
createCategory
updateCategory
deactivateCategory
reactivateCategory
```

---

# 22. Contrato de movimentação

## 22.1 Tipo

```ts
type FinancialTransaction = {
  id: string;
  financialSpaceId: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  description: string;
  amountCents: number;
  transactionDate: string;
  categoryId: string | null;
  responsibleUserId: string | null;
  createdBy: string;
  sourceAccountId: string | null;
  destinationAccountId: string | null;
  adjustmentDirection: AdjustmentDirection | null;
  notes: string | null;
  externalReference: string | null;
  confirmedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
};
```

## 22.2 Tipos

```ts
type TransactionType =
  | "income"
  | "expense"
  | "transfer"
  | "balance_adjustment";
```

## 22.3 Status

```ts
type TransactionStatus =
  | "pending"
  | "confirmed"
  | "cancelled";
```

## 22.4 Direção de ajuste

```ts
type AdjustmentDirection =
  | "increase"
  | "decrease";
```

---

# 23. Criação de receita

Entrada:

```ts
type CreateIncomeInput = {
  financialSpaceId: string;
  description: string;
  amountCents: number;
  transactionDate: string;
  categoryId: string;
  responsibleUserId: string;
  destinationAccountId: string;
  notes?: string | null;
  status?: "pending" | "confirmed";
};
```

Saída:

```ts
type CreateIncomeResponse = {
  transaction: FinancialTransaction;
};
```

---

# 24. Criação de despesa

Entrada:

```ts
type CreateExpenseInput = {
  financialSpaceId: string;
  description: string;
  amountCents: number;
  transactionDate: string;
  categoryId: string;
  responsibleUserId: string;
  sourceAccountId: string;
  notes?: string | null;
  status?: "pending" | "confirmed";
};
```

---

# 25. Criação de transferência

Entrada:

```ts
type CreateTransferInput = {
  financialSpaceId: string;
  description: string;
  amountCents: number;
  transactionDate: string;
  responsibleUserId: string;
  sourceAccountId: string;
  destinationAccountId: string;
  notes?: string | null;
  status?: "pending" | "confirmed";
  idempotencyKey?: string;
};
```

## 25.1 Backend obrigatório

A criação de transferência deverá ocorrer por função segura.

Ela deverá validar:

* usuário;
* membro;
* espaço;
* contas;
* origem diferente do destino;
* valor;
* status;
* idempotência;
* operação atômica.

---

# 26. Criação de ajuste

Entrada:

```ts
type CreateBalanceAdjustmentInput = {
  financialSpaceId: string;
  description: string;
  amountCents: number;
  transactionDate: string;
  responsibleUserId: string;
  accountId: string;
  adjustmentDirection: AdjustmentDirection;
  notes: string;
  status?: "pending" | "confirmed";
};
```

---

# 27. Atualização de movimentação

Entrada conceitual:

```ts
type UpdateTransactionInput = {
  transactionId: string;
  description?: string;
  amountCents?: number;
  transactionDate?: string;
  categoryId?: string | null;
  responsibleUserId?: string | null;
  sourceAccountId?: string | null;
  destinationAccountId?: string | null;
  notes?: string | null;
};
```

Mudanças deverão respeitar o tipo original.

Alterações críticas poderão exigir função de backend.

---

# 28. Cancelamento de movimentação

Entrada:

```ts
type CancelTransactionInput = {
  transactionId: string;
  reason?: string;
  idempotencyKey?: string;
};
```

Resposta:

```ts
type CancelTransactionResponse = {
  transaction: FinancialTransaction;
};
```

O cancelamento deverá:

* validar permissão;
* preservar registro;
* atualizar status;
* registrar data;
* remover o efeito dos cálculos.

---

# 29. Confirmação de movimentação pendente

Entrada:

```ts
type ConfirmTransactionInput = {
  transactionId: string;
};
```

A confirmação deverá validar novamente:

* conta;
* categoria;
* valor;
* responsável;
* espaço;
* status atual.

---

# 30. Filtros de movimentações

```ts
type TransactionFilters = {
  financialSpaceId: string;
  startDate?: string;
  endDate?: string;
  transactionType?: TransactionType;
  status?: TransactionStatus;
  accountId?: string;
  categoryId?: string;
  responsibleUserId?: string;
  createdBy?: string;
  search?: string;
};
```

---

# 31. Paginação

Listas extensas deverão utilizar paginação.

Exemplo:

```ts
type PaginationInput = {
  page: number;
  pageSize: number;
};
```

Resposta:

```ts
type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
};
```

Na implementação com Supabase, poderá ser utilizado intervalo ou cursor.

A interface não deverá carregar todo o histórico sem necessidade.

---

# 32. Ordenação

Exemplo:

```ts
type TransactionSort = {
  field: "transactionDate" | "createdAt" | "amountCents";
  direction: "asc" | "desc";
};
```

Padrão:

```text
transactionDate desc
createdAt desc
```

---

# 33. Contrato do painel

## 33.1 Entrada

```ts
type DashboardQuery = {
  financialSpaceId: string;
  startDate: string;
  endDate: string;
  responsibleUserId?: string;
};
```

## 33.2 Resposta

```ts
type DashboardSummary = {
  incomeCents: number;
  expenseCents: number;
  resultCents: number;
  totalBalanceCents: number;
  expensesByCategory: CategorySummary[];
  expensesByMember: MemberSummary[];
  recentTransactions: FinancialTransaction[];
};
```

## 33.3 Categoria

```ts
type CategorySummary = {
  categoryId: string | null;
  categoryName: string;
  amountCents: number;
  percentage: number;
};
```

## 33.4 Membro

```ts
type MemberSummary = {
  userId: string;
  fullName: string;
  incomeCents: number;
  expenseCents: number;
  resultCents: number;
};
```

---

# 34. Operações diretas e operações seguras

## 34.1 Poderão utilizar repositório com Supabase

Quando protegidas por RLS e sem regra transacional complexa:

* listar perfil;
* listar espaços;
* listar contas;
* listar categorias;
* listar movimentações;
* consultar detalhes;
* atualizar perfil;
* criar categoria simples;
* criar conta simples, conforme permissão.

## 34.2 Deverão utilizar função segura

* criar transferência;
* aceitar convite;
* alterar papel;
* remover membro;
* cancelar movimentação crítica;
* confirmar importação por IA;
* processar recibo;
* chamar serviços externos;
* operações com privilégio administrativo;
* operações que alteram múltiplos registros.

---

# 35. Funções RPC previstas

Possíveis funções PostgreSQL:

```text
create_financial_space
create_transfer
cancel_transaction
confirm_pending_transaction
accept_financial_space_invitation
change_member_role
remove_financial_space_member
calculate_account_balance
get_dashboard_summary
```

Cada função deverá:

* validar `auth.uid()`;
* validar o espaço;
* validar permissões;
* executar de forma atômica;
* retornar dados previsíveis;
* lançar erros controláveis.

---

# 36. Edge Functions previstas

Possíveis funções:

```text
process-receipt
create-invitation
send-invitation-email
ai-financial-assistant
export-financial-data
```

A nomenclatura final poderá seguir o padrão:

```text
kebab-case
```

---

# 37. Contrato para processamento de recibo

## 37.1 Requisição

```ts
type ProcessReceiptInput = {
  financialSpaceId: string;
  filePath: string;
  responsibleUserId?: string;
  idempotencyKey: string;
};
```

## 37.2 Resposta inicial

```ts
type ProcessReceiptAcceptedResponse = {
  receiptImportId: string;
  processingStatus: "queued" | "processing";
};
```

## 37.3 Resposta concluída

```ts
type ProcessReceiptResult = {
  receiptImportId: string;
  processingStatus: "completed";
  pendingTransactionId: string;
  extractedData: ReceiptExtraction;
};
```

## 37.4 Falha

```ts
type ProcessReceiptError = {
  receiptImportId: string;
  processingStatus: "failed";
  error: AppError;
};
```

---

# 38. Contrato da extração do recibo

```ts
type ReceiptExtraction = {
  documentType: ReceiptDocumentType;
  merchant: {
    name: string | null;
    taxId: string | null;
  };
  purchaseDate: string | null;
  currencyCode: "BRL" | null;
  subtotalCents: number | null;
  discountCents: number | null;
  taxCents: number | null;
  totalAmountCents: number | null;
  paymentMethod: PaymentMethod;
  items: ReceiptItemExtraction[];
  suggestedTransactionType: "expense" | null;
  suggestedCategoryId: string | null;
  confidence: number;
  warnings: string[];
};
```

---

# 39. Itens extraídos

```ts
type ReceiptItemExtraction = {
  description: string;
  normalizedDescription: string | null;
  quantity: number | null;
  unitPriceCents: number | null;
  totalPriceCents: number | null;
  suggestedCategoryId: string | null;
  confidence: number;
};
```

---

# 40. Métodos de pagamento

```ts
type PaymentMethod =
  | "cash"
  | "pix"
  | "debit_card"
  | "credit_card"
  | "bank_transfer"
  | "voucher"
  | "unknown";
```

---

# 41. Status do processamento

```ts
type ReceiptProcessingStatus =
  | "uploaded"
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "reviewed"
  | "confirmed"
  | "discarded";
```

---

# 42. Consulta de status

```ts
type GetReceiptProcessingStatusInput = {
  receiptImportId: string;
};
```

Resposta:

```ts
type ReceiptProcessingStatusResponse = {
  id: string;
  status: ReceiptProcessingStatus;
  pendingTransactionId: string | null;
  error: AppError | null;
};
```

---

# 43. Assistente financeiro

## 43.1 Requisição

```ts
type FinancialAssistantInput = {
  financialSpaceId: string;
  question: string;
  startDate?: string;
  endDate?: string;
};
```

## 43.2 Resposta

```ts
type FinancialAssistantResponse = {
  answer: string;
  dataSources: string[];
  period: {
    startDate: string | null;
    endDate: string | null;
  };
  warnings: string[];
};
```

O campo `dataSources` poderá conter referências internas como:

```text
dashboard_summary
expenses_by_category
account_balances
```

Não deverá expor consultas SQL.

---

# 44. Ferramentas internas do assistente

Possíveis operações controladas:

```text
get_financial_summary
get_expenses_by_category
get_income_by_category
get_account_balances
get_member_summary
get_transactions_by_period
compare_periods
```

O modelo não deverá construir SQL livre.

---

# 45. Idempotência

Operações críticas deverão aceitar uma chave de idempotência.

Exemplos:

* transferência;
* processamento de recibo;
* envio de convite;
* cancelamento;
* confirmação de movimentação.

## 45.1 Objetivo

Evitar duplicidade quando:

* o usuário toca duas vezes;
* a conexão é interrompida;
* uma requisição é reenviada;
* o aplicativo repete a chamada.

## 45.2 Exemplo

```ts
type IdempotentRequest = {
  idempotencyKey: string;
};
```

O backend deverá retornar o resultado anterior quando a mesma chave representar a mesma operação válida.

---

# 46. Validação dos dados

Toda entrada deverá ser validada antes da persistência.

## 46.1 Aplicativo

Responsável por:

* campos obrigatórios;
* formato;
* experiência do formulário.

## 46.2 Domínio

Responsável por:

* regras financeiras;
* compatibilidade;
* consistência.

## 46.3 Banco ou backend

Responsável por:

* segurança;
* integridade;
* permissões;
* transações;
* restrições.

Nenhuma camada isolada será considerada suficiente.

---

# 47. Conversão entre banco e domínio

Deverão existir mapeadores.

Exemplo:

```ts
function mapTransactionRowToDomain(
  row: FinancialTransactionRow
): FinancialTransaction {
  return {
    id: row.id,
    financialSpaceId: row.financial_space_id,
    transactionType: row.transaction_type,
    status: row.status,
    description: row.description,
    amountCents: row.amount_cents,
    transactionDate: row.transaction_date,
    categoryId: row.category_id,
    responsibleUserId: row.responsible_user_id,
    createdBy: row.created_by,
    sourceAccountId: row.source_account_id,
    destinationAccountId: row.destination_account_id,
    adjustmentDirection: row.adjustment_direction,
    notes: row.notes,
    externalReference: row.external_reference,
    confirmedAt: row.confirmed_at,
    cancelledAt: row.cancelled_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
```

Isso evitará nomes de banco espalhados pela interface.

---

# 48. Tipos gerados pelo Supabase

Os tipos gerados pelo Supabase poderão ser utilizados na infraestrutura.

Entretanto, o domínio poderá possuir tipos próprios.

Exemplo:

```text
Database type
→ mapper
→ domain type
```

Essa separação evita acoplamento excessivo entre banco e interface.

---

# 49. Versionamento da API

A API futura poderá utilizar versão explícita.

Exemplo:

```text
/api/v1/
```

Para Edge Functions, contratos deverão possuir versão documentada.

Exemplo:

```text
receipt-extraction-schema-v1
```

Mudanças incompatíveis deverão criar nova versão ou migração planejada.

---

# 50. Compatibilidade

Sempre que possível, alterações deverão ser retrocompatíveis.

Exemplo seguro:

* adicionar campo opcional.

Exemplo potencialmente incompatível:

* alterar tipo de campo;
* renomear propriedade;
* remover campo;
* mudar significado de status.

Mudanças incompatíveis deverão ser registradas.

---

# 51. Limites e paginação

O backend deverá impor limites.

Exemplos:

```text
pageSize máximo: 100
```

```text
quantidade máxima de itens por recibo: definida por configuração
```

```text
tamanho máximo de imagem: definido antes da IA
```

O aplicativo não deverá controlar sozinho esses limites.

---

# 52. Rate limiting

Funções sensíveis deverão possuir limitação de uso.

Exemplos:

* login;
* recuperação de senha;
* envio de convite;
* processamento de recibo;
* assistente financeiro;
* exportação.

A resposta poderá utilizar erro:

```text
RATE_LIMIT_EXCEEDED
```

Mensagem:

```text
Muitas tentativas foram realizadas. Tente novamente mais tarde.
```

---

# 53. Segurança de arquivos

Arquivos deverão:

* ficar em armazenamento privado;
* possuir caminho associado ao usuário ou espaço;
* utilizar URLs temporárias quando necessário;
* ter tipo e tamanho validados;
* não ser publicamente listáveis;
* ser excluídos conforme política de retenção.

---

# 54. Upload de recibo

Fluxo conceitual:

```text
1. aplicativo solicita caminho autorizado;
2. aplicativo envia o arquivo;
3. backend valida o arquivo;
4. processamento é iniciado;
5. resultado fica associado ao upload.
```

O aplicativo não deverá enviar arquivos para caminhos arbitrários.

---

# 55. Logs de API

Os logs poderão registrar:

* endpoint ou função;
* usuário interno;
* espaço;
* código de resposta;
* duração;
* código de erro;
* identificador da requisição;
* chave de idempotência mascarada;
* modelo de IA;
* custo estimado.

Não deverão registrar:

* senha;
* token;
* chave de API;
* imagem;
* conteúdo integral do recibo;
* dados bancários completos.

---

# 56. Identificador de requisição

Cada operação relevante poderá possuir:

```text
requestId
```

Esse identificador ajudará a:

* rastrear erros;
* correlacionar logs;
* investigar falhas;
* evitar exposição de dados.

---

# 57. Códigos de resposta HTTP futuros

Quando houver API HTTP própria:

```text
200 — sucesso
201 — criado
202 — aceito para processamento
204 — sucesso sem conteúdo
400 — requisição inválida
401 — não autenticado
403 — sem permissão
404 — não encontrado
409 — conflito
422 — regra de negócio inválida
429 — limite excedido
500 — erro interno
503 — serviço indisponível
```

A aplicação não deverá depender apenas do status HTTP.

O corpo deverá trazer código de erro da aplicação.

---

# 58. Timeouts

Chamadas externas deverão possuir tempo máximo.

Exemplos:

* OpenAI;
* e-mail;
* upload;
* processamento.

Em caso de timeout:

* não criar dado confirmado;
* preservar estado seguro;
* permitir nova tentativa;
* registrar erro;
* evitar duplicidade.

---

# 59. Retentativas

Retentativas automáticas serão permitidas apenas em falhas temporárias.

Exemplos:

* indisponibilidade;
* timeout;
* erro de rede.

Não deverão ser repetidas automaticamente:

* validação inválida;
* sem permissão;
* conta inexistente;
* categoria incompatível;
* limite excedido.

---

# 60. Cache

Dados remotos poderão utilizar cache no aplicativo.

Exemplos:

* contas;
* categorias;
* perfil;
* membros;
* painel.

O cache deverá ser invalidado após alterações.

Exemplos:

```text
Criar despesa
→ invalidar movimentações
→ invalidar saldo
→ invalidar painel
```

---

# 61. Atualização otimista

Atualização otimista deverá ser utilizada com cautela.

Operações simples poderão atualizar a interface antes da resposta definitiva.

Operações financeiras críticas não deverão apresentar sucesso definitivo antes da confirmação do servidor.

Transferências e cancelamentos deverão aguardar confirmação.

---

# 62. Funcionamento offline

A Versão 1 não terá suporte offline completo.

Possível comportamento inicial:

* exibir dados em cache;
* informar ausência de conexão;
* impedir operações que exijam servidor;
* preservar formulário localmente quando possível.

Sincronização offline de movimentações será definida futuramente, devido ao risco de duplicidade e conflito.

---

# 63. Migrações do banco

Alterações de estrutura deverão utilizar migrações versionadas.

As migrações deverão:

* estar no repositório;
* possuir ordem;
* ser revisáveis;
* não depender apenas de alterações manuais no painel;
* preservar dados;
* ser testadas antes do uso real.

---

# 64. Ambiente de desenvolvimento

O projeto deverá possuir ambientes separados quando necessário.

```text
development
staging
production
```

Na fase inicial, poderão existir:

```text
development
production futuro
```

Dados fictícios deverão ser usados no ambiente de desenvolvimento.

---

# 65. Variáveis públicas

O aplicativo poderá conter:

```text
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
```

Esses valores são públicos por definição do cliente.

Sua segurança dependerá de:

* RLS;
* autenticação;
* políticas;
* ausência de chave administrativa.

---

# 66. Variáveis secretas

Somente backend:

```text
SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY
EMAIL_PROVIDER_API_KEY
```

Essas variáveis:

* não deverão usar prefixo público;
* não deverão ser enviadas ao GitHub;
* não deverão ser usadas no aplicativo;
* não deverão aparecer em logs.

---

# 67. Testes de contrato

Os contratos deverão ser testados.

Exemplos:

* resposta de conta possui campos esperados;
* valor monetário é inteiro;
* status é válido;
* erro possui código;
* transferência não aceita mesma conta;
* recibo retorna schema válido.

---

# 68. Testes de autorização

Deverão existir testes com:

* usuário administrador;
* usuário membro;
* usuário removido;
* usuário de outro espaço;
* usuário sem autenticação.

Cada operação deverá ser testada com papéis adequados e inadequados.

---

# 69. Testes de idempotência

Cenários:

```text
enviar a mesma transferência duas vezes
```

Resultado esperado:

```text
uma única operação financeira
```

```text
repetir processamento com a mesma chave
```

Resultado esperado:

```text
reutilizar ou retornar o resultado existente
```

---

# 70. Testes de falha parcial

Operações críticas deverão ser testadas simulando erro intermediário.

Exemplo:

```text
falha ao criar transferência
```

Resultado esperado:

* nenhuma saída parcial;
* nenhum saldo inconsistente;
* erro claro;
* possibilidade de nova tentativa.

---

# 71. API futura para versão web

A futura interface web deverá reutilizar:

* contratos;
* autenticação;
* repositórios conceituais;
* regras de domínio;
* funções de backend;
* endpoints;
* schemas.

A versão web não deverá criar regras financeiras paralelas.

---

# 72. API pública futura

Uma API pública somente será considerada quando houver:

* necessidade real;
* autenticação apropriada;
* documentação externa;
* limites;
* termos de uso;
* auditoria;
* versionamento;
* suporte;
* política comercial.

Ela não faz parte da Versão 1.

---

# 73. Fluxos resumidos

## 73.1 Criar despesa

```text
Tela
→ validação do formulário
→ caso de uso
→ domínio
→ repositório
→ Supabase
→ RLS
→ banco
→ resposta
→ atualização do painel
```

## 73.2 Criar transferência

```text
Tela
→ validação inicial
→ função segura
→ autenticação
→ autorização
→ validações financeiras
→ transação do banco
→ resposta
→ atualização das duas contas
```

## 73.3 Processar recibo

```text
Tela
→ upload
→ função segura
→ validação do arquivo
→ OpenAI
→ validação do schema
→ movimentação pendente
→ revisão
→ confirmação
```

---

# 74. Decisões consolidadas

1. o aplicativo utilizará repositórios;
2. respostas serão tipadas;
3. erros terão códigos estáveis;
4. autenticação será obrigatória;
5. autorização dependerá do Espaço Financeiro;
6. operações simples poderão usar Supabase com RLS;
7. operações críticas usarão funções seguras;
8. transferências serão atômicas;
9. idempotência será usada quando necessária;
10. movimentações geradas por IA serão pendentes;
11. contratos utilizarão TypeScript;
12. banco e domínio serão separados por mapeadores;
13. listas utilizarão paginação;
14. segredos permanecerão no backend;
15. logs não conterão dados sensíveis;
16. contratos serão versionados;
17. a futura versão web reutilizará a mesma lógica;
18. migrações do banco serão versionadas;
19. dados reais dependerão de revisão de segurança;
20. o domínio não dependerá diretamente da interface.

---

# 75. Critérios para considerar um contrato pronto

Um contrato será considerado pronto quando:

* entrada estiver tipada;
* resposta estiver tipada;
* erros estiverem definidos;
* permissões estiverem claras;
* validações estiverem documentadas;
* comportamento de sucesso estiver definido;
* comportamento de falha estiver definido;
* testes essenciais estiverem planejados;
* nenhum segredo depender do cliente;
* a documentação estiver atualizada.

---

# 76. Resumo

A API do Nexus Finance será formada por:

```text
Repositórios no aplicativo
Funções PostgreSQL
Edge Functions
Contratos TypeScript
Políticas RLS
Serviços externos controlados
```

Operações comuns poderão utilizar o Supabase diretamente por meio de repositórios.

Operações críticas deverão passar por funções seguras.

Todos os contratos deverão respeitar:

* autenticação;
* autorização;
* integridade financeira;
* privacidade;
* tipagem;
* previsibilidade;
* possibilidade de evolução.

A API deverá servir tanto ao aplicativo Android quanto à futura versão web, sem duplicar regras de negócio.
