# Nexus Finance — Arquitetura da Aplicação

## 1. Objetivo deste documento

Este documento define a arquitetura inicial do Nexus Finance.

Seu objetivo é estabelecer:

* como o aplicativo será organizado;
* quais responsabilidades pertencem a cada camada;
* como os dados circularão entre interface, regras de negócio e banco;
* onde as validações financeiras deverão acontecer;
* como serão tratados autenticação, segurança e permissões;
* como o projeto poderá crescer sem exigir uma reestruturação completa.

A arquitetura descrita neste documento deverá orientar:

* o desenvolvimento manual;
* as tarefas atribuídas ao Codex;
* as revisões de código;
* os testes;
* a organização dos arquivos;
* futuras integrações com inteligência artificial.

---

## 2. Princípios arquiteturais

A arquitetura do Nexus Finance deverá seguir os seguintes princípios:

1. simplicidade antes de complexidade;
2. separação de responsabilidades;
3. regras financeiras independentes da interface;
4. segurança aplicada no banco de dados;
5. validação dos dados antes da persistência;
6. código tipado com TypeScript;
7. componentes reutilizáveis;
8. funções pequenas e com propósito definido;
9. dependências externas isoladas;
10. documentação das decisões importantes;
11. possibilidade de testes automatizados;
12. evolução incremental;
13. nenhuma chave secreta armazenada no aplicativo;
14. nenhuma regra crítica mantida exclusivamente na tela;
15. nenhuma duplicação desnecessária de lógica financeira.

---

## 3. Visão geral da arquitetura

A primeira versão utilizará uma arquitetura em camadas.

```text
Usuário
   ↓
Interface do aplicativo
   ↓
Casos de uso
   ↓
Regras de domínio
   ↓
Repositórios
   ↓
Supabase
   ↓
PostgreSQL
```

Cada camada terá uma responsabilidade específica.

### Interface

Responsável por mostrar informações e receber ações do usuário.

### Casos de uso

Responsáveis por coordenar uma operação completa.

Exemplos:

* criar uma despesa;
* registrar uma receita;
* realizar uma transferência;
* criar um Espaço Financeiro;
* convidar um membro.

### Domínio

Responsável pelas regras financeiras e validações centrais.

### Repositórios

Responsáveis pela comunicação entre o aplicativo e as fontes de dados.

### Infraestrutura

Responsável por serviços externos, banco, autenticação, armazenamento e APIs.

---

## 4. Tecnologias principais

### 4.1 Aplicativo móvel

* React Native;
* Expo;
* TypeScript.

### 4.2 Navegação

A navegação deverá utilizar uma solução compatível com Expo e React Native.

A decisão entre Expo Router e outra biblioteca deverá ser registrada antes da implementação definitiva da navegação.

A preferência inicial será utilizar Expo Router por oferecer:

* navegação baseada em arquivos;
* organização clara das rotas;
* suporte ao ecossistema Expo;
* possibilidade de expansão futura para outras plataformas.

### 4.3 Backend e banco de dados

* Supabase;
* PostgreSQL;
* Supabase Auth;
* Row Level Security;
* Supabase Storage quando necessário;
* funções de backend para operações sensíveis.

### 4.4 Versionamento

* Git;
* GitHub;
* branches para alterações relevantes;
* commits pequenos e descritivos;
* pull requests quando o Codex realizar tarefas maiores.

### 4.5 Inteligência artificial

A integração futura utilizará a API da OpenAI por meio de uma camada segura de backend.

O aplicativo móvel não deverá acessar diretamente serviços que exijam chaves secretas.

---

## 5. Modelo arquitetural escolhido

O Nexus Finance utilizará uma arquitetura modular inspirada em princípios de:

* arquitetura em camadas;
* Clean Architecture;
* organização por funcionalidades;
* domínio isolado;
* repositórios;
* casos de uso.

Não será implementada uma Clean Architecture completa e excessivamente abstrata na primeira versão.

Serão adotados apenas os princípios que tragam benefícios reais para:

* organização;
* segurança;
* testes;
* aprendizado;
* manutenção;
* crescimento do projeto.

---

## 6. Organização por funcionalidades

O projeto deverá ser organizado principalmente por funcionalidades.

Exemplo:

```text
src/
├── features/
│   ├── auth/
│   ├── financial-spaces/
│   ├── members/
│   ├── accounts/
│   ├── categories/
│   ├── transactions/
│   └── dashboard/
│
├── shared/
├── services/
├── domain/
├── infrastructure/
├── hooks/
├── store/
├── types/
├── utils/
└── config/
```

Cada funcionalidade deverá conter apenas os arquivos relacionados à sua responsabilidade.

Exemplo:

```text
features/
└── transactions/
    ├── components/
    ├── screens/
    ├── hooks/
    ├── services/
    ├── schemas/
    ├── types/
    └── utils/
```

Essa organização facilita:

* localizar arquivos;
* compreender uma funcionalidade;
* delegar tarefas ao Codex;
* evitar pastas globais excessivamente grandes;
* remover ou alterar módulos no futuro.

---

## 7. Estrutura inicial recomendada

```text
nexus-finance/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── cadastro.tsx
│   │   └── recuperar-senha.tsx
│   │
│   └── (app)/
│       ├── _layout.tsx
│       ├── dashboard.tsx
│       ├── movimentacoes.tsx
│       ├── contas.tsx
│       ├── categorias.tsx
│       └── configuracoes.tsx
│
├── src/
│   ├── features/
│   │   ├── auth/
│   │   ├── financial-spaces/
│   │   ├── members/
│   │   ├── accounts/
│   │   ├── categories/
│   │   ├── transactions/
│   │   └── dashboard/
│   │
│   ├── domain/
│   │   ├── entities/
│   │   ├── rules/
│   │   └── errors/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── formatters/
│   │   └── validators/
│   │
│   ├── services/
│   │   ├── supabase/
│   │   └── storage/
│   │
│   ├── repositories/
│   ├── hooks/
│   ├── store/
│   ├── types/
│   ├── utils/
│   └── config/
│
├── docs/
├── assets/
├── tests/
├── .env.example
├── .gitignore
├── AGENTS.md
├── README.md
├── app.json
├── package.json
└── tsconfig.json
```

Essa estrutura poderá ser criada gradualmente.

Não será necessário criar todas as pastas antes de elas possuírem uma função real.

---

## 8. Responsabilidade da pasta `app`

A pasta `app` será responsável pelas rotas e pela composição das telas.

Ela não deverá conter regras financeiras complexas.

Uma rota poderá:

* importar uma tela;
* receber parâmetros;
* definir cabeçalho;
* verificar autenticação;
* organizar navegação.

Ela não deverá:

* calcular saldos;
* alterar diretamente diversas tabelas;
* decidir permissões;
* implementar regras de transferência;
* conter consultas extensas ao banco;
* armazenar chaves secretas.

Exemplo conceitual:

```text
app/(app)/movimentacoes.tsx
        ↓
TransactionsScreen
        ↓
useTransactions
        ↓
TransactionRepository
        ↓
Supabase
```

---

## 9. Camada de interface

A camada de interface será composta por:

* telas;
* componentes;
* formulários;
* botões;
* modais;
* mensagens;
* indicadores de carregamento;
* tratamento visual de erros.

Sua responsabilidade será:

* exibir dados;
* coletar entradas;
* chamar casos de uso;
* informar sucesso ou erro;
* controlar estados exclusivamente visuais.

Exemplos de estado visual:

* modal aberto;
* campo selecionado;
* aba ativa;
* carregamento local;
* mensagem de erro do formulário.

A interface não deverá calcular o resultado financeiro consolidado nem determinar sozinha se um usuário possui acesso a determinado Espaço Financeiro.

---

## 10. Componentes compartilhados

Componentes genéricos deverão ficar em:

```text
src/shared/components/
```

Exemplos:

* `Button`;
* `Input`;
* `CurrencyInput`;
* `DateInput`;
* `Card`;
* `Modal`;
* `EmptyState`;
* `LoadingIndicator`;
* `ErrorMessage`;
* `Avatar`;
* `Badge`;
* `ScreenContainer`.

Um componente deverá ser compartilhado apenas quando realmente puder ser utilizado por diferentes funcionalidades.

Componentes específicos deverão permanecer dentro do módulo correspondente.

Exemplo:

```text
src/features/transactions/components/TransactionCard.tsx
```

---

## 11. Camada de casos de uso

Casos de uso representam ações completas do sistema.

Exemplos:

```text
CreateTransaction
UpdateTransaction
CancelTransaction
CreateTransfer
CreateAccount
CreateFinancialSpace
InviteMember
CalculateDashboard
```

Um caso de uso deverá:

1. receber dados;
2. validar requisitos;
3. verificar regras de negócio;
4. chamar um ou mais repositórios;
5. retornar um resultado previsível;
6. transformar erros técnicos em erros compreensíveis.

Exemplo conceitual:

```text
Formulário de despesa
        ↓
CreateExpenseUseCase
        ↓
Validação
        ↓
TransactionRepository
        ↓
Banco de dados
```

A interface não deverá reproduzir a mesma sequência manualmente.

---

## 12. Camada de domínio

O domínio representa o conhecimento financeiro do sistema.

Ele deverá conter:

* entidades;
* tipos;
* regras de negócio;
* validações;
* erros de domínio;
* cálculos financeiros puros.

Exemplos de regras pertencentes ao domínio:

* uma transferência não pode utilizar a mesma conta como origem e destino;
* uma despesa deve possuir valor positivo;
* uma movimentação cancelada não deve afetar o saldo;
* uma transferência interna não é receita nem despesa;
* o saldo inicial deve ser considerado no saldo atual;
* um usuário deve pertencer ao espaço da movimentação;
* uma categoria deve aceitar o tipo da movimentação;
* uma conta inativa não deve receber novos lançamentos comuns;
* uma movimentação deve possuir data válida;
* valores financeiros não devem utilizar cálculos imprecisos.

O domínio deverá evitar dependência direta de:

* componentes React;
* navegação;
* Supabase;
* APIs externas;
* recursos visuais.

Isso permitirá testar as regras sem abrir o aplicativo.

---

## 13. Entidades principais

As entidades iniciais serão:

```text
UserProfile
FinancialSpace
FinancialSpaceMember
FinancialAccount
Category
FinancialTransaction
Transfer
```

Entidades futuras:

```text
CreditCard
CreditCardInvoice
Installment
Budget
FinancialGoal
Receipt
ReceiptItem
RecurringTransaction
Investment
AIAnalysis
```

A definição detalhada dessas entidades será registrada em `docs/03-modelo-de-dados.md`.

---

## 14. Repositórios

Repositórios serão responsáveis por acessar e persistir dados.

Exemplos:

```text
AuthRepository
FinancialSpaceRepository
MemberRepository
AccountRepository
CategoryRepository
TransactionRepository
DashboardRepository
```

A interface e os casos de uso não deverão conhecer detalhes desnecessários do Supabase.

Exemplo:

```text
TransactionRepository.create(...)
```

Em vez de espalhar chamadas diretas como:

```text
supabase.from("transactions").insert(...)
```

por diferentes telas.

### Benefícios

* centralização do acesso ao banco;
* menor duplicação;
* facilidade de testes;
* tratamento padronizado de erros;
* possibilidade futura de trocar ou complementar a fonte de dados;
* maior clareza para o Codex.

---

## 15. Serviços externos

Integrações externas deverão ficar isoladas.

Exemplos:

```text
src/services/supabase/
src/services/openai/
src/services/storage/
src/services/notifications/
```

Na Versão 1, o serviço principal será o Supabase.

No futuro, poderão existir serviços para:

* OpenAI;
* leitura de imagens;
* notificações;
* exportação de arquivos;
* importação de extratos;
* análise de documentos.

Nenhum serviço externo deverá ser chamado diretamente por dezenas de componentes.

---

## 16. Fluxo de dados

O fluxo principal deverá seguir esta direção:

```text
Tela
  ↓
Hook ou controlador da funcionalidade
  ↓
Caso de uso
  ↓
Regra de domínio
  ↓
Repositório
  ↓
Supabase
```

A resposta seguirá o caminho inverso:

```text
Supabase
  ↓
Repositório
  ↓
Caso de uso
  ↓
Hook
  ↓
Tela atualizada
```

Esse fluxo deverá ser previsível e rastreável.

---

## 17. Exemplo: cadastro de despesa

```text
1. Usuário preenche o formulário.
2. A interface valida os campos obrigatórios.
3. O hook chama o caso de uso de criação.
4. O caso de uso valida as regras financeiras.
5. O repositório envia os dados ao Supabase.
6. O banco valida permissões com RLS.
7. A movimentação é criada.
8. O aplicativo atualiza a lista e o painel.
9. O usuário recebe confirmação.
```

A validação deverá acontecer em mais de uma camada quando necessário.

Exemplo:

* interface: evita formulário incompleto;
* domínio: protege as regras de negócio;
* banco: garante integridade e permissão.

---

## 18. Exemplo: transferência entre contas

A transferência é uma operação crítica.

Fluxo:

```text
1. Usuário escolhe conta de origem.
2. Usuário escolhe conta de destino.
3. Usuário informa valor e data.
4. O sistema verifica se as contas são diferentes.
5. O sistema verifica se pertencem ao mesmo espaço.
6. O sistema registra a operação de forma atômica.
7. O saldo da origem é reduzido.
8. O saldo do destino é aumentado.
9. A transferência não entra como receita ou despesa.
```

A operação não deverá depender de duas inserções independentes realizadas pela tela.

O banco deverá impedir que apenas metade da transferência seja registrada.

A implementação poderá utilizar:

* função transacional no banco;
* função RPC do PostgreSQL;
* função segura de backend.

A escolha definitiva será registrada antes da implementação.

---

## 19. Cálculo de saldos

O saldo atual de uma conta deverá ser calculado a partir de:

```text
Saldo atual
=
Saldo inicial
+
Receitas confirmadas
-
Despesas confirmadas
+
Transferências recebidas
-
Transferências enviadas
+
Ajustes positivos
-
Ajustes negativos
```

Movimentações pendentes ou canceladas não deverão alterar o saldo confirmado.

O sistema poderá apresentar futuramente:

* saldo confirmado;
* saldo previsto;
* saldo disponível.

Na Versão 1, o indicador principal será o saldo confirmado.

---

## 20. Estratégia de persistência dos saldos

A fonte principal da verdade deverá ser o histórico de movimentações.

O saldo não deverá ser alterado arbitrariamente em vários pontos do aplicativo.

Duas alternativas serão avaliadas:

### Alternativa A — Saldo calculado

O saldo é calculado sempre a partir das movimentações.

Vantagens:

* histórico confiável;
* menor risco de divergência;
* maior facilidade de auditoria.

Limitações:

* consultas podem ficar mais pesadas com grandes volumes.

### Alternativa B — Saldo armazenado

O saldo atual é mantido em um campo da conta.

Vantagens:

* leitura mais rápida.

Limitações:

* risco de divergência;
* exige transações e controles adicionais.

### Decisão inicial

Na Versão 1, as movimentações serão a fonte da verdade.

Poderá existir uma visão, função ou campo derivado para otimizar consultas, desde que seja atualizado por uma operação segura e centralizada.

Nenhuma tela poderá alterar diretamente um saldo sem registrar a movimentação correspondente.

---

## 21. Tratamento de valores monetários

Valores financeiros exigem cuidado com precisão numérica.

O sistema deverá seguir uma única estratégia de representação.

Alternativas possíveis:

### Centavos como número inteiro

```text
R$ 186,42 = 18642 centavos
```

### Tipo decimal no banco

```text
numeric(14,2)
```

A definição definitiva será registrada no modelo de dados.

Independentemente da escolha:

* cálculos não deverão utilizar valores monetários de forma imprecisa;
* conversões deverão ser centralizadas;
* formatação não deverá ser confundida com armazenamento;
* valores negativos deverão ser utilizados apenas quando a regra permitir.

---

## 22. Estado local e estado remoto

O projeto deverá diferenciar dois tipos de estado.

### Estado local

Pertence à interface.

Exemplos:

* modal aberto;
* texto digitado;
* filtro selecionado;
* aba ativa.

### Estado remoto

Origina-se no banco ou em uma API.

Exemplos:

* contas;
* movimentações;
* categorias;
* membros;
* saldo;
* painel.

Dados remotos deverão ser obtidos e atualizados por uma camada apropriada de consulta.

Não deverão ser duplicados indiscriminadamente em diferentes estados globais.

---

## 23. Gerenciamento de estado

O projeto não adotará uma biblioteca global complexa antes que exista necessidade real.

A estratégia inicial poderá utilizar:

* estado local do React;
* Context para sessão e espaço ativo;
* hooks personalizados;
* biblioteca de consulta e cache para dados remotos, quando implementada.

Possíveis contextos iniciais:

```text
AuthContext
ActiveFinancialSpaceContext
ThemeContext
```

Dados financeiros não deverão ser concentrados em um único contexto global gigante.

---

## 24. Autenticação

A autenticação será responsabilidade do Supabase Auth.

Fluxos planejados:

* cadastro;
* login;
* logout;
* restauração de sessão;
* recuperação de senha;
* proteção de rotas.

A sessão deverá ser restaurada ao abrir o aplicativo.

Rotas privadas somente poderão ser acessadas quando existir uma sessão válida.

O perfil financeiro do usuário será relacionado ao identificador do usuário autenticado.

---

## 25. Autorização

Autenticação responde:

> Quem é o usuário?

Autorização responde:

> O que esse usuário pode fazer?

A autorização deverá considerar:

* usuário autenticado;
* Espaço Financeiro;
* vínculo como membro;
* papel do membro;
* propriedade ou responsabilidade do registro;
* regras específicas da operação.

A interface poderá ocultar ações sem permissão, mas essa ocultação não será considerada proteção suficiente.

A permissão deverá ser validada no banco ou no backend.

---

## 26. Row Level Security

Todas as tabelas financeiras expostas ao aplicativo deverão utilizar políticas de Row Level Security.

As políticas deverão garantir que:

* um usuário visualize apenas espaços dos quais participa;
* contas sejam acessadas apenas por membros autorizados;
* movimentações sejam acessadas dentro do espaço permitido;
* usuários sem vínculo não consultem dados;
* ações administrativas exijam papel apropriado;
* exclusões e alterações respeitem permissões.

A chave pública utilizada pelo aplicativo não deverá conceder acesso irrestrito ao banco.

Chaves administrativas deverão permanecer exclusivamente em ambiente seguro de backend.

---

## 27. Espaço Financeiro ativo

O aplicativo poderá permitir participação em vários espaços.

Entretanto, apenas um espaço será considerado ativo na interface por vez.

O espaço ativo determinará:

* contas exibidas;
* categorias;
* movimentações;
* membros;
* painéis;
* permissões.

A seleção do espaço ativo poderá ser armazenada localmente, mas deverá sempre ser validada contra os vínculos existentes no banco.

---

## 28. Tratamento de erros

Os erros deverão ser classificados.

### Erros de validação

Exemplo:

```text
O valor deve ser maior que zero.
```

### Erros de domínio

Exemplo:

```text
A conta de origem e a conta de destino devem ser diferentes.
```

### Erros de permissão

Exemplo:

```text
Você não possui permissão para editar esta conta.
```

### Erros de infraestrutura

Exemplo:

```text
Não foi possível conectar ao servidor.
```

### Erros inesperados

Exemplo:

```text
Ocorreu um erro inesperado. Tente novamente.
```

Mensagens técnicas não deverão ser exibidas diretamente ao usuário.

Detalhes técnicos poderão ser registrados durante o desenvolvimento.

---

## 29. Validação de formulários

Os formulários deverão possuir validações declarativas e reutilizáveis.

Exemplos:

* e-mail válido;
* senha dentro dos requisitos;
* nome obrigatório;
* valor maior que zero;
* data válida;
* conta selecionada;
* categoria compatível;
* descrição dentro do limite;
* origem diferente do destino.

As regras visuais do formulário não deverão substituir as regras do domínio ou do banco.

---

## 30. Configuração por ambiente

Variáveis de ambiente serão utilizadas para valores de configuração.

Exemplos públicos:

```text
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
```

Somente valores apropriados para uso no cliente poderão utilizar prefixo público.

Segredos não deverão ser incluídos em variáveis expostas pelo aplicativo.

O repositório deverá possuir:

```text
.env.example
```

O arquivo real:

```text
.env
```

deverá permanecer no `.gitignore`.

---

## 31. Integração futura com inteligência artificial

A arquitetura deverá preparar a integração com IA sem implementá-la prematuramente.

Fluxo futuro previsto:

```text
Aplicativo envia imagem do recibo
        ↓
Storage seguro
        ↓
Função de backend
        ↓
API da OpenAI
        ↓
Resposta estruturada
        ↓
Validação
        ↓
Movimentação pendente
        ↓
Revisão do usuário
        ↓
Confirmação
```

A IA não deverá inserir movimentações confirmadas sem revisão humana na primeira implementação.

Os dados extraídos deverão ser tratados como sugestão até a confirmação.

---

## 32. Camada de inteligência artificial

Quando implementada, a integração com IA deverá possuir módulos separados para:

* envio de imagem;
* extração estruturada;
* validação do formato;
* categorização;
* associação com contas;
* criação de movimentação pendente;
* registro da confiança da extração;
* armazenamento do documento;
* auditoria da resposta.

O componente visual não deverá interpretar diretamente uma resposta textual livre da IA.

A resposta deverá seguir um formato estruturado e validável.

---

## 33. Segurança da API de IA

A chave da OpenAI:

* não deverá ser incluída no código do aplicativo;
* não deverá ser armazenada no repositório;
* não deverá ser enviada ao dispositivo;
* não deverá ser utilizada diretamente pelo React Native.

A chamada deverá ocorrer em ambiente seguro, como:

* função de backend;
* função serverless;
* Supabase Edge Function;
* servidor próprio futuro.

---

## 34. Estratégia de testes

Os testes serão introduzidos gradualmente.

### Testes unitários

Para regras puras:

* cálculo de saldo;
* validação de transferência;
* classificação de movimentação;
* filtros de período;
* consolidação individual e familiar.

### Testes de integração

Para verificar:

* repositórios;
* Supabase;
* permissões;
* transações;
* políticas RLS.

### Testes de interface

Para fluxos principais:

* login;
* cadastro de conta;
* cadastro de despesa;
* cadastro de receita;
* transferência;
* visualização do painel.

### Testes manuais

Serão realizados em dispositivo Android real durante todo o desenvolvimento.

---

## 35. Observabilidade e registros

Durante o desenvolvimento, erros relevantes poderão ser registrados no console.

Antes da publicação, deverá ser considerada uma solução apropriada de monitoramento.

Logs não deverão conter:

* senhas;
* tokens;
* chaves;
* dados financeiros completos;
* imagens privadas;
* informações pessoais desnecessárias.

---

## 36. Expo Go e builds de desenvolvimento

O Expo Go será utilizado nas etapas iniciais porque facilita:

* aprendizado;
* testes rápidos;
* visualização no dispositivo;
* atualização imediata.

Quando o projeto exigir bibliotecas nativas não incluídas no Expo Go, será criada uma development build.

A mudança não deverá ser antecipada sem necessidade concreta.

---

## 37. Estratégia de evolução

O desenvolvimento seguirá uma sequência incremental.

### Etapa 1 — Fundação

* estrutura do projeto;
* navegação;
* tema;
* componentes básicos;
* configuração do Supabase.

### Etapa 2 — Autenticação

* cadastro;
* login;
* sessão;
* logout;
* rotas protegidas.

### Etapa 3 — Espaços Financeiros

* criação;
* seleção;
* membros;
* papéis.

### Etapa 4 — Contas e categorias

* contas financeiras;
* categorias padrão;
* categorias personalizadas.

### Etapa 5 — Movimentações

* receita;
* despesa;
* ajuste;
* lista;
* filtros.

### Etapa 6 — Transferências

* operação segura;
* validações;
* histórico.

### Etapa 7 — Painéis

* individual;
* consolidado;
* categorias;
* períodos.

### Etapa 8 — Segurança e testes

* revisão das políticas;
* testes com usuários distintos;
* validação dos cálculos.

### Etapa 9 — Recursos futuros

* cartão;
* fatura;
* parcelamento;
* IA;
* recibos;
* notificações;
* versão web.

---

## 38. Regras para tarefas atribuídas ao Codex

Toda tarefa atribuída ao Codex deverá:

1. possuir objetivo específico;
2. indicar os arquivos envolvidos;
3. citar a documentação relevante;
4. proibir alterações fora do escopo;
5. exigir código tipado;
6. exigir tratamento de erros;
7. solicitar testes quando houver regra de negócio;
8. solicitar atualização da documentação quando necessário;
9. evitar dependências sem justificativa;
10. preservar a arquitetura existente.

Exemplo de tarefa adequada:

```text
Implemente o formulário de cadastro de conta financeira conforme
docs/01-prd.md e docs/02-arquitetura.md.

Não implemente movimentações.
Não altere autenticação.
Utilize os componentes compartilhados existentes.
Adicione validações e testes das regras da conta.
```

Exemplo de tarefa inadequada:

```text
Crie todo o aplicativo financeiro.
```

---

## 39. Regras para revisão de código

Antes de aceitar uma alteração, deverá ser verificado:

* o código atende ao requisito;
* a funcionalidade foi testada;
* não existem segredos no repositório;
* a regra financeira não está duplicada;
* a interface não contém lógica crítica;
* os tipos estão corretos;
* os erros são tratados;
* não existem dependências desnecessárias;
* as permissões foram consideradas;
* a documentação continua coerente;
* o código é compreensível pelo responsável do projeto.

---

## 40. Decisões adiadas

As seguintes decisões serão tomadas em documentos posteriores:

* modelo detalhado das tabelas;
* representação definitiva de valores monetários;
* estratégia exata para transferências atômicas;
* biblioteca de formulários;
* biblioteca de validação;
* biblioteca de cache de dados remotos;
* estratégia de funcionamento offline;
* design visual;
* política detalhada de permissões;
* formato de respostas da IA;
* estratégia de publicação.

Adiar essas decisões evita escolher ferramentas antes de compreender completamente a necessidade.

---

## 41. Arquitetura resumida

O Nexus Finance será um aplicativo React Native com Expo e TypeScript, conectado ao Supabase.

A aplicação será organizada por funcionalidades e dividida em:

```text
Interface
Casos de uso
Domínio
Repositórios
Infraestrutura
```

As telas serão responsáveis apenas pela interação com o usuário.

As regras financeiras ficarão isoladas da interface.

O acesso ao banco ocorrerá por repositórios.

A segurança será aplicada por autenticação, vínculos com Espaços Financeiros, papéis e políticas de Row Level Security.

Operações críticas, como transferências e integrações com inteligência artificial, serão processadas em ambiente seguro e centralizado.

A arquitetura deverá permanecer simples durante a primeira versão, mas preparada para crescimento, testes, automação e futura versão web.
