-- Active: 1679521204876@@127.0.0.1@3306@bd_smfp
DROP DATABASE bd_SMFP;

CREATE DATABASE bd_SMFP;

USE bd_SMFP;

CREATE TABLE tbToken(
    idToken INT PRIMARY KEY AUTO_INCREMENT
    ,tokenHash VARCHAR(64) UNIQUE
);

CREATE TABLE tbEmpresa (
    idEmpresa INT AUTO_INCREMENT
    ,fkToken INT UNIQUE
    ,nomeEmpresa VARCHAR(50) NOT NULL
    ,cnpjEmpresa VARCHAR(18) NOT NULL
    ,PRIMARY KEY(idEmpresa, fkToken)
    ,CONSTRAINT fk_tbEmpresa_tbToken FOREIGN KEY (fkToken) REFERENCES tbToken(idToken)
);

CREATE TABLE tbUsuario(
    idUsuario INT AUTO_INCREMENT
    ,fkEmpresa INT
    ,nomeUsuario VARCHAR(50) NOT NULL
    ,emailUsuario VARCHAR(100) NOT NULL UNIQUE
    ,senhaUsuario VARCHAR(64) NOT NULL
    ,CONSTRAINT fk_tbUsuario_tbEmpresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa)
    ,PRIMARY KEY(idUsuario, fkEmpresa)
    ,fkAdministrador INT, FOREIGN KEY (fkAdministrador) REFERENCES tbUsuario(idUsuario)
);

CREATE TABLE tbSetor(
    idSetor INT PRIMARY KEY AUTO_INCREMENT
    ,nomeSetor VARCHAR(50)
);

CREATE TABLE tbAmbiente(
    idAmbiente INT AUTO_INCREMENT
    ,fkEmpresa INT
    ,fkSetor INT
    ,tempoDispersao INT
    ,nomeAmbiente VARCHAR(50)
    ,descAmbiente VARCHAR(150)
    ,minimoPessoas INT
    ,mediaPessoas INT
    ,maximoPessoas INT
    ,CONSTRAINT fk_tbAmbiente_tbEmpresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa)
    ,CONSTRAINT fk_tbAmbiente_tbSetor FOREIGN KEY (fkSetor) REFERENCES tbSetor(idSetor)
    ,PRIMARY KEY(idAmbiente, fkEmpresa, fkSetor)
);

CREATE TABLE tbSensor(
    idSensor INT AUTO_INCREMENT
    ,fkAmbiente INT
    ,portaSensor VARCHAR(6) NOT NULL
    ,CONSTRAINT fk_tbSensor_fkAmbiente FOREIGN KEY (fkAmbiente) REFERENCES tbAmbiente(idAmbiente)
    ,PRIMARY KEY(idSensor, fkAmbiente)
);

CREATE TABLE tbMetricas (
    idMetrica INT AUTO_INCREMENT
    ,fkSensor INT
    ,dateMetrica TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ,valMetrica INT
    ,CONSTRAINT fk_tbMetricas_fkSensor FOREIGN KEY (fkSensor) REFERENCES tbSensor(idSensor)
    ,PRIMARY KEY(idMetrica, fkSensor)
);


/* INSERTS */

/* GENERATE TOKEN */
INSERT INTO tbToken(tokenHash)
    VALUES (SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256))
        ,(SHA2(UUID(), 256));
        

INSERT INTO tbEmpresa(`fkToken`, `nomeEmpresa`, `cnpjEmpresa`)
VALUES
	(1, 'TechIdeas', '00.000.000/0000-00')
    ,(2, 'Shopping A', '11.111.111/0001-11')
    ,(3, 'Shopping B', '22.222.222/0001-22')
    ,(4, 'Shopping C', '33.333.333/0001-33')
    ,(5, 'Shopping D', '44.444.444/0001-44')
    ,(6, 'Shopping E', '55.555.555/0001-55')
    ,(7, 'Shopping F', '66.666.666/0001-66')
    ,(8, 'Shopping G', '77.777.777/0001-77')
    ,(9, 'Shopping H', '88.888.888/0001-88');
    
INSERT INTO tbUsuario (`fkEmpresa`, `idUsuario`,`nomeUsuario`,`emailUsuario`,`senhaUsuario`,`fkAdministrador`)
VALUES
	 (1, 1, 'Administrador', 'admin@techideas.com', '$2b$10$M/CbWCDYZcYYDnTUs1nfPOu/U665hzfQDSBucm56MxAy4ldau2YAi', NULL)
    ,(2, 1, 'João Silva', 'joao.silva@exemplo.com', SHA2('senha123', 256), NULL)
    ,(2, 2, 'Maria Santos', 'maria.santos@exemplo.com', SHA2('senha456', 256), 1)
    ,(3, 1, 'Pedro Oliveira', 'pedro.oliveira@exemplo.com', SHA2('senha789', 256), NULL)
    ,(3, 2, 'Carla Ferreira', 'carla.ferreira@exemplo.com', SHA2('senhaabc', 256), 1)
    ,(4, 1, 'Lucas Costa', 'lucas.costa@exemplo.com', SHA2('senhaxyz', 256), NULL)
    ,(4, 2, 'Ana Souza', 'ana.souza@exemplo.com', SHA2('senha123', 256), 1)
    ,(5, 1, 'Paulo Rodrigues', 'paulo.rodrigues@exemplo.com', SHA2('senha456', 256), NULL)
    ,(5, 2, 'Fernanda Alves', 'fernanda.alves@exemplo.com', SHA2('senha789', 256), 1)
    ,(6, 1, 'Rafaela Pereira', 'rafaela.pereira@exemplo.com', SHA2('senhaabc', 256), NULL)
    ,(6, 2, 'Marcelo Santos', 'marcelo.santos@exemplo.com', SHA2('senhaxyz', 256), 1)
    ,(7, 1, 'Amanda Ferreira', 'amanda.ferreira@exemplo.com', SHA2('senha123', 256), NULL)
    ,(7, 2, 'Thiago Costa', 'thiago.costa@exemplo.com', SHA2('senha456', 256), 1)
    ,(8, 1, 'Gabriela Oliveira', 'gabriela.oliveira@exemplo.com', SHA2('senha789', 256), NULL)
    ,(8, 2, 'Marina Souza', 'marina.souza@exemplo.com', SHA2('senhaabc', 256), 1)
    ,(9, 1, 'Vinícius Rodrigues', 'vinicius.rodrigues@exemplo.com', SHA2('senhaxyz', 256), NULL)
    ,(9, 2, 'Bruna Alves', 'bruna.alves@exemplo.com', SHA2('senha123', 256), 1);

INSERT INTO tbSetor (`nomeSetor`)
VALUES
    ('Vestuário')
    ,('Calçados')
    ,('Acessórios')
    ,('Joalheria e Bijuterias')
    ,('Cosméticos e Perfumaria')
    ,('Livros e Papelaria')
    ,('Esportes')
    ,('Brinquedos e Jogos')
    ,('Eletrônicos')
    ,('Cama, Mesa e Banho')
    ,('Móveis e Decoração')
    ,('Supermercado')
    ,('Farmácia')
    ,('Restaurantes')
    ,('Fast-food')
    ,('Cinema');

INSERT INTO tbAmbiente (`fkEmpresa`, `fkSetor`, `tempoDispersao`, `nomeAmbiente`, `descAmbiente`, `minimoPessoas`, `mediaPessoas`, `maximoPessoas`) 
VALUES 
   (1,  1, 30, 'Loja de Roupa 1', 'Ambiente para lojas de roupas femininas', 33, 56, 96)
    ,(1, 1, 25, 'Loja de Roupa 2', 'Ambiente para lojas de roupas masculinas', 27, 43, 83)
    ,(2, 1, 28, 'Loja de Roupa 3', 'Ambiente para lojas de roupas infantis', 16, 28, 49)
    ,(2, 15, 10, 'Fast Food', 'Ambiente para estabelecimentos de fast food', 100, 200, 300)
    ,(3, 14, 60, 'Restaurantes', 'Ambiente para restaurantes', 79, 100, 172)
    ,(3, 8, 120, 'Parque de Diversões', 'Ambiente para o parque de diversões', 72, 90, 133)
    ,(4, 16, 120, 'Salas de Cinema', 'Ambiente para salas de cinema', 79, 95, 159)
    ,(4, 2, 18, 'Lojas de Calçados', 'Ambiente para lojas de calçados', 50, 72, 90)
    ,(5, 3, 13, 'Lojas de Acessórios', 'Ambiente para lojas de acessórios', 40, 69, 82)
    ,(5, 9, 10, 'Lojas de Eletrônicos', 'Ambiente para lojas de eletrônicos', 50, 78, 91)
    ,(6, 11, 12,'Lojas de Eletrodomésticos', 'Ambiente para lojas de eletrodomésticos', 68, 88, 117);


INSERT INTO tbSensor (`fkAmbiente`, `portaSensor`)
VALUES
    (1, 'COM1')
    ,(2, 'COM2')
    ,(3, 'COM3')
    ,(4, 'COM4')
    ,(5, 'COM5')
    ,(6, 'COM6')
    ,(7, 'COM7')
    ,(8, 'COM8')
    ,(9, 'COM9')
    ,(10, 'COM10')
    ,(11, 'COM11');

INSERT INTO tbMetricas (`fkSensor`, `dateMetrica`, `valMetrica`)
VALUES
    (1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1)
    ,(1, NOW(), 1);

    
/* SELECTS */

/* TODOS OS DADOS */
SELECT * FROM tbToken;
SELECT * FROM tbEmpresa;
SELECT * FROM tbUsuario;
SELECT * FROM tbSetor;
SELECT * FROM tbAmbiente;
SELECT * FROM tbSensor;
SELECT * FROM tbMetricas;

/* NOME, EMAIL, NOME DA EMPRESA, ID DO TOKEN DOS USUARIOS DE CADA EMPRESA */
SELECT tbUsuario.`nomeUsuario`, tbUsuario.`emailUsuario`, tbEmpresa.`nomeEmpresa`, tbEmpresa.`fkToken`
    FROM tbUsuario INNER JOIN tbEmpresa 
        ON tbUsuario.`fkEmpresa` = tbEmpresa.`idEmpresa`;

/* VALOR E DATA DAS METRICAS DO SENSOR QUE ESTÁ NO AMBIENTE 'Loja de Roupa 1' DA EMPRESA 'Shopping A' */
SELECT tbMetricas.`valMetrica`, tbMetricas.`dateMetrica` 
    FROM tbMetricas INNER JOIN tbSensor
        ON tbMetricas.`fkSensor` = tbSensor.`idSensor`
    INNER JOIN tbAmbiente
        ON tbSensor.`fkAmbiente` = tbAmbiente.`idAmbiente`
    INNER JOIN tbEmpresa
        ON tbAmbiente.`fkEmpresa` = tbEmpresa.`idEmpresa`
    WHERE tbAmbiente.`nomeAmbiente` = 'Loja de Roupa 1' AND
        tbEmpresa.`nomeEmpresa` = 'Shopping A';
        
SELECT idToken, count(idEmpresa) FROM tbToken
    INNER JOIN tbEmpresa ON fkToken = idEmpresa AND fkToken = idToken
    WHERE tokenHash = '43785e89508865813596518a211809f5606532c11aa54314f379814c3b360e90';
