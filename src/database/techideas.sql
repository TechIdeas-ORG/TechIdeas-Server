-- Active: 1685712302980@@127.0.0.1@3306@bd_SMFP

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
    ,CONSTRAINT fk_tbEmpresa_tbToken FOREIGN KEY (fkToken) REFERENCES tbToken(idToken) ON DELETE CASCADE
);

CREATE TABLE tbUsuario(
    idUsuario INT AUTO_INCREMENT
    ,fkEmpresa INT
    ,nomeUsuario VARCHAR(50) NOT NULL
    ,emailUsuario VARCHAR(100) NOT NULL UNIQUE
    ,senhaUsuario VARCHAR(64) NOT NULL
    ,CONSTRAINT fk_tbUsuario_tbEmpresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa) ON DELETE CASCADE
    ,PRIMARY KEY(idUsuario, fkEmpresa)
    ,fkAdministrador INT, FOREIGN KEY (fkAdministrador) REFERENCES tbUsuario(idUsuario) ON DELETE CASCADE
);

CREATE TABLE tbAmbiente(
    idAmbiente INT AUTO_INCREMENT
    ,fkEmpresa INT
    ,tempoDispersao INT
    ,nomeAmbiente VARCHAR(50)
    ,descAmbiente VARCHAR(150)
    ,setorAmbiente VARCHAR(35)
    ,minimoPessoas INT
    ,mediaPessoas INT
    ,maximoPessoas INT
    ,CONSTRAINT fk_tbAmbiente_tbEmpresa FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa) ON DELETE CASCADE
    ,PRIMARY KEY(idAmbiente, fkEmpresa)
);

CREATE TABLE tbSensor(
    idSensor INT AUTO_INCREMENT
    ,fkAmbiente INT
    ,portaSensor VARCHAR(6) NOT NULL
    ,CONSTRAINT fk_tbSensor_fkAmbiente FOREIGN KEY (fkAmbiente) REFERENCES tbAmbiente(idAmbiente) ON DELETE CASCADE
    ,PRIMARY KEY(idSensor, fkAmbiente)
);

CREATE TABLE tbMetricas (
    idMetrica INT AUTO_INCREMENT
    ,fkSensor INT
    ,dateMetrica TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ,valMetrica INT
    ,CONSTRAINT fk_tbMetricas_fkSensor FOREIGN KEY (fkSensor) REFERENCES tbSensor(idSensor) ON DELETE CASCADE
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
    
    SELECT * from tbUsuario;
INSERT INTO tbUsuario (`fkEmpresa`, `idUsuario`,`nomeUsuario`,`emailUsuario`,`senhaUsuario`,`fkAdministrador`)
VALUES
	 (1, NULL, 'Administrador', 'admin@techideas.com', '$2b$10$M/CbWCDYZcYYDnTUs1nfPOu/U665hzfQDSBucm56MxAy4ldau2YAi', NULL)
    ,(2, NULL, 'João Silva', 'joao.silva@exemplo.com', SHA2('senha123', 256), NULL)
    ,(2, NULL, 'Maria Santos', 'maria.santos@exemplo.com', SHA2('senha456', 256), 1)
    ,(3, NULL, 'Pedro Oliveira', 'pedro.oliveira@exemplo.com', SHA2('senha789', 256), NULL)
    ,(3, NULL, 'Carla Ferreira', 'carla.ferreira@exemplo.com', SHA2('senhaabc', 256), 1)
    ,(4, NULL, 'Lucas Costa', 'lucas.costa@exemplo.com', SHA2('senhaxyz', 256), NULL)
    ,(4, NULL, 'Ana Souza', 'ana.souza@exemplo.com', SHA2('senha123', 256), 1)
    ,(5, NULL, 'Paulo Rodrigues', 'paulo.rodrigues@exemplo.com', SHA2('senha456', 256), NULL)
    ,(5, NULL, 'Fernanda Alves', 'fernanda.alves@exemplo.com', SHA2('senha789', 256), 1)
    ,(6, NULL, 'Rafaela Pereira', 'rafaela.pereira@exemplo.com', SHA2('senhaabc', 256), NULL)
    ,(6, NULL, 'Marcelo Santos', 'marcelo.santos@exemplo.com', SHA2('senhaxyz', 256), 1)
    ,(7, NULL, 'Amanda Ferreira', 'amanda.ferreira@exemplo.com', SHA2('senha123', 256), NULL)
    ,(7, NULL, 'Thiago Costa', 'thiago.costa@exemplo.com', SHA2('senha456', 256), 1)
    ,(8, NULL, 'Gabriela Oliveira', 'gabriela.oliveira@exemplo.com', SHA2('senha789', 256), NULL)
    ,(8, NULL, 'Marina Souza', 'marina.souza@exemplo.com', SHA2('senhaabc', 256), 1)
    ,(9, NULL, 'Vinícius Rodrigues', 'vinicius.rodrigues@exemplo.com', SHA2('senhaxyz', 256), NULL)
    ,(9, NULL, 'Bruna Alves', 'bruna.alves@exemplo.com', SHA2('senha123', 256), 1);


INSERT INTO tbAmbiente (`fkEmpresa`, `tempoDispersao`, `nomeAmbiente`, `descAmbiente`, `setorAmbiente`, `minimoPessoas`, `mediaPessoas`, `maximoPessoas`) 
VALUES 
   (1, 30, 'Loja de Roupa 1', 'Ambiente para lojas de roupas femininas', '',33, 56, 96)
    ,(1, 25, 'Loja de Roupa 2', 'Ambiente para lojas de roupas masculinas', '',27, 43, 83)
    ,(2, 28, 'Loja de Roupa 3', 'Ambiente para lojas de roupas infantis', '',16,28, 49)
    ,(2, 10, 'Fast Food', 'Ambiente para estabelecimentos de fast food', '',100,200, 300)
    ,(3, 60, 'Restaurantes', 'Ambiente para restaurantes', '',79, 100, 172)
    ,(3, 120, 'Parque de Diversões', 'Ambiente para o parque de diversões', '',72, 90, 133)
    ,(4, 120, 'Salas de Cinema', 'Ambiente para salas de cinema', '',79, 95, 159)
    ,(4, 18, 'Lojas de Calçados', 'Ambiente para lojas de calçados', '',50, 72, 90)
    ,(5, 13, 'Lojas de Acessórios', 'Ambiente para lojas de acessórios', '',40, 69, 82)
    ,(5, 10, 'Lojas de Eletrônicos', 'Ambiente para lojas de eletrônicos', '',50, 78, 91)
    ,(6, 12,'Lojas de Eletrodomésticos', 'Ambiente para lojas de eletrodomésticos', '',68, 88, 117);


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
    ,(1, NOW(), 1), 
    (2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1)
    ,(2, NOW(), 1);

INSERT INTO tbMetricas (`fkSensor`, `dateMetrica`, `valMetrica`)
VALUES
    (1, '2023-05-01 09:30:00', 1),
    (1, '2023-05-01 10:45:00', 1),
    (1, '2023-05-01 11:15:00', 1),
    (1, '2023-05-01 14:20:00', 1),
    (1, '2023-05-01 16:30:00', 1),
    (1, '2023-05-01 18:45:00', 1),
    (1, '2023-05-02 08:00:00', 1),
    (1, '2023-05-02 09:30:00', 1),
    (1, '2023-05-02 13:45:00', 1),
    (1, '2023-05-02 15:00:00', 1),
    (1, '2023-05-03 10:00:00', 1),
    (1, '2023-05-03 11:30:00', 1),
    (1, '2023-05-03 14:15:00', 1),
    (1, '2023-05-03 16:30:00', 1),
    (1, '2023-05-03 19:00:00', 1),
    (1, '2023-05-04 08:30:00', 1),
    (1, '2023-05-04 10:45:00', 1),
    (1, '2023-05-04 12:15:00', 1),
    (1, '2023-05-04 14:45:00', 1),
    (1, '2023-05-04 17:30:00', 1),
    (1, '2023-05-05 09:00:00', 1),
    (1, '2023-05-05 11:30:00', 1),
    (1, '2023-05-05 13:45:00', 1),
    (1, '2023-05-05 15:15:00', 1),
    (1, '2023-05-05 17:45:00', 1),
    (1, '2023-05-06 08:30:00', 1),
    (1, '2023-05-06 10:45:00', 1),
    (1, '2023-05-06 12:15:00', 1),
    (1, '2023-05-06 14:45:00', 1),
    (1, '2023-05-06 17:30:00', 1),
    (1, '2023-05-07 09:00:00', 1),
    (1, '2023-05-07 11:30:00', 1),
    (1, '2023-05-07 13:45:00', 1),
    (1, '2023-05-07 15:15:00', 1),
    (1, '2023-05-07 17:45:00', 1),
    (1, '2023-05-08 08:30:00', 1),
    (1, '2023-05-08 10:45:00', 1),
    (1, '2023-05-08 12:15:00', 1),
    (1, '2023-05-08 14:45:00', 1),
    (1, '2023-05-08 17:30:00', 1),
    (1, '2023-05-09 09:00:00', 1),
    (1, '2023-05-09 11:30:00', 1),
    (1, '2023-05-09 13:45:00', 1),
    (1, '2023-05-09 15:15:00', 1),
    (1, '2023-05-09 17:45:00', 1),
    (1, '2023-05-10 08:30:00', 1),
    (1, '2023-05-10 10:45:00', 1),
    (1, '2023-05-10 12:15:00', 1),
    (1, '2023-05-10 14:45:00', 1),
    (1, '2023-05-10 17:30:00', 1);

    
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
select SUM(valMetrica) as soma, HOUR(dateMetrica) as horario 
        from tbMetricas
        join tbSensor on fkSensor = idSensor
        join tbAmbiente on fkAmbiente = idAmbiente
        where idAmbiente = ${idAmbiente} and YEAR(dateMetrica) = YEAR(now()) and DAY(now()) = DAY(dateMetrica) and 
        MONTH(dateMetrica) = MONTH(now())
        GROUP BY HOUR(dateMetrica)
        order by HOUR(dateMetrica) asc;