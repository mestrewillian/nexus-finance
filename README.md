# Nexus Finance

Aplicativo Android de controle financeiro pessoal e familiar, desenvolvido com React Native, Expo e TypeScript.

O Nexus Finance permitirá que pessoas mantenham suas finanças identificadas individualmente e, ao mesmo tempo, participem de Espaços Financeiros compartilhados, com visão consolidada de receitas, despesas, contas e saldos.

O projeto está sendo desenvolvido inicialmente para uso real de uma família, mas sua arquitetura é preparada para atender outros usuários, casais e famílias no futuro.

## Objetivo

Ajudar pessoas e famílias a tomar melhores decisões financeiras com o mínimo possível de trabalho manual, utilizando uma experiência simples, automação e inteligência artificial.

## Principais conceitos

* login individual para cada usuário;
* Espaços Financeiros compartilhados;
* contas pessoais e compartilhadas;
* receitas, despesas, transferências e ajustes;
* identificação do responsável financeiro;
* painel individual;
* painel consolidado;
* categorias padrão e personalizadas;
* histórico financeiro preservado;
* futura leitura de recibos com inteligência artificial.

## Status do projeto

O projeto está atualmente na fase de planejamento, arquitetura e preparação técnica.

### Concluído

* repositório criado no GitHub;
* projeto Expo criado;
* aplicação executando em dispositivo Android;
* TypeScript configurado;
* documentação inicial do produto;
* definição da arquitetura;
* definição do modelo de dados;
* definição das regras de negócio;
* definição da interface;
* definição do roadmap;
* planejamento da integração com IA;
* definição dos contratos de API;
* definição dos padrões de código.

### Próxima etapa

Iniciar a fundação técnica do aplicativo:

* organizar as pastas;
* configurar a navegação;
* preparar os componentes compartilhados;
* configurar o Supabase;
* criar os fluxos público e autenticado.

## Versão 1

A primeira versão funcional deverá incluir:

* cadastro e login;
* perfis;
* Espaços Financeiros;
* membros;
* contas financeiras;
* categorias;
* receitas;
* despesas;
* transferências;
* ajustes de saldo;
* movimentações pendentes, confirmadas e canceladas;
* painel individual;
* painel consolidado;
* segurança por usuário e espaço.

## Funcionalidades futuras

* cartões de crédito;
* faturas;
* parcelamentos;
* recorrências;
* metas financeiras;
* investimentos;
* notificações;
* importação de extratos;
* leitura de recibos;
* categorização por IA;
* assistente financeiro;
* versão web.

## Tecnologias previstas

* React Native;
* Expo;
* TypeScript;
* Expo Router;
* Supabase;
* PostgreSQL;
* OpenAI API;
* Git;
* GitHub.

## Arquitetura

O projeto utilizará uma arquitetura modular organizada por funcionalidades.

Camadas principais:

```text
Interface
↓
Hooks e controladores
↓
Casos de uso
↓
Domínio
↓
Repositórios
↓
Supabase e serviços externos
```

As regras financeiras não deverão permanecer dentro das telas.

Operações críticas serão validadas no domínio e no backend.

## Estrutura planejada

```text
nexus-finance/
├── app/
├── src/
│   ├── features/
│   ├── domain/
│   ├── shared/
│   ├── services/
│   ├── repositories/
│   ├── hooks/
│   ├── store/
│   ├── types/
│   ├── utils/
│   └── config/
├── docs/
├── assets/
├── tests/
├── AGENTS.md
├── README.md
├── package.json
└── tsconfig.json
```

A estrutura será criada gradualmente, conforme cada módulo passar a possuir uma responsabilidade real.

## Documentação

A documentação completa está disponível na pasta `docs`.

```text
docs/
├── 00-visao-geral.md
├── 01-prd.md
├── 02-arquitetura.md
├── 03-modelo-de-dados.md
├── 04-regras-de-negocio.md
├── 05-interface.md
├── 06-roadmap.md
├── 07-decisoes-arquiteturais.md
├── 08-integracao-ia.md
├── 09-api.md
└── 10-padroes-de-codigo.md
```

## Valores monetários

Os valores serão armazenados em centavos.

Exemplo:

```text
R$ 186,42 = 18642
```

Essa estratégia evita erros de precisão em cálculos financeiros.

## Inteligência artificial

A integração futura com IA permitirá:

* fotografar recibos;
* identificar estabelecimentos;
* extrair datas;
* identificar itens;
* extrair valores;
* sugerir categorias;
* criar movimentações pendentes;
* responder perguntas sobre os dados financeiros.

A IA não confirmará movimentações automaticamente.

Fluxo previsto:

```text
Capturar
→ Processar
→ Extrair
→ Validar
→ Revisar
→ Confirmar
```

A chave da OpenAI permanecerá exclusivamente em ambiente seguro de backend.

## Segurança

O projeto deverá utilizar:

* Supabase Auth;
* Row Level Security;
* validação por Espaço Financeiro;
* funções seguras para operações críticas;
* variáveis de ambiente;
* políticas de acesso;
* revisão humana para dados gerados por IA.

Não deverão ser enviados ao repositório:

* arquivos `.env`;
* senhas;
* tokens;
* chaves de API;
* dados financeiros reais;
* recibos privados;
* credenciais bancárias.

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npx expo start
```

Depois, abra o aplicativo utilizando o Expo Go em um dispositivo Android.

## Padrão de commits

Exemplos:

```text
feat(auth): implementar tela de login
fix(transactions): corrigir cálculo de saldo
docs(architecture): atualizar modelo de dados
test(domain): adicionar testes de transferência
```

## Uso do Codex

O Codex será utilizado como assistente de implementação.

As tarefas deverão ser:

* pequenas;
* específicas;
* documentadas;
* testáveis;
* limitadas ao escopo solicitado.

Toda alteração gerada por IA deverá ser revisada, compreendida e testada antes de ser incorporada ao projeto.

## Roadmap resumido

```text
1. Preparação e documentação
2. Fundação do aplicativo
3. Autenticação
4. Espaços Financeiros
5. Contas e categorias
6. Movimentações
7. Transferências e ajustes
8. Painéis
9. Membros e convites
10. Segurança e testes
11. Uso real
12. Inteligência artificial
13. Publicação
14. Versão web
```

## Licença

Consulte o arquivo `LICENSE` deste repositório.

## Autor

Desenvolvido por Willian Zingoni Dias como projeto de aprendizado, portfólio e aplicação prática de desenvolvimento mobile, backend, banco de dados e inteligência artificial.
