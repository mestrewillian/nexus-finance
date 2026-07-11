# Nexus Finance — Integração com Inteligência Artificial

## 1. Objetivo deste documento

Este documento define como a inteligência artificial será integrada ao Nexus Finance.

Seu objetivo é estabelecer:

* os casos de uso da IA;
* o fluxo de leitura de recibos;
* a arquitetura da integração;
* as responsabilidades do aplicativo, backend e modelo de IA;
* o formato dos dados extraídos;
* as regras de validação;
* a revisão humana;
* a segurança;
* a privacidade;
* o controle de custos;
* o tratamento de falhas;
* os limites da automação.

A inteligência artificial deverá reduzir o trabalho manual sem comprometer a confiabilidade dos dados financeiros.

---

# 2. Princípio central

A IA deverá seguir esta regra:

> A inteligência artificial sugere, o domínio valida e o usuário confirma.

A IA não será considerada fonte definitiva da verdade financeira.

Ela poderá:

* interpretar;
* sugerir;
* classificar;
* resumir;
* comparar;
* identificar padrões.

Ela não poderá, inicialmente:

* confirmar movimentações automaticamente;
* alterar saldos sem revisão;
* excluir registros;
* movimentar dinheiro;
* alterar permissões;
* acessar dados de outros Espaços Financeiros;
* apresentar estimativas como fatos.

---

# 3. Objetivos da IA no Nexus Finance

A inteligência artificial será utilizada para:

1. reduzir o preenchimento manual;
2. extrair informações de documentos;
3. sugerir categorias;
4. identificar estabelecimentos;
5. reconhecer produtos e valores;
6. organizar movimentações pendentes;
7. responder perguntas sobre os dados financeiros;
8. identificar padrões de consumo;
9. comparar períodos;
10. produzir explicações compreensíveis;
11. detectar possíveis duplicidades;
12. sugerir correções para revisão.

---

# 4. Casos de uso planejados

## 4.1 Leitura de recibos e cupons

O usuário fotografa um documento de compra.

O sistema tenta identificar:

* estabelecimento;
* data;
* valor total;
* itens;
* quantidades;
* preços;
* descontos;
* forma de pagamento;
* categoria sugerida;
* possíveis impostos ou taxas.

## 4.2 Leitura de comprovantes

O sistema poderá interpretar:

* comprovante de PIX;
* comprovante de transferência;
* boleto pago;
* comprovante de depósito;
* recibo simples;
* nota de serviço.

## 4.3 Categorização

A IA poderá sugerir:

* categoria principal da movimentação;
* categoria de cada item;
* descrição padronizada;
* estabelecimento correspondente.

## 4.4 Assistente financeiro

O usuário poderá fazer perguntas como:

```text
Quanto gastamos com alimentação neste mês?
```

```text
Qual foi o nosso maior gasto em julho?
```

```text
Compare as despesas deste mês com o mês anterior.
```

```text
Em quais categorias os gastos aumentaram?
```

## 4.5 Análises e alertas

A IA poderá identificar:

* aumento incomum de despesas;
* gastos recorrentes;
* assinaturas;
* compras duplicadas;
* tendência de redução de saldo;
* categorias com crescimento;
* diferenças entre membros;
* possíveis oportunidades de economia.

---

# 5. Escopo de implementação

A integração com IA não será implementada no núcleo inicial da Versão 1.

Ela começará somente quando:

* autenticação estiver estável;
* Espaços Financeiros estiverem funcionando;
* contas estiverem implementadas;
* categorias estiverem implementadas;
* movimentações manuais estiverem validadas;
* status pendente estiver funcionando;
* políticas de segurança estiverem revisadas;
* o backend seguro estiver disponível.

A primeira implementação de IA terá escopo restrito à leitura de recibos.

---

# 6. Arquitetura geral

O fluxo deverá ser:

```text
Aplicativo Android
        ↓
Envio seguro da imagem
        ↓
Storage privado
        ↓
Função de backend
        ↓
API da OpenAI
        ↓
Resposta estruturada
        ↓
Validação do backend
        ↓
Movimentação pendente
        ↓
Revisão no aplicativo
        ↓
Confirmação do usuário
```

O aplicativo não deverá chamar diretamente a OpenAI utilizando uma chave secreta.

---

# 7. Componentes da arquitetura

## 7.1 Aplicativo móvel

Responsável por:

* abrir a câmera;
* selecionar imagem;
* exibir prévia;
* iniciar processamento;
* acompanhar status;
* apresentar os dados extraídos;
* permitir edição;
* solicitar confirmação;
* exibir erros.

## 7.2 Storage

Responsável por:

* armazenar temporariamente a imagem;
* restringir acesso;
* vincular o arquivo ao usuário e espaço;
* fornecer acesso controlado ao backend;
* permitir exclusão conforme política de retenção.

## 7.3 Backend

Responsável por:

* autenticar a solicitação;
* validar o usuário;
* validar o Espaço Financeiro;
* verificar permissões;
* limitar tamanho e tipo da imagem;
* chamar a API da OpenAI;
* validar a resposta;
* registrar custos e uso;
* criar movimentação pendente;
* tratar erros;
* proteger segredos.

## 7.4 API da OpenAI

Responsável por:

* interpretar a imagem;
* identificar texto e estrutura;
* extrair os campos solicitados;
* retornar dados estruturados.

## 7.5 Domínio financeiro

Responsável por:

* validar os valores;
* validar datas;
* validar contas;
* validar categorias;
* verificar consistência;
* impedir confirmação inválida;
* aplicar regras de negócio.

---

# 8. Segurança da chave da OpenAI

A chave da API:

* não deverá estar no aplicativo;
* não deverá possuir prefixo público;
* não deverá ser enviada ao dispositivo;
* não deverá estar no GitHub;
* não deverá aparecer em logs;
* não deverá ser salva em documentos;
* não deverá ser inserida em `app.json`;
* não deverá estar em arquivos distribuídos com o aplicativo.

A chave deverá permanecer em ambiente seguro.

Possíveis ambientes:

* Supabase Edge Function;
* servidor Node.js;
* função serverless;
* infraestrutura backend futura.

---

# 9. Autorização

Antes de processar uma imagem, o backend deverá confirmar:

1. existe usuário autenticado;
2. o usuário possui sessão válida;
3. o Espaço Financeiro existe;
4. o usuário é membro ativo;
5. o usuário possui permissão para criar movimentações;
6. o arquivo pertence ao contexto autorizado;
7. o limite de uso não foi excedido.

Conhecer o identificador de um arquivo não deverá conceder acesso a ele.

---

# 10. Fluxo de captura

## 10.1 Início

O usuário escolhe:

```text
Adicionar movimentação
→ Escanear recibo
```

## 10.2 Origem da imagem

Opções futuras:

* tirar foto;
* escolher da galeria;
* importar arquivo.

Na primeira implementação, serão priorizadas:

* câmera;
* galeria.

## 10.3 Prévia

Antes do envio, o usuário deverá visualizar:

* imagem;
* opção de refazer;
* opção de recortar futuramente;
* botão de continuar.

## 10.4 Orientações

A interface poderá orientar:

```text
Posicione todo o recibo dentro da imagem.
```

```text
Evite sombras e reflexos.
```

```text
Certifique-se de que os valores estejam legíveis.
```

---

# 11. Validação da imagem

Antes do processamento, deverão ser verificados:

* formato;
* tamanho;
* resolução;
* existência do arquivo;
* conteúdo compatível;
* autorização.

Formatos iniciais previstos:

* JPEG;
* PNG;
* WebP, caso seja compatível com todo o fluxo.

Arquivos inválidos deverão ser rejeitados antes de chamar a IA.

---

# 12. Otimização da imagem

O aplicativo ou backend poderá:

* reduzir dimensões excessivas;
* comprimir;
* corrigir orientação;
* remover metadados desnecessários;
* gerar versão adequada para processamento.

A otimização deverá preservar a legibilidade.

Imagens não deverão ser comprimidas a ponto de impedir a leitura de:

* valores;
* datas;
* nomes de itens;
* códigos;
* totais.

---

# 13. Registro do processamento

Cada tentativa poderá gerar um registro conceitual:

```text
receipt_imports
---------------
id
financial_space_id
uploaded_by
file_path
processing_status
attempt_count
provider
model
input_metadata
result_data
error_code
error_message
estimated_cost
created_transaction_id
created_at
updated_at
```

Estados possíveis:

```text
uploaded
queued
processing
completed
failed
reviewed
confirmed
discarded
```

---

# 14. Saída estruturada

A resposta da IA deverá ser estruturada e validada.

Não deverá ser utilizado texto livre como fonte direta para criar uma movimentação.

Estrutura conceitual:

```json
{
  "documentType": "receipt",
  "merchant": {
    "name": "Supermercado São Cristóvão",
    "taxId": null
  },
  "purchaseDate": "2026-07-08",
  "currencyCode": "BRL",
  "subtotalCents": 18000,
  "discountCents": 500,
  "taxCents": 0,
  "totalAmountCents": 17500,
  "paymentMethod": "pix",
  "items": [
    {
      "description": "Arroz 5 kg",
      "quantity": 1,
      "unitPriceCents": 3290,
      "totalPriceCents": 3290,
      "suggestedCategory": "food",
      "confidence": 0.94
    }
  ],
  "suggestedTransactionType": "expense",
  "suggestedCategory": "food",
  "confidence": 0.91,
  "warnings": []
}
```

A API da OpenAI possui suporte documentado a saídas estruturadas e processamento de imagens, mas o backend continuará responsável por validar cada campo antes de utilizá-lo.

---

# 15. Campos da resposta

## 15.1 Tipo de documento

Valores possíveis:

```text
receipt
invoice
pix_receipt
bank_transfer
payment_receipt
unknown
```

## 15.2 Estabelecimento

Campos:

* nome;
* CNPJ ou identificador, quando legível;
* endereço opcional;
* nome comercial.

## 15.3 Data

Deverá utilizar formato:

```text
YYYY-MM-DD
```

Se a data não puder ser identificada:

```text
null
```

A IA não deverá inventar uma data.

## 15.4 Moeda

Valor inicial esperado:

```text
BRL
```

## 15.5 Valores

Todos os valores deverão ser retornados em centavos.

Exemplo:

```text
R$ 186,42 = 18642
```

## 15.6 Forma de pagamento

Valores possíveis:

```text
cash
pix
debit_card
credit_card
bank_transfer
voucher
unknown
```

## 15.7 Itens

Cada item poderá possuir:

* descrição;
* quantidade;
* unidade;
* preço unitário;
* valor total;
* desconto;
* categoria sugerida;
* confiança.

## 15.8 Avisos

Exemplos:

```text
Total parcialmente ilegível.
```

```text
A soma dos itens difere do total.
```

```text
Forma de pagamento não identificada.
```

---

# 16. Dados obrigatórios e opcionais

## 16.1 Obrigatórios para análise concluída

* tipo do documento;
* valor total identificado ou aviso de ausência;
* nível geral de confiança;
* estrutura válida.

## 16.2 Opcionais

* estabelecimento;
* data;
* forma de pagamento;
* itens;
* subtotal;
* descontos;
* impostos;
* CNPJ;
* endereço;
* categoria.

A ausência de um campo opcional não deverá causar falha total.

---

# 17. Regras de confiança

Cada análise poderá possuir nível de confiança entre:

```text
0 e 1
```

Exemplo:

```text
0.95
```

representa alta confiança.

## 17.1 Confiança alta

O campo poderá ser preenchido automaticamente no formulário, ainda sujeito à revisão.

## 17.2 Confiança média

O campo deverá receber indicação visual.

## 17.3 Confiança baixa

O campo poderá permanecer vazio ou exigir revisão explícita.

Os limites definitivos serão definidos após testes reais.

Exemplo inicial:

```text
Alta: maior ou igual a 0,90
Média: de 0,70 a 0,89
Baixa: abaixo de 0,70
```

Esses valores não deverão ser tratados como garantia de acerto.

---

# 18. Validação da resposta

O backend deverá validar:

* formato JSON;
* presença dos campos esperados;
* tipos;
* limites numéricos;
* datas;
* moeda;
* valores não negativos;
* quantidade de itens;
* tamanho dos textos;
* enums permitidos;
* consistência do total.

A resposta não deverá ser salva diretamente sem validação.

---

# 19. Regras financeiras após extração

A análise poderá gerar uma movimentação pendente.

Campos inicialmente preenchidos:

* tipo;
* descrição;
* valor;
* data;
* categoria sugerida;
* itens;
* estabelecimento;
* origem da importação.

Campos que poderão exigir escolha do usuário:

* conta;
* responsável;
* categoria final;
* status;
* forma de pagamento vinculada;
* confirmação da data.

---

# 20. Movimentação pendente

Movimentações geradas por IA deverão possuir:

```text
status = pending
```

Elas não deverão:

* alterar saldo;
* entrar no total de despesas confirmadas;
* entrar no resultado;
* aparecer como dado definitivo;
* ser consideradas em análises financeiras confirmadas.

Elas poderão aparecer em uma seção:

```text
Aguardando revisão
```

---

# 21. Tela de revisão

A tela deverá apresentar:

* imagem original;
* estabelecimento;
* data;
* valor total;
* subtotal;
* desconto;
* forma de pagamento;
* categoria;
* conta;
* responsável;
* itens;
* avisos;
* confiança.

Ações:

```text
Editar
Confirmar
Descartar
Processar novamente
```

---

# 22. Confirmação humana

Antes de confirmar, o sistema deverá verificar:

* valor maior que zero;
* conta selecionada;
* categoria compatível;
* responsável válido;
* data válida;
* Espaço Financeiro correto;
* usuário autorizado.

Somente depois dessas validações:

```text
pending → confirmed
```

A movimentação passará a afetar os saldos.

---

# 23. Descarte

Ao descartar uma análise:

* a movimentação pendente não será confirmada;
* o registro de processamento poderá permanecer para auditoria técnica;
* a imagem poderá ser excluída conforme política de retenção;
* nenhuma alteração financeira será aplicada.

---

# 24. Reprocessamento

O usuário poderá reprocessar quando:

* a imagem estiver legível;
* houver falha temporária;
* o resultado estiver incompleto;
* uma estratégia diferente puder melhorar a leitura.

O sistema deverá limitar reprocessamentos para evitar custos desnecessários.

Exemplo:

```text
Máximo de três tentativas automáticas por arquivo.
```

O limite definitivo será configurável.

---

# 25. Tratamento de duplicidade

Antes de criar a movimentação pendente, o sistema poderá comparar:

* estabelecimento;
* data;
* valor;
* itens;
* hash da imagem;
* usuário;
* espaço.

Se houver possível duplicidade:

```text
Encontramos uma movimentação semelhante.
Deseja revisar antes de continuar?
```

A detecção não deverá excluir automaticamente nenhum registro.

---

# 26. Associação de categoria

A categorização poderá utilizar:

1. conteúdo do recibo;
2. estabelecimento;
3. itens;
4. categorias existentes;
5. histórico do Espaço Financeiro;
6. preferências anteriores.

A IA deverá sugerir apenas categorias disponíveis para o espaço.

Se não houver categoria compatível:

```text
Outras despesas
```

ou:

```text
Categoria não definida
```

A escolha definitiva será do usuário.

---

# 27. Associação de conta

A IA não deverá escolher uma conta financeira apenas por suposição.

Ela poderá sugerir uma conta quando houver evidência, como:

* nome do banco;
* final do cartão;
* forma de pagamento conhecida;
* configuração previamente autorizada;
* correspondência com cadastro do usuário.

Sem evidência suficiente, o campo deverá permanecer sem seleção.

---

# 28. Associação de responsável

O responsável padrão poderá ser:

* usuário que enviou o documento.

O usuário poderá alterar antes de confirmar.

A IA não deverá atribuir outro membro sem evidência ou regra configurada.

---

# 29. Itens do recibo

Os itens poderão ser armazenados em `transaction_items`.

Campos:

* descrição original;
* descrição normalizada;
* quantidade;
* preço unitário;
* total;
* categoria sugerida;
* confiança;
* posição no documento.

A descrição original deverá ser preservada quando possível.

Exemplo:

```text
Original: ARROZ TP1 5KG
Normalizada: Arroz tipo 1 — 5 kg
```

---

# 30. Diferença entre soma e total

A soma dos itens poderá diferir do total por:

* descontos;
* acréscimos;
* impostos;
* arredondamentos;
* itens ilegíveis;
* taxa de serviço.

O sistema deverá calcular:

```text
difference_cents =
total_amount_cents
-
sum(item.total_price_cents)
```

Se a diferença ultrapassar um limite aceitável, deverá gerar aviso.

Exemplo:

```text
A soma dos itens difere do total em R$ 4,50.
```

O usuário ainda poderá confirmar após revisão.

---

# 31. Assistente financeiro

O assistente deverá operar sobre dados estruturados do banco.

Ele não deverá depender apenas de conversas anteriores.

Fluxo:

```text
Pergunta do usuário
        ↓
Validação de acesso
        ↓
Consulta financeira autorizada
        ↓
Dados estruturados
        ↓
Modelo de IA
        ↓
Resposta
```

O modelo não deverá consultar diretamente tabelas sem uma camada controlada.

---

# 32. Ferramentas do assistente

Em vez de enviar todos os dados financeiros para o modelo, o backend poderá oferecer funções específicas.

Exemplos:

```text
getFinancialSummary
getExpensesByCategory
getTransactionsByPeriod
getAccountBalances
comparePeriods
getMemberSummary
```

Essas funções deverão:

* exigir autenticação;
* respeitar o Espaço Financeiro;
* validar permissões;
* retornar apenas os dados necessários;
* registrar uso quando apropriado.

---

# 33. Respostas do assistente

A resposta deverá diferenciar:

* fatos;
* cálculos;
* interpretações;
* sugestões.

Exemplo adequado:

```text
Em julho, o Espaço Financeiro registrou R$ 1.250,00 em despesas de alimentação, 18% a mais que em junho.
```

Sugestão:

```text
Uma possibilidade de economia seria revisar as compras de alimentos fora de casa.
```

A sugestão não deverá ser apresentada como obrigação ou garantia.

---

# 34. Limites das análises

O assistente não deverá:

* inventar movimentações;
* preencher lacunas com valores fictícios;
* prometer resultados financeiros;
* oferecer aconselhamento profissional como certeza;
* recomendar investimentos específicos sem contexto apropriado;
* ocultar incerteza;
* utilizar dados de outro espaço;
* alterar registros sem solicitação e confirmação.

---

# 35. Privacidade

Documentos financeiros podem conter:

* nome;
* CPF;
* CNPJ;
* endereço;
* dados bancários;
* produtos comprados;
* horários;
* localização;
* informações familiares.

O sistema deverá aplicar minimização de dados.

Somente informações necessárias deverão ser enviadas para processamento.

---

# 36. Retenção de imagens

A política definitiva será definida antes do uso real.

Alternativas:

## Alternativa A — Exclusão após processamento

A imagem é excluída depois da confirmação ou descarte.

### Vantagens

* maior privacidade;
* menor custo de armazenamento.

### Limitações

* impossibilidade de revisão futura.

## Alternativa B — Retenção temporária

A imagem permanece por período determinado.

Exemplo:

```text
30 dias
```

### Vantagens

* suporte e revisão;
* possibilidade de reprocessamento.

### Limitações

* maior responsabilidade de proteção.

## Decisão inicial recomendada

Manter a imagem apenas durante o processamento e revisão.

Após confirmação, o usuário poderá escolher:

* excluir a imagem;
* conservar como anexo.

A decisão definitiva deverá ser registrada em ADR.

---

# 37. Exclusão de metadados

Quando possível, deverão ser removidos metadados desnecessários da imagem, como:

* localização GPS;
* modelo do aparelho;
* informações de câmera;
* dados de edição.

A remoção reduz exposição de dados não necessários.

---

# 38. Logs

Os logs não deverão conter:

* imagem completa;
* chave da API;
* senha;
* token;
* dados bancários completos;
* conteúdo integral do recibo;
* CPF;
* endereço;
* valores financeiros desnecessários.

Logs poderão conter:

* identificador interno;
* status;
* duração;
* código de erro;
* modelo utilizado;
* estimativa de custo;
* quantidade de itens;
* tamanho do arquivo.

---

# 39. Controle de custos

Cada chamada de IA possui custo variável conforme:

* modelo;
* tamanho da imagem;
* qualidade;
* quantidade de texto;
* tamanho da resposta;
* número de tentativas.

Os preços e modelos disponíveis podem mudar, portanto o custo deverá ser consultado na documentação oficial antes da implementação e periodicamente durante a operação.

O sistema deverá registrar:

```text
model
input_tokens
output_tokens
image_metadata
estimated_cost
processing_duration
```

Quando essas métricas estiverem disponíveis.

---

# 40. Limites de uso

Poderão existir limites por:

* usuário;
* Espaço Financeiro;
* dia;
* mês;
* plano;
* tamanho de arquivo;
* quantidade de itens;
* reprocessamentos.

Exemplo inicial de desenvolvimento:

```text
10 processamentos por usuário por dia
```

Esse valor é apenas uma configuração inicial e deverá ser revisado com base no custo real.

---

# 41. Proteção contra uso indevido

O backend deverá possuir:

* autenticação;
* rate limiting;
* limite de arquivo;
* limite de chamadas;
* validação de origem;
* registro de falhas;
* bloqueio temporário quando necessário;
* proteção contra repetição automática;
* tempo máximo de processamento.

---

# 42. Seleção do modelo

O modelo deverá ser escolhido com base em:

* capacidade de visão;
* suporte a dados estruturados;
* precisão;
* custo;
* latência;
* estabilidade;
* disponibilidade.

O nome do modelo não deverá ficar espalhado pelo código.

Exemplo:

```text
OPENAI_RECEIPT_MODEL
```

A configuração deverá permitir substituição sem alterar o domínio.

---

# 43. Prompts

Os prompts deverão ficar versionados e centralizados.

Possível estrutura:

```text
src/ai/prompts/
└── receiptExtractionPrompt.ts
```

ou no backend:

```text
prompts/
└── receipt-extraction.ts
```

Cada versão poderá possuir:

* identificador;
* data;
* objetivo;
* modelo esperado;
* schema esperado;
* alterações;
* resultados de testes.

---

# 44. Diretrizes do prompt de recibos

O prompt deverá instruir o modelo a:

* não inventar campos;
* utilizar `null` quando não identificar;
* retornar centavos;
* usar datas padronizadas;
* preservar descrições originais;
* indicar incertezas;
* retornar avisos;
* diferenciar subtotal, desconto e total;
* não selecionar contas sem evidência;
* seguir o schema.

---

# 45. Versionamento da extração

Cada processamento deverá registrar:

* versão do prompt;
* versão do schema;
* modelo;
* data;
* versão do backend.

Isso permitirá compreender diferenças entre resultados antigos e novos.

---

# 46. Tratamento de falhas

## 46.1 Imagem ilegível

Mensagem:

```text
Não foi possível ler o documento. Tente tirar outra foto com mais iluminação.
```

## 46.2 Documento não reconhecido

Mensagem:

```text
Não identificamos um recibo ou comprovante compatível.
```

## 46.3 Falha temporária

Mensagem:

```text
Não foi possível processar o documento agora. Tente novamente.
```

## 46.4 Limite atingido

Mensagem:

```text
O limite de análises foi atingido. Tente novamente mais tarde.
```

## 46.5 Resposta inválida

O backend deverá:

* rejeitar a resposta;
* registrar o erro;
* não criar movimentação confirmada;
* permitir preenchimento manual.

---

# 47. Tempo de processamento

A interface deverá mostrar progresso compreensível.

Exemplos:

```text
Enviando imagem...
```

```text
Analisando documento...
```

```text
Organizando os itens...
```

```text
Preparando para revisão...
```

A interface não deverá prometer tempo exato.

---

# 48. Processamento assíncrono

Se o processamento demorar mais que uma requisição comum, poderá utilizar:

```text
uploaded
→ queued
→ processing
→ completed
```

O aplicativo poderá consultar o status.

Futuramente, poderá receber notificação quando a análise terminar.

Na primeira implementação, deverá ser escolhida a solução mais simples que permaneça confiável.

---

# 49. Testes de extração

Deverá existir um conjunto de documentos de teste sem dados sensíveis.

Tipos:

* cupom curto;
* cupom longo;
* impressão fraca;
* foto inclinada;
* sombra;
* recibo manuscrito;
* comprovante de PIX;
* desconto;
* múltiplas formas de pagamento;
* documento inválido.

Dados financeiros reais não deverão ser incluídos no repositório público.

---

# 50. Métricas de qualidade

A integração poderá medir:

* precisão do valor total;
* precisão da data;
* precisão do estabelecimento;
* quantidade correta de itens;
* categoria aceita;
* número de campos corrigidos;
* taxa de falha;
* tempo de processamento;
* custo médio;
* taxa de confirmação;
* taxa de descarte.

---

# 51. Critérios de sucesso da leitura de recibos

A primeira versão será considerada útil quando:

1. identificar corretamente o total na maioria dos documentos legíveis;
2. criar movimentação pendente;
3. nunca alterar saldo antes da confirmação;
4. permitir edição completa;
5. registrar falhas sem corromper dados;
6. proteger a chave da API;
7. respeitar o Espaço Financeiro;
8. manter custo controlado;
9. apresentar resultado em tempo aceitável;
10. permitir cadastro manual quando a IA falhar.

---

# 52. Avaliações periódicas

Mudanças em prompts, modelos ou schemas deverão ser avaliadas com o mesmo conjunto de testes.

Comparações deverão considerar:

* acertos;
* erros;
* custo;
* latência;
* consistência;
* regressões.

Não deverá ser adotado um novo modelo apenas por ser mais recente.

---

# 53. Funcionalidades futuras

Depois da leitura básica de recibos:

* aprendizagem com correções;
* associação de estabelecimentos;
* categorias por item;
* comparação de preços;
* histórico de produtos;
* detecção de assinaturas;
* leitura de faturas;
* importação de extratos;
* comandos em linguagem natural;
* alertas inteligentes;
* previsão de saldo;
* análise de orçamento;
* explicação de tendências.

---

# 54. Uso de correções do usuário

As correções poderão melhorar sugestões futuras.

Exemplo:

```text
A IA sugeriu “Compras”.
O usuário alterou para “Alimentação”.
```

O sistema poderá registrar:

* sugestão original;
* valor corrigido;
* contexto;
* estabelecimento;
* categoria escolhida.

Esse histórico não deverá ser utilizado fora do Espaço Financeiro sem consentimento e política adequada.

---

# 55. Transparência

O usuário deverá saber quando uma informação foi:

* digitada manualmente;
* importada;
* sugerida por IA;
* confirmada;
* corrigida.

Exemplo:

```text
Categoria sugerida pela IA
```

A origem do dado não deverá ser ocultada.

---

# 56. Segurança contra instruções maliciosas

Textos presentes em recibos e documentos deverão ser tratados como dados, não como instruções.

O backend e o prompt deverão impedir que conteúdo do documento:

* altere as regras do sistema;
* solicite acesso a outros dados;
* modifique o schema;
* execute ações;
* ignore validações;
* obtenha segredos.

As regras de negócio deverão permanecer fora do controle do conteúdo analisado.

---

# 57. Responsabilidades por camada

## Aplicativo

* captura;
* envio;
* revisão;
* confirmação.

## Backend

* autenticação;
* autorização;
* limites;
* chamada da IA;
* validação;
* auditoria;
* criação pendente.

## Modelo de IA

* interpretação;
* extração;
* sugestão.

## Domínio

* regras;
* consistência;
* validação financeira.

## Banco

* integridade;
* segurança;
* persistência.

## Usuário

* revisão;
* correção;
* confirmação.

---

# 58. Decisões consolidadas

1. a IA será implementada após o núcleo manual;
2. a chave ficará somente no backend;
3. imagens serão processadas em fluxo autorizado;
4. a resposta será estruturada;
5. todos os campos serão validados;
6. a IA não confirmará movimentações automaticamente;
7. movimentações serão criadas como pendentes;
8. o usuário poderá editar tudo;
9. somente a confirmação afetará saldos;
10. custos serão registrados e limitados;
11. imagens terão política de retenção;
12. logs não terão dados sensíveis;
13. o assistente usará consultas autorizadas;
14. respostas deverão distinguir fatos e sugestões;
15. falhas sempre permitirão cadastro manual;
16. prompts, schemas e modelos serão versionados;
17. conteúdo dos documentos será tratado apenas como dado;
18. a integração respeitará o Espaço Financeiro ativo.

---

# 59. Critérios para iniciar a implementação

A implementação poderá começar quando:

* Fase 1 concluída;
* autenticação concluída;
* RLS revisada;
* contas funcionando;
* categorias funcionando;
* movimentações pendentes funcionando;
* backend seguro configurado;
* política de imagens definida;
* limite de custos definido;
* documentos de teste preparados;
* schema de resposta aprovado.

---

# 60. Resumo

A inteligência artificial do Nexus Finance terá como função reduzir o trabalho manual e transformar documentos em dados financeiros revisáveis.

O fluxo principal será:

```text
Capturar
→ Processar
→ Extrair
→ Validar
→ Revisar
→ Confirmar
```

A IA nunca substituirá as regras financeiras do domínio.

Nenhuma movimentação gerada automaticamente afetará os saldos sem validação e confirmação humana.
