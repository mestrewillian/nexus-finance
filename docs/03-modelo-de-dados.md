# Nexus Finance — Modelo de Dados

## 1. Objetivo deste documento

Este documento define o modelo inicial de dados do Nexus Finance.

Seu objetivo é estabelecer:

* as entidades principais;
* as tabelas do banco;
* os relacionamentos;
* os campos essenciais;
* as regras de integridade;
* a representação dos valores monetários;
* o tratamento de transferências;
* a separação entre usuários e Espaços Financeiros;
* a base para as futuras políticas de segurança.

Este documento descreve o modelo lógico da Versão 1.

A implementação física poderá receber pequenos ajustes técnicos, desde que as regras aqui definidas sejam preservadas.

---

## 2. Banco de dados

O banco principal será PostgreSQL, disponibilizado por meio do Supabase.

O Supabase será utilizado para:

* autenticação;
* banco relacional;
* políticas de segurança;
* funções de banco;
* armazenamento de arquivos futuramente;
* funções seguras de backend.

---

## 3. Princípios do modelo de dados

O modelo deverá seguir os seguintes princípios:

1. cada registro deverá possuir um identificador único;
2. dados financeiros deverão estar vinculados a um Espaço Financeiro;
3. usuários deverão acessar apenas espaços dos quais participam;
4. movimentações serão a fonte principal da verdade financeira;
5. saldos não poderão ser alterados sem registro correspondente;
6. transferências deverão ser registradas de forma atômica;
7. exclusões físicas deverão ser evitadas em dados financeiros;
8. datas de criação e atualização deverão ser registradas;
9. valores monetários deverão utilizar uma representação única;
10. regras importantes deverão ser protegidas também no banco;
11. referências entre tabelas deverão utilizar chaves estrangeiras;
12. registros históricos não deverão perder sua identidade;
13. dados gerados por IA deverão permanecer pendentes até confirmação.

---

## 4. Convenções de nomes

As tabelas e colunas utilizarão nomes em inglês, no padrão `snake_case`.

Exemplos:

```text
financial_spaces
financial_accounts
financial_transactions
created_at
updated_at
```

O código TypeScript poderá utilizar nomes em `camelCase`.

Exemplo:

```text
financial_space_id → financialSpaceId
created_at → createdAt
```

A conversão entre banco e aplicação deverá ser padronizada.

---

## 5. Identificadores

As principais tabelas utilizarão identificadores UUID.

Exemplo:

```text
id uuid primary key
```

Vantagens:

* menor previsibilidade;
* facilidade de geração distribuída;
* integração natural com o Supabase;
* segurança superior a identificadores sequenciais expostos;
* facilidade para sincronização futura.

---

## 6. Datas e horários

Datas de criação e atualização deverão utilizar horário com fuso.

Exemplo conceitual:

```text
created_at timestamptz
updated_at timestamptz
```

O banco deverá armazenar os horários em UTC.

A interface deverá exibir datas e horários no fuso local do usuário.

Datas financeiras poderão utilizar:

```text
transaction_date date
```

quando apenas o dia da movimentação for relevante.

Exemplo:

* compra realizada em 15 de julho de 2026;
* salário recebido em 5 de julho de 2026.

Quando a hora for importante, poderá existir um campo adicional futuro.

---

## 7. Valores monetários

Os valores monetários serão armazenados em centavos como números inteiros.

Exemplo:

```text
R$ 186,42 = 18642
R$ 10,00 = 1000
R$ 0,50 = 50
```

Nome recomendado para os campos:

```text
amount_cents
initial_balance_cents
```

Tipo recomendado no banco:

```text
bigint
```

### Vantagens

* evita erros de ponto flutuante;
* simplifica comparações;
* mantém cálculos exatos;
* facilita testes;
* padroniza aplicativo e banco.

### Regra

A interface poderá exibir valores formatados como moeda, mas o domínio deverá trabalhar com centavos.

Exemplo:

```text
Entrada visual: R$ 186,42
Valor de domínio: 18642
Valor no banco: 18642
```

A formatação deverá ser responsabilidade de funções específicas.

---

## 8. Moeda

Na Versão 1, o sistema trabalhará apenas com Real brasileiro.

O código da moeda será:

```text
BRL
```

Cada Espaço Financeiro poderá possuir um campo de moeda padrão, mesmo que inicialmente apenas `BRL` seja aceito.

Isso prepara o banco para suporte futuro a outras moedas.

---

# 9. Tabela `profiles`

## 9.1 Objetivo

Armazenar dados públicos e complementares do usuário autenticado.

A autenticação principal será mantida pelo Supabase Auth.

A tabela `profiles` será vinculada ao usuário de autenticação.

## 9.2 Campos

```text
profiles
--------
id
full_name
avatar_url
created_at
updated_at
```

### Definição conceitual

```text
id uuid primary key
full_name text not null
avatar_url text null
created_at timestamptz not null
updated_at timestamptz not null
```

## 9.3 Regras

* `id` deverá corresponder ao identificador do Supabase Auth;
* cada usuário autenticado deverá possuir no máximo um perfil;
* o e-mail não deverá ser duplicado nesta tabela sem necessidade;
* dados sensíveis de autenticação não deverão ser armazenados nela.

---

# 10. Tabela `financial_spaces`

## 10.1 Objetivo

Representar um Espaço Financeiro.

Exemplos:

* Espaço Pessoal;
* Família Zingoni;
* Empresa;
* Projeto específico.

## 10.2 Campos

```text
financial_spaces
----------------
id
name
space_type
currency_code
created_by
is_active
created_at
updated_at
```

### Definição conceitual

```text
id uuid primary key
name text not null
space_type text not null
currency_code text not null default 'BRL'
created_by uuid not null
is_active boolean not null default true
created_at timestamptz not null
updated_at timestamptz not null
```

## 10.3 Tipos de espaço

Valores iniciais:

```text
personal
family
business
project
other
```

Na Versão 1, o principal tipo será:

```text
family
```

## 10.4 Regras

* o nome será obrigatório;
* `created_by` deverá apontar para o usuário criador;
* o criador deverá ser adicionado automaticamente como administrador;
* espaços inativos não deverão receber novos lançamentos comuns;
* um usuário poderá participar de mais de um espaço.

---

# 11. Tabela `financial_space_members`

## 11.1 Objetivo

Relacionar usuários e Espaços Financeiros.

Essa tabela representa uma relação muitos-para-muitos.

Um usuário poderá participar de vários espaços.

Um espaço poderá possuir vários membros.

## 11.2 Campos

```text
financial_space_members
-----------------------
id
financial_space_id
user_id
role
membership_status
invited_by
joined_at
created_at
updated_at
```

### Definição conceitual

```text
id uuid primary key
financial_space_id uuid not null
user_id uuid not null
role text not null
membership_status text not null
invited_by uuid null
joined_at timestamptz null
created_at timestamptz not null
updated_at timestamptz not null
```

## 11.3 Papéis iniciais

```text
admin
member
```

## 11.4 Estados do vínculo

```text
invited
active
declined
removed
```

## 11.5 Regras

* não deverá existir vínculo ativo duplicado para o mesmo usuário e espaço;
* o criador do espaço deverá possuir papel `admin`;
* um membro removido não deverá perder a autoria de movimentações antigas;
* apenas administradores poderão convidar ou remover membros na Versão 1;
* usuários somente poderão acessar dados de espaços nos quais possuam vínculo ativo.

## 11.6 Restrição de unicidade

Deverá existir uma restrição lógica semelhante a:

```text
unique(financial_space_id, user_id)
```

---

# 12. Tabela `financial_accounts`

## 12.1 Objetivo

Representar contas financeiras nas quais o dinheiro é mantido ou movimentado.

Exemplos:

* Nubank do Will;
* Inter da Annie;
* dinheiro em espécie;
* Mercado Pago;
* poupança;
* investimento.

## 12.2 Campos

```text
financial_accounts
------------------
id
financial_space_id
name
account_type
owner_user_id
initial_balance_cents
currency_code
is_active
created_by
created_at
updated_at
```

### Definição conceitual

```text
id uuid primary key
financial_space_id uuid not null
name text not null
account_type text not null
owner_user_id uuid null
initial_balance_cents bigint not null default 0
currency_code text not null default 'BRL'
is_active boolean not null default true
created_by uuid not null
created_at timestamptz not null
updated_at timestamptz not null
```

## 12.3 Tipos de conta

```text
checking
savings
cash
digital_wallet
investment
other
```

## 12.4 Responsável pela conta

`owner_user_id` representa o responsável principal pela conta.

Esse campo poderá ser nulo em contas totalmente compartilhadas.

Exemplos:

```text
Nubank Will → owner_user_id = Will
Dinheiro da casa → owner_user_id = null
```

## 12.5 Regras

* a conta deverá pertencer a um Espaço Financeiro;
* o responsável deverá ser membro ativo desse espaço;
* uma conta inativa permanecerá no histórico;
* contas inativas não poderão receber novas movimentações comuns;
* o saldo inicial não deverá ser editado indiscriminadamente após uso;
* correções posteriores deverão ocorrer por ajuste de saldo.

---

# 13. Tabela `categories`

## 13.1 Objetivo

Classificar movimentações financeiras.

## 13.2 Campos

```text
categories
----------
id
financial_space_id
name
category_type
icon
color
is_system
is_active
created_by
created_at
updated_at
```

### Definição conceitual

```text
id uuid primary key
financial_space_id uuid null
name text not null
category_type text not null
icon text null
color text null
is_system boolean not null default false
is_active boolean not null default true
created_by uuid null
created_at timestamptz not null
updated_at timestamptz not null
```

## 13.3 Tipos de categoria

```text
income
expense
both
```

## 13.4 Categorias do sistema

Categorias padrão poderão possuir:

```text
financial_space_id = null
is_system = true
```

Essas categorias poderão ser exibidas para todos os espaços.

## 13.5 Categorias personalizadas

Categorias criadas por um espaço deverão possuir:

```text
financial_space_id = identificador do espaço
is_system = false
```

## 13.6 Regras

* categorias de receita não deverão ser usadas em despesas;
* categorias de despesa não deverão ser usadas em receitas;
* categorias do tipo `both` poderão ser usadas em ambos;
* categorias inativas deverão permanecer em movimentações antigas;
* categorias do sistema não poderão ser editadas por usuários comuns;
* o nome deverá ser único dentro do espaço quando fizer sentido.

---

# 14. Tabela `financial_transactions`

## 14.1 Objetivo

Representar todas as movimentações financeiras do sistema.

Essa será a principal tabela do núcleo financeiro.

## 14.2 Tipos iniciais

```text
income
expense
transfer
balance_adjustment
```

Tipos futuros poderão incluir:

```text
refund
investment_application
investment_redemption
investment_income
credit_card_purchase
invoice_payment
```

## 14.3 Status iniciais

```text
pending
confirmed
cancelled
```

## 14.4 Campos

```text
financial_transactions
----------------------
id
financial_space_id
transaction_type
status
description
amount_cents
transaction_date
category_id
responsible_user_id
created_by
source_account_id
destination_account_id
adjustment_direction
notes
external_reference
confirmed_at
cancelled_at
created_at
updated_at
```

### Definição conceitual

```text
id uuid primary key
financial_space_id uuid not null
transaction_type text not null
status text not null default 'confirmed'
description text not null
amount_cents bigint not null
transaction_date date not null
category_id uuid null
responsible_user_id uuid null
created_by uuid not null
source_account_id uuid null
destination_account_id uuid null
adjustment_direction text null
notes text null
external_reference text null
confirmed_at timestamptz null
cancelled_at timestamptz null
created_at timestamptz not null
updated_at timestamptz not null
```

---

# 15. Significado das contas na movimentação

## 15.1 Receita

```text
source_account_id = null
destination_account_id = conta que recebe
```

Exemplo:

```text
Salário recebido no Nubank
destination_account_id = Nubank
```

## 15.2 Despesa

```text
source_account_id = conta utilizada
destination_account_id = null
```

Exemplo:

```text
Compra no mercado paga pelo Nubank
source_account_id = Nubank
```

## 15.3 Transferência

```text
source_account_id = conta de origem
destination_account_id = conta de destino
```

Exemplo:

```text
Transferência Nubank → Mercado Pago
```

## 15.4 Ajuste de saldo

O ajuste deverá usar uma conta e indicar sua direção.

Exemplo positivo:

```text
source_account_id = null
destination_account_id = conta ajustada
adjustment_direction = increase
```

Exemplo negativo:

```text
source_account_id = conta ajustada
destination_account_id = null
adjustment_direction = decrease
```

---

# 16. Regras da movimentação

Toda movimentação deverá:

* pertencer a um Espaço Financeiro;
* possuir valor maior que zero;
* possuir descrição;
* possuir data;
* possuir usuário criador;
* respeitar as contas exigidas pelo tipo;
* respeitar a categoria exigida pelo tipo;
* possuir status válido;
* manter histórico de criação e atualização.

---

# 17. Regras por tipo

## 17.1 Receita

Uma receita deverá possuir:

```text
transaction_type = income
destination_account_id preenchido
source_account_id nulo
category_id compatível com receita
amount_cents > 0
```

Uma receita confirmada deverá aumentar o saldo da conta de destino.

---

## 17.2 Despesa

Uma despesa deverá possuir:

```text
transaction_type = expense
source_account_id preenchido
destination_account_id nulo
category_id compatível com despesa
amount_cents > 0
```

Uma despesa confirmada deverá reduzir o saldo da conta de origem.

---

## 17.3 Transferência

Uma transferência deverá possuir:

```text
transaction_type = transfer
source_account_id preenchido
destination_account_id preenchido
category_id nulo
amount_cents > 0
```

Regras:

* origem e destino deverão ser diferentes;
* ambas deverão pertencer ao mesmo Espaço Financeiro;
* a transferência não será receita;
* a transferência não será despesa;
* uma única movimentação representará a operação lógica;
* a operação deverá ser registrada de forma atômica.

---

## 17.4 Ajuste de saldo

Um ajuste deverá possuir:

```text
transaction_type = balance_adjustment
adjustment_direction = increase ou decrease
notes ou descrição explicativa
amount_cents > 0
```

O ajuste deverá:

* aumentar ou reduzir o saldo;
* permanecer no histórico;
* registrar o usuário responsável;
* não ser contabilizado como receita ou despesa operacional;
* ser exibido separadamente nos relatórios quando necessário.

---

# 18. Responsável financeiro e usuário criador

Esses dois conceitos serão separados.

## 18.1 `created_by`

Representa o usuário que registrou a movimentação.

Exemplo:

```text
Will cadastrou uma despesa da Annie.
created_by = Will
```

## 18.2 `responsible_user_id`

Representa a pessoa à qual a movimentação é atribuída financeiramente.

Exemplo:

```text
Despesa da Annie cadastrada pelo Will.
responsible_user_id = Annie
created_by = Will
```

Essa separação permitirá:

* auditoria;
* painéis individuais;
* lançamentos feitos por outro membro;
* correções e suporte;
* futuras importações automáticas.

---

# 19. Status das movimentações

## 19.1 Pendente

```text
pending
```

Uso:

* dado aguardando confirmação;
* movimentação criada por IA;
* importação ainda não revisada;
* lançamento incompleto autorizado pelo fluxo.

Movimentações pendentes não deverão afetar o saldo confirmado.

## 19.2 Confirmada

```text
confirmed
```

Uso:

* movimentação válida;
* considerada nos saldos;
* considerada nos painéis.

## 19.3 Cancelada

```text
cancelled
```

Uso:

* movimentação anulada;
* preservada para histórico;
* não considerada nos saldos.

Uma movimentação cancelada não deverá ser fisicamente apagada.

---

# 20. Cancelamento e edição

## 20.1 Cancelamento

O cancelamento deverá:

* alterar o status para `cancelled`;
* registrar `cancelled_at`;
* preservar o registro;
* remover seu efeito dos cálculos;
* registrar futuramente o usuário responsável pelo cancelamento.

## 20.2 Edição

Movimentações poderão ser editadas conforme permissões.

Alterações críticas poderão exigir histórico futuro.

Na Versão 1, o campo `updated_at` registrará a última modificação.

Uma tabela de auditoria completa poderá ser adicionada posteriormente.

---

# 21. Tabela `transaction_items`

## 21.1 Objetivo

Armazenar itens detalhados de uma movimentação.

Essa tabela será opcional na Versão 1 e utilizada principalmente no futuro com leitura de recibos.

## 21.2 Campos

```text
transaction_items
-----------------
id
financial_transaction_id
description
quantity
unit_price_cents
total_price_cents
category_id
created_at
updated_at
```

### Definição conceitual

```text
id uuid primary key
financial_transaction_id uuid not null
description text not null
quantity numeric null
unit_price_cents bigint null
total_price_cents bigint not null
category_id uuid null
created_at timestamptz not null
updated_at timestamptz not null
```

## 21.3 Regras

* o item deverá pertencer a uma movimentação;
* o total deverá ser maior ou igual a zero;
* a soma dos itens poderá ser comparada ao total da movimentação;
* diferenças poderão existir por descontos, taxas ou arredondamentos;
* itens extraídos por IA deverão ser revisáveis;
* categorias dos itens poderão ser mais específicas do que a categoria principal.

---

# 22. Tabela `financial_space_invitations`

## 22.1 Objetivo

Representar convites para participação em Espaços Financeiros.

## 22.2 Campos

```text
financial_space_invitations
---------------------------
id
financial_space_id
email
role
status
invited_by
expires_at
accepted_by
accepted_at
created_at
updated_at
```

### Estados possíveis

```text
pending
accepted
declined
expired
cancelled
```

## 22.3 Regras

* apenas administradores poderão criar convites;
* o convite deverá estar vinculado a um espaço;
* o convite poderá possuir prazo;
* o aceite deverá criar ou ativar o vínculo de membro;
* convites antigos não deverão ser reutilizados indevidamente;
* um convite aceito não deverá permanecer pendente.

---

# 23. Relacionamentos principais

```text
auth.users
   │
   └── profiles

profiles
   │
   ├── financial_space_members
   ├── financial_accounts
   ├── financial_transactions
   └── financial_space_invitations

financial_spaces
   │
   ├── financial_space_members
   ├── financial_accounts
   ├── categories
   ├── financial_transactions
   └── financial_space_invitations

financial_accounts
   │
   ├── source_account_id em financial_transactions
   └── destination_account_id em financial_transactions

categories
   │
   ├── financial_transactions
   └── transaction_items

financial_transactions
   │
   └── transaction_items
```

---

# 24. Diagrama lógico simplificado

```text
User
  │
  └── Profile
        │
        └── FinancialSpaceMember
                 │
                 └── FinancialSpace
                       │
                       ├── FinancialAccount
                       ├── Category
                       ├── FinancialTransaction
                       │       └── TransactionItem
                       └── FinancialSpaceInvitation
```

---

# 25. Cálculo de saldo

O saldo confirmado de uma conta será calculado a partir de:

```text
saldo inicial
+ receitas confirmadas recebidas
- despesas confirmadas pagas
+ transferências confirmadas recebidas
- transferências confirmadas enviadas
+ ajustes positivos confirmados
- ajustes negativos confirmados
```

Movimentações pendentes ou canceladas não deverão afetar o saldo confirmado.

---

# 26. Consulta conceitual de saldo

Para uma determinada conta:

```text
Saldo =
initial_balance_cents

+ soma de receitas confirmadas em que a conta é destino

- soma de despesas confirmadas em que a conta é origem

+ soma de transferências confirmadas em que a conta é destino

- soma de transferências confirmadas em que a conta é origem

+ soma de ajustes positivos confirmados

- soma de ajustes negativos confirmados
```

O cálculo deverá ser centralizado.

Telas diferentes não deverão implementar fórmulas diferentes.

---

# 27. Saldo confirmado e saldo previsto

Na Versão 1, o saldo principal será o confirmado.

Futuramente poderão existir:

```text
confirmed_balance_cents
projected_balance_cents
available_balance_cents
```

### Saldo confirmado

Considera apenas movimentações confirmadas.

### Saldo previsto

Poderá considerar movimentações pendentes ou agendadas.

### Saldo disponível

Poderá considerar limites, bloqueios ou outras regras futuras.

---

# 28. Painéis e consultas

Os painéis deverão ser obtidos a partir de consultas agregadas.

Exemplos:

* total de receitas por período;
* total de despesas por período;
* resultado financeiro;
* despesas por categoria;
* despesas por responsável;
* saldo por conta;
* saldo total do espaço;
* movimentações recentes.

Esses valores não deverão ser armazenados como registros independentes sem necessidade.

Inicialmente, deverão ser calculados a partir das movimentações.

Views ou funções SQL poderão ser criadas para simplificar e otimizar as consultas.

---

# 29. Views previstas

Poderão ser criadas views como:

```text
account_balances
monthly_financial_summary
expenses_by_category
member_financial_summary
recent_transactions
```

Exemplo conceitual:

```text
account_balances
----------------
account_id
financial_space_id
initial_balance_cents
confirmed_balance_cents
```

Views não deverão contornar as políticas de segurança.

---

# 30. Funções de banco previstas

Operações críticas poderão utilizar funções PostgreSQL.

Exemplos:

```text
create_financial_space
create_transfer
cancel_transaction
calculate_account_balance
accept_space_invitation
```

A função de transferência deverá:

* validar as contas;
* validar o Espaço Financeiro;
* validar o usuário;
* inserir a movimentação;
* concluir tudo na mesma transação do banco;
* falhar integralmente caso alguma regra seja violada.

---

# 31. Índices iniciais

Índices serão necessários nos campos mais consultados.

Possíveis índices:

```text
financial_space_members(user_id)
financial_space_members(financial_space_id)

financial_accounts(financial_space_id)
financial_accounts(owner_user_id)

categories(financial_space_id)

financial_transactions(financial_space_id)
financial_transactions(transaction_date)
financial_transactions(status)
financial_transactions(transaction_type)
financial_transactions(responsible_user_id)
financial_transactions(source_account_id)
financial_transactions(destination_account_id)

transaction_items(financial_transaction_id)

financial_space_invitations(email)
financial_space_invitations(financial_space_id)
```

Índices compostos poderão ser criados conforme as consultas reais.

Exemplo:

```text
financial_transactions(financial_space_id, transaction_date)
```

---

# 32. Integridade referencial

As principais relações deverão utilizar chaves estrangeiras.

Exemplos:

```text
financial_space_members.financial_space_id
→ financial_spaces.id

financial_accounts.financial_space_id
→ financial_spaces.id

financial_transactions.source_account_id
→ financial_accounts.id

financial_transactions.category_id
→ categories.id
```

A exclusão física em cascata deverá ser utilizada com muito cuidado.

Dados financeiros históricos não deverão desaparecer porque uma conta, categoria ou membro foi removido.

---

# 33. Exclusão lógica

Entidades principais deverão preferir inativação.

Exemplos:

```text
financial_spaces.is_active
financial_accounts.is_active
categories.is_active
```

Movimentações utilizarão status:

```text
cancelled
```

Membros utilizarão:

```text
membership_status = removed
```

Isso preservará o histórico.

---

# 34. Regras de segurança por tabela

## 34.1 `profiles`

O usuário poderá visualizar e editar seu próprio perfil.

A visualização de outros perfis deverá ocorrer apenas quando existir vínculo autorizado em um espaço compartilhado.

## 34.2 `financial_spaces`

Somente membros ativos poderão visualizar o espaço.

Somente administradores poderão editar dados principais.

## 34.3 `financial_space_members`

Membros poderão visualizar participantes do próprio espaço.

Somente administradores poderão alterar papéis ou remover membros.

## 34.4 `financial_accounts`

Somente membros ativos poderão visualizar contas do espaço.

Criação e edição dependerão das permissões definidas.

## 34.5 `categories`

Membros poderão visualizar categorias disponíveis.

Categorias do sistema serão somente leitura.

## 34.6 `financial_transactions`

Somente membros autorizados poderão visualizar movimentações do espaço.

Edição deverá respeitar autoria, responsabilidade e papel do membro.

---

# 35. Dados da inteligência artificial

No futuro, dados extraídos por IA poderão utilizar tabelas adicionais.

Exemplo:

```text
receipt_imports
---------------
id
financial_space_id
uploaded_by
file_path
processing_status
raw_result
confidence_score
created_transaction_id
created_at
updated_at
```

Possíveis estados:

```text
uploaded
processing
completed
failed
reviewed
discarded
```

A resposta da IA não será considerada dado financeiro confirmado até revisão do usuário.

---

# 36. Auditoria futura

Em versões posteriores, poderá existir:

```text
audit_logs
----------
id
financial_space_id
user_id
entity_type
entity_id
action
previous_data
new_data
created_at
```

A auditoria poderá registrar:

* criação;
* edição;
* cancelamento;
* mudança de papel;
* aceite de convite;
* processamento por IA.

Na Versão 1, utilizaremos inicialmente:

* `created_by`;
* `created_at`;
* `updated_at`;
* status;
* datas de confirmação e cancelamento.

---

# 37. Categorias padrão iniciais

## 37.1 Receitas

```text
Salário
Trabalho autônomo
Comissão
Venda
Rendimento
Reembolso
Presente
Outras receitas
```

## 37.2 Despesas

```text
Alimentação
Moradia
Energia
Água
Internet
Telefone
Transporte
Combustível
Saúde
Educação
Lazer
Compras
Assinaturas
Impostos
Dívidas
Doações
Outras despesas
```

Essas categorias poderão ser refinadas posteriormente.

---

# 38. Exemplo de cadastro de receita

```text
Descrição: Salário
Tipo: income
Valor: 350000
Conta de destino: Nubank Will
Categoria: Salário
Responsável: Will
Status: confirmed
Data: 2026-07-05
```

Valor formatado:

```text
R$ 3.500,00
```

Valor armazenado:

```text
350000
```

---

# 39. Exemplo de cadastro de despesa

```text
Descrição: Supermercado São Cristóvão
Tipo: expense
Valor: 18642
Conta de origem: Nubank Will
Categoria: Alimentação
Responsável: Will
Status: confirmed
Data: 2026-07-08
```

---

# 40. Exemplo de transferência

```text
Descrição: Transferência para Mercado Pago
Tipo: transfer
Valor: 50000
Conta de origem: Nubank Will
Conta de destino: Mercado Pago Will
Categoria: null
Responsável: Will
Status: confirmed
```

Essa operação:

* reduz R$ 500,00 do Nubank;
* aumenta R$ 500,00 do Mercado Pago;
* não altera receitas;
* não altera despesas;
* não altera o patrimônio total do espaço.

---

# 41. Exemplo de ajuste de saldo

```text
Descrição: Correção após conferência bancária
Tipo: balance_adjustment
Direção: decrease
Valor: 1250
Conta de origem: Nubank Will
Observação: diferença encontrada na conferência
Status: confirmed
```

Valor:

```text
R$ 12,50
```

---

# 42. Exemplo de movimentação pendente por IA

```text
Descrição: Supermercado São Cristóvão
Tipo: expense
Valor: 18642
Status: pending
Conta de origem: não confirmada
Categoria: Alimentação sugerida
Responsável: Will
Origem: receipt_scan
```

Após revisão:

```text
Status: confirmed
Conta: Nubank Will
Categoria: Alimentação
```

Somente então a movimentação afetará o saldo.

---

# 43. Decisões consolidadas

O modelo de dados da Versão 1 seguirá estas decisões:

1. usuários serão autenticados pelo Supabase Auth;
2. perfis serão armazenados em tabela própria;
3. usuários poderão participar de vários Espaços Financeiros;
4. a relação entre usuário e espaço será muitos-para-muitos;
5. contas pertencerão a um Espaço Financeiro;
6. categorias poderão ser padrão ou personalizadas;
7. movimentações serão armazenadas em uma única tabela central;
8. receitas, despesas, transferências e ajustes serão tipos de movimentação;
9. transferências utilizarão conta de origem e destino;
10. movimentações possuirão status;
11. movimentações pendentes não alterarão o saldo confirmado;
12. cancelamentos preservarão o histórico;
13. valores serão armazenados em centavos;
14. movimentações serão a fonte principal da verdade;
15. itens detalhados serão opcionais;
16. dados gerados por IA exigirão revisão;
17. as políticas de acesso considerarão o vínculo com o Espaço Financeiro.

---

# 44. Tabelas da Versão 1

Tabelas essenciais:

```text
profiles
financial_spaces
financial_space_members
financial_accounts
categories
financial_transactions
financial_space_invitations
```

Tabela preparada para uso futuro próximo:

```text
transaction_items
```

Tabelas futuras:

```text
credit_cards
credit_card_invoices
installments
recurring_transactions
budgets
financial_goals
receipt_imports
audit_logs
investments
ai_analyses
```

---

# 45. Resumo do modelo

O modelo de dados do Nexus Finance será centrado em três conceitos:

```text
Usuários
Espaços Financeiros
Movimentações
```

Os usuários terão identidade própria.

Os Espaços Financeiros organizarão membros, contas, categorias e dados compartilhados.

As movimentações representarão toda mudança financeira relevante.

Esse modelo permitirá:

* visão individual;
* visão familiar consolidada;
* cálculo de saldos;
* transferências internas;
* controle de permissões;
* futura leitura de recibos;
* análises por inteligência artificial;
* expansão para cartões, faturas e investimentos.
