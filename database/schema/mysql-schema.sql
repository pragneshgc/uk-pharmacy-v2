/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `ActivityID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `OrderID` int DEFAULT NULL,
  `Date` varchar(30) DEFAULT NULL,
  `Action` varchar(200) DEFAULT NULL,
  `Arguments` text,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Date2` varchar(30) DEFAULT NULL,
  `Hour` int DEFAULT NULL,
  `Min` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`ActivityID`),
  KEY `order_id` (`OrderID`),
  KEY `orderid_type_activity_desc` (`OrderID`,`Type`,`ActivityID`),
  KEY `orderid_activity_desc` (`OrderID`,`ActivityID`),
  KEY `date2_type` (`Date2`,`Type`),
  KEY `date2_type_userid` (`Date2`,`Type`,`UserID`),
  KEY `date2` (`Date2`),
  KEY `date_id` (`UserID`),
  KEY `type_status` (`Type`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `additionalinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `additionalinformation` (
  `AIID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Description` mediumtext,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  PRIMARY KEY (`AIID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `app_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_module` (
  `app_id` bigint unsigned NOT NULL,
  `module_id` bigint unsigned NOT NULL,
  `status` tinyint NOT NULL COMMENT '0=inactive, 1=active',
  PRIMARY KEY (`app_id`,`module_id`),
  KEY `app_module_module_id_foreign` (`module_id`),
  CONSTRAINT `app_module_app_id_foreign` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `app_module_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `app_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_role` (
  `app_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`role_id`),
  KEY `app_role_role_id_foreign` (`role_id`),
  CONSTRAINT `app_role_app_id_foreign` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `app_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apps` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `apps_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachment` (
  `AttachmentID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `ReferenceID` int DEFAULT NULL,
  `Name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Filename` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Type` int DEFAULT NULL COMMENT '1 - scan errors, 2 - import log, 3 - item logs',
  `Status` int DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`AttachmentID`) USING BTREE,
  KEY `Status` (`Status`) USING BTREE,
  KEY `Type` (`Type`) USING BTREE,
  KEY `UserID` (`UserID`) USING BTREE,
  KEY `PrescriptionID` (`ReferenceID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `authorizationcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorizationcode` (
  `AuthorizationCodeID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL DEFAULT '0',
  `Code` char(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `Type` int NOT NULL DEFAULT '1' COMMENT '1 - Reprint',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When the code was created',
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`AuthorizationCodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklist` (
  `BlackListID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `DOB` varchar(10) DEFAULT NULL,
  `Sex` varchar(1) DEFAULT NULL,
  `DAddress1` varchar(50) DEFAULT NULL,
  `DAddress2` varchar(50) DEFAULT NULL,
  `DAddress3` varchar(50) DEFAULT NULL,
  `DAddress4` varchar(50) DEFAULT NULL,
  `DPostcode` varchar(50) DEFAULT NULL,
  `DCountryCode` varchar(3) DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `UpdatedDate` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`BlackListID`),
  KEY `NameSurnameDOBDPostcode` (`Name`,`Surname`,`DOB`,`DPostcode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cardcheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cardcheck` (
  `CardCheckID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `ccCheck` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`CardCheckID`),
  KEY `StatusCode` (`ccCheck`,`PrescriptionID`),
  KEY `PrescriptionID` (`PrescriptionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `ClientID` int NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(100) DEFAULT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Middlename` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `Address1` varchar(50) DEFAULT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `Address3` varchar(50) DEFAULT NULL,
  `Address4` varchar(50) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Mobile` varchar(50) DEFAULT NULL,
  `Email` varchar(350) DEFAULT NULL,
  `CreditLimit` float(6,2) DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `ModifiedDate` int DEFAULT NULL,
  `AccessedDate` int DEFAULT NULL,
  `IP` text,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Notes` text,
  `CompanyNumber` varchar(20) DEFAULT NULL,
  `GPHCNO` varchar(20) DEFAULT NULL,
  `ReturnURL` varchar(200) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `APIKey` varchar(50) DEFAULT NULL,
  `ITName` varchar(100) DEFAULT NULL,
  `ITEmail` varchar(100) DEFAULT NULL,
  `TradingName` varchar(100) DEFAULT NULL,
  `AdditionalComment` text,
  `ReturnUsername` varchar(50) DEFAULT NULL,
  `ReturnPassword` varchar(50) DEFAULT NULL,
  `PendingPharmacyURL` varchar(50) DEFAULT NULL,
  `PendingPharmacyEndpoint` varchar(50) DEFAULT NULL,
  `VAT` float(6,2) DEFAULT NULL,
  PRIMARY KEY (`ClientID`),
  KEY `clientid` (`ClientID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `connumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `connumber` (
  `ConNumberID` int NOT NULL AUTO_INCREMENT,
  `ConNumber` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`ConNumberID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cookie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cookie` (
  `CKey` varchar(255) NOT NULL DEFAULT '',
  `UserID` int NOT NULL DEFAULT '0',
  `EDate` int NOT NULL DEFAULT '0',
  `Hostname` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`CKey`),
  KEY `cookie` (`CKey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `correspondence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `correspondence` (
  `Correspondence` int NOT NULL AUTO_INCREMENT,
  `ClientID` varchar(12) DEFAULT NULL,
  `PrescriptionID` varchar(12) DEFAULT NULL,
  `Message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `CreatedDate` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Subject` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReferenceNumber` varchar(12) DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `DoctorID` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  PRIMARY KEY (`Correspondence`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `DocUsrStatus` (`UserID`,`DoctorID`,`Status`),
  KEY `status_userid` (`Status`,`UserID`),
  KEY `pre_cor` (`PrescriptionID`,`Correspondence`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `CountryID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `RegionID` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `CodeName2` varchar(2) DEFAULT NULL,
  `CodeName3` varchar(3) DEFAULT NULL,
  `Digital` float(12,2) DEFAULT NULL,
  `Physical` float(12,2) DEFAULT NULL,
  PRIMARY KEY (`CountryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CustomerID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Middlename` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `DOB` varchar(10) DEFAULT NULL,
  `Sex` varchar(1) DEFAULT NULL,
  `Address1` varchar(50) DEFAULT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `Address3` varchar(50) DEFAULT NULL,
  `Address4` varchar(50) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  `DAddress1` varchar(50) DEFAULT NULL,
  `DAddress2` varchar(50) DEFAULT NULL,
  `DAddress3` varchar(50) DEFAULT NULL,
  `DAddress4` varchar(50) DEFAULT NULL,
  `DPostcode` varchar(50) DEFAULT NULL,
  `DCountryID` int DEFAULT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Mobile` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `AccountID` int DEFAULT NULL,
  `PaymentMethod` int DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `ModifiedDate` int DEFAULT NULL,
  `AccessedDate` int DEFAULT NULL,
  `Exemption` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Notes` text,
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `customerprescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerprescriptions` (
  `CustomerPrescriptionID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Surname` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DOB` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Sex` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Prescriptions` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `ModifiedDate` int DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `AccessedDate` int DEFAULT NULL,
  PRIMARY KEY (`CustomerPrescriptionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `customlabel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customlabel` (
  `CustomLabelID` int unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `UserID` int unsigned NOT NULL,
  `Type` int NOT NULL DEFAULT '1',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`CustomLabelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `dashboard_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `role` int unsigned NOT NULL DEFAULT '10',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `dispatchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispatchlist` (
  `DispatchListID` int NOT NULL AUTO_INCREMENT,
  `GroupCode` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`DispatchListID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `dispenserpool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispenserpool` (
  `DispenserPoolID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `Date` varchar(12) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`DispenserPoolID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `StatusUserIDPrescriptionID` (`Status`,`UserID`,`PrescriptionID`),
  KEY `StatusUserID` (`Status`,`UserID`),
  KEY `Status` (`Status`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `DoctorID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) DEFAULT NULL,
  `CompanyName` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `Address1` varchar(50) DEFAULT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `Address3` varchar(50) DEFAULT NULL,
  `Address4` varchar(50) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Mobile` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `ModifiedDate` int DEFAULT NULL,
  `AccessedDate` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Notes` text,
  `GMCNO` varchar(20) DEFAULT NULL,
  `MedicalInsuranceNo` varchar(20) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `DoctorType` int DEFAULT NULL,
  `ParentID` int DEFAULT NULL,
  PRIMARY KEY (`DoctorID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `doctoraddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctoraddress` (
  `DoctorID` int NOT NULL,
  `DoctorAddressID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) DEFAULT NULL,
  `CompanyName` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `Address1` varchar(50) DEFAULT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `Address3` varchar(50) DEFAULT NULL,
  `Address4` varchar(50) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Mobile` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `ModifiedDate` int DEFAULT NULL,
  `AccessedDate` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Notes` text,
  `GMCNO` varchar(20) DEFAULT NULL,
  `MedicalInsuranceNo` varchar(20) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `DoctorType` int DEFAULT NULL,
  `Type` int DEFAULT '1',
  `ParentID` int DEFAULT NULL,
  PRIMARY KEY (`DoctorAddressID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `doctorclientrelations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctorclientrelations` (
  `DoctorClientRelations` int NOT NULL AUTO_INCREMENT,
  `ClientID` int DEFAULT NULL,
  `DoctorID` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`DoctorClientRelations`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eveadamletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eveadamletter` (
  `EveAdamLetterID` int unsigned NOT NULL AUTO_INCREMENT,
  `ClientID` int DEFAULT NULL,
  `CustomerID` int DEFAULT NULL,
  `PrescriptionID` int DEFAULT NULL,
  `Type` int DEFAULT '1',
  PRIMARY KEY (`EveAdamLetterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `gp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gp` (
  `GPID` int NOT NULL AUTO_INCREMENT,
  `Organisation` varchar(100) DEFAULT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `MiddleName` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `Address1` varchar(50) DEFAULT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `Address3` varchar(50) DEFAULT NULL,
  `Address4` varchar(50) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `ModifiedDate` int DEFAULT NULL,
  `AccessedDate` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `PrescriptionID` int DEFAULT NULL,
  PRIMARY KEY (`GPID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `groupcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupcode` (
  `GroupCodeID` int NOT NULL AUTO_INCREMENT,
  `GroupCode` int DEFAULT NULL,
  `Date` varchar(12) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`GroupCodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `instruction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruction` (
  `InstructionID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Description` text,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Lang` int DEFAULT NULL,
  PRIMARY KEY (`InstructionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventory_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_code_id` int NOT NULL,
  `loggable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `loggable_id` bigint unsigned NOT NULL,
  `action` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `arguments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` tinyint NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inventory_logs_loggable_type_loggable_id_index` (`loggable_type`,`loggable_id`),
  KEY `inventory_logs_user_id_index` (`user_id`),
  KEY `inventory_logs_product_code_id_index` (`product_code_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventorybarcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventorybarcode` (
  `InventoryBarcodeID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `GTIN` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT 'regular barcode or productCode (FMD)',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`InventoryBarcodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventorydev`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventorydev` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `code` varchar(255) DEFAULT 'utf8_unicode_ci',
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryhelp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryhelp` (
  `InventoryHelpID` int unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `Category` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `Description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `RelatedPage` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `CreatedBy` int unsigned NOT NULL,
  `UpdatedBy` int unsigned DEFAULT NULL,
  `Type` int NOT NULL DEFAULT '1' COMMENT '1 - FAQ',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`InventoryHelpID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryitem` (
  `InventoryItemID` int unsigned NOT NULL AUTO_INCREMENT,
  `ParentInventoryItemID` int unsigned DEFAULT NULL,
  `MergedInventoryItemID` int unsigned DEFAULT NULL,
  `BatchID` int unsigned NOT NULL DEFAULT '0',
  `ProductCodeID` int unsigned DEFAULT NULL COMMENT 'references Product table',
  `ProductID` int unsigned DEFAULT NULL COMMENT 'Refers to the Product table',
  `CountryID` int DEFAULT NULL,
  `ManufacturerID` int DEFAULT NULL,
  `ItemPrice` float DEFAULT NULL COMMENT 'price per item',
  `CurrentItemPrice` float DEFAULT NULL,
  `OriginalItemPrice` float DEFAULT NULL,
  `GTIN` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'the GTIN - if not FMD it''s same as barcode',
  `FMDExpiryDate` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product expiration date (FMD)',
  `FMDBatchID` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product batchID (FMD)',
  `FMDSerialNumber` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'individual product serial number (FMD)',
  `Quantity` int DEFAULT NULL,
  `Status` enum('SHIPPED','STORED','MISSING','LOST','SPLIT','ERROR','DESTROYED') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'STORED' COMMENT 'current status of the item',
  `FMDStatus` enum('ACTIVE','INACTIVE','NOT_FMD','PROCESSING','UNKNOWN') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'NOT_FMD',
  `FMDStatusReason` enum('SUPPLIED','DESTROYED','LOCKED','EXPORTED','SAMPLE','STOLEN','CHECKED_OUT','FREESAMPLE','RECALLED','EXPIRED','WITHDRAWN','UNKNOWN') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'UNKNOWN',
  `FMDReturnCode` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `FMDReturnDesc` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Note` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'when the item was scanned',
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ProcessedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  `Barcode` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT 'regular barcode or productCode (FMD)',
  PRIMARY KEY (`InventoryItemID`),
  KEY `items_batches` (`BatchID`),
  KEY `Quantity` (`Quantity`),
  KEY `ProductCodeID` (`ProductCodeID`),
  KEY `ProductID` (`ProductID`),
  KEY `ParentInventoryItemID` (`ParentInventoryItemID`),
  KEY `MergedInventoryItemID` (`MergedInventoryItemID`),
  KEY `GTIN` (`GTIN`),
  KEY `Status` (`Status`),
  KEY `FMDStatus` (`FMDStatus`),
  KEY `FMDSerialNumber` (`FMDSerialNumber`),
  KEY `CountryID` (`CountryID`),
  KEY `ManufacturerID` (`ManufacturerID`),
  KEY `FMDBatchID` (`FMDBatchID`),
  KEY `Note` (`Note`),
  CONSTRAINT `InventoryItem_ibfk_1` FOREIGN KEY (`BatchID`) REFERENCES `inventoryitembatch` (`InventoryItemBatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT COMMENT='List of inventory items with product references and barcodes';
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryitembackup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryitembackup` (
  `InventoryItemID` int unsigned NOT NULL AUTO_INCREMENT,
  `ParentInventoryItemID` int unsigned DEFAULT NULL,
  `MergedInventoryItemID` int unsigned DEFAULT NULL,
  `BatchID` int unsigned NOT NULL DEFAULT '0',
  `ProductCodeID` int unsigned DEFAULT NULL COMMENT 'references Product table',
  `ProductID` int unsigned DEFAULT NULL COMMENT 'Refers to the Product table',
  `ItemPrice` float DEFAULT NULL COMMENT 'price per item',
  `GTIN` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'the GTIN - if not FMD it''s same as barcode',
  `FMDExpiryDate` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product expiration date (FMD)',
  `FMDBatchID` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product batchID (FMD)',
  `FMDSerialNumber` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'individual product serial number (FMD)',
  `Quantity` int DEFAULT NULL,
  `Status` enum('SHIPPED','STORED','MISSING','LOST','SPLIT','ERROR','DESTROYED') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'STORED' COMMENT 'current status of the item',
  `FMDStatus` enum('ACTIVE','INACTIVE','NOT_FMD','PROCESSING','UNKNOWN') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'NOT_FMD',
  `FMDStatusReason` enum('SUPPLIED','DESTROYED','LOCKED','EXPORTED','SAMPLE','STOLEN','CHECKED_OUT','FREESAMPLE','RECALLED','EXPIRED','WITHDRAWN','UNKNOWN') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'UNKNOWN',
  `FMDReturnCode` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `FMDReturnDesc` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'when the item was scanned',
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ProcessedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  `Barcode` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT 'regular barcode or productCode (FMD)',
  PRIMARY KEY (`InventoryItemID`),
  KEY `items_batches` (`BatchID`),
  KEY `Quantity` (`Quantity`),
  KEY `ProductCodeID` (`ProductCodeID`),
  KEY `ProductID` (`ProductID`),
  KEY `ParentInventoryItemID` (`ParentInventoryItemID`),
  KEY `MergedInventoryItemID` (`MergedInventoryItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT COMMENT='List of inventory items with product references and barcodes';
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryitembatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryitembatch` (
  `InventoryItemBatchID` int unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int unsigned DEFAULT NULL,
  `AuthorizerID` int unsigned DEFAULT NULL,
  `SupplierID` int unsigned DEFAULT NULL,
  `Status` enum('FINISHED','INCOMPLETE','HISTORY') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'INCOMPLETE' COMMENT 'current status of the batch scan',
  `Quantity` int DEFAULT '0' COMMENT 'count of the batch at the time of import',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`InventoryItemBatchID`),
  KEY `batches_users` (`UserID`),
  KEY `Status` (`Status`),
  KEY `SupplierID` (`SupplierID`),
  KEY `AuthorizerID` (`AuthorizerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryitembatchlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryitembatchlog` (
  `InventoryItemBatchLogID` int unsigned NOT NULL AUTO_INCREMENT,
  `InventoryItemBatchID` int NOT NULL DEFAULT '0',
  `UserID` int unsigned DEFAULT NULL,
  `ProductCodeID` int unsigned DEFAULT NULL COMMENT 'references Product table',
  `Name` varchar(128) DEFAULT NULL,
  `GTIN` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'the GTIN - if not FMD it''s same as barcode',
  `EnteredBy` varchar(128) DEFAULT NULL,
  `FMDStatus` varchar(128) DEFAULT NULL,
  `Quantity` int unsigned DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`InventoryItemBatchLogID`),
  KEY `InventoryItemBatchID` (`InventoryItemBatchID`),
  KEY `UserID` (`UserID`),
  KEY `ProductCodeID` (`ProductCodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryitembatchnote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryitembatchnote` (
  `InventoryItemBatchNoteID` int NOT NULL AUTO_INCREMENT,
  `InventoryItemBatchID` int unsigned DEFAULT NULL,
  `UserID` int unsigned DEFAULT NULL COMMENT 'Relates to the Inventory user this note was added by',
  `Type` int NOT NULL DEFAULT '1' COMMENT '1 - Critical, 2 - Medical Information, 3 - Other, 4 - prescription specific',
  `Note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`InventoryItemBatchNoteID`),
  KEY `InventoryItemBatchID` (`InventoryItemBatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryitemdifference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryitemdifference` (
  `InventoryItemID` int unsigned NOT NULL AUTO_INCREMENT,
  `ParentInventoryItemID` int unsigned DEFAULT NULL,
  `MergedInventoryItemID` int unsigned DEFAULT NULL,
  `MergedInventoryItemIDs` int unsigned DEFAULT NULL,
  `BatchID` int unsigned NOT NULL DEFAULT '0',
  `ProductCodeID` int unsigned DEFAULT NULL COMMENT 'references Product table',
  `ProductID` int unsigned DEFAULT NULL COMMENT 'Refers to the Product table',
  `ItemPrice` float DEFAULT NULL COMMENT 'price per item',
  `GTIN` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'the GTIN - if not FMD it''s same as barcode',
  `FMDExpiryDate` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product expiration date (FMD)',
  `FMDBatchID` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product batchID (FMD)',
  `FMDSerialNumber` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'individual product serial number (FMD)',
  `Quantity` int DEFAULT NULL,
  `Status` enum('SHIPPED','STORED','MISSING','LOST','SPLIT','ERROR','DESTROYED') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'STORED' COMMENT 'current status of the item',
  `FMDStatus` enum('ACTIVE','INACTIVE','NOT_FMD','PROCESSING','UNKNOWN') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'NOT_FMD',
  `FMDStatusReason` enum('SUPPLIED','DESTROYED','LOCKED','EXPORTED','SAMPLE','STOLEN','CHECKED_OUT','FREESAMPLE','RECALLED','EXPIRED','WITHDRAWN','UNKNOWN') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'UNKNOWN',
  `FMDReturnCode` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `FMDReturnDesc` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'when the item was scanned',
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ProcessedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  `Barcode` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT 'regular barcode or productCode (FMD)',
  PRIMARY KEY (`InventoryItemID`),
  KEY `items_batches` (`BatchID`),
  KEY `ProductID` (`ProductID`),
  KEY `ParentInventoryItemID` (`ParentInventoryItemID`),
  KEY `MergedInventoryItemID` (`MergedInventoryItemID`),
  KEY `ProductCodeID` (`ProductCodeID`),
  KEY `Quantity` (`Quantity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT COMMENT='List of inventory items with product references and barcodes';
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryitemhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryitemhistory` (
  `InventoryItemID` int unsigned NOT NULL AUTO_INCREMENT,
  `BatchID` int unsigned NOT NULL DEFAULT '0',
  `ProductCodeID` int unsigned DEFAULT NULL COMMENT 'references Product table',
  `ProductID` int unsigned DEFAULT NULL COMMENT 'Refers to the Product table',
  `ItemPrice` float DEFAULT NULL COMMENT 'price per item',
  `Barcode` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT 'regular barcode or productCode (FMD)',
  `FMDSerialNumber` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'individual product serial number (FMD)',
  `FMDExpiryDate` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product expiration date (FMD)',
  `FMDBatchID` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'product batchID (FMD)',
  `Quantity` int DEFAULT NULL,
  `Status` enum('SHIPPED','STORED','MISSING','LOST','SPLIT','ERROR') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'STORED' COMMENT 'current status of the item',
  `FMDStatus` enum('ACTIVE','INACTIVE','NOT_FMD') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'NOT_FMD',
  `FMDStatusReason` enum('SUPPLIED','DESTROYED','LOCKED','EXPORTED','SAMPLE','STOLEN','CHECKED_OUT','FREESAMPLE','RECALLED','EXPIRED','WITHDRAWN','UNKNOWN') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'SUPPLIED',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'when the item was scanned',
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ProcessedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`InventoryItemID`),
  UNIQUE KEY `SerialNumber` (`FMDSerialNumber`),
  KEY `items_batches` (`BatchID`),
  CONSTRAINT `InventoryItemHistory_ibfk_1` FOREIGN KEY (`BatchID`) REFERENCES `inventoryitembatch` (`InventoryItemBatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT COMMENT='List of inventory items with product references and barcodes';
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventorymatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventorymatch` (
  `InventoryMatchID` int NOT NULL AUTO_INCREMENT,
  `ParentID` int DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  `ManufacturerID` int DEFAULT NULL,
  `BarcodeType` int NOT NULL DEFAULT '1',
  `ProductCodeID` int unsigned DEFAULT '0' COMMENT 'references Product table',
  `DefaultItemPrice` float DEFAULT NULL COMMENT 'price per item',
  `GTIN` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT 'regular barcode or productCode (FMD)',
  `Note` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `UserID` int unsigned DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`InventoryMatchID`),
  KEY `Note` (`Note`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventorymessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventorymessage` (
  `InventoryMessageID` int unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `Category` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `Description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `SeenBy` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `Type` int NOT NULL DEFAULT '1' COMMENT '1 - FAQ',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`InventoryMessageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryprintout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryprintout` (
  `InventoryPrintoutID` int unsigned NOT NULL AUTO_INCREMENT,
  `InventoryItemID` int unsigned NOT NULL DEFAULT '0',
  `UserID` int unsigned NOT NULL DEFAULT '0',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`InventoryPrintoutID`),
  KEY `InventoryItemID` (`InventoryItemID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryuser` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `esa_user_id` int DEFAULT NULL COMMENT 'User equivalent for the ESA user table',
  `role` int unsigned NOT NULL DEFAULT '10',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `viewing` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `last_login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryuser_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryuser_old` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `role` int unsigned NOT NULL DEFAULT '10',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `inventoryuserold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventoryuserold` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `esa_user_id` int DEFAULT NULL COMMENT 'User equivalent for the ESA user table',
  `role` int unsigned NOT NULL DEFAULT '10',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `viewing` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `last_login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `InvoiceID` int NOT NULL AUTO_INCREMENT,
  `ParentInvoiceID` int DEFAULT NULL,
  `SequenceID` int DEFAULT NULL,
  `DateCreated` int DEFAULT NULL,
  `DatePaid` int DEFAULT NULL,
  `ClientID` int DEFAULT NULL,
  `GrossAmount` float(12,2) DEFAULT NULL,
  `AmountReceived` float(12,2) DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `PaymentMethod` int DEFAULT NULL,
  `VAT` float(6,3) DEFAULT NULL,
  `NetAmount` float(12,2) DEFAULT NULL,
  PRIMARY KEY (`InvoiceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoiceitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoiceitem` (
  `ItemID` int NOT NULL AUTO_INCREMENT,
  `InvoiceID` int DEFAULT NULL,
  `ReferenceNumber` varchar(20) DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `ProductCode` varchar(100) DEFAULT NULL,
  `UnitCost` float(6,2) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `VAT` float(6,3) DEFAULT NULL,
  `PrescriptionID` int DEFAULT NULL,
  `Date` int DEFAULT NULL,
  `DoctorID` int DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  UNIQUE KEY `removeAnyDupliateEntries` (`InvoiceID`,`ReferenceNumber`,`ProductID`,`Description`,`ProductCode`,`UnitCost`,`Quantity`,`Type`,`Status`,`VAT`,`PrescriptionID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `InvoiceID` (`InvoiceID`),
  KEY `Type` (`Type`),
  KEY `VAT` (`VAT`),
  KEY `Quantity` (`Quantity`),
  KEY `ProductCode` (`ProductCode`),
  KEY `ProductID` (`ProductID`),
  KEY `Status` (`Status`),
  KEY `UnitCost` (`UnitCost`),
  KEY `TypeInvoiceID` (`Type`,`InvoiceID`),
  KEY `TypeInvoiceIDPrescriptionID` (`Type`,`InvoiceID`,`PrescriptionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoicelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoicelog` (
  `InvoiceLogID` int NOT NULL AUTO_INCREMENT,
  `InvoiceID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `Date` int DEFAULT NULL,
  `Action` varchar(200) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`InvoiceLogID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `legacydispenseitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `legacydispenseitem` (
  `dispensed_item_id` int NOT NULL AUTO_INCREMENT,
  `prescription_item_id` int DEFAULT NULL,
  `nm` text,
  `qty` varchar(3) DEFAULT NULL,
  `dispensed_date` varchar(12) DEFAULT NULL,
  `qty_uom_name` varchar(10) DEFAULT NULL,
  `warnings` varchar(10) DEFAULT NULL,
  `deleted` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`dispensed_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `legacypatient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `legacypatient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `birth_date` varchar(100) DEFAULT NULL,
  `nhs_number` varchar(10) DEFAULT NULL,
  `post_code` varchar(10) DEFAULT NULL,
  `address_1` varchar(100) DEFAULT NULL,
  `address_2` varchar(100) DEFAULT NULL,
  `town_city` varchar(100) DEFAULT NULL,
  `county` varchar(100) DEFAULT NULL,
  `telephone` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `deleted` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `legacyprescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `legacyprescription` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `prescriber_id` varchar(12) DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `prescription_number` varchar(100) DEFAULT NULL,
  `prescription_code` varchar(100) DEFAULT NULL,
  `deleted` varchar(1) DEFAULT NULL,
  `prescription_id` int DEFAULT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `legacyprescriptionitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `legacyprescriptionitem` (
  `prescription_item_id` int NOT NULL AUTO_INCREMENT,
  `prescription_id` int DEFAULT NULL,
  `nm` text,
  `qty` int DEFAULT NULL,
  `dosage` text,
  `warnings` text,
  `prescribed_date` varchar(10) DEFAULT NULL,
  `uom_name` varchar(20) DEFAULT NULL,
  `endorsement_text` text,
  `deleted` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`prescription_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `ManufacturerID` int unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Not Set',
  `Description` mediumtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `Status` int DEFAULT '1',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ManufacturerID`) USING BTREE,
  KEY `Status` (`Status`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `module_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module_role` (
  `module_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`module_id`),
  KEY `module_role_module_id_foreign` (`module_id`),
  CONSTRAINT `module_role_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `module_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `modules_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `NoteID` int unsigned NOT NULL AUTO_INCREMENT,
  `ParentNoteID` int unsigned DEFAULT NULL,
  `CustomerID` int unsigned DEFAULT NULL COMMENT 'Relates to the customer table for later use',
  `PrescriptionID` int unsigned DEFAULT NULL COMMENT 'Relates to the prescription this note was added on',
  `ReferenceNumber` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Subscription` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `UserID` int unsigned NOT NULL COMMENT 'Relates to the ESA user this note was added by',
  `DeletedByUserID` int unsigned DEFAULT NULL,
  `EditedByUserID` int unsigned DEFAULT NULL,
  `Type` int NOT NULL DEFAULT '1' COMMENT '1 - Critical, 2 - Medical Information, 3 - Other, 4 - prescription specific',
  `OrderSpecific` int NOT NULL DEFAULT '0',
  `Alert` int NOT NULL DEFAULT '0',
  `Pending` int NOT NULL DEFAULT '0',
  `Note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  `EditedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`NoteID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `UserID` (`UserID`),
  KEY `ReferenceNumber` (`ReferenceNumber`),
  KEY `DeletedByUserID` (`DeletedByUserID`),
  KEY `EditedByUserID` (`EditedByUserID`),
  KEY `ParentNoteID` (`ParentNoteID`),
  KEY `Subscription` (`Subscription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci COMMENT='Stores notes related to customers';
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  `client_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `client_id` int NOT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `packproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packproduct` (
  `PackProductID` int NOT NULL AUTO_INCREMENT,
  `Order` int NOT NULL DEFAULT '0',
  `Code` varchar(20) DEFAULT NULL,
  `Description` text,
  `Quantity` varchar(50) DEFAULT NULL,
  `Dosage` varchar(50) DEFAULT NULL,
  `Unit` varchar(50) DEFAULT NULL,
  `ProductCode` varchar(20) DEFAULT NULL,
  `Instruction` int DEFAULT NULL,
  `Status` int DEFAULT '1',
  PRIMARY KEY (`PackProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_securities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_securities` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `google2fa_enable` tinyint(1) NOT NULL DEFAULT '0',
  `google2fa_secret` varchar(191) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pharmacylabel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacylabel` (
  `PharmacyLabelID` int NOT NULL AUTO_INCREMENT,
  `ProductID` int DEFAULT NULL,
  `Instruction` text,
  `Pack` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Code` varchar(100) DEFAULT NULL,
  `Description` text,
  `Dosage` int DEFAULT NULL,
  PRIMARY KEY (`PharmacyLabelID`),
  KEY `ProductID` (`ProductID`),
  KEY `ProductIDDosage` (`ProductID`,`Dosage`),
  KEY `ProductIDPharmacyLabelID` (`ProductID`,`PharmacyLabelID`),
  KEY `PhrmacyLabelProductID` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pharmacyuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacyuser` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `esa_user_id` int DEFAULT NULL COMMENT 'User equivalent for the ESA user table',
  `role` int unsigned NOT NULL DEFAULT '10',
  `inventory_role` int unsigned NOT NULL DEFAULT '0',
  `shipping_role` int unsigned NOT NULL DEFAULT '0',
  `default_app` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'pharmacy',
  `pharmacy_role_id` bigint unsigned DEFAULT NULL,
  `inventory_role_id` bigint unsigned DEFAULT NULL,
  `shipping_role_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `two_factor_secret` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `viewing` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `last_login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `esa_user_id` (`esa_user_id`),
  KEY `pharmacyuser_pharmacy_role_id_foreign` (`pharmacy_role_id`) USING BTREE,
  KEY `pharmacyuser_inventory_role_id_foreign` (`inventory_role_id`) USING BTREE,
  KEY `pharmacyuser_shipping_role_id_foreign` (`shipping_role_id`) USING BTREE,
  CONSTRAINT `pharmacyuser_inventory_role_id_foreign` FOREIGN KEY (`inventory_role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `pharmacyuser_pharmacy_role_id_foreign` FOREIGN KEY (`pharmacy_role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `pharmacyuser_shipping_role_id_foreign` FOREIGN KEY (`shipping_role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `postcodecheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postcodecheck` (
  `PostcodeCheckID` int NOT NULL AUTO_INCREMENT,
  `CountryID` int DEFAULT NULL,
  `PostcodeHigh` varchar(20) DEFAULT NULL,
  `PostcodeLow` varchar(20) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`PostcodeCheckID`),
  KEY `CountryIDPostcodeLowPostcodeHigh` (`CountryID`,`PostcodeLow`,`PostcodeHigh`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `postcoderegion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postcoderegion` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `Prefix` varchar(5) NOT NULL,
  `District` varchar(50) NOT NULL,
  `Region` varchar(50) NOT NULL,
  `CountryID` int NOT NULL,
  PRIMARY KEY (`my_row_id`),
  KEY `District` (`District`),
  KEY `Prefix` (`Prefix`),
  KEY `District_2` (`District`),
  KEY `Region` (`Region`),
  KEY `CountryID` (`CountryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `PrescriptionID` int NOT NULL AUTO_INCREMENT,
  `DoctorID` int DEFAULT NULL,
  `GMCNO` varchar(20) DEFAULT NULL,
  `DoctorName` varchar(200) DEFAULT NULL,
  `ClientID` int DEFAULT NULL,
  `ReferenceNumber` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `GUID` varchar(50) DEFAULT NULL,
  `TokenID` varchar(50) DEFAULT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Middlename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Surname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOB` varchar(10) DEFAULT NULL,
  `Sex` varchar(1) DEFAULT NULL,
  `BMI` float DEFAULT NULL,
  `Address1` varchar(50) DEFAULT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `Address3` varchar(50) DEFAULT NULL,
  `Address4` varchar(50) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryCode` int DEFAULT NULL,
  `DAddress1` varchar(50) DEFAULT NULL,
  `DAddress2` varchar(50) DEFAULT NULL,
  `DAddress3` varchar(50) DEFAULT NULL,
  `DAddress4` varchar(50) DEFAULT NULL,
  `DPostcode` varchar(50) DEFAULT NULL,
  `DCountryCode` int DEFAULT NULL,
  `Telephone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PaymentMethod` int DEFAULT NULL,
  `Exemption` int DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `Notes` text,
  `Repeats` varchar(10) DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `SubStatus` int DEFAULT NULL,
  `JVM` int DEFAULT '0',
  `TrackingCode` varchar(100) DEFAULT NULL,
  `AirwayBillNumber` varchar(100) DEFAULT NULL,
  `PaymentStatus` int DEFAULT NULL,
  `DeliveryID` varchar(2) DEFAULT NULL,
  `UpdatedDate` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `Message` text,
  `SaturdayDelivery` int DEFAULT NULL,
  `UPSAccessPointAddress` int DEFAULT NULL,
  `TrackingSent` int DEFAULT NULL,
  `CSNotes` text,
  `DoctorAddressID` int DEFAULT NULL,
  `Company` varchar(50) DEFAULT NULL,
  `CustomerID` int DEFAULT NULL,
  PRIMARY KEY (`PrescriptionID`),
  KEY `name_surname_dob` (`Name`,`Surname`,`DOB`),
  KEY `create_date` (`CreatedDate`),
  KEY `prescription_id` (`PrescriptionID`),
  KEY `ReferenceNumber` (`ReferenceNumber`),
  KEY `DPostcode` (`DPostcode`),
  KEY `ClientID` (`ClientID`),
  KEY `DCountryCode` (`DCountryCode`),
  KEY `Exemption` (`Exemption`),
  KEY `status` (`Status`) USING BTREE,
  KEY `ClientIDReferenceNumber` (`ClientID`,`ReferenceNumber`),
  KEY `StatusReferenceNumber` (`Status`,`ReferenceNumber`),
  KEY `StatusCreatedDate` (`Status`,`CreatedDate`),
  KEY `DOB` (`DOB`),
  KEY `UpdatedDate` (`UpdatedDate`),
  KEY `DCountryCodeDPostcodeDAddress1` (`DCountryCode`,`DPostcode`,`DAddress1`),
  KEY `TrackingSent` (`TrackingSent`),
  KEY `status_createddate_prsid_asc` (`Status`,`CreatedDate`,`PrescriptionID`),
  KEY `status_prsid_asc` (`Status`,`PrescriptionID`),
  KEY `track_pre` (`TrackingSent`,`PrescriptionID`),
  KEY `SubStatus` (`SubStatus`),
  KEY `JVM` (`JVM`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `prescription_legacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_legacy` (
  `Prescription_LegacyID` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `birth_date` varchar(100) DEFAULT NULL,
  `nhs_number` varchar(100) DEFAULT NULL,
  `post_code` varchar(100) DEFAULT NULL,
  `address_1` varchar(100) DEFAULT NULL,
  `address_2` varchar(100) DEFAULT NULL,
  `town_city` varchar(100) DEFAULT NULL,
  `county` varchar(100) DEFAULT NULL,
  `telephone` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `deleted` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Prescription_LegacyID`),
  KEY `create_date` (`birth_date`),
  KEY `patient_id` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `prescriptionhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptionhistory` (
  `PrescriptionHistoryID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `SubStatus` int DEFAULT NULL,
  `UpdatedDate` int DEFAULT NULL,
  `UpdatedBy` int DEFAULT NULL,
  PRIMARY KEY (`PrescriptionHistoryID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `UpdatedBy` (`UpdatedBy`),
  KEY `StatusTo` (`Status`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pricing` (
  `PricingID` int NOT NULL AUTO_INCREMENT,
  `Code` varchar(100) DEFAULT NULL,
  `ClientID` int DEFAULT NULL,
  `Price` float(6,2) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Quantity` float(6,2) DEFAULT NULL,
  PRIMARY KEY (`PricingID`),
  KEY `code` (`Code`),
  KEY `type_clientid_code` (`Type`,`ClientID`,`Code`),
  KEY `code_qty` (`Code`,`Quantity`),
  KEY `clientid_code_qty` (`ClientID`,`Code`,`Quantity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `printrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printrecord` (
  `PrintRecordID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `TNTLabel` int DEFAULT NULL,
  `DeliveryNote` int DEFAULT NULL,
  `PharmacyLabel` int DEFAULT NULL,
  `Invoice` int DEFAULT NULL,
  `Consignment` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `DoctorLetter` int DEFAULT NULL,
  `UPSLabel` int DEFAULT NULL,
  PRIMARY KEY (`PrintRecordID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `PrescriptionIDDeliveryNotePharmacyLabel` (`PrescriptionID`,`DeliveryNote`,`PharmacyLabel`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `GUID` varchar(50) DEFAULT NULL,
  `Code` varchar(100) DEFAULT NULL,
  `Description` text,
  `Instructions` text,
  `Instructions2` text,
  `Quantity` varchar(50) DEFAULT NULL,
  `Unit` varchar(50) DEFAULT NULL,
  `Dosage` int DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `CodePrescriptionID` (`Code`,`PrescriptionID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `code` (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `product_legacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_legacy` (
  `ProductLegacyID` int NOT NULL AUTO_INCREMENT,
  `prescription_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `name` text,
  `qty` varchar(3) DEFAULT NULL,
  `dosage` text,
  `warnings` text,
  `prescribed_date` varchar(10) DEFAULT NULL,
  `uom_name` varchar(12) DEFAULT NULL,
  `endorsement_text` text,
  `pstatus` varchar(1) DEFAULT NULL,
  `pistatus` varchar(1) DEFAULT NULL,
  `deleted` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`ProductLegacyID`),
  UNIQUE KEY `idx1` (`prescription_id`),
  KEY `patient_id` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `productadditionalinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productadditionalinformation` (
  `PAIID` int NOT NULL AUTO_INCREMENT,
  `AIID` varchar(12) DEFAULT NULL,
  `ProductID` varchar(12) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`PAIID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `productcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productcode` (
  `ProductCodeID` int NOT NULL AUTO_INCREMENT,
  `Code` varchar(100) DEFAULT NULL,
  `FDBID` varchar(48) NOT NULL DEFAULT '0',
  `Name` varchar(200) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Quantity` float DEFAULT NULL,
  `Units` varchar(20) DEFAULT NULL,
  `Fridge` int DEFAULT NULL,
  `VAT` float(12,2) DEFAULT NULL,
  `Pack` int DEFAULT NULL,
  `OTC` int DEFAULT NULL,
  `ProductType` int DEFAULT NULL,
  `JVM` int DEFAULT '2' COMMENT 'Is the product pouch dispensable',
  `TariffCode` int DEFAULT NULL,
  `PrintForm` int DEFAULT '0',
  `Benchmark` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ProductCodeID`),
  KEY `StatusCode` (`Status`,`Code`),
  KEY `FDBID` (`FDBID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `productinstruction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productinstruction` (
  `PILID` int NOT NULL AUTO_INCREMENT,
  `InstructionID` varchar(12) DEFAULT NULL,
  `ProductID` varchar(12) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`PILID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `productnamealternative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productnamealternative` (
  `ProductNameAlternativeID` int unsigned NOT NULL AUTO_INCREMENT,
  `ProductCodeID` int unsigned DEFAULT NULL,
  `ClientID` int unsigned DEFAULT NULL,
  `AlternativeName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `UserID` int unsigned NOT NULL COMMENT 'Relates to the pharmacist user this alternative was added by',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ProductNameAlternativeID`),
  KEY `ProductCodeID` (`ProductCodeID`),
  KEY `UserID` (`UserID`),
  KEY `AlternativeName` (`AlternativeName`),
  KEY `ClientID` (`ClientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `productwarninglabel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productwarninglabel` (
  `PWLID` int NOT NULL AUTO_INCREMENT,
  `WLID` varchar(12) DEFAULT NULL,
  `ProductID` varchar(12) DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`PWLID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pxpuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pxpuser` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `esa_user_id` int DEFAULT NULL COMMENT 'User equivalent for the ESA user table',
  `role` int unsigned NOT NULL DEFAULT '10',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `last_login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionnaire` (
  `QuestionnaireID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `Question` text,
  `Answer` text,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`QuestionnaireID`),
  KEY `PrescriptionID` (`PrescriptionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `safeip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `safeip` (
  `SafeIPID` int NOT NULL AUTO_INCREMENT,
  `SafeIP` varchar(30) DEFAULT NULL,
  `SafeKey` varchar(32) DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`SafeIPID`),
  KEY `safeip_status` (`SafeIP`,`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `safeip_audits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `safeip_audits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `request_from` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'name of the person request come from',
  `requested_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `payload` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`my_row_id`),
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `SettingID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Value` text,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`SettingID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats` (
  `StatsID` int NOT NULL AUTO_INCREMENT,
  `CountryID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `PrescriptionID` int DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `Code` varchar(15) DEFAULT NULL,
  `ClientID` int DEFAULT NULL,
  `DeliveryID` int DEFAULT NULL,
  `Year` int DEFAULT NULL,
  `Month` int DEFAULT NULL,
  `Day` int DEFAULT NULL,
  `Date` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Total` float(6,2) DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Sex` int DEFAULT NULL,
  PRIMARY KEY (`StatsID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `statsuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statsuser` (
  `StatsUserID` int NOT NULL AUTO_INCREMENT,
  `ClientID` int DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `Sex` varchar(1) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  PRIMARY KEY (`StatsUserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `SupplierID` int unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'Not Set',
  `Description` mediumtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `Status` int DEFAULT '1',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`SupplierID`),
  KEY `Status` (`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `syncorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `syncorder` (
  `SyncOrderID` int unsigned NOT NULL AUTO_INCREMENT,
  `ClientID` int unsigned NOT NULL DEFAULT '0',
  `Value` varchar(50) NOT NULL DEFAULT '0',
  `Type` int NOT NULL DEFAULT '1' COMMENT '1 - reference number, 2 - number of orders',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`SyncOrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `systemactivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `systemactivity` (
  `SystemActivityID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `ReferenceID` int DEFAULT NULL,
  `Name` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Action` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Arguments` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`SystemActivityID`),
  KEY `Status` (`Status`),
  KEY `Type` (`Type`),
  KEY `UserID` (`UserID`),
  KEY `PrescriptionID` (`ReferenceID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telescope_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telescope_entries` (
  `sequence` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `family_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `should_display_on_index` tinyint(1) NOT NULL DEFAULT '1',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sequence`) USING BTREE,
  UNIQUE KEY `telescope_entries_uuid_unique` (`uuid`) USING BTREE,
  KEY `telescope_entries_batch_id_index` (`batch_id`) USING BTREE,
  KEY `telescope_entries_family_hash_index` (`family_hash`) USING BTREE,
  KEY `telescope_entries_created_at_index` (`created_at`) USING BTREE,
  KEY `telescope_entries_type_should_display_on_index_index` (`type`,`should_display_on_index`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telescope_entries_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telescope_entries_tags` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `entry_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`my_row_id`) USING BTREE,
  KEY `telescope_entries_tags_entry_uuid_tag_index` (`entry_uuid`,`tag`) USING BTREE,
  KEY `telescope_entries_tags_tag_index` (`tag`) USING BTREE,
  CONSTRAINT `telescope_entries_tags_entry_uuid_foreign` FOREIGN KEY (`entry_uuid`) REFERENCES `telescope_entries` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telescope_monitoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telescope_monitoring` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`my_row_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `testkit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testkit` (
  `TestKitID` int unsigned NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `ParentReferenceNumber` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReferenceNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Type` int NOT NULL DEFAULT '1',
  `Total` int DEFAULT NULL,
  `Count` int DEFAULT NULL,
  `Name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Surname` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `DOB` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Sex` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Postcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `Code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address3` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address4` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`TestKitID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `ReferenceNumber` (`ReferenceNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `testkitold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testkitold` (
  `TestKitID` int unsigned NOT NULL AUTO_INCREMENT,
  `Type` int NOT NULL DEFAULT '1',
  `PrescriptionID` int DEFAULT NULL,
  `ReferenceNumber` int DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `DOB` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`TestKitID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tray`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tray` (
  `TrayID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Priority` int DEFAULT '1' COMMENT '1 - Pharmacist Tray, 2 - Dispenser Tray',
  `Status` int DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  `ProcessedAt` timestamp NULL DEFAULT NULL,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TrayID`),
  KEY `PrescriptionID` (`PrescriptionID`),
  KEY `StatusUserIDPrescriptionID` (`Status`,`UserID`,`PrescriptionID`),
  KEY `StatusUserID` (`Status`,`UserID`),
  KEY `Status` (`Status`),
  KEY `UserID` (`UserID`),
  KEY `Type` (`Type`,`Status`,`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `unitalternative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unitalternative` (
  `UnitAlternativeID` int unsigned NOT NULL AUTO_INCREMENT,
  `ProductCodeID` int unsigned DEFAULT NULL,
  `ClientID` int unsigned DEFAULT NULL,
  `AlternativeUnit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserID` int unsigned NOT NULL COMMENT 'Relates to the pharmacist user this alternative was added by',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`UnitAlternativeID`),
  KEY `ProductCodeID` (`ProductCodeID`),
  KEY `ClientID` (`ClientID`),
  KEY `AlternativeUnit` (`AlternativeUnit`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `upsaccesspoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upsaccesspoint` (
  `UPSAccessPointID` int NOT NULL AUTO_INCREMENT,
  `PrescriptionID` int DEFAULT NULL,
  `Name` varchar(80) DEFAULT NULL,
  `Address1` varchar(50) DEFAULT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `Address3` varchar(50) DEFAULT NULL,
  `Address4` varchar(50) DEFAULT NULL,
  `Postcode` varchar(50) DEFAULT NULL,
  `CountryCode` varchar(3) DEFAULT NULL,
  `APNotificationType` int DEFAULT NULL,
  `APNotificationValue` varchar(50) DEFAULT NULL,
  `APNotificationFailedEmailAddress` varchar(50) DEFAULT NULL,
  `APNotificationCountryTerritory` varchar(2) DEFAULT NULL,
  `APNotificationPhoneCountryCode` varchar(2) DEFAULT NULL,
  `APNotificationLanguage` varchar(3) DEFAULT NULL,
  `UPSAccessPoint` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`UPSAccessPointID`),
  KEY `PrescriptionID` (`PrescriptionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Surname` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `CreatedDate` int DEFAULT NULL,
  `ModifiedDate` int DEFAULT NULL,
  `LastLogin` int DEFAULT NULL,
  `IP` varchar(16) DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Admin` int DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `view_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view_stats` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `c1` tinyint NOT NULL,
  `c2` tinyint NOT NULL,
  `c4` tinyint NOT NULL,
  `c7dpd` tinyint NOT NULL,
  `c7ups` tinyint NOT NULL,
  `c9` tinyint NOT NULL,
  `c10` tinyint NOT NULL,
  `c11` tinyint NOT NULL,
  `c12` tinyint NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `viewlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewlog` (
  `ViewLogID` int unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int unsigned NOT NULL DEFAULT '0',
  `Page` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `IP` varchar(15) DEFAULT '',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ViewLogID`) USING BTREE,
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `viewlogcurrent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewlogcurrent` (
  `ViewLogCurrentID` int unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int unsigned NOT NULL DEFAULT '0',
  `Name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '',
  `Surname` varchar(255) NOT NULL DEFAULT '',
  `Page` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `IP` varchar(15) DEFAULT '',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DeletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ViewLogCurrentID`) USING BTREE,
  KEY `UserID` (`UserID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `warninglabel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warninglabel` (
  `WLID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Description` text,
  `Type` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `CountryID` int DEFAULT NULL,
  PRIMARY KEY (`WLID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `webloginip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webloginip` (
  `WebLoginIPID` int NOT NULL AUTO_INCREMENT,
  `SafeIP` varchar(20) DEFAULT NULL,
  `ClientID` varchar(12) DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`WebLoginIPID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `webuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webuser` (
  `WebUserID` int NOT NULL AUTO_INCREMENT,
  `ClientID` int DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`WebUserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1,'2014_10_12_000000_create_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2,'2014_10_12_100000_create_password_reset_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3,'2014_10_12_100000_create_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4,'2018_08_08_100000_create_telescope_entries_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5,'2019_08_19_000000_create_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6,'2019_12_14_000001_create_personal_access_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7,'2023_04_13_115405_create_activity_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8,'2023_04_13_115405_create_additionalinformation_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (9,'2023_04_13_115405_create_attachment_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (10,'2023_04_13_115405_create_authorizationcode_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (11,'2023_04_13_115405_create_blacklist_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (12,'2023_04_13_115405_create_client_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (13,'2023_04_13_115405_create_cookie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14,'2023_04_13_115405_create_correspondence_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15,'2023_04_13_115405_create_country_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16,'2023_04_13_115405_create_customerprescriptions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (17,'2023_04_13_115405_create_customlabel_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18,'2023_04_13_115405_create_dispenserpool_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19,'2023_04_13_115405_create_doctor_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20,'2023_04_13_115405_create_doctoraddress_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (21,'2023_04_13_115405_create_inventorybarcode_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (22,'2023_04_13_115405_create_inventoryhelp_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (23,'2023_04_13_115405_create_inventoryitem_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (24,'2023_04_13_115405_create_inventoryitembatch_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (25,'2023_04_13_115405_create_inventoryitembatchlog_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (26,'2023_04_13_115405_create_inventoryitembatchnote_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27,'2023_04_13_115405_create_inventoryitemdifference_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28,'2023_04_13_115405_create_inventorymatch_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29,'2023_04_13_115405_create_inventorymessage_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30,'2023_04_13_115405_create_inventoryprintout_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (31,'2023_04_13_115405_create_inventoryuser_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32,'2023_04_13_115405_create_invoice_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33,'2023_04_13_115405_create_invoiceitem_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (34,'2023_04_13_115405_create_manufacturer_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (35,'2023_04_13_115405_create_note_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (36,'2023_04_13_115405_create_oauth_access_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (37,'2023_04_13_115405_create_oauth_auth_codes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (38,'2023_04_13_115405_create_oauth_clients_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (39,'2023_04_13_115405_create_oauth_personal_access_clients_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (40,'2023_04_13_115405_create_oauth_refresh_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (41,'2023_04_13_115405_create_packproduct_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (42,'2023_04_13_115405_create_password_securities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (43,'2023_04_13_115405_create_pharmacylabel_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (44,'2023_04_13_115405_create_pharmacyuser_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (45,'2023_04_13_115405_create_prescription_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (46,'2023_04_13_115405_create_prescriptionhistory_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (47,'2023_04_13_115405_create_pricing_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (48,'2023_04_13_115405_create_printrecord_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (49,'2023_04_13_115405_create_product_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (50,'2023_04_13_115405_create_productadditionalinformation_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (51,'2023_04_13_115405_create_productcode_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (52,'2023_04_13_115405_create_productnamealternative_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (53,'2023_04_13_115405_create_productwarninglabel_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (54,'2023_04_13_115405_create_pxpuser_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (55,'2023_04_13_115405_create_questionnaire_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (56,'2023_04_13_115405_create_safeip_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (57,'2023_04_13_115405_create_sessions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (58,'2023_04_13_115405_create_setting_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (59,'2023_04_13_115405_create_supplier_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (60,'2023_04_13_115405_create_syncorder_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (61,'2023_04_13_115405_create_systemactivity_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (62,'2023_04_13_115405_create_testkit_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (63,'2023_04_13_115405_create_tray_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (64,'2023_04_13_115405_create_upsaccesspoint_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (65,'2023_04_13_115405_create_user_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (66,'2023_04_13_115405_create_viewlog_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (67,'2023_04_13_115405_create_viewlogcurrent_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (68,'2023_04_13_115405_create_warninglabel_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (69,'2023_04_13_115406_create_view_shipped_view',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (70,'2023_04_13_115406_create_view_stats_view',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (71,'2023_04_13_115408_add_foreign_keys_to_inventoryitem_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (72,'2023_04_13_115408_add_foreign_keys_to_inventoryitembatch_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (73,'2023_04_14_104041_create_instruction_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (74,'2023_04_14_104041_create_productinstruction_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (90,'2023_05_11_065032_create_modules_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (91,'2023_05_11_065109_create_module_role_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (92,'2023_05_11_072812_create_apps_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (93,'2023_05_11_072848_create_app_role_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (94,'2023_05_11_072856_create_app_module_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (95,'2023_05_11_065005_create_roles_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (96,'2023_05_16_100507_add_roles_to_pharmacyuser_table',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (97,'2023_11_21_131720_create_unitalternative_table',5);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (98,'2024_01_30_064845_add_benchmark_field_to_productcode_table',6);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (99,'2024_02_07_140934_create_inventory_logs_table',7);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (100,'2023_11_24_091032_create_safeip_audits_table',8);
