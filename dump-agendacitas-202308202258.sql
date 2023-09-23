-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: agendacitas
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `idCarrera` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCarrera` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCarrera`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
v
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `idCita` int(11) NOT NULL AUTO_INCREMENT,
  `horaCita` time DEFAULT NULL,
  `fechaCita` datetime DEFAULT NULL,
  `fechaConfirmacion` datetime DEFAULT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `primeraCita` tinyint(1) DEFAULT 1,
  `fechaCancelacion` datetime DEFAULT NULL,
  `estudiante` tinyint(1) DEFAULT 1,
  `observaciones` text DEFAULT NULL,
  `procesada` tinyint(1) DEFAULT 0,
  `idPaciente` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCita`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (1,'10:00:00','2023-05-11 00:00:00',NULL,'Orientación Psicologica',1,NULL,1,'Cita Procesada',1,18290858,2),(2,'10:00:00','2023-05-12 00:00:00',NULL,'Orientación Psicologica',0,'2023-06-20 02:09:23',1,'',0,18290858,2),(3,'22:00:00','2023-05-15 00:00:00',NULL,'Orientación Psicologica',0,NULL,1,'Cita Procesada 2',1,18290858,2),(4,'11:17:00','2023-05-17 00:00:00',NULL,'Orientación Psicologica',1,'2023-06-20 02:09:23',0,'',0,1,NULL),(5,'17:00:00','2023-05-19 00:00:00',NULL,'Orientación Psicologica',0,'2023-06-20 02:09:23',0,'',0,1,3),(6,'16:00:00','2023-05-22 00:00:00',NULL,'Orientación Psicologica',0,'2023-06-20 02:09:23',0,'',0,1,3),(8,'11:00:00','2023-06-23 00:00:00',NULL,'Orientación Psicologica',0,'2023-06-21 02:01:18',1,'',0,18290858,2),(9,'13:00:00','2023-06-27 00:00:00',NULL,'Orientación Psicologica',0,'2023-06-21 02:04:39',1,'',0,18290858,2);
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaboradors`
--

DROP TABLE IF EXISTS `colaboradors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colaboradors` (
  `idColab` int(11) NOT NULL AUTO_INCREMENT,
  `idCita` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idColab`),
  KEY `idCita` (`idCita`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `colaboradors_ibfk_1` FOREIGN KEY (`idCita`) REFERENCES `citas` (`idCita`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `colaboradors_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaboradors`
--

LOCK TABLES `colaboradors` WRITE;
/*!40000 ALTER TABLE `colaboradors` DISABLE KEYS */;
/*!40000 ALTER TABLE `colaboradors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diasespeciales`
--

DROP TABLE IF EXISTS `diasespeciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diasespeciales` (
  `idDia` int(11) NOT NULL AUTO_INCREMENT,
  `fechaDia` datetime DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idDia`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diasespeciales`
--

LOCK TABLES `diasespeciales` WRITE;
/*!40000 ALTER TABLE `diasespeciales` DISABLE KEYS */;
INSERT INTO `diasespeciales` VALUES (2,'2023-05-10 00:00:00','Dia de las Madres'),(3,'2023-05-23 00:00:00','Dia del Estudiante');
/*!40000 ALTER TABLE `diasespeciales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `numeroControl` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidoP` varchar(255) DEFAULT NULL,
  `apellidoM` varchar(255) DEFAULT NULL,
  `turno` varchar(255) DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT 0,
  `token` varchar(255) DEFAULT NULL,
  `tipoUsuario` varchar(255) DEFAULT NULL,
  `idCarrera` int(11) DEFAULT NULL,
  PRIMARY KEY (`numeroControl`),
  UNIQUE KEY `email` (`email`),
  KEY `idCarrera` (`idCarrera`),
  CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`idCarrera`) REFERENCES `carreras` (`idCarrera`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (18290858,'Fernando','Brambila','Rivera','Matutino','Masculino',2147483647,'l18290858@cdguzman.tecnm.mx','$2b$10$5gRZHvCkcA2rFprAL3KWwO/DYamD6m5Omf834W98w8FQxrwvj0RjO',0,NULL,'Estudiante',1);
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horariousuarios`
--

DROP TABLE IF EXISTS `horariousuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horariousuarios` (
  `idHorario` int(11) NOT NULL AUTO_INCREMENT,
  `diaSemana` varchar(255) DEFAULT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSalida` time DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idHorario`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `horariousuarios_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariousuarios`
--

LOCK TABLES `horariousuarios` WRITE;
/*!40000 ALTER TABLE `horariousuarios` DISABLE KEYS */;
INSERT INTO `horariousuarios` VALUES (8,'martes','10:00:00','11:00:00',2),(9,'miercoles','18:00:00','19:00:00',3),(11,'lunes','09:00:00','11:00:00',2),(12,'miercoles','09:00:00','10:00:00',2),(13,'martes','17:00:00','18:00:00',3),(14,'viernes','15:00:00','16:00:00',3),(15,'jueves','15:00:00','16:00:00',3),(16,'lunes','17:00:00','18:00:00',3),(17,'jueves','09:00:00','11:00:00',2),(18,'viernes','09:00:00','10:00:00',2);
/*!40000 ALTER TABLE `horariousuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personals`
--

DROP TABLE IF EXISTS `personals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personals` (
  `idPersonal` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidoP` varchar(255) DEFAULT NULL,
  `apellidoM` varchar(255) DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `turno` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT 0,
  `token` varchar(255) DEFAULT NULL,
  `tipoUsuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPersonal`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personals`
--

LOCK TABLES `personals` WRITE;
/*!40000 ALTER TABLE `personals` DISABLE KEYS */;
INSERT INTO `personals` VALUES (1,'Fernando','Brambila','Rivera','Masculino',2147483647,'Test@cdguzman.tecnm.mx','$2b$10$KHGYS/APClBVTMYs0vDxFOMi3CFy6HU5DVHyUKa6s5KRzZzFX3Tqq','Vespertino',0,NULL,'Personal');
/*!40000 ALTER TABLE `personals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidoP` varchar(255) DEFAULT NULL,
  `apellidoM` varchar(255) DEFAULT NULL,
  `tipoUsuario` varchar(255) DEFAULT NULL,
  `turno` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'fer-410@live.com.mx','$2b$10$n9mrA5QPBM2I.ckHXMCBfe9FXrfcxy1WuVyyTwDcSpb.Zis.A/bGi','Ana','Bola','Valero','Usuario','Matutino',''),(3,'jfernando_410@hotmail.com','$2b$10$35YIiPm6KSosH.XIWIxHu.UYbflAv2prXfwTSLyUJAmb6SgMcBKue','Flor','Mendoza','Perez','Usuario','Vespertino',NULL),(5,'jfernando_410@live.com.mx','$2b$10$w.B7lxlg1Cv4Ywn5fxjQIOd6DwNX6gGyaYzxVgQolWVOVBHJPUOJi','Ana','Bola','Valero','Administrador','Matutino',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'agendacitas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-20 22:58:35
