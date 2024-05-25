# Avaliação INDIVIDUAL: 

## Implementação de Recuperação de Senha por E-mail com Spring Boot

Roteiro de implementação sugerido:

1. Configuração do Serviço de E-mail:
- Adicione a dependência spring-boot-starter-mail ao seu projeto.
- Configure as propriedades do servidor de e-mail no application.properties.
- Crie um serviço chamado EmailService que utiliza JavaMailSender para enviar
e-mails.


2. Geração e Armazenamento de Tokens:
- Crie um serviço chamado TokenService que será responsável por gerar tokens
únicos e armazená-los com uma referência ao e-mail do usuário.
- O serviço deve ter métodos para gerar tokens, recuperar e-mails por token e
invalidar tokens. 

3. Endpoint para Solicitar Recuperação de Senha:
- Implemente um controller chamado PasswordRecoveryController.
- Crie um método para receber o e-mail do usuário e enviar um link de recuperação
contendo o token gerado.
- O link enviado deve direcionar o usuário para uma URL onde ele poderá cadastrar
uma nova senha.


4. Endpoint para Redefinir a Senha:
- Implemente um controller chamado PasswordResetController.
- Crie um método para receber o token e a nova senha do usuário.
- O método deve validar o token, redefinir a senha do usuário no banco de dados e
invalidar o token para não poder ser reutilizado.