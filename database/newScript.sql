CREATE DATABASE  IF NOT EXISTS `contadorcito` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `contadorcito`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: contadorcito
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comprobantes`
--

DROP TABLE IF EXISTS `comprobantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprobantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('Crédito Fiscal','Consumidor Final') NOT NULL,
  `numero` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `cliente_proveedor` varchar(100) NOT NULL,
  `archivo_pdf` varchar(255) DEFAULT NULL,
  `archivo_json` varchar(255) DEFAULT NULL,
  `empresa_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `empresa_id` (`empresa_id`),
  KEY `idx_comprobantes_fecha_empresa` (`fecha`,`empresa_id`),
  CONSTRAINT `comprobantes_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprobantes`
--

LOCK TABLES `comprobantes` WRITE;
/*!40000 ALTER TABLE `comprobantes` DISABLE KEYS */;
INSERT INTO `comprobantes` VALUES (1,'Crédito Fiscal','CF-001','2024-10-01',150.50,'Proveedor ABC','cf-001.pdf','cf-001.json',1,'2024-11-17 21:52:05'),(2,'Consumidor Final','CF-002','2024-10-02',250.75,'Cliente XYZ','cf-002.pdf','cf-002.json',2,'2024-11-17 21:52:05'),(3,'Crédito Fiscal','CF-001','2024-10-01',350.50,'Proveedor ABC','cf-002.pdf','cf-002.json',1,'2024-11-19 00:46:39'),(9,'Consumidor Final','CF-004','2024-11-27',145.00,'ClienteJORGE','','',1,'2024-11-19 21:56:44'),(10,'Consumidor Final','CF-003','2024-11-28',144.00,'ClienteJORGE','','',1,'2024-11-19 21:57:28'),(19,'Consumidor Final','FT-000','2024-11-21',800.00,'ClienteCEN',NULL,NULL,1,'2024-11-20 00:45:49'),(20,'Consumidor Final','FT-000','2024-11-21',800.00,'ClienteCEN',NULL,NULL,1,'2024-11-20 00:45:49'),(26,'Crédito Fiscal','ISS-440','2024-11-21',450.00,'ClientISS','1732236693465.pdf','1732236693472.json',1,'2024-11-22 00:51:33'),(27,'Crédito Fiscal','IAS','2024-11-21',560.00,'ClienteIAS','1732242289571.pdf','1732242289584.json',1,'2024-11-22 02:24:49'),(28,'Crédito Fiscal','CEN-666','2024-11-21',670.00,'ClienteCEN','1732242411836.pdf','1732242411865.json',2,'2024-11-22 02:26:52'),(29,'Crédito Fiscal','BB-904','2024-11-21',500.00,'ClienteBB','1732243635645.pdf','1732243635659.json',1,'2024-11-22 02:47:15'),(30,'Crédito Fiscal','CF-4020','2024-11-21',4020.00,'ClienteCUARENTA','1732244632759.pdf','1732244632777.json',1,'2024-11-22 03:03:52'),(31,'Crédito Fiscal','CF-3787','2024-11-21',500.00,'ClienteREYEA','1732245373782.pdf','1732245373869.json',2,'2024-11-22 03:16:13'),(34,'Crédito Fiscal','CF-008','2024-11-21',300.00,'ClienteTercero','1732246642753.pdf','1732246642823.json',1,'2024-11-22 03:37:22'),(39,'Crédito Fiscal','PruebaEDITADA','2024-11-22',200.00,'ClientePRUEBAEDIT','1732300944001.pdf','1732300944078.json',1,'2024-11-22 18:42:24'),(40,'Crédito Fiscal','Credito de nayib','2024-11-22',340.00,'ClienteROB','1732301378851.pdf','1732301378908.json',1,'2024-11-22 18:49:38'),(42,'Crédito Fiscal','CF-JOO','2024-11-22',690.00,'ClienteJOO','1732302765403.pdf','1732302765445.json',1,'2024-11-22 19:12:45'),(43,'Crédito Fiscal','CF-889','2024-11-22',560.00,'ClienteLOLO','1732303798536.pdf','1732303798641.json',1,'2024-11-22 19:29:58'),(45,'Crédito Fiscal','CF-868','2024-11-22',560.00,'ClienteLOLEDIT','1732309066900.pdf','1732309066979.json',1,'2024-11-22 19:31:03'),(46,'Crédito Fiscal','ISS-555','2024-11-22',569.00,'ClienteMON','1732304309408.pdf','1732304309466.json',1,'2024-11-22 19:38:29');
/*!40000 ALTER TABLE `comprobantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tipo` enum('Natural','Jurídica') NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Empresa ABC','Jurídica','Calle Falsa 123','555-1234','contacto@abc.com','2024-11-17 21:52:05'),(2,'Empresa ALVINEZe','Natural','Avenida Siempreviva 456','555-5678','contacto@xyz.com','2024-11-17 21:52:05'),(8,'Empresa ALVINEZo','Natural','Avenida Siempreviva 456','555-5678','contacto@xyz.com','2024-11-19 02:05:27'),(9,'EmpresaPrruebas','Natural','Avenida Siempreviva 456','555-5678','contacto@xyz.com','2024-11-19 02:07:43'),(10,'EmpresaFinalPrueba','Natural','Avenida Siempreviva 456','555-5678','contacto@xyz.com','2024-11-19 02:07:43'),(11,'Empresa crear final','Jurídica','1600 Fake Street','6019521325','test@example.us','2024-11-19 02:13:30'),(13,'Erfundenes Unternehmen','Natural','Erfundene Straße 33','030303986300','test@beispiel.de','2024-11-22 22:49:23');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('Administrador','Auxiliar') NOT NULL,
  `empresa_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `empresa_id` (`empresa_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Administrador General','admin@contadorcito.com','$2a$10$RrJ11yVRdps9NJFWC6JTDOdsXfYZxVl/InNKYmID1MxxwdJq1eJha','Administrador',NULL,'2024-11-17 21:52:05'),(2,'Auxiliar 1','auxiliar1@contadorcito.com','$2a$10$pTvn5jkQnxw0WxIRP52thO54PKnnr2ZC7txhpdknGr9SGVBn.m6CO','Auxiliar',1,'2024-11-17 21:52:05'),(4,'alvin','alvin@gmail.com','$2a$10$TTZUWwu1vQjiXcLnskH0Z.Pmr.dhKr/RGuq0oO95WwhXMM2uksLJi','Auxiliar',1,'2024-11-19 17:41:13'),(6,'JorgeR','jorge@contadorcitos.com','$2a$10$wAkXDvN4FPD5YBrdSav5LOE3fI4sM5eepgz2taoJ27417gv.0u3Ny','Auxiliar',1,'2024-11-19 22:00:29');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'contadorcito'
--

--
-- Dumping routines for database 'contadorcito'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 20:38:25
