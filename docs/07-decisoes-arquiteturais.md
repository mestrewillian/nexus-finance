# Nexus Finance — Decisões Arquiteturais

## 1. Objetivo deste documento

Este documento registra as principais decisões arquiteturais do Nexus Finance.

Cada decisão deverá apresentar:

* contexto;
* problema;
* alternativas consideradas;
* decisão adotada;
* justificativa;
* vantagens;
* limitações;
* consequências;
* possibilidade de revisão futura.

O objetivo é preservar o raciocínio do projeto e evitar que decisões importantes sejam esquecidas ou alteradas sem análise.

---

# 2. Formato das decisões

Cada decisão será registrada com:

```text
ADR-XXX — Título da decisão
```

ADR significa:

```text
Architecture Decision Record
```

Cada registro deverá conter:

* status;
* data;
* contexto;
* alternativas;
* decisão;
* consequências.

---

# ADR-001 — Produto preparado para múltiplas famílias

## Status

Aceita.

## Contexto

O aplicativo nasceu para atender Will e Annie.

Entretanto, o projeto também deverá funcionar como portfólio e poderá futuramente ser utilizado por outras pessoas.

## Alternativas consideradas

### Alternativa A

Criar um aplicativo exclusivamente para a Família Zingoni.

### Alternativa B

Criar inicialmente para a Família Zingoni, mas preparar a arquitetura para outras pessoas e famílias.

### Alternativa C

Criar desde o início um produto comercial totalmente genérico.

## Decisão

Foi escolhida a Alternativa B.

## Justificativa

Essa alternativa preserva a simplicidade inicial, mas evita regras fixas baseadas em nomes ou em uma única família.

## Consequências positivas

* maior valor como portfólio;
* possibilidade de expansão;
* código reutilizável;
* menor risco de reestruturação futura;
* primeira validação com usuários reais.

## Limitações

* exige uma arquitetura um pouco mais genérica;
* algumas permissões precisam ser consideradas desde o início.

---

# ADR-002 — Uso de Espaços Financeiros

## Status

Aceita.

## Contexto

Os usuários precisam manter identidade própria e, ao mesmo tempo, compartilhar informações financeiras.

## Alternativas consideradas

### Alternativa A

Cada usuário possui apenas dados pessoais.

### Alternativa B

Existe apenas uma conta familiar compartilhada.

### Alternativa C

Usuários participam de Espaços Financeiros.

## Decisão

O sistema será baseado em Espaços Financeiros.

## Definição

Um Espaço Financeiro poderá representar:

* pessoa;
* família;
* empresa;
* projeto;
* outro contexto financeiro.

## Justificativa

Essa estrutura permite separar dados por contexto sem duplicar usuários.

## Consequências positivas

* um usuário pode participar de vários espaços;
* dados pessoais e familiares podem coexistir;
* a arquitetura suporta expansão;
* permissões podem ser definidas por espaço;
* a versão web futura poderá utilizar a mesma base.

## Limitações

* todas as consultas financeiras precisarão considerar o espaço ativo;
* políticas de segurança se tornam mais importantes;
* a interface precisará de um seletor de espaço.

---

# ADR-003 — Usuário com identidade financeira própria

## Status

Aceita.

## Contexto

Will e Annie precisam de logins separados, dados atribuídos individualmente e visão consolidada.

## Decisão

Cada pessoa terá um usuário independente.

O usuário poderá participar de um ou mais Espaços Financeiros.

## Consequências

* login individual;
* autoria das ações;
* painel por responsável;
* permissões específicas;
* histórico preservado mesmo após remoção do espaço.

---

# ADR-004 — Movimentação Financeira como entidade central

## Status

Aceita.

## Contexto

O sistema precisará registrar receitas, despesas, transferências, ajustes e outros tipos futuros.

## Alternativas consideradas

### Alternativa A

Criar uma tabela para receitas e outra para despesas.

### Alternativa B

Criar uma única tabela de movimentações com tipos diferentes.

## Decisão

Será utilizada uma única entidade chamada Movimentação Financeira.

## Tipos iniciais

* receita;
* despesa;
* transferência;
* ajuste de saldo.

## Tipos futuros possíveis

* reembolso;
* aplicação;
* resgate;
* rendimento;
* compra no cartão;
* pagamento de fatura.

## Justificativa

Todas essas operações representam alterações financeiras ou movimentações de dinheiro.

## Consequências positivas

* modelo consistente;
* consultas mais simples;
* histórico unificado;
* expansão facilitada;
* melhor integração futura com IA;
* menos duplicação de regras.

## Limitações

* alguns campos serão utilizados apenas por determinados tipos;
* serão necessárias validações específicas por tipo.

---

# ADR-005 — Status das movimentações

## Status

Aceita.

## Contexto

Movimentações manuais, importadas ou geradas por IA podem precisar de revisão, confirmação ou cancelamento.

## Decisão

Toda movimentação terá status.

## Status iniciais

* pendente;
* confirmada;
* cancelada.

## Regras

* pendente não afeta saldo confirmado;
* confirmada afeta saldo;
* cancelada permanece no histórico, mas não afeta saldo.

## Consequências positivas

* suporte natural à IA;
* histórico preservado;
* possibilidade de revisão;
* cancelamento sem exclusão física.

---

# ADR-006 — Movimentações com itens opcionais

## Status

Aceita.

## Contexto

Uma compra pode ser registrada apenas pelo total ou detalhada item por item.

## Alternativas consideradas

### Alternativa A

Guardar apenas o valor total.

### Alternativa B

Exigir todos os itens.

### Alternativa C

Permitir itens opcionais.

## Decisão

A movimentação terá valor total obrigatório e itens detalhados opcionais.

## Justificativa

O cadastro manual deve permanecer rápido, enquanto recibos processados por IA poderão armazenar detalhes.

## Consequências positivas

* cadastro simples;
* possibilidade de análise de produtos;
* histórico mais rico;
* comparação futura de preços;
* categorização por item.

## Limitações

* soma dos itens pode divergir do total;
* descontos e taxas precisarão ser tratados;
* itens aumentam o volume de dados.

---

# ADR-007 — Contas financeiras manuais na Versão 1

## Status

Aceita.

## Contexto

O sistema precisa controlar onde o dinheiro está, mas integração bancária seria complexa para o início.

## Alternativas consideradas

### Alternativa A

Registrar apenas receitas e despesas sem contas.

### Alternativa B

Criar contas manuais.

### Alternativa C

Integrar diretamente com bancos.

## Decisão

A Versão 1 utilizará contas financeiras cadastradas manualmente.

## Tipos iniciais

* conta corrente;
* poupança;
* dinheiro;
* carteira digital;
* investimento;
* outra.

## Consequências positivas

* maior precisão;
* controle de saldos;
* implementação viável;
* independência de fornecedores bancários.

## Limitações

* exige registro manual;
* saldo pode divergir se movimentações forem esquecidas;
* conciliação será necessária.

---

# ADR-008 — Movimentações como fonte da verdade

## Status

Aceita.

## Contexto

O sistema precisa manter saldos confiáveis e auditáveis.

## Alternativas consideradas

### Alternativa A

Alterar diretamente um campo de saldo em cada operação.

### Alternativa B

Calcular o saldo com base nas movimentações.

### Alternativa C

Usar movimentações e saldo armazenado simultaneamente como fontes independentes.

## Decisão

As movimentações serão a fonte principal da verdade.

O saldo será derivado do histórico.

## Justificativa

Isso reduz divergências e preserva auditabilidade.

## Consequências positivas

* histórico confiável;
* cancelamentos recalculáveis;
* facilidade de auditoria;
* testes mais claros.

## Limitações

* consultas podem se tornar mais pesadas;
* otimizações poderão ser necessárias no futuro.

## Evolução possível

Poderão ser criadas:

* views;
* funções SQL;
* cache;
* campos derivados;
* materialized views.

Esses recursos não deverão substituir o histórico como fonte principal.

---

# ADR-009 — Valores monetários armazenados em centavos

## Status

Aceita.

## Contexto

Números de ponto flutuante podem produzir erros de precisão.

Exemplo:

```text
0,1 + 0,2
```

pode não resultar exatamente em:

```text
0,3
```

em determinadas representações computacionais.

## Alternativas consideradas

### Alternativa A

Número decimal em ponto flutuante.

### Alternativa B

Tipo decimal no banco e número decimal no aplicativo.

### Alternativa C

Centavos como número inteiro.

## Decisão

Valores monetários serão armazenados em centavos como números inteiros.

## Exemplo

```text
R$ 186,42 = 18642
```

## Tipo previsto

```text
bigint
```

no PostgreSQL.

## Consequências positivas

* cálculos exatos;
* testes simples;
* comparações confiáveis;
* consistência entre banco e domínio.

## Limitações

* exige funções de formatação;
* integrações externas podem exigir conversão;
* valores muito grandes precisam de cuidado no JavaScript.

## Observação

A aplicação deverá utilizar funções centralizadas para converter e formatar valores.

---

# ADR-010 — Separação entre criador e responsável financeiro

## Status

Aceita.

## Contexto

Um usuário poderá registrar uma movimentação em nome de outro membro.

## Decisão

As movimentações terão dois campos distintos:

```text
created_by
responsible_user_id
```

## Significado

### `created_by`

Usuário que cadastrou o registro.

### `responsible_user_id`

Pessoa à qual a movimentação será atribuída nos painéis individuais.

## Exemplo

Will registra uma despesa da Annie:

```text
created_by = Will
responsible_user_id = Annie
```

## Consequências positivas

* auditoria;
* painel individual correto;
* suporte a lançamentos compartilhados;
* preparação para importações automáticas.

---

# ADR-011 — Transferência representada por uma operação lógica

## Status

Aceita.

## Contexto

Uma transferência reduz uma conta e aumenta outra.

## Alternativas consideradas

### Alternativa A

Registrar uma despesa e uma receita independentes.

### Alternativa B

Registrar duas movimentações vinculadas.

### Alternativa C

Registrar uma única movimentação com origem e destino.

## Decisão

Na Versão 1, uma transferência será representada por uma única movimentação lógica contendo:

* conta de origem;
* conta de destino;
* valor.

## Regras

* origem e destino devem ser diferentes;
* ambas pertencem ao mesmo espaço;
* não altera receitas;
* não altera despesas;
* não altera o patrimônio consolidado;
* deve ser registrada atomicamente.

## Consequências positivas

* operação fácil de compreender;
* cancelamento único;
* menor risco de duplicação;
* relatórios mais claros.

## Limitações

* consultas de saldo precisam considerar origem e destino;
* edição exige operação segura.

---

# ADR-012 — Ajuste de saldo como tipo específico

## Status

Aceita.

## Contexto

Diferenças entre saldo real e saldo registrado precisam ser corrigidas sem criar receitas ou despesas falsas.

## Decisão

O sistema terá movimentação do tipo ajuste de saldo.

## Direções

* aumento;
* redução.

## Regras

* exige descrição ou motivo;
* altera o saldo;
* não entra em receitas ou despesas operacionais;
* permanece no histórico.

## Consequências positivas

* conciliação correta;
* histórico transparente;
* relatórios operacionais não distorcidos.

---

# ADR-013 — Exclusão lógica e preservação histórica

## Status

Aceita.

## Contexto

Apagar contas, categorias ou movimentações pode destruir o histórico financeiro.

## Decisão

O projeto priorizará:

* inativação;
* cancelamento;
* remoção lógica;
* preservação de relações históricas.

## Aplicações

### Contas

```text
is_active = false
```

### Categorias

```text
is_active = false
```

### Espaços

```text
is_active = false
```

### Membros

```text
membership_status = removed
```

### Movimentações

```text
status = cancelled
```

## Consequências positivas

* histórico auditável;
* relatórios reproduzíveis;
* menor risco de perda;
* rastreamento de alterações.

## Limitações

* consultas precisam filtrar registros;
* banco acumulará histórico;
* interface precisa distinguir ativos e inativos.

---

# ADR-014 — Supabase como backend inicial

## Status

Aceita.

## Contexto

O projeto precisa de:

* autenticação;
* banco;
* segurança;
* backend;
* armazenamento futuro;
* baixo custo inicial.

## Alternativas consideradas

### Alternativa A

Backend próprio em Node.js desde o início.

### Alternativa B

Firebase.

### Alternativa C

Supabase.

## Decisão

A Versão 1 utilizará Supabase.

## Recursos utilizados

* Supabase Auth;
* PostgreSQL;
* Row Level Security;
* funções SQL;
* Storage futuramente;
* Edge Functions futuramente.

## Consequências positivas

* PostgreSQL relacional;
* autenticação integrada;
* menor infraestrutura inicial;
* boa velocidade de desenvolvimento;
* suporte a políticas de segurança.

## Limitações

* dependência da plataforma;
* aprendizado de RLS;
* operações críticas exigem cuidado;
* migração futura pode demandar trabalho.

---

# ADR-015 — React Native com Expo

## Status

Aceita.

## Contexto

O aplicativo será desenvolvido inicialmente para Android, com possibilidade de evolução futura.

## Alternativas consideradas

### Alternativa A

Android nativo com Kotlin.

### Alternativa B

Flutter.

### Alternativa C

React Native com Expo.

## Decisão

O aplicativo será desenvolvido em React Native com Expo e TypeScript.

## Justificativa

* alinhamento com o aprendizado de React;
* desenvolvimento multiplataforma;
* testes rápidos;
* Expo Go no início;
* integração com ferramentas modernas;
* possibilidade futura de iOS e web.

## Limitações

* algumas bibliotecas exigirão development build;
* recursos nativos específicos podem exigir configuração adicional;
* desempenho precisa ser acompanhado.

---

# ADR-016 — Expo Go na etapa inicial

## Status

Aceita.

## Contexto

O projeto ainda está na fase inicial e precisa de testes rápidos no dispositivo Android.

## Decisão

O Expo Go será utilizado enquanto os recursos necessários forem compatíveis.

## Migração

Uma development build será criada quando houver necessidade concreta, como:

* biblioteca nativa não disponível;
* câmera com configuração específica;
* notificações avançadas;
* recursos nativos personalizados;
* testes de produção.

## Consequências positivas

* configuração simples;
* aprendizado mais fácil;
* atualização rápida;
* menos complexidade inicial.

---

# ADR-017 — Arquitetura modular por funcionalidades

## Status

Aceita.

## Contexto

O projeto terá autenticação, contas, movimentações, painéis, membros e outras áreas.

## Alternativas consideradas

### Alternativa A

Organizar apenas por tipo de arquivo.

Exemplo:

```text
components/
screens/
services/
```

### Alternativa B

Organizar por funcionalidades.

Exemplo:

```text
features/auth/
features/accounts/
features/transactions/
```

## Decisão

O projeto será organizado principalmente por funcionalidades.

## Consequências positivas

* arquivos relacionados ficam próximos;
* melhor escalabilidade;
* tarefas do Codex mais isoladas;
* menor acoplamento;
* manutenção facilitada.

## Limitações

* alguns elementos compartilhados exigirão critérios claros;
* pode haver dúvidas sobre onde colocar determinados arquivos.

---

# ADR-018 — Arquitetura em camadas sem excesso de abstração

## Status

Aceita.

## Contexto

O projeto precisa de organização profissional, mas também deve permanecer compreensível para aprendizado.

## Alternativas consideradas

### Alternativa A

Código direto nas telas.

### Alternativa B

Clean Architecture completa desde o início.

### Alternativa C

Arquitetura em camadas simplificada.

## Decisão

Será adotada arquitetura em camadas inspirada em Clean Architecture, sem excesso de abstrações.

## Camadas

* interface;
* hooks ou controladores;
* casos de uso;
* domínio;
* repositórios;
* infraestrutura.

## Consequências positivas

* regras isoladas;
* código testável;
* aprendizado progressivo;
* menor dependência do Supabase nas telas.

## Limitações

* exige disciplina;
* algumas tarefas simples terão mais de um arquivo;
* excesso de camadas deverá ser evitado.

---

# ADR-019 — Repositórios para acesso aos dados

## Status

Aceita.

## Contexto

Chamadas diretas ao Supabase espalhadas pelas telas dificultariam manutenção e testes.

## Decisão

O acesso aos dados será centralizado em repositórios.

## Exemplo

```text
TransactionRepository.create()
```

em vez de chamadas repetidas:

```text
supabase.from("financial_transactions").insert(...)
```

## Consequências positivas

* acesso centralizado;
* erros padronizados;
* menor duplicação;
* testes facilitados;
* possibilidade de mudança futura.

## Limitações

* adiciona uma camada;
* interfaces dos repositórios precisam ser bem definidas.

---

# ADR-020 — Regras críticas fora da interface

## Status

Aceita.

## Contexto

Telas podem ser alteradas, reutilizadas ou contornadas.

## Decisão

Regras financeiras e de permissão não deverão existir apenas na interface.

## Exemplos

A tela pode impedir selecionar a mesma conta em uma transferência, mas:

* o domínio também deverá validar;
* o banco também deverá proteger a operação.

## Consequências positivas

* maior segurança;
* consistência;
* testes independentes;
* proteção contra chamadas indevidas.

---

# ADR-021 — Row Level Security obrigatória

## Status

Aceita.

## Contexto

Os dados financeiros são privados e pertencem a Espaços Financeiros específicos.

## Decisão

As tabelas financeiras utilizarão Row Level Security.

## Regras gerais

* usuário acessa apenas espaços dos quais participa;
* conta deve pertencer a espaço autorizado;
* movimentação deve pertencer a espaço autorizado;
* ações administrativas exigem papel adequado;
* identificadores não concedem acesso.

## Consequências positivas

* proteção no banco;
* menor dependência da interface;
* isolamento entre famílias;
* redução de exposição acidental.

## Limitações

* políticas podem ser complexas;
* precisam de testes com usuários diferentes;
* erros de configuração podem bloquear acessos válidos.

---

# ADR-022 — Um Espaço Financeiro ativo por vez

## Status

Aceita.

## Contexto

Um usuário poderá participar de vários espaços.

## Decisão

A interface trabalhará com um espaço ativo por vez.

## Consequências

O espaço ativo determinará:

* contas;
* categorias;
* movimentações;
* membros;
* painel;
* permissões.

## Consequências positivas

* interface mais simples;
* menor risco de mistura de dados;
* consultas mais previsíveis.

## Limitações

* comparação entre espaços não fará parte da Versão 1;
* troca de espaço exigirá recarregamento.

---

# ADR-023 — Interface com barra inferior

## Status

Aceita.

## Contexto

As principais áreas precisam ser acessíveis com poucos toques.

## Decisão

A área autenticada utilizará barra inferior com:

```text
Início
Movimentações
Adicionar
Contas
Mais
```

## Justificativa

Essas áreas correspondem às ações mais frequentes.

## Consequências positivas

* navegação rápida;
* boa adaptação ao Android;
* ação de adicionar em destaque;
* organização simples.

---

# ADR-024 — Cadastro manual antes da automação

## Status

Aceita.

## Contexto

A IA dependerá de um modelo financeiro estável.

## Decisão

O fluxo manual será implementado e validado antes de:

* leitura de recibos;
* categorização por IA;
* importação automática;
* assistente financeiro.

## Consequências positivas

* validação do núcleo;
* menor risco;
* IA integrada sobre uma base confiável;
* possibilidade de uso mesmo sem IA.

## Limitações

* exige trabalho manual inicialmente;
* principal diferencial de automação virá depois.

---

# ADR-025 — IA acessada somente por backend seguro

## Status

Aceita.

## Contexto

A chave da OpenAI não pode ficar exposta no aplicativo.

## Alternativas consideradas

### Alternativa A

Chamar a OpenAI diretamente pelo React Native.

### Alternativa B

Utilizar backend seguro.

## Decisão

Todas as chamadas que exigirem chave secreta ocorrerão em backend.

## Opções previstas

* Supabase Edge Function;
* API própria;
* serviço serverless;
* backend futuro.

## Consequências positivas

* proteção da chave;
* validação centralizada;
* controle de uso;
* auditoria;
* possibilidade de limitar custos.

## Limitações

* exige backend;
* adiciona latência;
* precisa de monitoramento.

---

# ADR-026 — IA cria dados pendentes

## Status

Aceita.

## Contexto

A IA pode interpretar recibos incorretamente.

## Decisão

Movimentações geradas por IA serão criadas como pendentes.

## Fluxo

```text
Imagem
→ processamento
→ dados estruturados
→ movimentação pendente
→ revisão humana
→ confirmação
```

## Consequências positivas

* reduz risco financeiro;
* usuário mantém controle;
* erros podem ser corrigidos;
* adequado para dados sensíveis.

---

# ADR-027 — Saída estruturada para integração com IA

## Status

Aceita como diretriz futura.

## Contexto

Respostas textuais livres são difíceis de validar.

## Decisão

A IA deverá retornar dados estruturados.

Exemplo conceitual:

```text
{
  merchant,
  date,
  totalAmountCents,
  items,
  suggestedCategory,
  confidence
}
```

## Consequências positivas

* validação;
* previsibilidade;
* menor risco de interpretação;
* integração direta com formulários.

---

# ADR-028 — Versão web como última etapa

## Status

Aceita.

## Contexto

O projeto possui foco inicial em Android.

Manter duas interfaces desde o início aumentaria a complexidade.

## Decisão

A versão web será considerada somente após:

* aplicativo Android estável;
* modelo de dados consolidado;
* API definida;
* uso real validado;
* necessidade comprovada.

## Consequências positivas

* foco;
* menor esforço inicial;
* aprendizado progressivo;
* redução de manutenção duplicada.

---

# ADR-029 — GitHub desde o início

## Status

Aceita.

## Contexto

O projeto servirá também como portfólio.

## Decisão

Todo o projeto será versionado no GitHub.

## Benefícios

* histórico;
* backup;
* colaboração;
* integração com Codex;
* documentação;
* pull requests;
* portfólio.

## Regras

Não deverão ser enviados:

* arquivos `.env`;
* senhas;
* chaves;
* tokens;
* dados financeiros reais;
* imagens privadas;
* arquivos temporários.

---

# ADR-030 — Codex como assistente de implementação

## Status

Aceita.

## Contexto

O Codex poderá acelerar tarefas, mas o projeto também possui objetivo de aprendizado.

## Decisão

O Codex será utilizado para tarefas pequenas, específicas e revisáveis.

## Responsabilidades do Codex

* implementar componentes;
* criar testes;
* corrigir erros;
* refatorar;
* documentar;
* preparar pull requests.

## Responsabilidades do responsável pelo projeto

* compreender as alterações;
* revisar;
* testar;
* aprovar;
* manter decisões arquiteturais.

## Regra

Nenhuma grande funcionalidade deverá ser delegada com instrução genérica.

---

# ADR-031 — Comentários explicam decisões, não o óbvio

## Status

Aceita.

## Contexto

O projeto é também educacional, mas excesso de comentários reduz legibilidade.

## Decisão

Comentários serão utilizados para explicar:

* motivo de uma regra;
* decisão não evidente;
* comportamento financeiro;
* limitação técnica;
* cuidado de segurança;
* integração externa.

Comentários não deverão repetir literalmente o código.

## Exemplo adequado

```ts
// Movimentações pendentes não afetam o saldo até a revisão do usuário.
```

## Exemplo inadequado

```ts
// Soma o valor.
total += amount;
```

---

# ADR-032 — Código e banco em inglês, interface em português

## Status

Aceita.

## Contexto

O público inicial utiliza português, mas o código precisa seguir convenções técnicas amplamente utilizadas.

## Decisão

Serão utilizados:

### No banco e código

* nomes em inglês;
* tabelas em `snake_case`;
* TypeScript em `camelCase`;
* componentes em `PascalCase`.

### Na interface

* textos em português do Brasil.

## Consequências positivas

* compatibilidade com bibliotecas;
* portfólio mais profissional;
* interface adequada aos usuários;
* melhor manutenção futura.

---

# ADR-033 — TypeScript obrigatório

## Status

Aceita.

## Contexto

Dados financeiros e entidades possuem estruturas específicas.

## Decisão

O projeto utilizará TypeScript em todo o código da aplicação.

## Regras

* evitar `any`;
* tipar entidades;
* tipar respostas dos repositórios;
* validar dados externos;
* diferenciar tipos do banco e do domínio quando necessário.

## Consequências positivas

* redução de erros;
* melhor autocompletar;
* documentação implícita;
* refatoração mais segura.

---

# ADR-034 — Bibliotecas adicionadas apenas por necessidade real

## Status

Aceita.

## Contexto

Adicionar muitas dependências aumenta complexidade, tamanho e risco.

## Decisão

Uma biblioteca somente será adicionada quando:

* resolver um problema real;
* tiver manutenção adequada;
* for compatível com Expo;
* reduzir complexidade;
* possuir justificativa registrada quando relevante.

## Consequências

O projeto não adotará antecipadamente:

* gerenciamento global complexo;
* biblioteca de gráficos pesada;
* abstrações sem uso;
* componentes completos de design sem necessidade.

---

# ADR-035 — Testes prioritários para regras financeiras

## Status

Aceita.

## Contexto

Erros em saldo, transferência e consolidação comprometem a confiabilidade.

## Decisão

Os primeiros testes automatizados priorizarão:

* cálculo de saldo;
* receita;
* despesa;
* transferência;
* ajuste;
* status;
* períodos;
* painel individual;
* painel consolidado.

## Consequências positivas

* maior confiança;
* prevenção de regressões;
* documentação executável das regras;
* facilidade para revisar código do Codex.

---

# ADR-036 — Uso real somente após revisão de segurança

## Status

Aceita.

## Contexto

O aplicativo armazenará dados pessoais e financeiros.

## Decisão

Dados reais somente deverão ser utilizados após:

* autenticação funcional;
* RLS revisada;
* isolamento entre espaços testado;
* segredos protegidos;
* cálculos validados;
* operações críticas testadas.

## Consequências

Antes disso, deverão ser utilizados dados fictícios.

---

# ADR-037 — Saldo negativo permitido com alerta

## Status

Aceita para a Versão 1.

## Contexto

Contas bancárias podem ficar negativas por cheque especial, atrasos ou divergência temporária.

## Alternativas consideradas

### Alternativa A

Bloquear qualquer operação que gere saldo negativo.

### Alternativa B

Permitir sem aviso.

### Alternativa C

Permitir com alerta.

## Decisão

A Versão 1 permitirá saldo negativo com alerta.

## Consequências positivas

* representa melhor a realidade;
* não impede lançamentos legítimos;
* mantém o histórico correto.

## Limitações

* usuário pode registrar valores acima do disponível;
* regras configuráveis poderão ser necessárias no futuro.

---

# ADR-038 — Uma movimentação possui um responsável principal

## Status

Aceita para a Versão 1.

## Contexto

Despesas compartilhadas poderiam pertencer a várias pessoas.

## Decisão

Na Versão 1, cada movimentação terá apenas um responsável financeiro principal.

## Alternativas futuras

* divisão percentual;
* divisão por valor;
* vários responsáveis;
* rateio automático.

## Justificativa

A divisão aumentaria significativamente a complexidade do núcleo inicial.

---

# ADR-039 — Categorias padrão e personalizadas

## Status

Aceita.

## Contexto

O usuário precisa começar rapidamente, mas também poderá necessitar de classificações próprias.

## Decisão

O sistema terá:

* categorias padrão globais;
* categorias personalizadas por espaço.

## Consequências positivas

* início rápido;
* flexibilidade;
* padronização inicial;
* personalização sem duplicação obrigatória.

---

# ADR-040 — Moeda única na Versão 1

## Status

Aceita.

## Contexto

Suporte a múltiplas moedas exige regras de conversão, cotação e consolidação.

## Decisão

A Versão 1 utilizará apenas:

```text
BRL
```

## Preparação futura

Os espaços e contas poderão possuir `currency_code`, mesmo que apenas BRL seja inicialmente permitido.

## Consequências positivas

* cálculos simples;
* menor risco;
* interface adequada ao uso real inicial.

---

# ADR-041 — Datas financeiras separadas das datas de criação

## Status

Aceita.

## Contexto

Uma compra pode ser registrada em dia diferente daquele em que ocorreu.

## Decisão

Movimentações possuirão:

```text
transaction_date
created_at
updated_at
```

## Consequências

Painéis e períodos utilizarão `transaction_date`.

Auditoria utilizará `created_at` e `updated_at`.

---

# ADR-042 — API interna preparada, mas não criada prematuramente

## Status

Aceita.

## Contexto

A versão Android poderá acessar o Supabase diretamente em operações permitidas, enquanto recursos futuros exigirão backend próprio.

## Decisão

A arquitetura será preparada para uma API, mas um servidor completo não será criado antes de existir necessidade.

## Casos que exigirão backend

* OpenAI;
* operações administrativas;
* processamento de recibos;
* webhooks;
* integrações externas;
* tarefas agendadas;
* segredos;
* operações de alto privilégio.

## Consequências positivas

* menor infraestrutura inicial;
* evolução progressiva;
* evita backend vazio.

---

# ADR-043 — Documentação como parte do produto

## Status

Aceita.

## Contexto

O projeto será de longo prazo, utilizará Codex e servirá como portfólio.

## Decisão

Documentação será mantida dentro do repositório.

## Documentos principais

```text
00-visao-geral.md
01-prd.md
02-arquitetura.md
03-modelo-de-dados.md
04-regras-de-negocio.md
05-interface.md
06-roadmap.md
07-decisoes-arquiteturais.md
08-integracao-ia.md
09-api.md
10-padroes-de-codigo.md
```

## Consequências positivas

* referência para implementação;
* melhor uso do Codex;
* onboarding facilitado;
* histórico profissional;
* maior valor de portfólio.

---

# 3. Processo para novas decisões

Uma nova decisão arquitetural deverá ser registrada quando:

* afetar várias funcionalidades;
* alterar o banco;
* introduzir dependência relevante;
* afetar segurança;
* alterar o fluxo principal;
* modificar a arquitetura;
* gerar custo recorrente;
* criar limitação futura;
* substituir decisão anterior.

---

# 4. Status possíveis

Cada ADR poderá possuir um destes status:

```text
Proposta
Aceita
Rejeitada
Substituída
Descontinuada
Em revisão
```

---

# 5. Substituição de decisão

Uma decisão aceita poderá ser substituída.

Nesse caso:

1. o registro antigo deverá permanecer;
2. seu status será alterado para `Substituída`;
3. o novo ADR deverá indicar qual decisão substitui;
4. o motivo deverá ser documentado.

A documentação não deverá apagar o histórico de raciocínio.

---

# 6. Decisões ainda pendentes

As seguintes decisões ainda precisarão de ADR específico:

* biblioteca de formulários;
* biblioteca de validação;
* biblioteca de cache remoto;
* estratégia offline;
* solução de gráficos;
* identidade visual;
* tratamento de notificações;
* estratégia de backups;
* política de retenção de recibos;
* limite de tamanho de imagens;
* modelo de custo da IA;
* publicação na Play Store;
* estratégia de migrações do banco;
* monitoramento de erros;
* analytics;
* termos e privacidade;
* exclusão de conta;
* exportação de dados.

---

# 7. Resumo das decisões atuais

As decisões fundamentais do Nexus Finance são:

1. produto preparado para outras famílias;
2. arquitetura baseada em Espaços Financeiros;
3. usuários com identidade própria;
4. movimentação como entidade central;
5. status pendente, confirmado e cancelado;
6. itens opcionais;
7. contas manuais na Versão 1;
8. movimentações como fonte da verdade;
9. valores em centavos;
10. criador e responsável separados;
11. transferência como operação única;
12. ajuste de saldo específico;
13. preservação histórica;
14. Supabase como backend inicial;
15. React Native com Expo;
16. Expo Go no início;
17. organização por funcionalidades;
18. arquitetura em camadas simplificada;
19. repositórios;
20. regras críticas fora da interface;
21. Row Level Security;
22. um espaço ativo por vez;
23. navegação inferior;
24. fluxo manual antes da IA;
25. IA somente via backend;
26. dados de IA pendentes;
27. respostas estruturadas;
28. versão web por último;
29. GitHub desde o início;
30. Codex como assistente;
31. comentários com propósito;
32. código em inglês e interface em português;
33. TypeScript obrigatório;
34. dependências adicionadas com critério;
35. testes prioritários para finanças;
36. dados reais somente após segurança;
37. saldo negativo permitido com alerta;
38. um responsável principal por movimentação;
39. categorias padrão e personalizadas;
40. BRL na Versão 1;
41. data financeira separada da criação;
42. backend completo apenas quando necessário;
43. documentação como parte do produto.

---

# 8. Conclusão

Este documento preserva as decisões que orientam o Nexus Finance.

Qualquer alteração relevante deverá considerar:

* impacto técnico;
* impacto financeiro;
* impacto de segurança;
* impacto na experiência;
* impacto no roadmap;
* impacto nos documentos existentes.

O objetivo não é impedir mudanças, mas garantir que elas sejam conscientes, justificadas e registradas.
