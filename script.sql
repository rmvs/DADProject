create database chamados;

create table usuario(
	id serial primary key,
	login varchar(250),
	senha varchar(250)
);

create table pessoa(
 id serial primary key,
 nome varchar(250),
 email varchar(250),
 userid int,
 constraint fk_pessoa_usuario foreign key (userid) references usuario(id)
);

create table chamado(
	id serial primary key,
	descricao varchar(500),
	screenshotid varchar(250),
	pessoaid int,
	constraint fk_chamado_pessoa foreign key (pessoaid) references pessoa(id)
);

create table chamado_participantes(
  id serial primary key,
  chamadoid int,
  pessoaid int,
  constraint fk_chamado_pessoas foreign key(pessoaid) references pessoa(id),
  constraint fk_chamado foreign key (chamadoid) references chamado(id)
)


alter table chamado add column titulo varchar(250);

INSERT INTO public.usuario
(login, senha)
VALUES('lol', '123456');

;
select * from pessoa
select * from usuario

select * from pessoa where userid = 5
delete from pessoa where id = 9

INSERT INTO public.pessoa
(nome, email, userid)
VALUES('Nome', 'email', 2);

INSERT INTO public.chamado_participantes
(chamadoid, pessoaid)
VALUES(1, 2);

alter table pessoa add column ongnome varchar(250);

delete from pessoa where userid not in (1,2)
delete from usuario where id not in (1,2)




update pessoa set ongnome = 'Ong1' where id = 1
                  
select * from chamado_participantes

select * from pessoa;
select * from chamado;