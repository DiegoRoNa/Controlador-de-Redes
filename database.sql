USE DATABASE controlador_redes;

CREATE TABLE users(
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    surnames VARCHAR(80),
    email VARCHAR(100),
    password CHAR(60),
    role VARCHAR(7),
    token CHAR(15),
    confirm TINYINT(1)
)ENGINE=INNODB;