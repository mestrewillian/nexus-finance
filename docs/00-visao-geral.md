# Nexus Finance — Visão Geral

## 1. Nome do produto

**Nexus Finance**

## 2. Visão do produto

O Nexus Finance será um aplicativo Android de controle financeiro pessoal e familiar, desenvolvido inicialmente para atender a Família Zingoni, mas preparado desde sua origem para ser utilizado por outras pessoas, casais e famílias.

O aplicativo deverá permitir que cada usuário mantenha sua identidade financeira individual, ao mesmo tempo em que participa de espaços compartilhados e acompanha dados consolidados.

## 3. Missão

Ajudar pessoas e famílias a tomar melhores decisões financeiras com o mínimo possível de trabalho manual, utilizando automação, inteligência artificial e uma experiência simples.

## 4. Público inicial

O primeiro caso real de uso será a Família Zingoni.

O sistema, entretanto, não será desenvolvido com regras específicas para apenas uma família. Sua arquitetura deverá permitir utilização futura por outros usuários.

## 5. Conceito de Espaços Financeiros

O Nexus Finance será estruturado em torno de Espaços Financeiros.

Um usuário poderá participar de um ou mais espaços, como:

* espaço pessoal;
* espaço familiar;
* espaço empresarial;
* espaço de projeto.

Cada espaço poderá possuir seus próprios:

* membros;
* contas financeiras;
* cartões;
* movimentações;
* categorias;
* metas;
* relatórios;
* permissões.

Na primeira versão, o principal espaço será o espaço financeiro familiar.

## 6. Identidade financeira dos usuários

Cada pessoa terá seu próprio login e perfil.

Os lançamentos poderão identificar:

* o espaço financeiro ao qual pertencem;
* o usuário que criou o lançamento;
* o responsável financeiro;
* a conta utilizada;
* a categoria;
* o status da movimentação.

Isso permitirá consultar os dados de forma individual ou consolidada.

## 7. Núcleo financeiro

O núcleo do sistema será formado por Movimentações Financeiras.

Uma movimentação poderá representar:

* receita;
* despesa;
* transferência;
* ajuste de saldo;
* reembolso;
* aplicação;
* rendimento;
* compra no cartão.

Receitas e despesas não serão armazenadas como estruturas completamente separadas. Elas serão tipos diferentes de uma mesma entidade financeira.

## 8. Contas financeiras

Cada espaço poderá possuir contas financeiras cadastradas manualmente.

Exemplos:

* conta bancária;
* dinheiro em espécie;
* carteira digital;
* poupança;
* conta de investimento.

Cada conta deverá possuir, inicialmente:

* nome;
* tipo;
* saldo inicial;
* responsável;
* espaço financeiro;
* situação ativa ou inativa.

## 9. Ciclo de vida das movimentações

Toda movimentação terá um status.

Estados iniciais:

* pendente;
* confirmada;
* cancelada.

O estado pendente será importante para movimentações criadas automaticamente, como lançamentos extraídos de recibos pela inteligência artificial.

## 10. Movimentações e itens detalhados

Uma movimentação poderá armazenar apenas seu valor total ou conter itens detalhados.

Exemplo:

**Movimentação**

* estabelecimento: supermercado;
* total: R$ 186,42;
* categoria principal: alimentação.

**Itens opcionais**

* arroz;
* leite;
* carne;
* detergente;
* refrigerante.

O preenchimento manual dos itens não será obrigatório. Esses dados poderão ser adicionados automaticamente por leitura de recibos, cupons e outros documentos.

## 11. Filosofia de entrada de dados

O usuário não deverá ser obrigado a preencher informações que o sistema consiga identificar ou sugerir automaticamente.

Essa filosofia deverá orientar funcionalidades como:

* leitura de recibos;
* categorização automática;
* identificação de estabelecimento;
* reconhecimento de datas e valores;
* sugestão de forma de pagamento;
* identificação de recorrências;
* importação de extratos;
* criação de descrições automáticas.

## 12. Inteligência artificial

A inteligência artificial será utilizada como ferramenta de automação e apoio à tomada de decisões.

Aplicações planejadas:

* leitura de recibos e cupons;
* extração de itens e valores;
* sugestão de categorias;
* identificação de padrões de consumo;
* comparação entre períodos;
* alertas financeiros;
* respostas em linguagem natural;
* projeções e recomendações.

Os dados extraídos pela IA deverão ser apresentados ao usuário para conferência antes da confirmação definitiva.

## 13. Painéis

O aplicativo deverá apresentar diferentes perspectivas dos mesmos dados.

### Painel individual

Deverá mostrar informações associadas a um usuário específico.

### Painel do espaço financeiro

Deverá consolidar todas as movimentações do espaço, respeitando as permissões de acesso.

### Painel comparativo

Poderá apresentar:

* receitas por usuário;
* despesas por usuário;
* gastos compartilhados;
* saldo total;
* gastos por categoria;
* evolução mensal.

## 14. Plataforma inicial

A primeira plataforma será Android.

A versão web será considerada somente após a consolidação do aplicativo móvel e das principais funcionalidades.

## 15. Tecnologias iniciais previstas

* React Native;
* Expo;
* TypeScript;
* Supabase;
* PostgreSQL;
* OpenAI API;
* Git;
* GitHub.

Essas tecnologias poderão ser revistas caso existam razões técnicas documentadas.

## 16. Princípios do projeto

O desenvolvimento deverá seguir os seguintes princípios:

1. simplicidade de uso;
2. clareza das regras de negócio;
3. segurança e privacidade;
4. separação entre dados pessoais e compartilhados;
5. automação sem perda de controle;
6. confirmação humana para dados gerados por IA;
7. arquitetura preparada para evolução;
8. documentação das decisões importantes;
9. código legível e comentado quando necessário;
10. aprendizado e compreensão antes da implementação.

## 17. Escopo inicial

A primeira versão funcional deverá incluir:

* autenticação;
* criação ou participação em espaço financeiro;
* cadastro de membros;
* cadastro de contas;
* cadastro de categorias;
* cadastro manual de movimentações;
* receitas;
* despesas;
* transferências;
* status das movimentações;
* painel individual;
* painel consolidado.

Funcionalidades como cartões, faturas, parcelamentos, leitura de recibos e análise por IA serão implementadas em fases posteriores.
