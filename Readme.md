# Prova de conceito TIM

Esse repositório tem como objetivo guardar os artefatos do projeto de prova de conceito da TIM.

Este projeto é composto por três frentes principais: `back-end`, `vsts-layout-sample` e `vsts-rest-multivalue`. O `back-end` refere-se à parte do sistema que lida com a lógica e os dados do servidor. O `vsts-layout-sample` é responsável pelo layout visual e a aparência do sistema, proporcionando uma experiência do usuário intuitiva. Por fim, o `vsts-rest-multivalue` trata da funcionalidade de manipulação de valores múltiplos no contexto do sistema. Cada frente desempenha um papel fundamental no desenvolvimento e funcionamento geral do projeto.

## Back-End

Passo a Passo para Rodar o Projeto:

- Microsoft .NET SDK: Certifique-se de ter o SDK do .NET instalado em seu sistema. Você pode baixá-lo e instalá-lo a partir do site oficial da Microsoft.

- Conta Azure e Connection String: Tenha uma conta no Azure e a Connection String para acessar o Azure Storage.

A `Connection String` precisa ser configurada de acordo com o ambiente, para tal, acesse o arquivo `Program.cs` na linha 14, e modifique a `Connection String`.

Build e Execute o Projeto:

```dotnetcli

cd back-end
dotnet build
dotnet run

```

Após seguir esses passos, o projeto será compilado e executado. O back-end desenvolvido em .NET estará disponível para receber requisições e disponibilizar JSONs no Azure Storage de acordo com a lógica implementada.

Lembre-se de que este é um exemplo genérico e pode haver nuances específicas para o seu projeto real. Certifique-se de ajustar as configurações e a lógica de acordo com os requisitos específicos do seu aplicativo.

## VSTS Rest Multivalue

Esse projeto segue um padrão de plugin do [Azure Devops](https://learn.microsoft.com/azure/devops/extend/overview?view=azure-devops), para que funcione corretamente, existem alguns requisitos.

- Node.js __14__: Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo e instalá-lo a partir do site oficial do Node.js.
- Npm: Certifique-se de ter o Npm instalado em seu sistema.
- tfx-cli: instalável através `npm install -g tfx-cli`.

Caso a versão do Node, seja superior a 14, o projeto pode não funcionar bem. Antes de configurar e publicar a extensão, o desenvolvedor precisar modificar o arquivo `manifest` localizado em `vsts-rest-multivalue/vss-extension.json`, na propriedade, `publisher`.

Para entender mais sobre os detalhes do arquivo `manifest` acesso o link: [Extension manifest reference](https://learn.microsoft.com/azure/devops/extend/develop/manifest?view=azure-devops).

Baixar as dependências do projeto:

```node
cd vsts-rest-multivalue
npm install
```

Para entender a complexidade e o passo a passo para publicar a extensão, veja o link: [Package and publish extensions](https://learn.microsoft.com/azure/devops/extend/publish/overview?toc=%2Fazure%2Fdevops%2Fmarketplace-extensibility%2Ftoc.json&view=azure-devops).

Se tudo estiver certo, rode o script:

```dotnetcli
npm run publish:release
```

Com isso será gerado o arquivo de extensão, basta fazer o [Upload](https://learn.microsoft.com/azure/devops/extend/publish/overview?toc=%2Fazure%2Fdevops%2Fmarketplace-extensibility%2Ftoc.json&view=azure-devops) no `Azure Devops Managing Extensions`.

## VSTS Layout Sample

Esse projeto segue a mesma estrutura de um plugin do `Azure Devops`, portanto, siga os mesmo passa a passo já passado aqui.

### Code Disclaimer

This Sample Code is provided for the purpose of illustration only and is not intended to be used in a production environment.  THIS SAMPLE CODE AND ANY RELATED INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.  We grant You a nonexclusive, royalty-free right to use and modify the Sample Code and to reproduce and distribute the object code form of the Sample Code, provided that You agree: (i) to not use Our name, logo, or trademarks to market Your software product in which the Sample Code is embedded; (ii) to include a valid copyright notice on Your software product in which the Sample Code is embedded; and (iii) to indemnify, hold harmless, and defend Us and Our suppliers from and against any claims or lawsuits, including attorneys’ fees, that arise or result from the use or distribution of the Sample Code.
Please note: None of the conditions outlined in the disclaimer above will supersede the terms and conditions contained within the Premier Customer Services Description.
