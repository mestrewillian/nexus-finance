# Nexus Finance — Interface e Experiência do Usuário

## 1. Objetivo deste documento

Este documento define a estrutura inicial da interface do Nexus Finance.

Seu objetivo é estabelecer:

* a navegação principal;
* as telas da Versão 1;
* os fluxos de uso;
* a hierarquia das informações;
* os componentes visuais;
* os estados de carregamento, erro e ausência de dados;
* os princípios de usabilidade;
* a forma como os dados individuais e consolidados serão apresentados.

A interface deverá refletir as regras definidas nos documentos:

* `docs/00-visao-geral.md`;
* `docs/01-prd.md`;
* `docs/02-arquitetura.md`;
* `docs/03-modelo-de-dados.md`;
* `docs/04-regras-de-negocio.md`.

---

# 2. Princípios da interface

A interface do Nexus Finance deverá seguir estes princípios:

1. simplicidade;
2. clareza;
3. poucas etapas para ações frequentes;
4. valores financeiros fáceis de identificar;
5. distinção visual entre receita, despesa e transferência;
6. confirmação antes de operações críticas;
7. mensagens de erro compreensíveis;
8. consistência entre telas;
9. prioridade para uso com uma mão;
10. boa legibilidade em telas pequenas;
11. acessibilidade;
12. navegação previsível;
13. ausência de informações desnecessárias;
14. destaque para o Espaço Financeiro ativo;
15. separação clara entre visão individual e consolidada;
16. automação sem perda de controle do usuário.

---

# 3. Público inicial

A primeira versão será utilizada inicialmente por Will e Annie.

Entretanto, a interface não deverá utilizar nomes fixos nem regras específicas da Família Zingoni.

Os textos e fluxos deverão funcionar para:

* pessoas solteiras;
* casais;
* famílias;
* pequenos grupos;
* futuros Espaços Financeiros empresariais ou de projeto.

---

# 4. Plataforma principal

A plataforma inicial será Android.

A interface deverá considerar:

* orientação vertical;
* uso em smartphones;
* diferentes tamanhos de tela;
* teclado virtual;
* áreas seguras do dispositivo;
* navegação por toque;
* modo claro e escuro futuramente;
* leitores de tela;
* contraste adequado.

A versão para tablet poderá funcionar de forma adaptada, mas não será prioridade na Versão 1.

---

# 5. Idioma e formatação

A primeira versão utilizará português do Brasil.

## 5.1 Moeda

Os valores serão exibidos no padrão brasileiro.

Exemplo:

```text
R$ 1.250,00
```

## 5.2 Datas

Formato principal:

```text
15/07/2026
```

Formato resumido em listas:

```text
15 jul.
```

## 5.3 Valores negativos

Despesas e saídas poderão ser apresentadas com sinal visual negativo.

Exemplo:

```text
- R$ 186,42
```

O valor armazenado no banco continuará positivo. O sinal será apenas uma representação visual baseada no tipo da movimentação.

## 5.4 Valores positivos

Receitas poderão aparecer como:

```text
+ R$ 3.500,00
```

## 5.5 Transferências

Transferências deverão utilizar ícone, texto ou sinalização própria, evitando parecer receita ou despesa.

Exemplo:

```text
Nubank → Mercado Pago
R$ 500,00
```

---

# 6. Estrutura geral da navegação

A aplicação será dividida em dois fluxos principais:

```text
Fluxo público
└── autenticação

Fluxo privado
└── aplicativo principal
```

## 6.1 Fluxo público

Inclui:

* apresentação inicial;
* login;
* cadastro;
* recuperação de senha.

## 6.2 Fluxo privado

Inclui:

* painel;
* movimentações;
* contas;
* categorias;
* membros;
* configurações;
* perfil.

---

# 7. Navegação principal

A navegação principal da área autenticada deverá utilizar uma barra inferior.

Abas iniciais recomendadas:

```text
Início
Movimentações
Adicionar
Contas
Mais
```

Representação conceitual:

```text
[ Início ] [ Movimentações ] [ + ] [ Contas ] [ Mais ]
```

## 7.1 Início

Abre o painel financeiro.

## 7.2 Movimentações

Abre o histórico completo.

## 7.3 Adicionar

Abre diretamente o fluxo de nova movimentação.

Esse botão deverá possuir maior destaque visual.

## 7.4 Contas

Abre a lista de contas e seus saldos.

## 7.5 Mais

Abre recursos menos utilizados, como:

* categorias;
* membros;
* Espaços Financeiros;
* perfil;
* configurações;
* sair.

---

# 8. Estrutura inicial de rotas

Estrutura conceitual com Expo Router:

```text
app/
├── _layout.tsx
├── index.tsx
│
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   ├── cadastro.tsx
│   └── recuperar-senha.tsx
│
└── (app)/
    ├── _layout.tsx
    │
    ├── (tabs)/
    │   ├── _layout.tsx
    │   ├── inicio.tsx
    │   ├── movimentacoes.tsx
    │   ├── adicionar.tsx
    │   ├── contas.tsx
    │   └── mais.tsx
    │
    ├── nova-movimentacao.tsx
    ├── movimentacao/
    │   └── [id].tsx
    ├── conta/
    │   └── [id].tsx
    ├── categorias.tsx
    ├── membros.tsx
    ├── espacos-financeiros.tsx
    ├── perfil.tsx
    └── configuracoes.tsx
```

Essa estrutura poderá ser refinada durante a implementação.

---

# 9. Tela inicial de carregamento

Ao abrir o aplicativo, o sistema deverá verificar:

* se existe sessão válida;
* se o perfil está disponível;
* quais espaços o usuário pode acessar;
* qual foi o último espaço ativo.

Durante essa verificação, deverá ser exibida uma tela de carregamento simples.

Elementos:

* logo;
* nome Nexus Finance;
* indicador de carregamento;
* mensagem curta opcional.

Exemplo:

```text
Nexus Finance

Preparando suas informações...
```

A tela não deverá permanecer indefinidamente sem tratamento de erro.

---

# 10. Tela de apresentação inicial

A tela de apresentação poderá ser exibida antes do login.

## 10.1 Objetivo

Explicar de forma breve o que o aplicativo faz.

## 10.2 Elementos

* logo do Nexus Finance;
* nome do aplicativo;
* frase principal;
* botão `Entrar`;
* botão `Criar conta`.

Texto inicial sugerido:

```text
Controle suas finanças pessoais e familiares em um só lugar.
```

A apresentação não deverá possuir muitos slides ou exigir navegação longa.

Na Versão 1, uma única tela será suficiente.

---

# 11. Tela de login

## 11.1 Objetivo

Permitir acesso ao aplicativo.

## 11.2 Campos

* e-mail;
* senha.

## 11.3 Ações

* entrar;
* mostrar ou ocultar senha;
* recuperar senha;
* ir para cadastro.

## 11.4 Validações

* e-mail obrigatório;
* formato válido de e-mail;
* senha obrigatória.

## 11.5 Estados

### Estado normal

Formulário disponível.

### Estado de carregamento

Botão desabilitado e indicador exibido.

### Credenciais incorretas

Mensagem:

```text
E-mail ou senha incorretos.
```

### Falha de conexão

Mensagem:

```text
Não foi possível acessar sua conta. Verifique sua conexão e tente novamente.
```

A mensagem técnica do Supabase não deverá ser exibida diretamente.

---

# 12. Tela de cadastro

## 12.1 Objetivo

Criar uma conta de usuário.

## 12.2 Campos

* nome completo;
* e-mail;
* senha;
* confirmação de senha.

## 12.3 Validações

* nome obrigatório;
* e-mail válido;
* senha dentro dos requisitos;
* confirmação igual à senha;
* aceite de termos futuramente.

## 12.4 Ações

* criar conta;
* retornar ao login.

## 12.5 Após o cadastro

O sistema poderá:

1. criar o usuário;
2. criar o perfil;
3. verificar necessidade de confirmação de e-mail;
4. direcionar para o fluxo inicial.

Se o e-mail precisar de confirmação, deverá ser exibida uma mensagem clara.

Exemplo:

```text
Enviamos uma confirmação para seu e-mail.
```

---

# 13. Tela de recuperação de senha

## 13.1 Campos

* e-mail.

## 13.2 Ações

* enviar instruções;
* voltar ao login.

## 13.3 Mensagem de sucesso

```text
Se o e-mail estiver cadastrado, enviaremos as instruções de recuperação.
```

A mensagem deverá evitar confirmar publicamente se um e-mail existe no sistema.

---

# 14. Fluxo de primeiro acesso

Depois do primeiro login, o sistema deverá verificar se o usuário participa de algum Espaço Financeiro.

## 14.1 Usuário sem espaço

Deverá ver uma tela com opções:

```text
Criar um Espaço Financeiro
Aceitar um convite
```

## 14.2 Usuário com convite pendente

O convite poderá ser apresentado em destaque.

## 14.3 Usuário com espaço ativo

Será direcionado ao painel.

---

# 15. Tela de criação de Espaço Financeiro

## 15.1 Objetivo

Criar o primeiro ambiente financeiro do usuário.

## 15.2 Campos

* nome;
* tipo do espaço.

## 15.3 Tipos iniciais

* pessoal;
* familiar;
* empresarial;
* projeto;
* outro.

## 15.4 Valores iniciais sugeridos

Para facilitar o uso, o sistema poderá sugerir:

```text
Meu espaço pessoal
Minha família
```

## 15.5 Ações

* criar espaço;
* cancelar.

## 15.6 Após a criação

O usuário criador:

* torna-se administrador;
* entra automaticamente no espaço;
* é direcionado para cadastrar a primeira conta.

---

# 16. Tela de convite pendente

## 16.1 Informações

* nome do espaço;
* pessoa que convidou;
* papel proposto;
* data do convite;
* validade, quando existente.

## 16.2 Ações

* aceitar;
* recusar.

## 16.3 Confirmação

Antes de aceitar:

```text
Deseja entrar no Espaço Financeiro “Família Zingoni”?
```

---

# 17. Seletor de Espaço Financeiro

O espaço ativo deverá estar claramente identificado.

## 17.1 Localização

O seletor poderá aparecer:

* no cabeçalho do painel;
* no menu `Mais`;
* em um modal acionado pelo nome do espaço.

## 17.2 Exemplo

```text
Família Zingoni
▼
```

## 17.3 Ao tocar

O sistema exibirá:

* lista de espaços disponíveis;
* indicação do espaço ativo;
* opção de criar novo espaço;
* opção de gerenciar espaços.

## 17.4 Troca de espaço

Ao trocar:

* contas deverão ser recarregadas;
* categorias deverão ser atualizadas;
* movimentações deverão ser atualizadas;
* painel deverá refletir apenas o novo espaço;
* permissões deverão ser reavaliadas.

---

# 18. Tela inicial — Painel

## 18.1 Objetivo

Apresentar um resumo rápido da situação financeira.

## 18.2 Cabeçalho

Deverá conter:

* saudação;
* nome do usuário;
* Espaço Financeiro ativo;
* seletor de período;
* acesso a notificações futuramente.

Exemplo:

```text
Olá, Will

Família Zingoni
Julho de 2026
```

## 18.3 Indicadores principais

O painel deverá mostrar:

* saldo total;
* receitas;
* despesas;
* resultado do período.

Exemplo:

```text
Saldo total
R$ 8.450,00

Receitas
R$ 6.200,00

Despesas
R$ 4.870,00

Resultado
R$ 1.330,00
```

## 18.4 Visão selecionada

O usuário deverá poder alternar entre:

```text
Consolidado
Individual
```

Na visão individual, o usuário poderá selecionar um membro autorizado.

## 18.5 Movimentações recentes

Mostrar de três a cinco movimentações recentes.

Cada movimentação deverá exibir:

* descrição;
* categoria;
* data;
* responsável;
* valor;
* tipo;
* status quando não confirmado.

## 18.6 Gastos por categoria

Exibir resumo das principais categorias do período.

Inicialmente, poderá ser uma lista com barras proporcionais.

Exemplo:

```text
Alimentação      R$ 1.250,00
Moradia          R$ 900,00
Transporte       R$ 620,00
```

## 18.7 Comparação entre membros

No painel consolidado poderá aparecer:

```text
Will       R$ 2.400,00 em despesas
Annie      R$ 1.850,00 em despesas
```

A comparação deverá ser informativa e não julgadora.

## 18.8 Ações rápidas

O painel poderá oferecer:

* adicionar despesa;
* adicionar receita;
* realizar transferência;
* ver todas as movimentações.

---

# 19. Privacidade visual dos valores

O painel poderá possuir um botão para ocultar valores.

Exemplo:

```text
R$ ••••••
```

Essa configuração será apenas visual.

Não substituirá autenticação ou segurança.

O estado poderá permanecer ativo durante a sessão.

---

# 20. Seletor de período

## 20.1 Opções rápidas

* mês atual;
* mês anterior;
* período personalizado.

## 20.2 Exibição

Exemplo:

```text
Julho de 2026
```

## 20.3 Período personalizado

Deverá permitir:

* data inicial;
* data final;
* aplicar;
* limpar.

## 20.4 Validações

* data final não pode ser anterior à inicial;
* ambas as datas devem ser válidas.

---

# 21. Tela de movimentações

## 21.1 Objetivo

Exibir o histórico financeiro do Espaço Financeiro ativo.

## 21.2 Cabeçalho

* título;
* pesquisa;
* filtros;
* botão de adicionar.

## 21.3 Agrupamento

As movimentações poderão ser agrupadas por data.

Exemplo:

```text
Hoje

Supermercado São Cristóvão
Alimentação
- R$ 186,42

Transferência para Mercado Pago
R$ 500,00
```

## 21.4 Informações por item

Cada item deverá mostrar:

* descrição;
* valor;
* data;
* categoria;
* tipo;
* responsável;
* status.

## 21.5 Status visual

### Pendente

Badge:

```text
Pendente
```

### Cancelada

O item poderá aparecer com menor destaque e badge:

```text
Cancelada
```

### Confirmada

Não será obrigatório mostrar badge, para reduzir poluição visual.

## 21.6 Ação ao tocar

Abrir os detalhes da movimentação.

---

# 22. Filtros de movimentações

Filtros iniciais:

* período;
* tipo;
* status;
* conta;
* categoria;
* responsável.

## 22.1 Exibição

Os filtros poderão abrir em um painel inferior ou modal.

## 22.2 Indicador ativo

Quando houver filtros aplicados, a tela deverá sinalizar.

Exemplo:

```text
Filtros (2)
```

## 22.3 Limpar filtros

Deverá existir ação:

```text
Limpar filtros
```

---

# 23. Pesquisa de movimentações

A pesquisa poderá considerar:

* descrição;
* categoria;
* observação;
* nome do responsável.

A pesquisa por estabelecimento será incluída futuramente quando esse dado possuir campo próprio.

---

# 24. Tela de nova movimentação

## 24.1 Objetivo

Registrar uma receita, despesa, transferência ou ajuste.

## 24.2 Seleção de tipo

No início do fluxo, o usuário deverá escolher:

```text
Despesa
Receita
Transferência
Ajuste
```

Como despesas serão provavelmente a ação mais frequente, poderão aparecer primeiro.

## 24.3 Formulário dinâmico

Os campos deverão mudar de acordo com o tipo selecionado.

A interface não deverá mostrar campos irrelevantes.

---

# 25. Formulário de despesa

## 25.1 Campos

* valor;
* descrição;
* conta de origem;
* categoria;
* responsável;
* data;
* observação opcional;
* status.

## 25.2 Ordem recomendada

```text
Valor
Descrição
Conta
Categoria
Responsável
Data
Observação
Status
```

## 25.3 Valor em destaque

O valor deverá ser o primeiro campo e possuir destaque visual.

Exemplo:

```text
R$ 0,00
```

## 25.4 Valor padrão do status

Para lançamento manual comum:

```text
Confirmada
```

O usuário poderá escolher pendente quando necessário.

## 25.5 Botão principal

```text
Salvar despesa
```

## 25.6 Alerta de saldo negativo

Quando aplicável:

```text
Esta despesa deixará a conta com saldo negativo.
```

O alerta não bloqueará obrigatoriamente o salvamento.

---

# 26. Formulário de receita

## 26.1 Campos

* valor;
* descrição;
* conta de destino;
* categoria;
* responsável;
* data;
* observação opcional;
* status.

## 26.2 Botão principal

```text
Salvar receita
```

---

# 27. Formulário de transferência

## 27.1 Campos

* valor;
* conta de origem;
* conta de destino;
* descrição;
* responsável;
* data;
* observação opcional;
* status.

## 27.2 Conta de origem e destino

Devem possuir seletores separados.

Exemplo:

```text
De: Nubank Will
Para: Mercado Pago Will
```

## 27.3 Bloqueio visual

A mesma conta não poderá ser selecionada nas duas posições.

## 27.4 Informação auxiliar

```text
Transferências não alteram receitas nem despesas.
```

## 27.5 Botão principal

```text
Confirmar transferência
```

---

# 28. Formulário de ajuste de saldo

## 28.1 Campos

* conta;
* direção;
* valor;
* descrição;
* motivo ou observação;
* data;
* status.

## 28.2 Direção

Opções:

```text
Aumentar saldo
Reduzir saldo
```

## 28.3 Informação auxiliar

```text
Use ajustes apenas para corrigir diferenças entre o saldo real e o saldo registrado.
```

## 28.4 Botão principal

```text
Salvar ajuste
```

---

# 29. Seletores nos formulários

Seletores de conta, categoria e responsável deverão:

* permitir pesquisa quando houver muitos itens;
* mostrar apenas opções disponíveis;
* indicar itens inativos quando visualizados em histórico;
* respeitar o Espaço Financeiro ativo;
* bloquear itens incompatíveis.

## 29.1 Seletor de conta

Exibir:

* nome;
* tipo;
* responsável;
* saldo atual opcional.

## 29.2 Seletor de categoria

Exibir:

* ícone;
* nome;
* tipo compatível.

## 29.3 Seletor de responsável

Exibir:

* avatar;
* nome;
* papel opcional.

---

# 30. Confirmação de salvamento

Após salvar uma movimentação, o sistema deverá:

* mostrar confirmação;
* atualizar os dados;
* retornar para a tela anterior ou abrir o detalhe;
* evitar salvamentos duplicados.

Mensagem:

```text
Movimentação salva com sucesso.
```

O botão deverá ficar desabilitado durante o processamento.

---

# 31. Tela de detalhes da movimentação

## 31.1 Informações

* tipo;
* status;
* valor;
* descrição;
* data;
* categoria;
* conta de origem;
* conta de destino;
* responsável;
* usuário criador;
* observação;
* data de criação;
* data de atualização.

## 31.2 Itens opcionais

Quando existirem:

```text
Ver itens da compra
```

## 31.3 Ações

Conforme permissão:

* editar;
* confirmar, quando pendente;
* cancelar;
* duplicar futuramente.

## 31.4 Movimentação cancelada

Deverá exibir claramente:

```text
Esta movimentação foi cancelada e não afeta os saldos.
```

---

# 32. Cancelamento de movimentação

Antes de cancelar, deverá ser exibida confirmação.

Exemplo:

```text
Cancelar movimentação?

Ela permanecerá no histórico, mas deixará de afetar os saldos.
```

Ações:

```text
Voltar
Cancelar movimentação
```

A ação destrutiva deverá possuir destaque visual apropriado.

---

# 33. Edição de movimentação

O formulário de edição deverá carregar os dados existentes.

Mudanças críticas deverão exibir aviso quando necessário.

Exemplo:

```text
Alterar a conta atualizará o saldo das contas envolvidas.
```

Transferências deverão ser editadas como uma única operação.

---

# 34. Tela de contas

## 34.1 Objetivo

Exibir todas as contas do espaço e seus saldos.

## 34.2 Cabeçalho

* título;
* saldo total;
* botão para nova conta.

## 34.3 Cada conta deverá mostrar

* nome;
* tipo;
* responsável;
* saldo confirmado;
* status.

## 34.4 Agrupamentos possíveis

* contas pessoais;
* contas compartilhadas;
* contas inativas.

## 34.5 Conta inativa

Deverá possuir identificação visual e menor destaque.

---

# 35. Tela de cadastro de conta

## 35.1 Campos

* nome;
* tipo;
* saldo inicial;
* responsável opcional;
* moeda;
* status ativo.

## 35.2 Tipos

* conta corrente;
* poupança;
* dinheiro;
* carteira digital;
* investimento;
* outra.

## 35.3 Informação sobre saldo inicial

```text
Informe o saldo existente na conta no momento em que ela começa a ser controlada pelo Nexus Finance.
```

## 35.4 Botão principal

```text
Criar conta
```

---

# 36. Tela de detalhes da conta

## 36.1 Informações

* nome;
* tipo;
* responsável;
* saldo atual;
* saldo inicial;
* status;
* data de criação.

## 36.2 Conteúdo

* movimentações recentes da conta;
* entradas;
* saídas;
* transferências;
* ajustes.

## 36.3 Ações

* editar conta;
* inativar;
* reativar;
* ver todas as movimentações.

## 36.4 Alerta de inativação

Se houver saldo:

```text
Esta conta possui saldo de R$ 350,00. Deseja realmente inativá-la?
```

---

# 37. Tela de categorias

## 37.1 Objetivo

Visualizar e administrar categorias.

## 37.2 Abas

```text
Despesas
Receitas
```

Categorias do tipo `both` poderão aparecer nas duas.

## 37.3 Informações

* ícone;
* nome;
* origem: sistema ou personalizada;
* status.

## 37.4 Ações

* criar categoria;
* editar categoria personalizada;
* inativar;
* reativar.

Categorias do sistema deverão ser somente leitura.

---

# 38. Tela de cadastro de categoria

## 38.1 Campos

* nome;
* tipo;
* ícone opcional;
* cor opcional;
* status.

## 38.2 Tipos

* receita;
* despesa;
* ambos.

## 38.3 Botão principal

```text
Criar categoria
```

---

# 39. Tela de membros

## 39.1 Objetivo

Mostrar os participantes do Espaço Financeiro.

## 39.2 Informações por membro

* avatar;
* nome;
* e-mail quando permitido;
* papel;
* status.

## 39.3 Ações do administrador

* convidar;
* alterar papel;
* remover membro.

## 39.4 Ações do membro comum

* visualizar participantes;
* acessar o próprio perfil.

---

# 40. Tela de convite de membro

## 40.1 Campos

* e-mail;
* papel.

## 40.2 Papéis

* administrador;
* membro.

## 40.3 Botão

```text
Enviar convite
```

## 40.4 Mensagens

Sucesso:

```text
Convite enviado.
```

Convite duplicado:

```text
Já existe um convite pendente para este e-mail.
```

Usuário já participante:

```text
Este usuário já participa do espaço.
```

---

# 41. Alteração de papel

Antes de promover ou rebaixar um membro, o sistema deverá confirmar.

Exemplo:

```text
Deseja tornar Annie administradora deste espaço?
```

O último administrador não poderá ser rebaixado sem outro administrador ativo.

---

# 42. Remoção de membro

Confirmação:

```text
Remover este membro?

Ele perderá o acesso ao espaço, mas suas movimentações antigas permanecerão no histórico.
```

O sistema deverá impedir a remoção do último administrador.

---

# 43. Tela “Mais”

A tela `Mais` funcionará como menu secundário.

Itens iniciais:

* Espaços Financeiros;
* categorias;
* membros;
* perfil;
* configurações;
* ajuda;
* sobre o aplicativo;
* sair.

Itens sem implementação na Versão 1 poderão ser omitidos em vez de aparecerem desabilitados.

---

# 44. Tela de perfil

## 44.1 Informações

* imagem opcional;
* nome;
* e-mail;
* data de criação opcional.

## 44.2 Ações

* editar nome;
* alterar imagem futuramente;
* alterar senha;
* sair.

O e-mail poderá ser exibido, mas alterações deverão seguir fluxo seguro.

---

# 45. Tela de configurações

Configurações iniciais possíveis:

* ocultar valores;
* preferência de tema futuramente;
* espaço padrão;
* confirmação antes de cancelar;
* versão do aplicativo.

Não deverão ser criadas configurações sem utilidade real.

---

# 46. Estados vazios

Toda lista deverá possuir um estado vazio útil.

## 46.1 Sem contas

```text
Nenhuma conta cadastrada.

Cadastre sua primeira conta para começar a controlar seus saldos.
```

Ação:

```text
Criar conta
```

## 46.2 Sem movimentações

```text
Nenhuma movimentação neste período.
```

Ação:

```text
Adicionar movimentação
```

## 46.3 Sem membros

Na prática, o criador será sempre um membro.

Poderá ser exibido:

```text
Convide outra pessoa para compartilhar este Espaço Financeiro.
```

## 46.4 Sem resultados nos filtros

```text
Nenhuma movimentação encontrada com esses filtros.
```

Ação:

```text
Limpar filtros
```

---

# 47. Estados de carregamento

O aplicativo deverá utilizar indicadores adequados.

## 47.1 Carregamento inicial de tela

Poderá usar:

* indicador central;
* componentes esqueleto;
* texto curto.

## 47.2 Salvamento

O botão deverá indicar:

```text
Salvando...
```

## 47.3 Atualização

Ao atualizar listas, o conteúdo antigo poderá permanecer visível com indicador discreto.

O aplicativo deverá evitar telas piscando ou desaparecendo sem necessidade.

---

# 48. Estados de erro

## 48.1 Erro recuperável

Exemplo:

```text
Não foi possível carregar as movimentações.
```

Ação:

```text
Tentar novamente
```

## 48.2 Falta de conexão

```text
Você parece estar sem conexão.
```

## 48.3 Sessão expirada

```text
Sua sessão expirou. Entre novamente para continuar.
```

## 48.4 Sem permissão

```text
Você não possui permissão para acessar esta informação.
```

## 48.5 Erro inesperado

```text
Ocorreu um erro inesperado. Tente novamente.
```

Detalhes técnicos deverão permanecer em logs de desenvolvimento.

---

# 49. Feedback visual das ações

Toda ação importante deverá produzir resposta visual.

Exemplos:

* movimentação salva;
* conta criada;
* categoria atualizada;
* convite enviado;
* membro removido;
* operação cancelada;
* erro de validação.

O usuário não deverá ficar em dúvida sobre a conclusão da ação.

---

# 50. Botões

## 50.1 Botão principal

Usado para a ação mais importante da tela.

Exemplos:

* entrar;
* salvar despesa;
* criar conta;
* enviar convite.

## 50.2 Botão secundário

Usado para ações alternativas.

## 50.3 Botão destrutivo

Usado para:

* cancelar movimentação;
* remover membro;
* inativar conta.

A aparência deverá indicar risco sem depender apenas da cor.

## 50.4 Estado desabilitado

O botão deverá indicar claramente quando não pode ser utilizado.

---

# 51. Campos de formulário

Campos deverão possuir:

* rótulo visível;
* valor;
* mensagem de ajuda quando necessária;
* mensagem de erro;
* área de toque adequada.

Não será recomendado usar apenas texto de placeholder como rótulo.

Exemplo correto:

```text
Descrição
[ Supermercado São Cristóvão ]
```

---

# 52. Campo monetário

O campo de valor deverá:

* abrir teclado numérico;
* formatar em moeda;
* impedir caracteres inválidos;
* trabalhar internamente com centavos;
* aceitar correção simples;
* evitar valores duplicados por erro de máscara.

Exemplo:

```text
R$ 186,42
```

---

# 53. Campo de data

O campo deverá:

* mostrar a data atual por padrão;
* permitir selecionar outra data;
* impedir formato inválido;
* usar calendário compatível com Android.

Na Versão 1, lançamentos manuais deverão priorizar datas atuais ou passadas.

---

# 54. Acessibilidade

A interface deverá considerar:

* contraste suficiente;
* tamanhos de toque adequados;
* rótulos para leitores de tela;
* texto redimensionável;
* ícones acompanhados de significado textual quando necessário;
* não depender apenas de cor;
* ordem lógica de navegação;
* mensagens claras.

Valores de receita e despesa não deverão ser diferenciados exclusivamente por verde e vermelho.

Também deverão utilizar:

* sinal;
* ícone;
* texto;
* posição ou estilo.

---

# 55. Cores semânticas

A identidade visual será definida posteriormente.

Entretanto, a interface precisará de funções semânticas:

* cor principal;
* fundo;
* superfície;
* texto principal;
* texto secundário;
* borda;
* sucesso;
* atenção;
* erro;
* informação;
* receita;
* despesa;
* transferência;
* pendente;
* cancelada.

Os componentes deverão utilizar tokens de tema, evitando cores espalhadas diretamente pelo código.

---

# 56. Tipografia

A interface deverá usar hierarquia clara.

Exemplo:

```text
Título da tela
Seção
Valor principal
Texto normal
Texto auxiliar
Legenda
```

Valores financeiros importantes poderão possuir maior destaque.

Descrições longas não deverão competir visualmente com o valor.

---

# 57. Ícones

Ícones deverão possuir significado consistente.

Exemplos:

* seta para baixo ou saída: despesa;
* seta para cima ou entrada: receita;
* setas horizontais: transferência;
* ajuste: correção;
* relógio: pendente;
* bloqueio ou risco: cancelada.

Ícones decorativos não deverão substituir texto em ações ambíguas.

---

# 58. Componente de movimentação

Componente sugerido:

```text
[ícone] Supermercado São Cristóvão     - R$ 186,42
        Alimentação · Will
        15 jul.
```

Para transferência:

```text
[ícone] Nubank → Mercado Pago           R$ 500,00
        Transferência · Will
        15 jul.
```

Para pendente:

```text
[ícone] Supermercado                    - R$ 186,42
        Alimentação · Will · Pendente
        15 jul.
```

---

# 59. Componente de resumo financeiro

Exemplo:

```text
Receitas
R$ 6.200,00
```

```text
Despesas
R$ 4.870,00
```

```text
Resultado
R$ 1.330,00
```

Os componentes deverão manter o mesmo padrão entre o painel individual e consolidado.

---

# 60. Componente de conta

Exemplo:

```text
Nubank Will
Conta corrente

Saldo
R$ 2.450,00
```

Informações secundárias:

```text
Responsável: Will
```

---

# 61. Atualização de dados

As listas poderão permitir gesto de puxar para atualizar.

Após criar ou editar dados, a interface deverá atualizar automaticamente as informações afetadas.

Exemplos:

* lista de movimentações;
* saldo da conta;
* painel;
* gastos por categoria.

O usuário não deverá precisar fechar e abrir o aplicativo para visualizar alterações.

---

# 62. Prevenção de duplicidade

Durante salvamento:

* o botão deverá ficar desabilitado;
* toques repetidos não deverão gerar lançamentos duplicados;
* a navegação não deverá abrir várias telas iguais;
* operações críticas deverão possuir controle transacional.

---

# 63. Comportamento do botão voltar

O botão voltar do Android deverá:

* fechar modais antes de sair da tela;
* retornar ao formulário anterior quando apropriado;
* solicitar confirmação caso existam dados não salvos;
* evitar sair do aplicativo em etapas intermediárias sem aviso.

Exemplo:

```text
Descartar alterações?

Os dados preenchidos não foram salvos.
```

---

# 64. Fluxo de cadastro rápido de despesa

O fluxo ideal deverá permitir:

1. tocar em `Adicionar`;
2. selecionar `Despesa`;
3. informar o valor;
4. informar a descrição;
5. selecionar conta;
6. selecionar categoria;
7. confirmar.

Campos como responsável e data poderão possuir valores padrão inteligentes:

* responsável: usuário atual;
* data: hoje;
* status: confirmado.

Assim, o usuário somente altera quando necessário.

---

# 65. Valores padrão

Para reduzir esforço manual:

## 65.1 Responsável

Usuário autenticado.

## 65.2 Data

Data atual.

## 65.3 Status

Confirmada.

## 65.4 Espaço Financeiro

Espaço ativo.

## 65.5 Conta

O sistema poderá futuramente sugerir a última conta utilizada, mas essa automação não será obrigatória na Versão 1.

---

# 66. Revisão de dados gerados por IA

Embora a IA não faça parte do núcleo inicial, a interface deverá prever o fluxo futuro.

Exemplo:

```text
Recibo analisado

Estabelecimento:
Supermercado São Cristóvão

Total:
R$ 186,42

Data:
08/07/2026

Categoria sugerida:
Alimentação

15 itens identificados

[ Revisar itens ]
[ Confirmar movimentação ]
```

O usuário deverá poder editar todos os dados antes da confirmação.

---

# 67. Navegação futura para IA

O botão de adicionar poderá futuramente oferecer:

```text
Registrar manualmente
Escanear recibo
Importar comprovante
```

Na Versão 1, apenas o registro manual será implementado.

A interface não deverá exibir opções que ainda não funcionam, salvo em área claramente identificada como planejamento.

---

# 68. Fluxos principais consolidados

## 68.1 Primeiro uso

```text
Abrir aplicativo
→ Criar conta
→ Criar Espaço Financeiro
→ Criar primeira conta
→ Abrir painel
→ Criar primeira movimentação
```

## 68.2 Usuário convidado

```text
Criar conta ou entrar
→ Visualizar convite
→ Aceitar
→ Abrir Espaço Financeiro
→ Visualizar painel
```

## 68.3 Registrar despesa

```text
Adicionar
→ Despesa
→ Preencher
→ Salvar
→ Atualizar saldo e painel
```

## 68.4 Registrar receita

```text
Adicionar
→ Receita
→ Preencher
→ Salvar
→ Atualizar saldo e painel
```

## 68.5 Transferir

```text
Adicionar
→ Transferência
→ Escolher origem e destino
→ Informar valor
→ Confirmar
→ Atualizar as duas contas
```

## 68.6 Consultar dados individuais

```text
Início
→ Alternar para Individual
→ Selecionar membro
→ Visualizar indicadores
```

## 68.7 Consultar dados consolidados

```text
Início
→ Selecionar Consolidado
→ Escolher período
→ Visualizar totais
```

---

# 69. Telas obrigatórias da Versão 1

A Versão 1 deverá possuir, no mínimo:

1. carregamento inicial;
2. apresentação;
3. login;
4. cadastro;
5. recuperação de senha;
6. primeiro acesso;
7. criação de Espaço Financeiro;
8. seletor de espaço;
9. painel;
10. lista de movimentações;
11. nova movimentação;
12. detalhe da movimentação;
13. edição da movimentação;
14. lista de contas;
15. cadastro de conta;
16. detalhe da conta;
17. categorias;
18. cadastro de categoria;
19. membros;
20. convite de membro;
21. perfil;
22. menu `Mais`;
23. configurações básicas.

Algumas poderão ser implementadas como modais ou painéis inferiores, desde que o fluxo permaneça claro.

---

# 70. Prioridade das telas

## Prioridade 1 — Fundação

* carregamento;
* login;
* cadastro;
* navegação principal.

## Prioridade 2 — Primeiro uso

* criação de espaço;
* cadastro de conta;
* painel vazio.

## Prioridade 3 — Núcleo financeiro

* nova movimentação;
* lista;
* detalhes;
* edição;
* cancelamento.

## Prioridade 4 — Organização

* contas;
* categorias;
* membros;
* convites.

## Prioridade 5 — Análise

* painel individual;
* painel consolidado;
* filtros;
* períodos.

---

# 71. Critérios de qualidade da interface

Uma tela será considerada adequada quando:

* possuir objetivo claro;
* mostrar apenas ações relevantes;
* tiver estados de carregamento;
* tiver estado vazio;
* tratar erros;
* respeitar permissões;
* funcionar em Android real;
* possuir área de toque adequada;
* não exigir etapas desnecessárias;
* utilizar componentes consistentes;
* atualizar dados corretamente;
* permitir correção de erros;
* não expor informações técnicas.

---

# 72. Critérios de conclusão da interface da Versão 1

A interface será considerada funcionalmente concluída quando:

1. o usuário conseguir criar conta e entrar;
2. conseguir criar ou acessar um Espaço Financeiro;
3. conseguir cadastrar uma conta;
4. conseguir cadastrar receita;
5. conseguir cadastrar despesa;
6. conseguir realizar transferência;
7. conseguir visualizar e filtrar movimentações;
8. conseguir consultar detalhes;
9. conseguir editar ou cancelar conforme permissão;
10. conseguir visualizar saldo das contas;
11. conseguir alternar entre visão individual e consolidada;
12. conseguir convidar outro membro;
13. visualizar mensagens adequadas de sucesso e erro;
14. todos os fluxos essenciais funcionarem em dispositivo Android real;
15. nenhuma operação crítica depender apenas de elementos visuais para segurança.

---

# 73. Decisões adiadas

Serão definidas posteriormente:

* identidade visual definitiva;
* logotipo;
* paleta oficial;
* tipografia final;
* modo escuro;
* animações;
* onboarding com vários passos;
* notificações;
* funcionamento offline;
* widgets Android;
* layout para tablets;
* versão web;
* interface de cartões e faturas;
* interface de metas;
* interface de investimentos;
* chatbot financeiro;
* escaneamento de recibos.

---

# 74. Resumo da interface

A interface do Nexus Finance será organizada em torno de cinco áreas principais:

```text
Início
Movimentações
Adicionar
Contas
Mais
```

O usuário deverá conseguir registrar uma movimentação comum em poucos passos.

O painel apresentará visões individual e consolidada.

As telas deverão respeitar o Espaço Financeiro ativo, as permissões do usuário e as regras do domínio.

A experiência deverá ser simples para uso diário, mas preparada para receber futuramente automação, leitura de recibos e inteligência artificial.
