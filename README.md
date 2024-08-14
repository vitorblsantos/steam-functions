# Lambda Functions

Arquitetura modular que utiliza o recurso de functions da GCP para proporcionar eficiência e escalabilidade. Cada função Lambda é projetada para executar tarefas específicas de forma independente, permitindo uma abordagem modular e flexível para o desenvolvimento e manutenção do portal. A separação em funções especializadas garante que cada componente possa ser atualizado e escalado de forma autônoma, sem impactar o restante do sistema. Essa configuração não só facilita a integração e a evolução contínua dos serviços, mas também otimiza o desempenho e a gestão de recursos, contribuindo para uma operação mais eficiente e responsiva.

## Sumário

- [Dependências](#dependências)
- [Instalação](#instalação)
- [Uso](#uso)
- [Suporte](#suporte)
- [Contribuições](#contribuições)

## Dependências

- [JDK 22](https://www.oracle.com/java/technologies/downloads/#jdk22-windows)
- [Node 20.16.0](https://nodejs.org/dist/v20.16.0/node-v20.16.0-win-x64.zip)

## Instalação

Clone esse repositório e instale as dependências.

```sh
  cd ./lambda-functions
  npm i
```

## Uso

```sh
  cd ./lambda-functions
  npm run dev
```

## Suporte

Por favor, [abra uma issue](https://google.com.br) para o time de desenvolvimento.

## Contribuições

Por favor, contribua usando os padrões do [Github Flow](https://guides.github.com/introduction/flow/). Crie uma branch, adicione commits, e [abra uma solicitação de merge](https://google.com.br).
