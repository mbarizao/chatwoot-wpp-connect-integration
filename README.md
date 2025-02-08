# 📘 Integração Chatwoot + WPPConnect

Este guia explica como configurar e rodar a integração entre **Chatwoot** e **WPPConnect**, permitindo a comunicação via WhatsApp.

---

## 🚀 **Instalação**

### 1️⃣ **Criando um `docker-compose.yml` para executar a imagem do Docker Hub**
Crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

```yaml
version: "3.8"

services:
  app:
    image: mbarizao/chatwoot-wpp-connect-integration:latest
    container_name: chatwoot-wpp-integration
    restart: always
    environment:
      # 🔹 Configurações do Chatwoot & WPPConnect
      WPP_CONNECT_URL: "https://wppconnect.exemplo.com"
      CHATWOOT_URL: "https://chatwoot.exemplo.com"
      CHATWOOT_TOKEN: "seu_token_aqui"
      WPP_CONNECT_KEY: "sua_chave_aqui"
    ports:
      - "3000:3000"
```

### 2️⃣ **Subindo o container**
Execute o seguinte comando para iniciar o serviço:
```sh
docker-compose up -d
```
**ou**
```sh
docker compose up -d
```

---

## 🔑 **Obtendo os Tokens**

### **Token do Chatwoot**
O token do Chatwoot é o **token do usuário administrador logado**. Para obtê-lo:
1. Acesse o painel do **Chatwoot**.
2. Vá até **Configurações do Perfil**.
3. Copie o **Token de acesso** exibido.
4. Utilize este token na variável `CHATWOOT_TOKEN` no `docker-compose.yml`.

### **Token do WPPConnect**
O token do WPPConnect é definido durante a instalação do serviço. Para obtê-lo:
1. Verifique o arquivo de configuração do WPPConnect (`config.ts`).
2. Procure pela variável **secretKey**.
3. Copie e utilize esse token na variável `WPP_CONNECT_KEY` no `docker-compose.yml`.

---

## ⚙️ **Configuração do Chatwoot**

### 🔹 **Criando Caixa de Entrada**
1. Vá em **Configurações**.
2. Acesse **Caixas de Entrada**.
3. Clique em **Adicionar Nova Caixa** e selecione **API**.
4. Insira um **nome** para o canal.
5. No campo **Webhook URL**, insira:
   ```
   https://wppconnect.exemplo.com/api/nome_do_seu_canal/chatwoot
   ```
6. Adicione pelo menos um agente ao canal.
7. Salve as configurações.

### 🔹 **Criando um Contato no Chatwoot**
1. Vá em **Contatos**.
2. Clique em **Adicionar Novo Contato**.
3. Defina o **Nome** como **WPPConnect**.
4. No campo **Número de Telefone**, insira:
   ```
   +5511999999999
   ```
5. Salve o contato.
6. Envie uma mensagem para esse contato, utilizando a caixa de entrada configurada.
7. O conteúdo da mensagem deve ser:
   ```
   /start nome_do_seu_canal
   ```
8. Após alguns segundos, um **chat será criado no WPPConnect**.
9. Você receberá um **QR Code** que poderá ser escaneado no seu WhatsApp.

---

## 📜 **Conclusão**

Após seguir esses passos, o Chatwoot estará integrado ao WPPConnect e pronto para gerenciar mensagens do WhatsApp. Se precisar de suporte, confira a documentação oficial do **[Chatwoot](https://www.chatwoot.com/docs)** e **[WPPConnect](https://wppconnect.io/docs)**.

---

## 🤝 **Contribuição**
Contribuições são bem-vindas! Se quiser melhorar este projeto, siga os passos abaixo:

1. Faça um **fork** do repositório.
2. Crie uma nova **branch** com a sua funcionalidade ou correção (`git checkout -b minha-melhoria`).
3. Faça o **commit** das suas mudanças (`git commit -m 'Minha melhoria'`).
4. Envie para o repositório (`git push origin minha-melhoria`).
5. Abra um **Pull Request**.

---

## 📄 **Licença**

Este projeto está licenciado sob a **MIT License** - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙌 **Agradecimento**
Agradecemos a todos os contribuidores que ajudam a manter este projeto ativo. Se você achou útil, considere dar uma ⭐ no repositório!

