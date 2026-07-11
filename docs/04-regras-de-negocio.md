# Nexus Finance — Regras de Negócio

## 1. Objetivo deste documento

Este documento define as regras de negócio da primeira versão do Nexus Finance.

Seu objetivo é estabelecer:

* como usuários e Espaços Financeiros se relacionam;
* quais permissões cada membro possui;
* como contas e categorias devem funcionar;
* como cada tipo de movimentação afeta os saldos;
* quais operações devem ser permitidas;
* quais situações devem ser bloqueadas;
* como preservar a integridade do histórico financeiro;
* como tratar movimentações pendentes, confirmadas e canceladas.

As regras deste documento deverão orientar:

* a interface;
* os casos de uso;
* as validações do domínio;
* as funções do banco de dados;
* as políticas de segurança;
* os testes automatizados;
* as tarefas atribuídas ao Codex.

---

# 2. Princípios gerais

O Nexus Finance deverá seguir estes princípios:

1. toda movimentação deverá possuir origem identificável;
2. nenhuma movimentação confirmada poderá existir sem Espaço Financeiro;
3. nenhum usuário poderá acessar dados de espaços dos quais não participa;
4. valores financeiros deverão ser tratados em centavos;
5. movimentações serão a fonte principal da verdade financeira;
6. saldos não poderão ser alterados sem registro correspondente;
7. transferências internas não serão classificadas como receita ou despesa;
8. movimentações canceladas não deverão afetar saldos;
9. movimentações pendentes não deverão afetar saldos confirmados;
10. exclusões físicas de dados financeiros deverão ser evitadas;
11. ações importantes deverão manter autoria e data;
12. regras críticas deverão ser validadas no domínio e no banco;
13. ocultar um botão na interface não será considerado controle de segurança;
14. dados gerados por inteligência artificial serão sugestões até confirmação humana;
15. o histórico financeiro deverá permanecer auditável.

---

# 3. Usuários

## 3.1 Criação de usuário

Cada usuário deverá possuir:

* identificador único;
* e-mail único;
* senha gerenciada pelo sistema de autenticação;
* perfil associado;
* nome;
* data de criação.

## 3.2 Identidade independente

Cada usuário terá identidade própria no sistema.

Isso significa que:

* Will e Annie possuirão logins diferentes;
* cada usuário poderá criar movimentações;
* cada movimentação poderá identificar seu responsável financeiro;
* cada usuário poderá participar de mais de um Espaço Financeiro;
* os dados não deverão depender de nomes fixos no código.

## 3.3 Usuário autenticado

Somente usuários autenticados poderão acessar áreas privadas do aplicativo.

Sem sessão válida, o usuário deverá ser direcionado para o fluxo de autenticação.

## 3.4 Perfil

O perfil poderá ser editado pelo próprio usuário.

Inicialmente, o usuário poderá alterar:

* nome;
* imagem de perfil opcional.

O e-mail de autenticação deverá ser alterado por fluxo específico e seguro.

---

# 4. Espaços Financeiros

## 4.1 Criação

Um usuário autenticado poderá criar um Espaço Financeiro.

Ao criar o espaço:

1. o espaço será registrado;
2. o usuário criador será associado ao espaço;
3. o usuário criador receberá o papel de administrador;
4. o vínculo será criado como ativo;
5. o espaço poderá receber contas, categorias e movimentações.

## 4.2 Nome

Todo Espaço Financeiro deverá possuir nome.

Exemplos:

* Família Zingoni;
* Finanças Pessoais;
* Empresa AZ;
* Projeto Reforma.

## 4.3 Tipo

Todo espaço deverá possuir um tipo válido.

Tipos iniciais:

* pessoal;
* familiar;
* empresarial;
* projeto;
* outro.

## 4.4 Espaço ativo

O aplicativo trabalhará com um Espaço Financeiro ativo por vez.

O espaço ativo determinará:

* contas visíveis;
* categorias disponíveis;
* movimentações exibidas;
* membros;
* painéis;
* permissões.

## 4.5 Validação do espaço ativo

Antes de carregar dados de um espaço, o sistema deverá confirmar que o usuário possui vínculo ativo com ele.

Um identificador armazenado localmente não será suficiente para autorizar o acesso.

## 4.6 Espaço inativo

Um Espaço Financeiro inativo:

* permanecerá no histórico;
* não deverá receber novas movimentações comuns;
* não deverá aceitar novos convites;
* poderá ser reativado por administrador autorizado;
* não deverá ser apagado fisicamente enquanto possuir histórico financeiro.

---

# 5. Membros do Espaço Financeiro

## 5.1 Vínculo

Um usuário somente será considerado membro quando possuir vínculo ativo com o espaço.

Estados possíveis:

* convidado;
* ativo;
* recusado;
* removido.

## 5.2 Papéis iniciais

Na Versão 1 existirão dois papéis:

* administrador;
* membro.

## 5.3 Administrador

O administrador poderá:

* visualizar todos os dados do espaço;
* editar informações do espaço;
* convidar membros;
* remover membros;
* alterar papéis;
* cadastrar contas;
* editar contas;
* inativar contas;
* cadastrar categorias;
* editar categorias personalizadas;
* inativar categorias;
* cadastrar movimentações;
* editar movimentações conforme as regras;
* cancelar movimentações;
* visualizar painéis individuais e consolidados.

## 5.4 Membro

O membro poderá:

* visualizar dados permitidos do espaço;
* cadastrar movimentações;
* visualizar contas;
* visualizar categorias;
* editar suas próprias movimentações quando permitido;
* consultar painéis;
* consultar movimentações;
* atualizar seu próprio perfil.

O membro não poderá, inicialmente:

* remover outros membros;
* alterar papéis;
* editar dados principais do espaço;
* excluir o espaço;
* criar permissões personalizadas.

## 5.5 Último administrador

O sistema não deverá permitir que o último administrador ativo:

* seja removido;
* deixe o espaço;
* seja rebaixado para membro;

sem que outro administrador seja definido.

## 5.6 Membro removido

Quando um membro for removido:

* seu vínculo será marcado como removido;
* ele perderá acesso ao espaço;
* suas movimentações antigas permanecerão;
* seu nome ou identificação continuará relacionado ao histórico;
* a remoção não deverá apagar contas ou movimentações.

---

# 6. Convites

## 6.1 Criação de convite

Somente administradores poderão convidar usuários.

O convite deverá possuir:

* Espaço Financeiro;
* e-mail;
* papel proposto;
* usuário que convidou;
* status;
* data de criação;
* prazo opcional.

## 6.2 Convite duplicado

O sistema deverá impedir ou alertar quando:

* o usuário já for membro ativo;
* existir convite pendente para o mesmo e-mail e espaço;
* o convite anterior ainda for válido.

## 6.3 Aceite

Ao aceitar um convite:

1. o sistema valida o usuário autenticado;
2. confirma o e-mail ou identidade;
3. valida o status e a validade do convite;
4. cria ou ativa o vínculo;
5. marca o convite como aceito.

## 6.4 Convite expirado

Convites expirados:

* não poderão ser aceitos;
* poderão ser reenviados por administrador;
* deverão manter seu histórico.

---

# 7. Contas Financeiras

## 7.1 Criação

Uma conta financeira deverá possuir:

* nome;
* tipo;
* Espaço Financeiro;
* saldo inicial;
* moeda;
* usuário criador;
* status.

## 7.2 Responsável

Uma conta poderá possuir responsável principal.

Exemplos:

```text
Nubank Will → responsável: Will
Inter Annie → responsável: Annie
Dinheiro da casa → sem responsável individual
```

O responsável deverá ser membro ativo do espaço.

## 7.3 Saldo inicial

O saldo inicial representa o valor existente na conta no momento em que ela passa a ser controlada pelo sistema.

Exemplo:

```text
Saldo real no início do uso: R$ 1.250,00
Saldo inicial armazenado: 125000 centavos
```

## 7.4 Alteração do saldo inicial

O saldo inicial poderá ser corrigido apenas enquanto a conta ainda não possuir movimentações confirmadas.

Depois disso, correções deverão ser feitas por ajuste de saldo.

Essa regra preserva a confiabilidade do histórico.

## 7.5 Conta ativa

Contas ativas poderão:

* receber receitas;
* registrar despesas;
* participar de transferências;
* receber ajustes.

## 7.6 Conta inativa

Contas inativas:

* permanecerão visíveis no histórico;
* não deverão receber novas movimentações comuns;
* não deverão aparecer como opção padrão em novos lançamentos;
* poderão continuar aparecendo em filtros históricos.

## 7.7 Inativação de conta

Uma conta poderá ser inativada mesmo com saldo diferente de zero, mas o sistema deverá alertar o usuário.

Exemplo:

```text
Esta conta possui saldo de R$ 350,00.
Deseja realmente inativá-la?
```

## 7.8 Exclusão

Contas com histórico não deverão ser apagadas fisicamente.

Quando necessário, deverão ser inativadas.

---

# 8. Categorias

## 8.1 Categorias padrão

O sistema fornecerá categorias iniciais.

Exemplos de receita:

* salário;
* trabalho autônomo;
* comissão;
* venda;
* rendimento;
* reembolso.

Exemplos de despesa:

* alimentação;
* moradia;
* transporte;
* saúde;
* educação;
* lazer;
* assinaturas.

## 8.2 Categorias personalizadas

Administradores poderão cadastrar categorias específicas para o espaço.

## 8.3 Compatibilidade

Categorias deverão possuir compatibilidade com o tipo da movimentação.

Uma categoria de receita não poderá ser utilizada em despesa.

Uma categoria de despesa não poderá ser utilizada em receita.

Categorias do tipo `both` poderão ser usadas nos dois casos.

## 8.4 Transferência

Transferências não deverão utilizar categoria de receita ou despesa.

## 8.5 Ajuste de saldo

Ajustes de saldo não precisarão de categoria operacional.

Poderão utilizar classificação específica futuramente.

## 8.6 Categoria inativa

Uma categoria inativa:

* continuará aparecendo em movimentações antigas;
* não deverá aparecer como opção padrão em novos lançamentos;
* poderá ser reativada;
* não deverá ser apagada se possuir histórico.

## 8.7 Categoria padrão do sistema

Categorias do sistema:

* serão compartilhadas entre espaços;
* não poderão ser alteradas diretamente pelos usuários;
* poderão ser complementadas por categorias personalizadas.

---

# 9. Movimentações Financeiras

## 9.1 Entidade central

Toda alteração financeira relevante será representada por uma movimentação.

Tipos iniciais:

* receita;
* despesa;
* transferência;
* ajuste de saldo.

## 9.2 Campos obrigatórios gerais

Toda movimentação deverá possuir:

* identificador;
* Espaço Financeiro;
* tipo;
* status;
* descrição;
* valor;
* data;
* usuário criador;
* data de criação.

Dependendo do tipo, também serão obrigatórios:

* conta de origem;
* conta de destino;
* categoria;
* responsável financeiro;
* direção do ajuste.

## 9.3 Valor

O valor deverá:

* ser maior que zero;
* ser armazenado em centavos;
* não utilizar sinal negativo para representar despesa;
* ter seu efeito determinado pelo tipo da movimentação.

Exemplo:

```text
Despesa de R$ 100,00
amount_cents = 10000
transaction_type = expense
```

O valor não será armazenado como `-10000`.

## 9.4 Descrição

Toda movimentação deverá possuir descrição compreensível.

Exemplos:

* Salário;
* Supermercado São Cristóvão;
* Combustível;
* Transferência para Mercado Pago;
* Correção de saldo.

## 9.5 Data da movimentação

A data deverá representar quando o fato financeiro ocorreu.

A data de criação representa quando o registro foi inserido no sistema.

Essas datas poderão ser diferentes.

Exemplo:

```text
Compra realizada: 10/07/2026
Lançamento registrado: 11/07/2026
```

---

# 10. Status das Movimentações

## 10.1 Pendente

Uma movimentação pendente:

* ainda não será considerada confirmada;
* não afetará o saldo confirmado;
* não será incluída nos totais confirmados;
* poderá ser revisada;
* poderá ser confirmada;
* poderá ser cancelada.

## 10.2 Confirmada

Uma movimentação confirmada:

* afetará os saldos;
* será considerada nos painéis;
* será considerada nos relatórios;
* será considerada nos totais por categoria e responsável.

## 10.3 Cancelada

Uma movimentação cancelada:

* permanecerá registrada;
* não afetará saldos;
* não entrará nos totais;
* deverá registrar data de cancelamento;
* poderá exibir motivo futuramente.

## 10.4 Mudança de status

Fluxos permitidos:

```text
pending → confirmed
pending → cancelled
confirmed → cancelled
```

Fluxos que exigirão análise futura:

```text
cancelled → confirmed
```

Na Versão 1, uma movimentação cancelada não deverá ser reativada diretamente.

Caso tenha sido cancelada por engano, o usuário deverá criar nova movimentação.

---

# 11. Receitas

## 11.1 Definição

Receita representa entrada de dinheiro em uma conta.

## 11.2 Campos obrigatórios

Uma receita deverá possuir:

* conta de destino;
* categoria compatível;
* valor;
* data;
* descrição;
* responsável financeiro;
* Espaço Financeiro;
* status.

## 11.3 Efeito financeiro

Quando confirmada, a receita deverá:

* aumentar o saldo da conta de destino;
* aumentar o total de receitas do período;
* afetar o resultado financeiro;
* aparecer nos painéis.

## 11.4 Conta de origem

Uma receita não deverá possuir conta financeira interna de origem.

A origem externa poderá ser descrita no texto ou em campo futuro.

## 11.5 Exemplos

* salário;
* pagamento de cliente;
* comissão;
* venda;
* rendimento;
* reembolso recebido.

---

# 12. Despesas

## 12.1 Definição

Despesa representa saída de dinheiro de uma conta para consumo, obrigação ou pagamento.

## 12.2 Campos obrigatórios

Uma despesa deverá possuir:

* conta de origem;
* categoria compatível;
* valor;
* data;
* descrição;
* responsável financeiro;
* Espaço Financeiro;
* status.

## 12.3 Efeito financeiro

Quando confirmada, a despesa deverá:

* reduzir o saldo da conta de origem;
* aumentar o total de despesas do período;
* reduzir o resultado financeiro;
* aparecer nos painéis.

## 12.4 Conta de destino

Uma despesa não deverá possuir conta interna de destino.

O destinatário externo poderá ser informado futuramente como estabelecimento ou favorecido.

## 12.5 Saldo insuficiente

Na Versão 1, o sistema poderá permitir saldo negativo em contas.

Porém, deverá:

* informar o saldo atual;
* alertar quando a despesa levar a conta a saldo negativo;
* não bloquear automaticamente sem regra específica.

Isso é importante porque contas bancárias podem possuir cheque especial, lançamentos atrasados ou saldos temporariamente negativos.

## 12.6 Exemplos

* supermercado;
* energia;
* aluguel;
* combustível;
* internet;
* medicamentos;
* lazer.

---

# 13. Transferências

## 13.1 Definição

Transferência representa movimentação de dinheiro entre duas contas internas do mesmo Espaço Financeiro.

## 13.2 Regras obrigatórias

Uma transferência deverá possuir:

* conta de origem;
* conta de destino;
* valor;
* data;
* descrição;
* usuário criador;
* Espaço Financeiro;
* status.

## 13.3 Contas diferentes

A conta de origem e a conta de destino deverão ser diferentes.

Operação inválida:

```text
Nubank → Nubank
```

## 13.4 Mesmo Espaço Financeiro

As duas contas deverão pertencer ao mesmo Espaço Financeiro.

Na Versão 1, não haverá transferências diretas entre espaços diferentes.

## 13.5 Efeito financeiro

Quando confirmada, a transferência deverá:

* reduzir o saldo da origem;
* aumentar o saldo do destino;
* não aumentar receitas;
* não aumentar despesas;
* não alterar o patrimônio total do espaço.

## 13.6 Categoria

Transferências não deverão possuir categoria de receita ou despesa.

## 13.7 Operação atômica

A transferência deverá ser registrada como uma operação única.

O sistema não poderá concluir apenas a saída sem concluir a entrada correspondente.

Se qualquer validação falhar, nenhuma parte da operação deverá ser registrada.

## 13.8 Cancelamento

Ao cancelar uma transferência confirmada, seu efeito deverá ser removido integralmente dos dois saldos.

Não poderá ser cancelada apenas uma parte.

## 13.9 Saldo insuficiente

Assim como nas despesas, o sistema poderá alertar, mas não necessariamente bloquear, transferências que deixem a origem negativa.

Essa política poderá ser configurável em versões futuras.

---

# 14. Ajustes de Saldo

## 14.1 Definição

Ajuste de saldo será utilizado quando o saldo registrado estiver diferente do saldo real.

## 14.2 Direção

Um ajuste deverá possuir direção:

* aumento;
* redução.

## 14.3 Campos obrigatórios

Um ajuste deverá possuir:

* conta;
* valor;
* direção;
* descrição;
* motivo ou observação;
* usuário criador;
* data;
* status.

## 14.4 Efeito financeiro

Ajuste positivo:

* aumenta o saldo da conta.

Ajuste negativo:

* reduz o saldo da conta.

## 14.5 Relatórios

Ajustes não deverão ser misturados automaticamente às receitas ou despesas operacionais.

Eles poderão aparecer em:

* histórico da conta;
* conciliação;
* relatórios específicos;
* auditoria.

## 14.6 Uso correto

Ajustes deverão ser utilizados para correções.

Não deverão substituir o cadastro normal de receitas e despesas.

Exemplo correto:

```text
Saldo real do banco: R$ 1.000,00
Saldo no sistema: R$ 980,00
Ajuste positivo: R$ 20,00
```

---

# 15. Responsável Financeiro

## 15.1 Definição

O responsável financeiro representa a pessoa à qual a movimentação será atribuída.

## 15.2 Diferença entre responsável e criador

Exemplo:

```text
Will cadastrou uma despesa da Annie.
```

Nesse caso:

```text
created_by = Will
responsible_user_id = Annie
```

## 15.3 Painéis individuais

Os painéis individuais utilizarão o responsável financeiro, e não apenas o usuário criador.

## 15.4 Responsável válido

O responsável deverá ser membro ativo do Espaço Financeiro na data do cadastro.

## 15.5 Movimentação compartilhada

Na Versão 1, cada movimentação terá apenas um responsável principal.

Despesas divididas entre várias pessoas serão planejadas para uma versão posterior.

Até lá, uma despesa compartilhada poderá:

* ser atribuída ao membro que pagou;
* ser atribuída a um responsável definido;
* utilizar uma conta compartilhada.

---

# 16. Usuário Criador

## 16.1 Autoria

Toda movimentação deverá registrar o usuário que a criou.

## 16.2 Preservação

A autoria não deverá ser alterada após a criação.

## 16.3 Edição por outro usuário

Quando um administrador editar uma movimentação criada por outro membro:

* `created_by` permanecerá igual;
* `updated_at` será atualizado;
* uma auditoria detalhada poderá ser adicionada futuramente.

---

# 17. Edição de Movimentações

## 17.1 Movimentação pendente

Movimentações pendentes poderão ser editadas antes da confirmação.

## 17.2 Movimentação confirmada

Movimentações confirmadas poderão ser editadas, desde que:

* o usuário possua permissão;
* as novas informações sejam válidas;
* os saldos sejam recalculados corretamente;
* a edição não quebre a integridade da transferência.

## 17.3 Alteração de valor

Ao alterar o valor de uma movimentação confirmada, o saldo deverá refletir o novo valor.

Exemplo:

```text
Despesa original: R$ 100,00
Despesa corrigida: R$ 120,00
```

A conta deverá ter redução adicional de R$ 20,00 no cálculo final.

## 17.4 Alteração de conta

Ao trocar a conta de uma movimentação confirmada:

* o efeito deverá ser removido da conta antiga;
* o efeito deverá ser aplicado à nova conta;
* a operação deverá ocorrer de forma segura.

## 17.5 Alteração de tipo

Na Versão 1, não será recomendado alterar diretamente o tipo principal de uma movimentação confirmada.

Exemplo:

```text
expense → income
```

O caminho preferencial será:

1. cancelar a movimentação incorreta;
2. criar uma nova movimentação correta.

Essa regra reduz risco de inconsistência.

---

# 18. Cancelamento de Movimentações

## 18.1 Preservação do histórico

Movimentações financeiras não deverão ser apagadas para corrigir o saldo.

Elas deverão ser canceladas.

## 18.2 Efeito

Ao cancelar:

* a movimentação deixará de afetar o saldo;
* deixará de entrar nos totais;
* permanecerá no histórico;
* receberá data de cancelamento.

## 18.3 Permissão

Inicialmente:

* administradores poderão cancelar qualquer movimentação do espaço;
* membros poderão cancelar suas próprias movimentações, conforme regra definida;
* movimentações de outro membro exigirão permissão administrativa.

## 18.4 Confirmação visual

O aplicativo deverá pedir confirmação antes do cancelamento.

Exemplo:

```text
Deseja cancelar esta movimentação?
Ela permanecerá no histórico, mas deixará de afetar os saldos.
```

---

# 19. Exclusão Física

## 19.1 Regra geral

Dados financeiros com histórico não deverão ser apagados fisicamente pelo aplicativo.

## 19.2 Entidades protegidas

Deverão utilizar inativação ou cancelamento:

* Espaços Financeiros;
* membros;
* contas;
* categorias;
* movimentações.

## 19.3 Exceções

Poderá ser permitida exclusão física quando:

* o registro foi criado por engano;
* ainda não possui dependências;
* ainda não foi utilizado;
* a operação é segura e documentada.

Exemplo possível:

* categoria personalizada recém-criada e nunca utilizada.

---

# 20. Cálculo de Saldo

## 20.1 Fórmula

O saldo confirmado de uma conta será:

```text
saldo inicial
+ receitas confirmadas recebidas
- despesas confirmadas pagas
+ transferências confirmadas recebidas
- transferências confirmadas enviadas
+ ajustes positivos confirmados
- ajustes negativos confirmados
```

## 20.2 Status considerados

Somente movimentações com status `confirmed` deverão afetar o saldo confirmado.

## 20.3 Movimentações canceladas

Movimentações canceladas terão efeito zero.

## 20.4 Movimentações pendentes

Movimentações pendentes terão efeito zero no saldo confirmado.

## 20.5 Centralização

A fórmula deverá existir em local centralizado.

Não será permitido que cada tela calcule o saldo de maneira independente.

---

# 21. Resultado Financeiro

## 21.1 Fórmula

O resultado financeiro de um período será:

```text
receitas confirmadas
-
despesas confirmadas
```

## 21.2 Exclusões

Não deverão entrar no resultado:

* transferências;
* ajustes de saldo;
* movimentações pendentes;
* movimentações canceladas.

## 21.3 Resultado positivo

Quando receitas forem maiores que despesas.

## 21.4 Resultado negativo

Quando despesas forem maiores que receitas.

---

# 22. Painel Individual

## 22.1 Base de cálculo

O painel individual será baseado no `responsible_user_id`.

## 22.2 Indicadores

Deverá apresentar:

* receitas do responsável;
* despesas do responsável;
* resultado;
* gastos por categoria;
* movimentações recentes;
* contas sob sua responsabilidade, quando aplicável.

## 22.3 Transferências

Transferências não deverão ser exibidas como receita ou despesa individual.

Poderão aparecer no histórico.

## 22.4 Contas compartilhadas

Movimentações realizadas em contas compartilhadas ainda poderão ser atribuídas a um responsável individual.

---

# 23. Painel Consolidado

## 23.1 Base de cálculo

O painel consolidado considerará todas as movimentações confirmadas do Espaço Financeiro.

## 23.2 Indicadores

Deverá apresentar:

* total de receitas;
* total de despesas;
* resultado consolidado;
* saldo total das contas;
* despesas por categoria;
* despesas por responsável;
* movimentações recentes.

## 23.3 Transferências

Transferências internas não deverão alterar os totais consolidados.

## 23.4 Saldo total

O saldo total será a soma dos saldos confirmados das contas ativas e, quando necessário, das contas inativas incluídas no patrimônio.

A política visual para contas inativas será definida na interface.

---

# 24. Períodos

## 24.1 Mês atual

O período padrão dos painéis será o mês atual.

## 24.2 Mês anterior

O usuário poderá consultar o mês anterior.

## 24.3 Período personalizado

O usuário poderá informar data inicial e final.

## 24.4 Regra de inclusão

Uma movimentação será incluída quando sua `transaction_date` estiver dentro do período.

A data de criação não deverá determinar o período financeiro.

---

# 25. Filtros

A lista de movimentações poderá ser filtrada por:

* período;
* tipo;
* status;
* conta;
* categoria;
* responsável;
* usuário criador.

Os filtros deverão atuar apenas sobre os dados do Espaço Financeiro ativo.

---

# 26. Itens de Movimentação

## 26.1 Uso opcional

Uma movimentação poderá existir sem itens detalhados.

## 26.2 Uso com recibos

Itens serão especialmente utilizados quando o sistema processar:

* cupons;
* recibos;
* notas;
* comprovantes.

## 26.3 Soma dos itens

A soma dos itens poderá ser comparada ao valor total.

Diferenças poderão ser permitidas quando existirem:

* descontos;
* taxas;
* arredondamentos;
* itens não reconhecidos.

## 26.4 Categoria dos itens

Itens poderão possuir categorias específicas no futuro.

Exemplo:

```text
Movimentação: Supermercado
Categoria principal: Alimentação

Itens:
Detergente → Limpeza
Carne → Alimentação
Shampoo → Higiene
```

---

# 27. Dados Gerados por Inteligência Artificial

## 27.1 Status inicial

Movimentações criadas por IA deverão nascer como pendentes.

## 27.2 Revisão

Antes da confirmação, o usuário deverá revisar:

* estabelecimento;
* data;
* valor;
* itens;
* categoria;
* conta;
* responsável;
* forma de pagamento.

## 27.3 Confirmação humana

Somente após confirmação do usuário a movimentação deverá afetar saldos.

## 27.4 Confiança da extração

O sistema poderá armazenar futuramente o nível de confiança dos campos extraídos.

## 27.5 Falha de leitura

Se a IA não conseguir identificar os dados:

* o usuário deverá poder preencher manualmente;
* a falha não deverá criar movimentação confirmada;
* o recibo poderá ser descartado ou reenviado.

---

# 28. Segurança e Permissões

## 28.1 Regra principal

O usuário somente poderá acessar dados de espaços nos quais seja membro ativo.

## 28.2 Verificação no banco

A regra deverá ser aplicada por políticas de segurança no banco.

## 28.3 Interface

A interface poderá esconder ações não permitidas, mas o banco deverá bloquear tentativas indevidas.

## 28.4 Identificadores externos

Conhecer o identificador de uma conta ou movimentação não deverá ser suficiente para acessá-la.

## 28.5 Operações administrativas

Operações administrativas deverão validar o papel do membro.

---

# 29. Consistência entre Espaços

## 29.1 Contas

As contas de uma movimentação deverão pertencer ao mesmo espaço da movimentação.

## 29.2 Categoria

A categoria personalizada deverá pertencer ao mesmo espaço da movimentação.

Categorias do sistema poderão ser utilizadas globalmente.

## 29.3 Responsável

O responsável deverá possuir vínculo ativo com o espaço.

## 29.4 Transferência

Origem e destino deverão pertencer ao mesmo espaço.

## 29.5 Bloqueio

Qualquer inconsistência entre espaços deverá impedir a operação.

---

# 30. Regras de Validação

## 30.1 Valor

Inválido:

```text
0
valor negativo
valor vazio
valor com formato incorreto
```

## 30.2 Data

A data deverá ser válida.

O sistema poderá permitir datas futuras apenas em funcionalidades planejadas, como agendamentos.

Na Versão 1, o cadastro comum deverá priorizar datas atuais ou passadas.

## 30.3 Descrição

A descrição não poderá ser vazia.

## 30.4 Conta

A conta deverá:

* existir;
* pertencer ao espaço;
* estar ativa para novos lançamentos.

## 30.5 Categoria

A categoria deverá:

* existir;
* estar disponível;
* ser compatível com o tipo.

## 30.6 Responsável

O responsável deverá:

* existir;
* ser membro ativo;
* pertencer ao espaço.

---

# 31. Mensagens de Erro

As mensagens deverão ser claras.

Exemplos:

```text
Informe um valor maior que zero.
```

```text
Selecione uma conta de origem.
```

```text
A conta de origem e a conta de destino devem ser diferentes.
```

```text
Esta categoria não pode ser utilizada em uma despesa.
```

```text
Você não possui permissão para realizar esta operação.
```

```text
Esta conta está inativa.
```

Mensagens técnicas do banco não deverão ser mostradas diretamente ao usuário.

---

# 32. Regras de Auditoria

Toda entidade importante deverá registrar:

* usuário criador;
* data de criação;
* data de atualização.

Movimentações também poderão registrar:

* data de confirmação;
* data de cancelamento.

Futuramente poderão ser registrados:

* usuário que editou;
* usuário que cancelou;
* valores anteriores;
* valores novos;
* motivo da alteração.

---

# 33. Regras de Privacidade

## 33.1 Dados privados

Dados financeiros não deverão ser públicos.

## 33.2 Participação no espaço

A participação em um espaço representa autorização para visualizar os dados definidos pelas permissões.

## 33.3 Saída do espaço

Após remoção, o usuário não deverá mais consultar os dados do espaço.

## 33.4 Histórico

A saída de um membro não deverá apagar sua participação histórica.

---

# 34. Regras de Integridade

O banco deverá impedir:

* movimentação sem espaço;
* movimentação sem criador;
* valor zero ou negativo;
* transferência para a mesma conta;
* conta de outro espaço;
* categoria incompatível;
* responsável de outro espaço;
* vínculo duplicado;
* acesso sem associação;
* alteração administrativa sem permissão.

---

# 35. Cenários de Teste Essenciais

## 35.1 Receita confirmada

Dado:

```text
Saldo inicial: R$ 1.000,00
Receita confirmada: R$ 500,00
```

Resultado esperado:

```text
Saldo: R$ 1.500,00
```

## 35.2 Despesa confirmada

Dado:

```text
Saldo inicial: R$ 1.000,00
Despesa confirmada: R$ 200,00
```

Resultado esperado:

```text
Saldo: R$ 800,00
```

## 35.3 Movimentação pendente

Dado:

```text
Saldo inicial: R$ 1.000,00
Despesa pendente: R$ 200,00
```

Resultado esperado:

```text
Saldo confirmado: R$ 1.000,00
```

## 35.4 Movimentação cancelada

Dado:

```text
Saldo inicial: R$ 1.000,00
Despesa cancelada: R$ 200,00
```

Resultado esperado:

```text
Saldo: R$ 1.000,00
```

## 35.5 Transferência

Dado:

```text
Conta A: R$ 1.000,00
Conta B: R$ 200,00
Transferência: R$ 300,00
```

Resultado esperado:

```text
Conta A: R$ 700,00
Conta B: R$ 500,00
Patrimônio total: R$ 1.200,00
Receitas do período: sem alteração
Despesas do período: sem alteração
```

## 35.6 Ajuste positivo

Dado:

```text
Saldo: R$ 500,00
Ajuste positivo: R$ 50,00
```

Resultado esperado:

```text
Saldo: R$ 550,00
```

## 35.7 Ajuste negativo

Dado:

```text
Saldo: R$ 500,00
Ajuste negativo: R$ 30,00
```

Resultado esperado:

```text
Saldo: R$ 470,00
```

## 35.8 Cancelamento de despesa

Dado:

```text
Saldo inicial: R$ 1.000,00
Despesa confirmada: R$ 200,00
Despesa cancelada posteriormente
```

Resultado esperado:

```text
Saldo final: R$ 1.000,00
```

---

# 36. Decisões para Versões Futuras

As seguintes regras serão definidas posteriormente:

* divisão de despesas entre membros;
* recorrências;
* parcelamentos;
* cartões de crédito;
* fechamento de faturas;
* pagamento de faturas;
* limites de cartão;
* orçamento mensal;
* metas;
* investimentos;
* múltiplas moedas;
* funcionamento offline;
* sincronização bancária;
* acesso de contador;
* permissões personalizadas;
* aprovação automática por IA;
* transferências entre espaços.

---

# 37. Regras Consolidadas

As principais regras da Versão 1 são:

1. cada usuário terá login próprio;
2. usuários participarão de Espaços Financeiros;
3. somente membros ativos acessarão o espaço;
4. o criador do espaço será administrador;
5. o último administrador não poderá ser removido;
6. contas pertencerão a um único espaço;
7. categorias poderão ser padrão ou personalizadas;
8. movimentações serão a entidade financeira central;
9. valores serão armazenados em centavos;
10. receitas aumentarão contas;
11. despesas reduzirão contas;
12. transferências moverão dinheiro sem gerar receita ou despesa;
13. ajustes corrigirão saldos sem serem receitas ou despesas;
14. somente movimentações confirmadas afetarão saldos;
15. movimentações canceladas permanecerão no histórico;
16. movimentações pendentes não afetarão saldos;
17. responsável financeiro e usuário criador serão conceitos separados;
18. saldos serão derivados do histórico;
19. contas e categorias utilizadas não serão excluídas fisicamente;
20. operações críticas serão validadas no domínio e no banco;
21. dados gerados por IA exigirão revisão humana;
22. usuários sem vínculo não poderão acessar dados do espaço.

---

# 38. Resumo

O Nexus Finance deverá garantir que toda movimentação financeira:

* seja válida;
* pertença ao espaço correto;
* possua autoria;
* respeite permissões;
* afete os saldos corretamente;
* permaneça auditável.

Essas regras serão a principal referência para o desenvolvimento do domínio, das funções do banco, das políticas de segurança e dos testes da aplicação.
