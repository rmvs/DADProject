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

alter table chamado add column titulo varchar(250);