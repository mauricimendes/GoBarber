# Recuperação de senha

**RN (Requisitos funcionais)**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email com instruções de recuperação de email;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos não funcionais)**

- Utilizar Mailtrap para testar envios de email em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regras de negócio)**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa cofirmar a nova senha ao resetar sua senha;

# Atualização do perfíl

**RF**

- O usuário debe poder atulizar sem nome, email e senha

**RN**

- O usuário não pode alterar seu email para um email já atualizado;
- Para atualizar sua senha o usário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua nova senha;

# Painel do prestador

**RF**

- O usuário deve poder lisar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazeanas no mongodb;
- As notificações do prestador devem ser enfiadas em tempo-real utilizando Socket.io

**RN**

-A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis específicos de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve estar disponíveis entre 8h às 18h (Primeiro às 8h, último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuaŕio não pode agendar serviço consigo mesmo;