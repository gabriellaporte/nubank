<h1 align="center">
  <img alt="cgapp logo" src="https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-0-1.png" width="224px"/><br/>
  Nubank | Capital Gains
</h1>
<p align="center">
    Um teste técnico em Typescript para a posição de Engenheiro de Software no maior banco da América Latina. <b>Build conteinerizada</b>, <b>100% de testes</b> e <b>documentação</b>.
    <br/>
    <br/>
    Código <b>limpo</b>, <b>bem feito</b>, bem <b>documentado</b> e <b>performático</b>! É tudo isso e mais um pouco.
</p>

<hr>


<div align="center">

**[SOBRE O PROJETO](#-sobre-o-projeto) •
[TECH STACK & LIBS](#-tech-stack--libs) •
[COMO INSTALAR](#-como-instalar) •
[UTILIZANDO O SISTEMA](#-utilizando-o-sistema) •
[OUTROS DETALHES TÉCNICOS](#-alguns-outros-detalhes-técnicos) •
[CONSIDERAÇÕES FINAIS](#-considerações-finais)  •
[AGRADECIMENTOS](#-agradecimentos)**

</div>
<br />

# ☄ Sobre o Projeto

O projeto consiste em um programa de linha de comando (CLI) que calcula o imposto a ser pago sobre operações no mercado
financeiro de ações. Para isto, existem cálculos que levam em conta os lucros, prejuízos e Preço Médio Ponderado (PMP)
da movimentação que foi entrada pelo usuário.

Em todo o tempo, não parei de pensar em boas práticas. O código está recheado delas. Citar nominalmente uma por uma
levaria muito tempo, mas todas as variáveis, funções, separações de responsabilidades, testes, etc. foram escritos
levando em conta vários padrões adotados pela comunidade, padronizando o código e facilitando a sua revisão/manutenção.
Então você pode encontrar princípios do
_[SOLID](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)_,
_[Design Patterns](https://refactoring.guru/design-patterns)_,
_[Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)_, etc.

Além disso, deixei o mais performático possível. Afinal, queremos que o programa rode rápido, certo? 🚀

Como arquitetura (ou _design_, rsrs) de Software, adotei o padrão
arquitetural [_Clean Architecture_](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
e [_Domain-Driven Design_](https://martinfowler.com/bliki/DomainDrivenDesign.html). Por serem conhecidos popularmente,
não entrarei em detalhes sobre eles, mas a ideia é que o código seja o mais desacoplado possível, facilitando a
manutenção e a escalabilidade do _software_. Por exemplo, o sistema hoje roda em _CLI_, mas facilmente posso implementar
uma _API Rest_ ou algum outro _driver actor_, como propõe a [_Hexagonal
Architecture_](https://alistair.cockburn.us/hexagonal-architecture/).

Os testes foram escritos com [Jest](https://jestjs.io/), uma das ferramentas de testes mais populares do mercado. Eles
cobrem 100% da aplicação, incluindo a _CLI_ que eu mesmo criei. Sabendo da importância deles, também não poupei em
aplicar alguns padrões como o padrão _Triple A_, _SUTs_, _MUts_, _mocks_, _spies_, _stubs_, [_Test
Pyramid_](https://global-uploads.webflow.com/619e15d781b21202de206fb5/628b0dca3e6eda9219d40a6a_The-Testing-Pyramid-Simplified-for-One-and-All-1280X720%20(1).jpg)
na hora de arquitetar...

<br />

# 💻 Tech Stack & Libs

Aqui estão as tecnologias e bibliotecas utilizadas neste projeto:

- **[Node.js](https://nodejs.org/en/)** - Node.js é um ambiente de execução JavaScript que permite executar código
  JavaScript no backend.
- **[Typescript](https://www.typescriptlang.org/)** - TypeScript é um superconjunto de JavaScript desenvolvido pela
  Microsoft que adiciona tipagem e alguns outros recursos à linguagem.
- **[Jest](https://jestjs.io/)** - Jest é uma ferramenta de testes em JavaScript que é mantido pelo Facebook.
- **[Yargs](https://yargs.js.org/)** - Yargs é a biblioteca mais utilizada para criação de CLIs em Node.js.

<br />

# 🚀 Como Instalar

Primeiro, [baixe e configure](https://docs.docker.com/engine/install/) o Docker. Ele é necessário para rodar o projeto,
uma vez que a build está conteinerizada.
> 👆 Não se esqueça de configurar o [Docker Compose](https://docs.docker.com/compose/) também!

Depois, acessando o repositório do projeto, execute o comando abaixo para buildar o projeto. Pode levar um tempinho para
concluir, ok? Coisa de minutos.

```bash
docker compose build
```

> 🐳 Você pode usar o parâmetro `--no-cache` para forçar a build do zero, caso queira. Mas isso vai levar mais tempo.

> 🐢 Se estiver lento, você pode usar a build de desenvolvimento com `docker compose -f docker-compose.dev.yml build`.
> Porém ele não builda o Typescript, mas usa o `ts-node` para executar o código.

> ⌛ Nos testes que fiz, a build zerada de prod levou cerca de [50 segundos](https://prnt.sc/bYnDNOIMwffH). A de dev,
> cerca de [30 segundos](https://prnt.sc/u-rEyGXi0w39). Mas isso pode variar.

Por fim, você pode rodar o projeto com o comando:

```bash
docker run -it nubank-capital-gains npm run calculate
```

> 🎲 Para o caso de build de desenvolvimento, você pode rodar o comando
`docker run -it nubank-capital-gains npm run calculate:dev` pois ele usa o ts-node para executar o código em TypeScript.

> ❌ Se você não quiser usar Docker, você precisará instalar o [Node.js](https://nodejs.org/) e
> o [Typescript](https://www.typescriptlang.org/download/) na sua máquina. Ah, e algum
> gerenciador de pacotes como [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
> ou [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/). Depois, basta instalar as libs com `npm install` buildar
> o projeto com `npm run build` e depois usar normalmente o comando `npm run calculate` como mostrei acima.

Ah! E antes que me esqueça, se quiser rodar os testes e ver a cobertura, basta rodar o comando:

```bash
npm run test
```

<br />

# ⌨️ Utilizando o Sistema

Tá na hora de usar o nosso sistema. Você rodou os comandos de _build_, configurou tudo certinho e acessou a CLI. E
agora?
Agora, você deve entrar os dados do seu investimento em formato JSON. Cada linha vai registrar um histórico de transação
e ser independente das demais, mas você pode optar por inserir várias linhas de uma vez só que vai funcionar também.

Exemplo:

```
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000}, {"operation":"sell", "unit-cost":20.00, "quantity": 5000}]
[{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":10.00, "quantity": 5000}]
```

> 📝 **Observação**: muita atenção na hora de copiar e colar o JSON. Se houver algum erro de formatação, o sistema não
> vai
> aceitar o seu input, ok? Isso inclui quebras de linhas não esperadas. O sistema interpreta uma quebra de linha como um
> novo registro.

E, daí, apertando `Enter` (2x) ou apertando `CTRL+D`, o sistema vai calcular o imposto a ser pago sobre as operações. O
resultado será exibido no console. Não vamos entrar em detalhes sobre as regras de negócio, mas todas definições estão
sendo atendidas, okay?

<br />

# 📚 Alguns Outros Detalhes Técnicos...

Legal! Que bom que você gostou do teste. Mas, se você quiser saber mais sobre o projeto, aqui estão alguns detalhes
técnicos que podem te interessar:

- **Pensando no Futuro**: O código foi feito pensando em extensão. Pensando no futuro. Como nós vamos nos encontrar de
  novo, pode ser que você solicite alguma implementação extra ou alguma feature. O sistema está pronto. Um comando novo
  na CLI? Fácil. API Rest? Fácil. Mudanças de cálculos/impostos? Fácil também.
- **Documentação Necessária**: o projeto está bem documentado, mas não desnecessariamente. Sabemos que comentários podem
  ser úteis, mas eles também podem ser code smells de que suas funções/variáveis não estão claras o suficiente. Por
  isso, poupei e utilizei comentários somente em classes mais complexas e onde a regra de negócio é aplicada mais
  fortemente.
- **Testes**: como já mencionado, os testes cobrem 100% do código. Eles estão bem organizados e escritos de forma a
  serem o mais legíveis possível. Além disso, eles são bem rápidos, então você pode rodá-los sempre que quiser.
- **Performance**: o código foi escrito pensando em performance. Não há laços de repetição desnecessários, nem funções
  que são chamadas várias vezes sem necessidade. O código é limpo e performático.
- **Validação**: apesar de segurar as pontas e verificar se os dados inseridos são válidos, como informado no
  levantamento de requisitos do sistema, não há muitas validações extras, portanto espera-se que o usuário insira os
  dados corretamente, como combinado.
- **Docker e Ambiente**: tudo está conteinerizado. Para configurar tudo, é só seguir os passos que mencionei lá em cima.
  Porém, gostaria de falar que tentei optimizar ao máximo o processo de build e execução do projeto. Usei multi-stage
  builds e outras técnicas que com certeza vão influenciar na performance do sistema. Apesar disso... Buildar do zero
  leva um tempinho, né?
- **Desenvolvimento**: Usei ferramentas que garantiam a qualidade do código como ESLint e Prettier, aumentando minha
  produtividade.
- **Retorno com casas decimais**: O JavaScript, ao usar a função `JSON.stringify` para devolver os impostos calculados
  remove automaticamente as casas decimais dos floats com .00 no final. Por isso ele vai ficar como inteiro nesses
  casos.

<br />

# 👋 Considerações Finais

E aí, o que achou do teste? Espero que tenha gostado. Foi feito com muito carinho e dedicação. Se tiver alguma dúvida,
não hesite em me contatar. Se algo não saiu como o planejado (improvável), estou à disposição para corrigir.

Espero que tenha gostado, de verdade! E, quem sabe, nos encontramos em breve. Bora conversar? 🚀

<br />

# 💜 Agradecimentos

Em primeiro lugar a Deus. SDG! Em segundo lugar, à minha melhor amiga e esposa: Ana. Também, à minha família que tão
amorosamente me encorajou a seguir em frente. Minha carreira é feita por pessoas e para pessoas.

E, claro, à pessoa da Nubank (que não posso informar por anonimato, como vocês pedem) que está conduzindo o processo tão
gentilmente, e à equipe que está lendo isso.
Obrigado mesmo, espero que estejam "encantados" assim como a Nubank tem como pilar o "encantamento"! Fiz com muito zelo!
🙏