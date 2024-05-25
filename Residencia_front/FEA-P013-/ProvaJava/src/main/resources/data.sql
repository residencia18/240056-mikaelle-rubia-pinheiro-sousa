
-- INSERT INTO tb_email  (status_email , send_date_email, email_from, email_to, owner_ref, subject, text)
-- VALUES (0, '2024-05-07 20:09:16.253393', 'Admin@gmail.com',  'mikaelle.Rubia2@outlook.com',
-- 'Mikaelle sousa', 'terceiro envio', 'Estamos fazendo um teste para envio de email, para a prova de java avançado.');

-- INSERT INTO tb_email  (status_email , send_date_email, email_from, email_to, owner_ref, subject, text)
-- VALUES (0, '2024-05-07 20:09:16.253393', 'AndreSousa@gmail.com',  'mikaelle.Rubia2@outlook.com',
-- 'Andre Sousa', 'terceiro envio', 'Estamos fazendo um teste para envio de email, para a prova de java avançado.');


-- INSERT INTO tb_email  (status_email , send_date_email, email_from, email_to, owner_ref, subject, text)
-- VALUES (0, '2024-05-07 20:09:16.253393', 'BrunoSilva02@gmail.com',  'mikaelle.Rubia2@outlook.com',
-- 'Bruno Silva', 'terceiro envio', 'Estamos fazendo um teste para envio de email, para a prova de java avançado.');



-- INSERT INTO users (email, name, password) VALUES('Admin@gmail.com', 'Admin', '$2a$10$/CAFgL/FdfIhWlDmJWQejONC9Dl20A6q2gNjbYAfVs07bkTyVAJ8y');
-- INSERT INTO users (email, name, password) VALUES('mikaelle.Rubia@outlook.com', 'Mikaelle', '$2a$10$/CAFgL/FdfIhWlDmJWQejONC9Dl20A6q2gNjbYAfVs07bkTyVAJ8y')




-- Insert data into gym table

-- Insert data into gym table
INSERT INTO gym (title, content, opened, mask, towel, fountain, locker_room) VALUES
('Dom Severino', '<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>', TRUE, 'required', 'required', 'partial', 'allowed');

INSERT INTO gym (title, content, opened, mask, towel, fountain, locker_room) VALUES
('Teresina Shopping', '<p>Av. Raul Lopes, 1000 &#8211; Noivos<br>Teresina, PI</p>', TRUE, 'required', 'required', 'partial', 'allowed');

INSERT INTO gym (title, content, opened, mask, towel, fountain, locker_room) VALUES
('GV Shopping', '<p>Rua Sete de Setembro, 3500 &#8211; Centro<br>Governador Valadares, MG</p>', TRUE, 'recommended', 'required', 'partial', 'allowed');

INSERT INTO gym (title, content, opened, mask, towel, fountain, locker_room) VALUES
('Avenida Mascote', '<p>Av. Mascote, 159 &#8211; Vila Mascote<br>São Paulo, SP</p>', TRUE, 'required', 'recommended', 'not_allowed', 'allowed');

-- Note the correction here
INSERT INTO gym (title, content, opened, mask, towel, fountain, locker_room) VALUES
('Litoral Plaza', '<p>Avenida Ayrton Senna da Silva, 1511 &#8211; Tude Bastos (Sítio do Campo)<br>Praia Grande, SP</p>', TRUE, 'required', 'required', 'not_allowed', 'allowed');

INSERT INTO gym (title, content, opened, mask, towel, fountain, locker_room) VALUES
('Rui Barbosa', '<p>Avenida Rui Barbosa, 2727 &#8211; Joaquim Távora<br>Fortaleza, CE</p>', TRUE, 'required', 'required', 'partial', 'closed');

INSERT INTO gym (title, content, opened, mask, towel, fountain, locker_room) VALUES
('Parnamirim Centro', '<p>Avenida Brigadeiro Everaldo Breves, 780 &#8211; Centro<br>Parnamirim, RN</p>', TRUE, 'required', 'required', 'partial', 'allowed');

-- Insert data into schedule table
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '06h às 22h', 1);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Sáb.', 'Fechada', 1);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Dom.', 'Fechada', 1);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '06h às 22h', 2);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Sáb.', 'Fechada', 2);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Dom.', 'Fechada', 2);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '06h às 23h', 3);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Sáb.', '09h às 18h', 3);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Dom.', 'Fechada', 3);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '06h às 10h', 4);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '17h às 21h', 4);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Sáb.', '09h às 17h', 4);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Dom.', 'Fechada', 4);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '12h às 19h', 5);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Sáb.', '12h às 15h', 5);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Dom.', 'Fechada', 5);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '06h às 22h', 6);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Sáb.', '09h às 18h', 6);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Dom.', 'Fechada', 6);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Seg. à Sex.', '06h às 22h', 7);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Sáb.', '09h às 18h', 7);
INSERT INTO schedule (weekdays, hour, gym_id) VALUES ('Dom.', 'Fechada', 7);

