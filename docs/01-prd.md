# Nexus Finance — PRD da Versão 1

## 1. Objetivo deste documento

Este documento define os requisitos da primeira versão funcional do Nexus Finance.

Seu objetivo é estabelecer com clareza:

* o que será desenvolvido;
* o que ficará fora desta versão;
* quais problemas a versão deverá resolver;
* quais critérios indicarão que a versão está pronta.

Este documento deverá orientar o desenvolvimento, os testes, a documentação e as tarefas atribuídas ao Codex.

---

## 2. Visão da Versão 1

A Versão 1 do Nexus Finance deverá permitir que duas ou mais pessoas participem de um mesmo Espaço Financeiro, mantenham suas contas e movimentações identificadas individualmente e consultem tanto os dados separados quanto os resultados consolidados.

A primeira versão terá foco em:

* autenticação;
* organização dos usuários;
* contas financeiras;
* receitas;
* despesas;
* transferências;
* categorias;
* painel financeiro básico.

A Versão 1 não terá como objetivo oferecer todos os recursos planejados para o produto final.

Seu objetivo será validar a arquitetura principal e disponibilizar um aplicativo utilizável para controle financeiro cotidiano.

---

## 3. Público da Versão 1

O primeiro caso real de uso será a Família Zingoni.

A arquitetura, entretanto, deverá permitir que futuramente outros usuários criem seus próprios Espaços Financeiros.

A Versão 1 será projetada inicialmente para:

* pessoas que desejam controlar suas próprias finanças;
* casais que mantêm contas individuais e compartilhadas;
* famílias que desejam acompanhar resultados consolidados.

---

## 4. Problema principal

Muitos casais e famílias precisam controlar receitas e despesas de forma conjunta, mas também desejam identificar:

* quem recebeu determinado valor;
* quem realizou determinada despesa;
* qual conta foi utilizada;
* quais valores pertencem a cada pessoa;
* qual é o resultado financeiro total da família.

Aplicativos muito simples misturam todas as informações.

Aplicativos muito complexos exigem excesso de configuração e preenchimento manual.

O Nexus Finance deverá oferecer uma estrutura organizada, mas simples de utilizar.

---

## 5. Proposta de valor da Versão 1

A Versão 1 deverá permitir que cada usuário visualize suas próprias informações financeiras sem perder a visão consolidada do Espaço Financeiro.

O sistema deverá responder, inicialmente, perguntas como:

* Quanto recebi neste mês?
* Quanto gastei neste mês?
* Quanto minha esposa ou outro membro gastou?
* Quanto gastamos juntos?
* Qual é o saldo de cada conta?
* Qual é o saldo total do Espaço Financeiro?
* Em quais categorias gastamos mais?
* Quais movimentações ainda estão pendentes?

---

## 6. Conceitos principais

### 6.1 Usuário

Pessoa que possui login próprio no Nexus Finance.

Cada usuário deverá possuir uma identidade independente no sistema.

### 6.2 Espaço Financeiro

Ambiente no qual contas, categorias, movimentações e membros são organizados.

Um Espaço Financeiro poderá representar:

* uma pessoa;
* uma família;
* uma empresa;
* um projeto.

Na Versão 1, o foco principal será o Espaço Financeiro familiar.

### 6.3 Membro

Usuário vinculado a um Espaço Financeiro.

Cada membro poderá possuir um papel e permissões específicas.

### 6.4 Conta financeira

Local onde o dinheiro é armazenado ou movimentado.

Exemplos:

* conta bancária;
* dinheiro em espécie;
* carteira digital;
* poupança;
* conta de investimento.

### 6.5 Movimentação financeira

Registro de entrada, saída ou movimentação de dinheiro.

Na Versão 1, os tipos principais serão:

* receita;
* despesa;
* transferência;
* ajuste de saldo.

### 6.6 Categoria

Classificação utilizada para organizar receitas e despesas.

Exemplos:

* salário;
* alimentação;
* moradia;
* transporte;
* saúde;
* educação;
* lazer.

---

## 7. Funcionalidades incluídas na Versão 1

### 7.1 Autenticação

O usuário deverá conseguir:

* criar uma conta;
* entrar com e-mail e senha;
* sair do aplicativo;
* manter a sessão ativa;
* recuperar o acesso futuramente por fluxo de redefinição de senha.

A recuperação de senha poderá ser implementada após o login básico, mas ainda dentro do ciclo da Versão 1.

---

### 7.2 Perfil do usuário

O usuário deverá possuir, inicialmente:

* nome;
* e-mail;
* identificador único;
* data de criação;
* imagem de perfil opcional.

A imagem de perfil não será obrigatória para considerar a Versão 1 concluída.

---

### 7.3 Espaço Financeiro

O usuário deverá conseguir:

* criar um Espaço Financeiro;
* definir seu nome;
* visualizar os espaços dos quais participa;
* selecionar o espaço ativo;
* visualizar os membros do espaço.

Na Versão 1, o sistema poderá trabalhar com apenas um espaço ativo por vez.

---

### 7.4 Convite de membros

O responsável pelo espaço deverá conseguir convidar outro usuário.

O convite poderá ser realizado por:

* e-mail;
* código de convite;
* link de convite.

Para simplificar a primeira implementação, apenas um desses métodos será obrigatório.

O método inicial recomendado é convite por e-mail.

---

### 7.5 Papéis dos membros

Na Versão 1, deverão existir pelo menos dois papéis:

#### Administrador

Poderá:

* editar o Espaço Financeiro;
* convidar membros;
* cadastrar contas;
* cadastrar categorias;
* visualizar todos os dados do espaço;
* cadastrar e editar movimentações.

#### Membro

Poderá:

* visualizar os dados permitidos;
* cadastrar movimentações;
* editar suas próprias movimentações;
* consultar contas e categorias.

As permissões poderão ser refinadas em versões futuras.

---

### 7.6 Contas financeiras

O usuário autorizado deverá conseguir:

* cadastrar uma conta;
* editar uma conta;
* ativar ou desativar uma conta;
* informar o saldo inicial;
* definir o responsável;
* definir o tipo da conta;
* visualizar o saldo atual.

Campos mínimos:

* nome;
* tipo;
* saldo inicial;
* responsável;
* Espaço Financeiro;
* status ativo ou inativo;
* data de criação.

Tipos iniciais:

* conta corrente;
* poupança;
* dinheiro;
* carteira digital;
* investimento;
* outros.

---

### 7.7 Categorias

O sistema deverá permitir:

* visualizar categorias padrão;
* cadastrar novas categorias;
* editar categorias personalizadas;
* ativar ou desativar categorias.

Cada categoria deverá possuir:

* nome;
* tipo;
* ícone opcional;
* cor opcional;
* Espaço Financeiro;
* status ativo ou inativo.

Tipos de categoria:

* receita;
* despesa;
* ambos.

A Versão 1 deverá possuir categorias padrão para facilitar o primeiro uso.

---

### 7.8 Movimentações financeiras

O usuário deverá conseguir cadastrar movimentações manualmente.

Campos mínimos:

* tipo;
* descrição;
* valor;
* data;
* conta;
* categoria;
* responsável financeiro;
* usuário criador;
* Espaço Financeiro;
* status;
* observação opcional.

Tipos incluídos:

* receita;
* despesa;
* transferência;
* ajuste de saldo.

Status incluídos:

* pendente;
* confirmada;
* cancelada.

---

### 7.9 Receitas

Uma receita deverá:

* aumentar o saldo da conta selecionada;
* possuir categoria de receita;
* identificar o responsável;
* aparecer nos painéis e relatórios básicos.

Exemplos:

* salário;
* pagamento de cliente;
* comissão;
* rendimento;
* reembolso recebido.

---

### 7.10 Despesas

Uma despesa deverá:

* reduzir o saldo da conta selecionada;
* possuir categoria de despesa;
* identificar o responsável;
* aparecer nos painéis e relatórios básicos.

Exemplos:

* supermercado;
* energia;
* internet;
* combustível;
* aluguel;
* lazer.

---

### 7.11 Transferências

Uma transferência deverá movimentar dinheiro entre duas contas do mesmo Espaço Financeiro.

A transferência:

* não deverá ser contabilizada como receita;
* não deverá ser contabilizada como despesa;
* deverá reduzir o saldo da conta de origem;
* deverá aumentar o saldo da conta de destino;
* deverá registrar ambas as contas;
* deverá manter uma única referência lógica da operação.

Não será permitido realizar transferência entre a mesma conta.

---

### 7.12 Ajustes de saldo

O ajuste de saldo será utilizado para corrigir diferenças entre o saldo registrado e o saldo real.

O ajuste deverá:

* permitir aumento ou redução do saldo;
* exigir uma descrição ou motivo;
* registrar quem realizou o ajuste;
* aparecer no histórico da conta;
* não ser confundido com receita ou despesa operacional.

---

### 7.13 Lista de movimentações

O aplicativo deverá apresentar uma lista cronológica de movimentações.

Cada item deverá mostrar, no mínimo:

* descrição;
* valor;
* tipo;
* data;
* categoria;
* responsável;
* status.

A lista deverá permitir filtros básicos por:

* período;
* usuário responsável;
* tipo;
* categoria;
* conta;
* status.

Nem todos os filtros precisam ser entregues na primeira tela inicial, mas a estrutura deverá suportá-los.

---

### 7.14 Painel individual

O painel individual deverá mostrar informações associadas ao usuário selecionado.

Indicadores mínimos:

* total de receitas do período;
* total de despesas do período;
* resultado financeiro;
* despesas por categoria;
* movimentações recentes.

O período padrão será o mês atual.

---

### 7.15 Painel consolidado

O painel do Espaço Financeiro deverá mostrar os resultados combinados de todos os membros.

Indicadores mínimos:

* receitas totais;
* despesas totais;
* resultado consolidado;
* saldo total das contas;
* despesas por categoria;
* movimentações recentes;
* comparação entre membros.

O painel deverá evitar contabilizar transferências internas como receitas ou despesas.

---

### 7.16 Seleção de período

Os painéis deverão permitir, pelo menos:

* mês atual;
* mês anterior;
* período personalizado.

O período personalizado poderá ser implementado após os filtros mensais básicos, ainda dentro da evolução da Versão 1.

---

### 7.17 Exclusão lógica

Contas, categorias e movimentações importantes não deverão ser apagadas definitivamente sem controle.

Sempre que possível, deverá ser utilizada exclusão lógica ou mudança de status.

Exemplos:

* conta inativa;
* categoria inativa;
* movimentação cancelada.

Isso preservará o histórico financeiro.

---

## 8. Funcionalidades fora da Versão 1

As seguintes funcionalidades não fazem parte do escopo inicial:

* cartões de crédito;
* faturas;
* parcelamentos;
* recorrências automáticas;
* leitura de recibos por IA;
* reconhecimento de imagens;
* importação de extratos bancários;
* integração automática com bancos;
* investimentos detalhados;
* metas financeiras;
* orçamentos mensais;
* notificações;
* lembretes de vencimento;
* chatbot financeiro;
* recomendações automáticas;
* exportação para PDF;
* exportação para Excel;
* versão web;
* publicação comercial na Play Store;
* assinatura paga;
* múltiplas moedas;
* acesso de contador ou consultor;
* modo empresarial completo.

Esses recursos poderão ser incluídos em versões posteriores.

---

## 9. Requisitos não funcionais

### 9.1 Segurança

O aplicativo deverá:

* utilizar autenticação segura;
* proteger dados por usuário e Espaço Financeiro;
* evitar exposição de credenciais;
* nunca armazenar chaves secretas diretamente no aplicativo;
* utilizar políticas de acesso no banco de dados;
* validar permissões no backend.

### 9.2 Privacidade

Cada usuário deverá visualizar apenas os espaços dos quais participa.

Nenhum dado financeiro poderá ser exposto publicamente.

### 9.3 Usabilidade

O cadastro de uma receita ou despesa simples deverá exigir poucas etapas.

O usuário deverá conseguir registrar uma movimentação sem precisar navegar por telas desnecessárias.

### 9.4 Desempenho

As principais telas deverão carregar de forma rápida em conexões móveis comuns.

### 9.5 Manutenção

O código deverá ser:

* organizado;
* tipado;
* legível;
* modular;
* documentado quando necessário;
* compatível com evolução futura.

### 9.6 Compatibilidade

A primeira versão será destinada a dispositivos Android compatíveis com o Expo e React Native utilizados no projeto.

---

## 10. Fluxos principais da Versão 1

### 10.1 Primeiro acesso

1. Usuário abre o aplicativo.
2. Cria uma conta.
3. Confirma seus dados.
4. Cria um Espaço Financeiro.
5. Cadastra sua primeira conta financeira.
6. Visualiza o painel vazio.
7. Cadastra sua primeira movimentação.

### 10.2 Entrada em um espaço existente

1. Usuário cria sua conta.
2. Recebe ou aceita um convite.
3. Entra no Espaço Financeiro.
4. Visualiza membros, contas e movimentações permitidas.

### 10.3 Cadastro de despesa

1. Usuário toca no botão de nova movimentação.
2. Escolhe despesa.
3. Informa valor.
4. Seleciona conta.
5. Seleciona categoria.
6. Define o responsável.
7. Informa data e descrição.
8. Confirma o lançamento.
9. O saldo da conta é atualizado.
10. O painel é atualizado.

### 10.4 Cadastro de receita

1. Usuário toca no botão de nova movimentação.
2. Escolhe receita.
3. Informa valor.
4. Seleciona conta.
5. Seleciona categoria.
6. Define o responsável.
7. Confirma o lançamento.
8. O saldo da conta é atualizado.

### 10.5 Transferência

1. Usuário escolhe transferência.
2. Seleciona conta de origem.
3. Seleciona conta de destino.
4. Informa valor.
5. Confirma a operação.
6. O saldo da origem é reduzido.
7. O saldo do destino é aumentado.
8. A operação não altera receitas ou despesas do período.

---

## 11. Critérios de conclusão da Versão 1

A Versão 1 será considerada funcionalmente concluída quando:

1. dois usuários conseguirem criar contas independentes;
2. ambos conseguirem participar do mesmo Espaço Financeiro;
3. o espaço possuir contas financeiras cadastradas;
4. for possível cadastrar receitas;
5. for possível cadastrar despesas;
6. for possível realizar transferências;
7. os saldos das contas forem calculados corretamente;
8. cada movimentação identificar seu responsável;
9. o painel individual apresentar valores corretos;
10. o painel consolidado apresentar valores corretos;
11. transferências internas não forem tratadas como receitas ou despesas;
12. usuários sem permissão não acessarem dados de outros espaços;
13. os dados permanecerem disponíveis após fechar e abrir o aplicativo;
14. o projeto estiver versionado no GitHub;
15. a documentação principal estiver atualizada;
16. os fluxos essenciais forem testados em um dispositivo Android real.

---

## 12. Métricas iniciais de sucesso

Como a primeira utilização será interna, as métricas serão simples.

A versão será considerada útil quando:

* o aplicativo for utilizado para registrar movimentações reais;
* Will e Annie conseguirem identificar seus gastos individualmente;
* o painel consolidado refletir corretamente a situação familiar;
* o registro manual for suficientemente rápido para uso cotidiano;
* os dados forem confiáveis;
* não for necessário manter um controle paralelo para corrigir o aplicativo.

---

## 13. Riscos iniciais

### 13.1 Complexidade excessiva

Risco de incluir funcionalidades demais antes de validar o núcleo.

Mitigação:

* respeitar o escopo da Versão 1;
* manter recursos futuros fora da implementação inicial.

### 13.2 Cálculos financeiros incorretos

Risco de saldos ou painéis apresentarem valores errados.

Mitigação:

* centralizar regras de cálculo;
* criar testes;
* não duplicar lógica financeira em várias telas.

### 13.3 Permissões incorretas

Risco de um usuário acessar informações de outro espaço.

Mitigação:

* utilizar políticas de segurança no banco;
* testar acessos com usuários diferentes;
* validar permissões no backend.

### 13.4 Dependência excessiva de ferramentas de IA

Risco de aceitar código gerado sem compreender sua função.

Mitigação:

* revisar todas as alterações;
* manter tarefas pequenas;
* documentar decisões;
* testar antes de integrar;
* garantir que o responsável pelo projeto compreenda o código principal.

---

## 14. Premissas técnicas iniciais

A Versão 1 será desenvolvida inicialmente com:

* React Native;
* Expo;
* TypeScript;
* Supabase;
* PostgreSQL;
* Git;
* GitHub.

A integração com a OpenAI API será planejada desde o início, mas não será implementada no núcleo inicial da Versão 1.

---

## 15. Regra de controle de escopo

Uma nova funcionalidade somente deverá entrar na Versão 1 quando cumprir pelo menos uma destas condições:

1. for indispensável para o funcionamento do fluxo principal;
2. impedir perda ou inconsistência de dados;
3. for necessária para segurança ou privacidade;
4. simplificar significativamente o uso sem elevar muito a complexidade.

Funcionalidades interessantes, mas não essenciais, deverão ser registradas no roadmap para versões futuras.

---

## 16. Definição resumida da Versão 1

A Versão 1 do Nexus Finance será um aplicativo Android capaz de:

* autenticar usuários;
* organizar usuários em Espaços Financeiros;
* controlar contas;
* registrar receitas, despesas, transferências e ajustes;
* identificar responsáveis;
* calcular saldos;
* apresentar resultados individuais e consolidados;
* manter os dados seguros e persistentes.

Essa versão formará a base para todos os recursos futuros do produto.
