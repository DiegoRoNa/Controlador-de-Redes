USE DATABASE controlador_redes;

CREATE TABLE admins(
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    surnames VARCHAR(80),
    email VARCHAR(100),
    password CHAR(60),
    role VARCHAR(7),
    token CHAR(15),
    confirm TINYINT(1)
)ENGINE=INNODB;


CREATE TABLE networks(
	id INT PRIMARY KEY AUTO_INCREMENT,
    network VARCHAR(20),
    fi_octet INT(3),
    s_octet INT(3),
    t_octet INT(3),
    fo_octet INT(3),
    url VARCHAR(32)
)ENGINE=INNODB;


CREATE TABLE ips(
	id INT PRIMARY KEY AUTO_INCREMENT,
    idNetwork INT(11),
    fi_octet INT(3),
    s_octet INT(3),
    t_octet INT(3),
    fo_octet INT(3),
    usingg TINYINT(1),
    FOREIGN KEY (idNetwork) REFERENCES networks (id)
)ENGINE=INNODB;