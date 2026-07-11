# Nexus Finance — Roadmap de Desenvolvimento

## 1. Objetivo deste documento

Este documento organiza o desenvolvimento do Nexus Finance em fases, versões e marcos.

Seu objetivo é definir:

* a ordem recomendada de implementação;
* o que será construído em cada etapa;
* quais dependências existem entre as funcionalidades;
* como avaliar a conclusão de cada marco;
* quais recursos pertencem à Versão 1;
* quais recursos serão adiados;
* como manter o projeto utilizável durante a evolução.

O roadmap deverá ser utilizado como referência para:

* planejamento;
* criação de tarefas;
* organização de commits;
* uso do Codex;
* revisão de progresso;
* testes;
* definição de prioridades.

---

# 2. Princípios do roadmap

O desenvolvimento deverá seguir estes princípios:

1. construir primeiro a fundação;
2. entregar funcionalidades em blocos pequenos;
3. manter o aplicativo executável após cada etapa;
4. não iniciar recursos dependentes antes da base necessária;
5. priorizar regras de negócio antes de elementos visuais avançados;
6. testar fluxos críticos durante a implementação;
7. não antecipar funcionalidades fora do escopo;
8. documentar mudanças de direção;
9. concluir um marco antes de iniciar outro de grande porte;
10. preservar a simplicidade da Versão 1;
11. evitar dependências desnecessárias;
12. revisar segurança antes de utilizar dados reais;
13. utilizar dados de teste antes da adoção cotidiana;
14. manter o GitHub atualizado;
15. transformar cada etapa relevante em item de portfólio.

---

# 3. Estratégia geral

O desenvolvimento será dividido em quatro níveis:

```text
Fases
  ↓
Marcos
  ↓
Tarefas
  ↓
Commits
```

## 3.1 Fase

Representa uma grande área do projeto.

Exemplo:

```text
Autenticação
```

## 3.2 Marco

Representa uma entrega funcional dentro da fase.

Exemplo:

```text
Usuário consegue criar conta e entrar.
```

## 3.3 Tarefa

Representa uma implementação pequena e objetiva.

Exemplo:

```text
Criar formulário de login.
```

## 3.4 Commit

Registra uma alteração concluída e coerente.

Exemplo:

```text
feat(auth): implementar formulário de login
```

---

# 4. Visão resumida das fases

```text
Fase 0 — Preparação e documentação
Fase 1 — Fundação do aplicativo
Fase 2 — Autenticação
Fase 3 — Espaços Financeiros
Fase 4 — Contas e categorias
Fase 5 — Movimentações
Fase 6 — Transferências e ajustes
Fase 7 — Painéis e relatórios básicos
Fase 8 — Membros e convites
Fase 9 — Segurança e testes
Fase 10 — Validação com uso real
Fase 11 — Recursos posteriores
Fase 12 — Inteligência artificial
Fase 13 — Publicação
Fase 14 — Versão web
```

---

# 5. Fase 0 — Preparação e documentação

## 5.1 Objetivo

Criar uma base clara antes da implementação.

## 5.2 Entregas

* repositório no GitHub;
* projeto Expo funcionando;
* TypeScript configurado;
* documentação inicial;
* definição da arquitetura;
* definição do modelo de dados;
* definição das regras de negócio;
* definição da interface;
* definição do roadmap;
* definição de padrões de código;
* definição das decisões arquiteturais.

## 5.3 Documentos esperados

```text
docs/00-visao-geral.md
docs/01-prd.md
docs/02-arquitetura.md
docs/03-modelo-de-dados.md
docs/04-regras-de-negocio.md
docs/05-interface.md
docs/06-roadmap.md
docs/07-decisoes-arquiteturais.md
docs/08-integracao-ia.md
docs/09-api.md
docs/10-padroes-de-codigo.md
```

## 5.4 Critério de conclusão

A fase estará concluída quando:

* o projeto estiver no GitHub;
* o aplicativo abrir no Android;
* os documentos fundamentais estiverem preenchidos;
* a equipe souber exatamente o que pertence à Versão 1;
* nenhuma funcionalidade importante depender de uma decisão não registrada.

---

# 6. Fase 1 — Fundação do aplicativo

## 6.1 Objetivo

Preparar a estrutura técnica para o desenvolvimento.

## 6.2 Entregas

* organização das pastas;
* Expo Router;
* layouts de navegação;
* tema inicial;
* componentes básicos;
* configuração de variáveis de ambiente;
* configuração do Supabase;
* tratamento global de carregamento;
* tratamento inicial de erros;
* configuração de lint e formatação.

## 6.3 Tarefas principais

### Estrutura

* criar pasta `src`;
* organizar funcionalidades;
* configurar aliases de importação;
* criar módulos compartilhados;
* revisar `tsconfig.json`.

### Navegação

* configurar fluxo público;
* configurar fluxo autenticado;
* criar rotas protegidas;
* criar barra inferior;
* criar tela inicial de carregamento.

### Componentes

* botão;
* campo de texto;
* campo monetário;
* recipiente de tela;
* indicador de carregamento;
* mensagem de erro;
* estado vazio;
* cartão visual.

### Configuração

* criar `.env.example`;
* garantir que `.env` esteja ignorado;
* configurar cliente do Supabase;
* validar variáveis obrigatórias.

## 6.4 Critério de conclusão

A fase estará concluída quando:

* o aplicativo abrir sem erros;
* as rotas básicas funcionarem;
* o projeto possuir estrutura organizada;
* os componentes básicos puderem ser reutilizados;
* o Supabase estiver configurado sem exposição de segredos;
* o aplicativo continuar funcionando no Expo Go.

---

# 7. Fase 2 — Autenticação

## 7.1 Objetivo

Permitir que usuários criem contas e acessem o aplicativo.

## 7.2 Entregas

* cadastro;
* login;
* logout;
* recuperação de sessão;
* recuperação de senha;
* proteção de rotas;
* criação de perfil;
* mensagens de erro adequadas.

## 7.3 Marcos

### Marco 2.1 — Cadastro

O usuário consegue:

* informar nome;
* informar e-mail;
* criar senha;
* confirmar senha;
* criar sua conta.

### Marco 2.2 — Login

O usuário consegue:

* entrar com e-mail e senha;
* visualizar erros claros;
* permanecer autenticado.

### Marco 2.3 — Sessão

O aplicativo consegue:

* restaurar a sessão;
* redirecionar corretamente;
* encerrar a sessão.

### Marco 2.4 — Perfil

O perfil é criado e relacionado ao usuário autenticado.

## 7.4 Testes essenciais

* cadastro válido;
* e-mail inválido;
* senha inválida;
* senha e confirmação diferentes;
* login correto;
* login incorreto;
* sessão persistente;
* logout;
* sessão expirada.

## 7.5 Critério de conclusão

A fase estará concluída quando dois usuários diferentes conseguirem:

* criar contas;
* entrar;
* sair;
* manter sessões independentes;
* acessar apenas a área autenticada.

---

# 8. Fase 3 — Espaços Financeiros

## 8.1 Objetivo

Criar a estrutura compartilhada que organizará os dados.

## 8.2 Entregas

* criação de espaço;
* vínculo automático do criador;
* papel de administrador;
* lista de espaços;
* espaço ativo;
* troca de espaço;
* tela de primeiro acesso.

## 8.3 Marcos

### Marco 3.1 — Primeiro espaço

Usuário sem espaço consegue criar um.

### Marco 3.2 — Membro administrador

O criador é associado automaticamente como administrador.

### Marco 3.3 — Espaço ativo

O aplicativo carrega contas, categorias e movimentações com base no espaço ativo.

### Marco 3.4 — Múltiplos espaços

O usuário consegue trocar entre espaços dos quais participa.

## 8.4 Testes essenciais

* criação válida;
* nome obrigatório;
* criador como administrador;
* usuário sem vínculo bloqueado;
* troca de espaço;
* espaço inativo;
* restauração do último espaço ativo.

## 8.5 Critério de conclusão

A fase estará concluída quando o usuário conseguir:

* criar um espaço;
* visualizar seus espaços;
* selecionar um espaço;
* acessar apenas os dados do espaço selecionado.

---

# 9. Fase 4 — Contas e categorias

## 9.1 Objetivo

Criar as estruturas necessárias para registrar movimentações.

## 9.2 Entregas de contas

* lista de contas;
* criação;
* edição;
* inativação;
* reativação;
* saldo inicial;
* responsável;
* tipo;
* moeda.

## 9.3 Entregas de categorias

* categorias padrão;
* categorias personalizadas;
* criação;
* edição;
* inativação;
* reativação;
* compatibilidade com tipo de movimentação.

## 9.4 Marcos

### Marco 4.1 — Primeira conta

Usuário consegue cadastrar uma conta.

### Marco 4.2 — Lista de contas

Usuário visualiza contas do espaço ativo.

### Marco 4.3 — Categorias padrão

Categorias básicas ficam disponíveis.

### Marco 4.4 — Categorias personalizadas

Administrador consegue criar categorias próprias.

## 9.5 Testes essenciais

* conta com saldo inicial;
* conta com responsável;
* conta compartilhada;
* conta inativa;
* categoria de receita;
* categoria de despesa;
* categoria incompatível;
* categoria inativa.

## 9.6 Critério de conclusão

A fase estará concluída quando:

* o usuário conseguir cadastrar contas;
* o usuário conseguir visualizar saldos iniciais;
* categorias padrão estiverem disponíveis;
* categorias personalizadas puderem ser criadas;
* contas e categorias respeitarem o espaço ativo.

---

# 10. Fase 5 — Movimentações

## 10.1 Objetivo

Implementar o núcleo financeiro do aplicativo.

## 10.2 Entregas

* receita;
* despesa;
* status;
* lista;
* detalhe;
* edição;
* cancelamento;
* filtros básicos;
* responsável financeiro;
* usuário criador.

## 10.3 Marcos

### Marco 5.1 — Receita

Usuário consegue registrar uma receita confirmada.

### Marco 5.2 — Despesa

Usuário consegue registrar uma despesa confirmada.

### Marco 5.3 — Movimentação pendente

Usuário consegue registrar sem afetar o saldo confirmado.

### Marco 5.4 — Histórico

Usuário visualiza movimentações em ordem cronológica.

### Marco 5.5 — Detalhes

Usuário consulta todas as informações do lançamento.

### Marco 5.6 — Edição

Usuário autorizado consegue corrigir uma movimentação.

### Marco 5.7 — Cancelamento

Usuário autorizado consegue cancelar sem apagar o histórico.

## 10.4 Testes essenciais

* receita aumenta saldo;
* despesa reduz saldo;
* pendente não altera saldo;
* cancelada não altera saldo;
* categoria compatível;
* conta ativa;
* responsável válido;
* espaço correto;
* edição atualiza cálculos;
* cancelamento remove efeito.

## 10.5 Critério de conclusão

A fase estará concluída quando o usuário conseguir utilizar o aplicativo para registrar receitas e despesas reais com segurança.

---

# 11. Fase 6 — Transferências e ajustes

## 11.1 Objetivo

Completar as operações básicas de movimentação de dinheiro.

## 11.2 Entregas

* transferência entre contas;
* validação de origem e destino;
* operação atômica;
* ajuste positivo;
* ajuste negativo;
* cancelamento seguro;
* atualização dos saldos envolvidos.

## 11.3 Marcos

### Marco 6.1 — Transferência

Usuário consegue mover dinheiro entre duas contas.

### Marco 6.2 — Operação atômica

A operação não pode ficar parcialmente registrada.

### Marco 6.3 — Ajuste positivo

Usuário autorizado consegue aumentar o saldo por correção.

### Marco 6.4 — Ajuste negativo

Usuário autorizado consegue reduzir o saldo por correção.

## 11.4 Testes essenciais

* origem diferente do destino;
* contas no mesmo espaço;
* transferência não altera receita;
* transferência não altera despesa;
* patrimônio total permanece igual;
* cancelamento desfaz efeito;
* ajuste não entra como receita;
* ajuste não entra como despesa.

## 11.5 Critério de conclusão

A fase estará concluída quando:

* transferências forem seguras;
* ajustes forem auditáveis;
* saldos permanecerem consistentes;
* nenhuma operação puder ser registrada pela metade.

---

# 12. Fase 7 — Painéis e relatórios básicos

## 12.1 Objetivo

Transformar os dados registrados em informações úteis.

## 12.2 Entregas

* painel consolidado;
* painel individual;
* saldo total;
* total de receitas;
* total de despesas;
* resultado;
* gastos por categoria;
* gastos por responsável;
* movimentações recentes;
* seleção de período.

## 12.3 Marcos

### Marco 7.1 — Painel consolidado

Mostra os totais do Espaço Financeiro.

### Marco 7.2 — Painel individual

Mostra os dados do responsável selecionado.

### Marco 7.3 — Categorias

Mostra as principais categorias de despesas.

### Marco 7.4 — Períodos

Permite consultar mês atual, mês anterior e período personalizado.

## 12.4 Testes essenciais

* transferências excluídas dos totais;
* ajustes excluídos do resultado;
* pendentes excluídas;
* canceladas excluídas;
* responsável correto;
* período correto;
* saldo total correto;
* dados isolados por espaço.

## 12.5 Critério de conclusão

A fase estará concluída quando o painel responder corretamente:

* quanto entrou;
* quanto saiu;
* qual foi o resultado;
* quanto existe nas contas;
* quem gastou;
* em quais categorias houve maior despesa.

---

# 13. Fase 8 — Membros e convites

## 13.1 Objetivo

Permitir o uso compartilhado entre pessoas.

## 13.2 Entregas

* convite;
* aceite;
* recusa;
* papéis;
* remoção;
* alteração de papel;
* proteção do último administrador.

## 13.3 Marcos

### Marco 8.1 — Envio de convite

Administrador convida outro usuário.

### Marco 8.2 — Aceite

Usuário convidado entra no espaço.

### Marco 8.3 — Papéis

Administrador e membro possuem permissões distintas.

### Marco 8.4 — Remoção

Administrador remove membro sem apagar o histórico.

## 13.4 Testes essenciais

* convite duplicado;
* usuário já participante;
* convite expirado;
* aceite válido;
* acesso após aceite;
* remoção bloqueia acesso;
* histórico preservado;
* último administrador protegido.

## 13.5 Critério de conclusão

A fase estará concluída quando Will e Annie conseguirem utilizar o mesmo Espaço Financeiro com logins independentes.

---

# 14. Fase 9 — Segurança e testes

## 14.1 Objetivo

Validar a confiabilidade antes de utilizar dados reais.

## 14.2 Entregas

* políticas RLS;
* testes de permissão;
* revisão de segredos;
* validação dos cálculos;
* testes unitários;
* testes de integração;
* testes em Android real;
* revisão de erros;
* revisão da documentação.

## 14.3 Cenários críticos

* usuário acessando outro espaço;
* membro realizando ação administrativa;
* conta de outro espaço em movimentação;
* categoria incompatível;
* transferência inválida;
* alteração de saldo sem movimentação;
* chave secreta no aplicativo;
* sessão expirada;
* dados duplicados.

## 14.4 Critério de conclusão

A fase estará concluída quando:

* usuários não acessarem dados indevidos;
* cálculos estiverem cobertos por testes;
* operações críticas estiverem protegidas;
* não existirem segredos no repositório;
* os fluxos principais funcionarem em dois usuários reais.

---

# 15. Fase 10 — Validação com uso real

## 15.1 Objetivo

Começar a utilizar o Nexus Finance no cotidiano.

## 15.2 Estratégia

O uso real deverá começar com um período controlado.

Sugestão:

```text
Período piloto: 30 dias
```

## 15.3 Atividades

* cadastrar contas reais;
* informar saldos iniciais;
* registrar receitas;
* registrar despesas;
* realizar transferências;
* comparar com extratos;
* registrar problemas;
* medir tempo de uso;
* identificar campos desnecessários;
* identificar informações ausentes.

## 15.4 Métricas

* número de movimentações registradas;
* tempo médio de cadastro;
* quantidade de erros;
* divergência de saldo;
* frequência de uso;
* necessidade de controle paralelo;
* funcionalidades mais utilizadas;
* dificuldades encontradas.

## 15.5 Critério de conclusão

A validação será bem-sucedida quando:

* Will e Annie utilizarem o aplicativo regularmente;
* os saldos refletirem a realidade;
* não houver necessidade constante de correções;
* o registro manual for aceitavelmente rápido;
* os principais problemas estiverem documentados.

---

# 16. Versão 1.0

## 16.1 Conteúdo

A Versão 1.0 será composta pelas fases:

```text
Fase 0 até Fase 10
```

## 16.2 Funcionalidades principais

* autenticação;
* perfis;
* Espaços Financeiros;
* membros;
* convites;
* contas;
* categorias;
* receitas;
* despesas;
* transferências;
* ajustes;
* status;
* painéis;
* filtros;
* segurança;
* testes;
* uso em Android.

## 16.3 O que não entra

* cartão de crédito;
* faturas;
* parcelamentos;
* recorrências;
* IA;
* leitura de recibos;
* integração bancária;
* notificações;
* investimentos detalhados;
* metas;
* versão web;
* publicação comercial.

---

# 17. Versão 1.1 — Refinamento de uso

## 17.1 Objetivo

Corrigir e melhorar a experiência após o uso real.

## 17.2 Possíveis entregas

* melhorias nos formulários;
* filtros adicionais;
* pesquisa;
* melhor visualização de contas;
* atalhos;
* duplicação de movimentações;
* sugestões de valores padrão;
* melhorias de desempenho;
* refinamento de mensagens;
* correções de usabilidade.

## 17.3 Critério de entrada

Somente problemas comprovados durante o uso deverão ser priorizados.

---

# 18. Versão 1.2 — Recorrências e vencimentos

## 18.1 Possíveis entregas

* despesas recorrentes;
* receitas recorrentes;
* vencimentos;
* contas a pagar;
* contas a receber;
* status agendado;
* notificações;
* projeção de saldo.

## 18.2 Exemplos

* aluguel;
* energia;
* internet;
* salário;
* mensalidades;
* assinaturas.

---

# 19. Versão 2.0 — Cartões de crédito

## 19.1 Entregas previstas

* cartões;
* limites;
* compras;
* fechamento;
* vencimento;
* faturas;
* pagamento de fatura;
* compras parceladas;
* acompanhamento de parcelas;
* saldo comprometido.

## 19.2 Dependências

Essa versão depende de:

* movimentações estáveis;
* contas confiáveis;
* regras de saldo consolidadas;
* experiência de uso validada.

---

# 20. Versão 2.1 — Orçamentos e metas

## 20.1 Entregas previstas

* orçamento por categoria;
* limite mensal;
* acompanhamento;
* alertas;
* metas financeiras;
* reserva;
* progresso;
* projeções.

---

# 21. Versão 2.2 — Investimentos

## 21.1 Entregas previstas

* contas de investimento;
* aplicações;
* resgates;
* rendimentos;
* patrimônio;
* evolução;
* rentabilidade básica.

A complexidade deverá ser controlada.

O Nexus Finance não deverá tentar substituir uma plataforma profissional de investimentos sem necessidade.

---

# 22. Versão 3.0 — Inteligência artificial

## 22.1 Objetivo

Reduzir o trabalho manual e melhorar a análise.

## 22.2 Entregas previstas

* fotografia de recibo;
* envio seguro;
* leitura por IA;
* extração de estabelecimento;
* extração de data;
* extração de itens;
* extração de valores;
* sugestão de categoria;
* criação de movimentação pendente;
* revisão;
* confirmação.

## 22.3 Critério de entrada

A integração com IA somente deverá começar quando:

* o modelo de movimentações estiver estável;
* categorias funcionarem;
* contas estiverem consolidadas;
* o fluxo manual estiver validado;
* o backend seguro estiver disponível.

---

# 23. Versão 3.1 — Assistente financeiro

## 23.1 Entregas previstas

Perguntas em linguagem natural:

```text
Quanto gastamos com alimentação neste mês?
```

```text
Qual membro teve mais despesas no último trimestre?
```

```text
Quanto economizamos em relação ao mês anterior?
```

```text
Quais categorias mais aumentaram?
```

## 23.2 Restrições

A IA deverá:

* utilizar apenas dados autorizados;
* respeitar o Espaço Financeiro ativo;
* explicar quando não possuir dados suficientes;
* não inventar valores;
* diferenciar fatos de sugestões.

---

# 24. Versão 3.2 — Automação inteligente

## 24.1 Possíveis entregas

* identificação de recorrências;
* sugestão de descrição;
* categorização automática;
* detecção de duplicidade;
* alertas de aumento;
* comparação de preços;
* previsão de saldo;
* recomendações;
* análise de hábitos.

---

# 25. Versão 4.0 — Integrações

## 25.1 Possíveis entregas

* importação de extratos;
* importação de CSV;
* importação de OFX;
* integração bancária;
* integração com e-mail;
* leitura de comprovantes;
* notificações externas.

Essas integrações dependerão de viabilidade técnica, legal e financeira.

---

# 26. Versão 5.0 — Publicação comercial

## 26.1 Possíveis entregas

* onboarding completo;
* termos de uso;
* política de privacidade;
* exclusão de conta;
* exportação de dados;
* suporte;
* monitoramento;
* publicação na Play Store;
* plano gratuito;
* plano pago;
* métricas de produto;
* infraestrutura escalável.

## 26.2 Condições

A publicação comercial somente deverá ocorrer após:

* segurança revisada;
* privacidade documentada;
* uso interno validado;
* estabilidade;
* política de backup;
* conformidade legal;
* modelo de suporte.

---

# 27. Versão web

## 27.1 Prioridade

A versão web será o último grande passo.

## 27.2 Condições

Ela será considerada quando:

* o aplicativo Android estiver estável;
* o modelo de dados estiver consolidado;
* a API estiver bem definida;
* existir necessidade real de uso em computador;
* a manutenção de duas interfaces for sustentável.

## 27.3 Possíveis usos

* relatórios em tela maior;
* administração;
* exportação;
* análise;
* gestão avançada;
* configuração de categorias;
* revisão de recibos.

---

# 28. Backlog futuro

Ideias que deverão permanecer fora da implementação atual:

* despesas divididas;
* dependentes;
* mesada;
* acesso infantil;
* contas empresariais completas;
* múltiplas moedas;
* criptomoedas;
* sincronização automática;
* localização de compras;
* comparação entre estabelecimentos;
* exportação para contador;
* previsão de gastos;
* planejamento de dívidas;
* renegociação;
* score financeiro;
* educação financeira;
* widgets Android;
* comandos de voz;
* modo offline completo;
* compartilhamento seletivo;
* permissões personalizadas.

Essas ideias deverão ser registradas, mas não implementadas sem priorização formal.

---

# 29. Critérios de priorização

Uma funcionalidade deverá receber prioridade quando:

1. resolver um problema real de uso;
2. corrigir inconsistência financeira;
3. melhorar segurança;
4. reduzir significativamente o trabalho manual;
5. desbloquear outra funcionalidade importante;
6. ser necessária para concluir a Versão 1;
7. possuir impacto alto e complexidade controlada.

Uma funcionalidade deverá ser adiada quando:

* for apenas visual;
* não tiver caso de uso real;
* exigir muita complexidade;
* depender de uma base ainda instável;
* possuir risco de segurança;
* desviar o foco da versão atual.

---

# 30. Controle de mudanças

Quando uma funcionalidade nova for proposta, deverá ser registrado:

* problema que resolve;
* usuário beneficiado;
* prioridade;
* dependências;
* complexidade;
* riscos;
* versão de destino;
* impacto no banco;
* impacto na interface;
* impacto na documentação.

Nenhuma funcionalidade deverá entrar automaticamente no escopo apenas por parecer interessante.

---

# 31. Uso do Codex no roadmap

O Codex deverá receber tarefas pequenas.

Exemplo adequado:

```text
Implemente o formulário de criação de conta financeira conforme
docs/01-prd.md, docs/03-modelo-de-dados.md e docs/05-interface.md.

Não implemente edição de contas.
Não altere a navegação.
Adicione validações e testes.
```

Exemplo inadequado:

```text
Implemente toda a Fase 4.
```

Cada tarefa deverá corresponder, preferencialmente, a um marco ou parte dele.

---

# 32. Estratégia de branches

A branch principal será:

```text
main
```

Possíveis branches:

```text
feat/auth-login
feat/financial-spaces
feat/accounts
feat/transactions
fix/account-balance
docs/roadmap
```

Branches deverão possuir escopo específico.

---

# 33. Estratégia de commits

Exemplos:

```text
feat(auth): implementar cadastro de usuário
```

```text
feat(accounts): criar formulário de conta
```

```text
fix(transactions): corrigir cálculo de saldo
```

```text
test(domain): adicionar testes de transferência
```

```text
docs(roadmap): definir fases da versão 1
```

Commits deverão representar alterações compreensíveis e revisáveis.

---

# 34. Revisões por marco

Ao concluir cada marco, deverá ser realizada revisão com estas perguntas:

* o objetivo foi cumprido?
* o fluxo funciona no Android?
* os erros são tratados?
* as regras estão centralizadas?
* existem testes?
* a segurança foi considerada?
* o código está compreensível?
* a documentação está atualizada?
* o commit foi enviado ao GitHub?
* o próximo marco pode começar sem pendências críticas?

---

# 35. Indicadores de progresso

O progresso não deverá ser medido apenas por quantidade de arquivos.

Indicadores melhores:

* fluxo concluído;
* regra testada;
* erro corrigido;
* usuário real conseguiu utilizar;
* documentação atualizada;
* segurança validada;
* funcionalidade integrada.

---

# 36. Definição de pronto

Uma tarefa será considerada pronta quando:

1. o código estiver implementado;
2. o TypeScript não apresentar erros;
3. o aplicativo executar;
4. o fluxo tiver sido testado;
5. os erros relevantes forem tratados;
6. a funcionalidade respeitar a documentação;
7. os testes aplicáveis passarem;
8. não houver segredos no código;
9. a alteração estiver versionada;
10. o responsável compreender o que foi implementado.

---

# 37. Estado atual do projeto

No momento da criação deste roadmap:

```text
Repositório GitHub: criado
Projeto Expo: criado
Aplicativo Android: executando
Primeiro commit: enviado
Documentação: em desenvolvimento
Implementação funcional: ainda não iniciada
```

## Próximo objetivo

Concluir os documentos restantes da Fase 0 e, em seguida, iniciar a Fase 1 — Fundação do aplicativo.

---

# 38. Próximos documentos

Depois deste roadmap, deverão ser concluídos:

```text
docs/07-decisoes-arquiteturais.md
docs/08-integracao-ia.md
docs/09-api.md
docs/10-padroes-de-codigo.md
```

Depois disso:

```text
Atualizar README.md
Revisar AGENTS.md
Realizar commit da documentação
Iniciar a estrutura do aplicativo
```

---

# 39. Resumo

O Nexus Finance será desenvolvido de forma incremental.

A Versão 1 priorizará:

* autenticação;
* Espaços Financeiros;
* contas;
* categorias;
* movimentações;
* transferências;
* painéis;
* compartilhamento;
* segurança;
* uso real.

Recursos avançados, como cartões, recorrências, investimentos, inteligência artificial e versão web, serão implementados apenas depois da validação do núcleo.

O roadmap deverá impedir que o projeto perca foco e garantir que cada nova etapa seja construída sobre uma base funcional e compreendida.
