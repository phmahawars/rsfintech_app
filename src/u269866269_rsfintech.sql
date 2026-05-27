-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 27, 2026 at 12:00 PM
-- Server version: 11.8.6-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u269866269_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_aggregators`
--

CREATE TABLE `account_aggregators` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(50) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` varchar(200) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `consent_type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `request_id` varchar(255) DEFAULT NULL,
  `generate` varchar(255) DEFAULT NULL,
  `pdf_report` varchar(255) DEFAULT NULL,
  `verify_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account_aggregators`
--

INSERT INTO `account_aggregators` (`id`, `unique_id`, `user_id`, `client_id`, `mobile`, `consent_type`, `status`, `request_id`, `generate`, `pdf_report`, `verify_url`, `created_at`, `updated_at`) VALUES
(1, 'uuLjgx1yurqIcUPTv4FZ', 46, 'account_aggregator_v2_vDmVDMczAjsCfpfrvflN', '9711728683', 'loan_underwriting', 'active', NULL, NULL, NULL, 'https://orch.crif.com/web-redirect/#/aa-webview?requestId=IbiBQxoyZkLxh5foHTNh1PRFaam7PEx5Dk_2hYfoY8SBeIiiKe0xNKRoU-9I2PxfAVgeTl46iIUejabUJHP-R5vesEOYEXqDXKxCxHMxGD4', '2026-05-23 15:24:31', '2026-05-23 15:32:09'),
(2, 'ic3D41CVXVyN3cYNBjVV', 46, 'account_aggregator_v2_btfywAxKIraHtZbPqnlv', '9711728683', 'loan_monitoring', 'active', 'account_aggregator_v2_btfywAxKIraHtZbPqnlv_Enm0wlar', NULL, NULL, 'https://orch.crif.com/web-redirect/#/aa-webview?requestId=ijbbY-aEaDPfiLjGefbh4BycpOuGpwrf9jzbws9qyXpt2ab7repLzpCaDzon190nAVgeTl46iIUejabUJHP-R5vesEOYEXqDXKxCxHMxGD4', '2026-05-23 17:59:42', '2026-05-23 18:00:25'),
(4, 'asdfg123rfzsderfgb', 46, 'account_aggregator_v2_cwptXcpVcBinzDqQsaUM', '9860721699', 'loan_monitoring', 'active', 'account_aggregator_v2_cwptXcpVcBinzDqQsaUM_KagYAtBf', NULL, NULL, NULL, '2026-05-23 18:59:52', '2026-05-23 23:27:27'),
(5, 'tyuijhbv34rdfcvbj', 46, 'account_aggregator_v2_urmpqVTvzgUEdRnNdlxT', '8010138020', 'loan_underwriting', 'ready', NULL, NULL, NULL, NULL, '2026-05-23 18:59:52', '2026-05-26 13:39:16'),
(6, 'MNdiLdyxbwCBRHN4TkvU', 46, 'account_aggregator_v2_RCNxhkOwvomSAezlVsqH', '7042083407', 'loan_underwriting', 'pending', NULL, NULL, NULL, 'https://orch.crif.com/web-redirect/#/aa-webview?requestId=Z3aHD7iirvRH7LtC5RmMI49fc48AXHSwj9glNHDgKX2fOc807VhZM1qs2biIMuZjAVgeTl46iIUejabUJHP-R5vesEOYEXqDXKxCxHMxGD4', '2026-05-23 23:34:31', '2026-05-23 23:34:31'),
(7, 'jT1QdYAGQzqIPf7VLVpv', 15, 'account_aggregator_v2_easIoThtuQpsLhGDzgsm', '9690155201', 'loan_underwriting', 'active', NULL, NULL, NULL, 'https://orch.crif.com/web-redirect/#/aa-webview?requestId=tp_49rw9Ljz0G-hfHODjdMwqJ8ou27srb8gUbTnHRWDYPdtG0sITT4FlWlJ8c4z4AVgeTl46iIUejabUJHP-R5vesEOYEXqDXKxCxHMxGD4', '2026-05-24 10:38:44', '2026-05-24 10:40:36'),
(8, 'xGGFgGFOLoW4t3F08AXw', 15, 'account_aggregator_v2_nUvAkJRBJbvcKmCdwIbC', '9690155201', 'loan_monitoring', 'active', 'account_aggregator_v2_nUvAkJRBJbvcKmCdwIbC_9XgrkUSM', NULL, NULL, 'https://orch.crif.com/web-redirect/#/aa-webview?requestId=6ulVQbMs-t3-2IB1tOBL8KfComM2g1c9oc3AJq5QEgRWxEgkpJzHoLDE6uV_J4rEAVgeTl46iIUejabUJHP-R5vesEOYEXqDXKxCxHMxGD4', '2026-05-24 10:43:33', '2026-05-24 10:44:46');

-- --------------------------------------------------------

--
-- Table structure for table `assistant_amounts`
--

CREATE TABLE `assistant_amounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_assis_id` bigint(20) UNSIGNED NOT NULL,
  `assis_id` bigint(20) UNSIGNED NOT NULL,
  `amounts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`amounts`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assistant_amounts`
--

INSERT INTO `assistant_amounts` (`id`, `parent_assis_id`, `assis_id`, `amounts`, `created_at`, `updated_at`) VALUES
(1, 46, 477, '{\"Prefill\":\"201\",\"CIBIL\":\"201\",\"CRIF\":\"203\",\"Equifax\":\"201\",\"Experian\":\"201\",\"PanToMobile\":\"20\",\"VehicleRcVerification\":\"20\",\"BankStatement\":\"200\"}', '2026-04-15 17:34:34', '2026-05-27 10:56:00'),
(2, 15, 522, '{\"Prefill\":\"10\",\"CIBIL\":\"100\",\"CRIF\":\"100\",\"Equifax\":\"80\",\"Experian\":\"50\",\"CIBIL_CMR\":\"1\",\"CRIF_CMR\":\"1\"}', '2026-04-21 18:53:12', '2026-04-24 12:57:29'),
(3, 40, 538, '{\"Prefill\":\"10\",\"CIBIL\":\"100\",\"CRIF\":\"100\",\"Equifax\":\"50\",\"Experian\":\"50\"}', '2026-04-24 13:18:48', '2026-05-14 11:44:39'),
(4, 15, 565, '{\"Prefill\":\"10\",\"CIBIL\":\"130\",\"CRIF\":\"120\",\"Equifax\":\"120\",\"Experian\":\"80\",\"CIBIL_CMR\":\"700\",\"CRIF_CMR\":\"700\"}', '2026-05-02 12:34:13', '2026-05-02 12:34:13'),
(5, 397, 573, '{\"Prefill\":\"2.75\",\"CIBIL\":\"90.00\",\"CRIF\":\"95.00\",\"Equifax\":\"80.00\",\"Experian\":\"70.00\"}', '2026-05-04 12:53:11', '2026-05-14 12:05:56'),
(6, 272, 634, '{\"Prefill\":\"20\",\"CIBIL\":\"200\",\"CRIF\":\"200\",\"Equifax\":\"200\",\"Experian\":\"200\"}', '2026-05-12 12:25:43', '2026-05-12 12:25:43'),
(7, 397, 642, '{\"Prefill\":\"10.00\",\"CIBIL\":\"110.00\",\"CRIF\":\"120.00\",\"Equifax\":\"100.00\",\"Experian\":\"120.00\",\"PanToMobile\":\"100\",\"VehicleRcVerification\":\"200\",\"BankStatement\":\"500\"}', '2026-05-14 19:30:53', '2026-05-27 12:54:17'),
(8, 397, 644, '{\"Prefill\":\"5.0\",\"CIBIL\":\"150\",\"CRIF\":\"110\",\"Equifax\":\"110\",\"Experian\":\"180\"}', '2026-05-15 15:48:06', '2026-05-15 15:48:06'),
(9, 662, 663, '{\"Prefill\":\"110\",\"CIBIL\":\"120\",\"CRIF\":\"120\",\"Equifax\":\"120\",\"Experian\":\"415\"}', '2026-05-20 19:57:50', '2026-05-20 19:57:50'),
(10, 397, 697, '{\"Prefill\":\"20.00\",\"CIBIL\":\"160.00\",\"CRIF\":\"150.00\",\"Equifax\":\"120.00\",\"Experian\":\"150.00\",\"PanToMobile\":\"50.00\",\"VehicleRcVerification\":\"100.00\",\"BankStatement\":\"500.00\"}', '2026-05-27 13:18:45', '2026-05-27 13:18:45');

-- --------------------------------------------------------

--
-- Table structure for table `bs_customers`
--

CREATE TABLE `bs_customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `mobile_no` varchar(10) NOT NULL,
  `pan` varchar(10) NOT NULL,
  `category_id` int(11) NOT NULL,
  `is_user_validated` tinyint(4) NOT NULL DEFAULT 0,
  `is_pan_validated` tinyint(4) NOT NULL DEFAULT 0,
  `otp_verified` tinyint(1) NOT NULL DEFAULT 0,
  `customer_id` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bs_customers`
--

INSERT INTO `bs_customers` (`id`, `user_id`, `mobile_no`, `pan`, `category_id`, `is_user_validated`, `is_pan_validated`, `otp_verified`, `customer_id`, `created_at`, `updated_at`) VALUES
(3, 477, '9711728683', 'KFBPK9858G', 13, 1, 1, 1, 'LzEwUVkvUXFhOUtJci9zMW9FWERaQT09', '2026-05-26 14:58:12', '2026-05-26 15:46:33');

-- --------------------------------------------------------

--
-- Table structure for table `cibil_credit_reports`
--

CREATE TABLE `cibil_credit_reports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pan` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) NOT NULL,
  `consent` varchar(255) NOT NULL DEFAULT 'Y',
  `credit_report_link` text DEFAULT NULL,
  `response_status` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cibil_credit_reports`
--

INSERT INTO `cibil_credit_reports` (`id`, `user_id`, `name`, `pan`, `mobile`, `consent`, `credit_report_link`, `response_status`, `created_at`, `updated_at`) VALUES
(8316, 406, 'Rupali', 'BENPK8264C', '8329422248', 'Y', 'MtgKTfHHaBhuQshAkERO', '200', '2026-05-27 17:06:32', '2026-05-27 17:06:32'),

-- --------------------------------------------------------

--
-- Table structure for table `crif_credit_reports_avs`
--

CREATE TABLE `crif_credit_reports_avs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pan` varchar(20) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `consent` enum('Y','N') NOT NULL DEFAULT 'N',
  `credit_report_link` varchar(255) DEFAULT NULL,
  `response_status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `crif_credit_reports_avs`
--

INSERT INTO `crif_credit_reports_avs` (`id`, `user_id`, `name`, `pan`, `mobile`, `consent`, `credit_report_link`, `response_status`, `created_at`, `updated_at`) VALUES
(235, 579, 'Pawan Harijan ', 'AWCPH5948N', '7733053659', 'qwedfiuytrsdfghjuytr','Y', 1, '2026-05-27 15:21:38', '2026-05-27 15:21:38');

-- --------------------------------------------------------

--
-- Table structure for table `equifax_credit_reports`
--

CREATE TABLE `equifax_credit_reports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `id_type` enum('pan','aadhaar') DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `consent` varchar(250) DEFAULT 'Y',
  `prefill_raw` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`prefill_raw`)),
  `client_id` varchar(200) DEFAULT NULL,
  `credit_report_link` varchar(200) DEFAULT NULL,
  `credit_score` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equifax_credit_reports`
--

INSERT INTO `equifax_credit_reports` (`id`, `user_id`, `name`, `mobile`, `id_number`, `id_type`, `gender`, `consent`, `prefill_raw`, `client_id`, `credit_report_link`, `credit_score`, `created_at`, `updated_at`) VALUES
(189, 15, 'ANKIT GONEKAR', '9131938146', 'BUXPG4763N', 'pan', 'male', '1', NULL, 'credit_report_v2_pdf_LdwlzUVDrXThWvUhacxk', 'equifax-reports/equifax_9131938146_20260527150727.pdf', '820', '2026-05-27 15:07:27', '2026-05-27 15:07:27');

-- --------------------------------------------------------

--
-- Table structure for table `experian_credit_reports`
--

CREATE TABLE `experian_credit_reports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `pan` varchar(10) DEFAULT NULL,
  `consent` varchar(250) DEFAULT 'Y',
  `credit_report_link` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `experian_credit_reports`
--

INSERT INTO `experian_credit_reports` (`id`, `user_id`, `name`, `mobile`, `pan`, `consent`, `credit_report_link`, `created_at`, `updated_at`) VALUES
(2120, 406, 'MEENA', '9999999999', 'FOVPM4382B', 'Y', 'jUTHfGKBbaYnKGlhjuxW', '2026-05-27 17:28:36', '2026-05-27 17:28:36');

-- --------------------------------------------------------

--
-- Table structure for table `mobile_to_details`
--

CREATE TABLE `mobile_to_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `consent` varchar(5) NOT NULL,
  `cibil_raw` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cibil_raw`)),
  `response_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mobile_to_details`
--

INSERT INTO `mobile_to_details` (`id`, `user_id`, `mobile`, `consent`, `cibil_raw`, `response_status`, `created_at`, `updated_at`) VALUES
(622, 15, '9952767296', '1', '{\"client_id\":\"745ce335-c626-4075-b22d-714d4efb93dc\",\"CIRReportData\":{\"CIRReportData\":{\"PersonalInfo\":{\"Name\":{\"FullName\":\"MANSOORALIKAN .\",\"FirstName\":\"MANSOORALIKAN\",\"MiddleName\":\"\",\"LastName\":\".\"},\"AliasName\":[],\"DateOfBirth\":\"18-06-1994\",\"Gender\":\"MALE\",\"Age\":{\"Age\":\"31\"},\"PlaceOfBirthInfo\":[],\"TotalIncome\":\"4,00,001 - 6,00,000\",\"Occupation\":\"\"},\"IdentityInfo\":{\"PANId\":[{\"seq\":\"1\",\"ReportedDate\":\"2026-05-27\",\"IdNumber\":\"CMFPM9881G\"}],\"OtherId\":[]},\"AddressInfo\":[{\"Seq\":\"1\",\"ReportedDate\":\"2026-05-15\",\"Address\":\"DEAR SIR\\/MADAM KATTUVALAVU 6TH STREET THENNAMPALAYAM TIRUPUR TIRUPUR 641604 TN \",\"State\":\"TN\",\"Postal\":\"641604\",\"Type\":\"\"},{\"Seq\":\"2\",\"ReportedDate\":\"2024-01-31\",\"Address\":\"15 KATTUVALAVU 6TH STREET TENNAMPALAYAM TIRUPPUR TIRUPPUR 641604 TN \",\"State\":\"TN\",\"Postal\":\"641604\",\"Type\":\"\"},{\"Seq\":\"3\",\"ReportedDate\":\"2022-09-30\",\"Address\":\"7150 TAMIL NADU 641604 TN \",\"State\":\"TN\",\"Postal\":\"641604\",\"Type\":\"\"}],\"PhoneInfo\":[{\"Type\":\"1\",\"typeCode\":\"H\",\"ReportedDate\":\"2026-05-27\",\"Number\":\"9952767296\"},{\"Type\":\"2\",\"typeCode\":\"H\",\"ReportedDate\":\"2026-05-27\",\"Number\":\"919952767296\"}],\"EmailAddressInfo\":[{\"seq\":\"1\",\"ReportedDate\":\"2026-05-27\",\"EmailAddress\":\"mansoor.a186@gmail.com\"}]}}}', '200', '2026-05-27 16:32:51', '2026-05-27 16:32:51');

-- --------------------------------------------------------

--
-- Table structure for table `pan_to_details`
--

CREATE TABLE `pan_to_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `pan` varchar(10) NOT NULL,
  `consent` varchar(5) NOT NULL,
  `cibil_raw` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cibil_raw`)),
  `response_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pan_to_details`
--

INSERT INTO `pan_to_details` (`id`, `user_id`, `pan`, `consent`, `cibil_raw`, `response_status`, `created_at`, `updated_at`) VALUES
(105, 477, 'KFBPK9858G', '1', '{\"client_id\":\"pan_to_email_mobile_ufOqasmnVscvMWgotANr\",\"id_number\":\"KFBPK9858G\",\"email_id\":[\"harshmahawar25@gmail.com\"],\"mobile_number\":[\"9711728683\"]}', '200', '2026-05-27 11:00:55', '2026-05-27 11:00:55'),
(106, 15, 'CUSPM7179Q', '1', '{\"client_id\":\"pan_to_email_mobile_dzrxDfskencpjdgkHioz\",\"id_number\":\"CUSPM7179Q\",\"email_id\":[\"moideensumaiya@gmail.com\"],\"mobile_number\":[\"9941414486\"]}', '200', '2026-05-27 12:13:32', '2026-05-27 12:13:32'),
(107, 15, 'BXHPA9257J', '1', '{\"client_id\":\"pan_to_email_mobile_bYQxpizocKLEfvhueeBk\",\"id_number\":\"BXHPA9257J\",\"email_id\":[\"ambikaambika1985aa@gmail.com\"],\"mobile_number\":[\"9060059738\"]}', '200', '2026-05-27 14:49:49', '2026-05-27 14:49:49'),
(108, 15, 'AKAPD9070B', '1', '{\"client_id\":\"pan_to_email_mobile_cbjEBiZnVhrEkfynsqtv\",\"id_number\":\"AKAPD9070B\",\"email_id\":[\"VAANICA008@GMAIL.COM\"],\"mobile_number\":[\"9820249698\"]}', '200', '2026-05-27 15:44:22', '2026-05-27 15:44:22'),
(109, 15, 'BDGPJ1206F', '1', '{\"client_id\":\"pan_to_email_mobile_NpPDNWNpHBxpyrfaJrCe\",\"id_number\":\"BDGPJ1206F\",\"email_id\":[\"DEVIYELLAMRAJURAJU@GMAIL.COM\"],\"mobile_number\":[\"7093178816\",\"9550949126\"]}', '200', '2026-05-27 15:53:12', '2026-05-27 15:53:12'),
(110, 15, 'AEJPN4059B', '1', '{\"client_id\":\"pan_to_email_mobile_JsGdhpnosFeLbLPqvxWi\",\"id_number\":\"AEJPN4059B\",\"email_id\":[\"arassociatestup@gmail.com\"],\"mobile_number\":[\"9952767296\"]}', '200', '2026-05-27 16:31:39', '2026-05-27 16:31:39');

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subscription_name` varchar(255) NOT NULL,
  `price` int(10) NOT NULL,
  `wallet_bonus` tinyint(1) NOT NULL DEFAULT 0,
  `bonus_percent` int(100) NOT NULL DEFAULT 0,
  `api_amounts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`api_amounts`)),
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `subscription_name`, `price`, `wallet_bonus`, `bonus_percent`, `api_amounts`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Diamond Plan', 24999, 1, 4, '{\"Prefill\":\"1.75\",\"CIBIL\":\"75.00\",\"CRIF\":\"70.00\",\"Equifax\":\"60.00\",\"Experian\":\"40.00\",\"PanToMobile\":\"15.00\",\"BankStatement\":\"150.00\",\"VehicleRcVerification\":\"15.00\"}', '[{\"text\":\"1x Faster Update\"},{\"text\":\"Premium support\"}]', '2026-03-03 14:25:32', '2026-05-03 10:17:57'),
(2, 'Platinum Plan', 49999, 1, 4, '{\"Prefill\":\"1.50\",\"CIBIL\":\"60.00\",\"CRIF\":\"50.00\",\"Equifax\":\"50.00\",\"Experian\":\"25.00\",\"PanToMobile\":\"15.00\",\"BankStatement\":\"150.00\",\"VehicleRcVerification\":\"15.00\"}', '[{\"text\":\"1x Faster Update\"},{\"text\":\"Premium support\"}]', '2026-03-03 14:43:44', '2026-05-03 10:17:44'),
(3, 'Silver Plan', 9999, 1, 3, '{\"Prefill\":\"5.00\",\"CIBIL\":\"90.00\",\"CRIF\":\"90.00\",\"Equifax\":\"90.00\",\"Experian\":\"80.00\",\"PanToMobile\":\"15.00\",\"BankStatement\":\"150.00\",\"VehicleRcVerification\":\"15.00\"}', '[{\"text\":\"1x Faster Update\"},{\"text\":\"Premium support\"}]', '2026-03-03 14:44:30', '2026-05-03 10:19:10'),
(4, 'Smart Plan', 4999, 1, 2, '{\"Prefill\":\"5.00\",\"CIBIL\":\"100.00\",\"CRIF\":\"100.00\",\"Equifax\":\"100.00\",\"Experian\":\"90.00\",\"PanToMobile\":\"15.00\",\"BankStatement\":\"150.00\",\"VehicleRcVerification\":\"15.00\"}', '[{\"text\":\"1x Faster Update\"},{\"text\":\"Premium support\"}]', '2026-03-03 14:45:11', '2026-05-03 10:18:24'),
(5, 'Small Budget Plan', 2500, 1, 1, '{\"Prefill\":\"5.00\",\"CIBIL\":\"118.00\",\"CRIF\":\"110\",\"Equifax\":\"110.00\",\"Experian\":\"110.00\",\"PanToMobile\":\"15.00\",\"BankStatement\":\"150.00\",\"VehicleRcVerification\":\"15.00\"}', '[{\"text\":\"1x Faster Update\"},{\"text\":\"Premium support\"}]', '2026-03-03 14:46:07', '2026-04-30 16:56:24'),
(6, 'Start Up Plan', 1000, 0, 0, '{\"Prefill\":\"10.00\",\"CIBIL\":\"175\",\"CRIF\":\"150.00\",\"Equifax\":\"150.00\",\"Experian\":\"120.00\",\"PanToMobile\":\"15.00\",\"BankStatement\":\"150.00\",\"VehicleRcVerification\":\"15.00\"}', '[{\"text\":\"1x Faster Update\"},{\"text\":\"Premium support\"}]', '2026-03-03 14:46:55', '2026-04-30 17:16:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_assis` bigint(20) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'subscriber',
  `subadmin` varchar(191) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `payment_status` varchar(191) DEFAULT NULL,
  `subscription_id` int(100) NOT NULL DEFAULT 0,
  `payment_id` varchar(191) DEFAULT NULL,
  `wallet_amount` decimal(10,0) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `theme` varchar(255) DEFAULT 'default',
  `theme_color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `parent_assis`, `name`, `email`, `phone`, `email_verified_at`, `password`, `remember_token`, `role`, `subadmin`, `status`, `payment_status`, `subscription_id`, `payment_id`, `wallet_amount`, `created_at`, `updated_at`, `theme`, `theme_color`) VALUES
(1, NULL, 'Rsfintech', 'santosh@rsfintech.in', NULL, '2025-02-24 06:02:08', '$2y$10$ABu3evK3um2NmsvtWhBpyeXnNEzZwp0G/M2vOitpyo7K2SgzOGT9m', 'lLDsIvSVpwv7XZOG8d30AjHA2nSE6ApRZ5ZtI5miOgmOJAI7h4l3t28Yd582', 'admin', NULL, 1, NULL, 1, NULL, 22, '2025-02-24 06:02:08', '2026-05-13 16:44:25', 'default', 'amber'),
(15, NULL, 'Rajesh Kumar', 'aacambd01@gmail.com', '9690155201', NULL, '$2y$10$w/KCTvR0/z5jo0.tRNJ5duTVou6G7ZRr48U0bdT2k/WAKvNUJZn4a', 'MGp5E8WP19odaXrsixA9zP0CqHIgRtp0Btwvb9Rdx7jvzpHUO5ib41HY9yao', 'subscriber', NULL, 1, 'unpaid', 2, NULL, 14876, '2025-07-07 01:55:58', '2026-05-27 17:31:28', 'default', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--


-- --------------------------------------------------------

--
-- Table structure for table `vehicle_rc_to_details`
--

CREATE TABLE `vehicle_rc_to_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `rc_number` varchar(15) NOT NULL,
  `consent` varchar(5) NOT NULL,
  `cibil_raw` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cibil_raw`)),
  `response_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicle_rc_to_details`
--

INSERT INTO `vehicle_rc_to_details` (`id`, `user_id`, `rc_number`, `consent`, `cibil_raw`, `response_status`, `created_at`, `updated_at`) VALUES
(12, 579, 'RJ37GB4819', '1', '{\"client_id\":\"rc_InCgLpbJzeylzeIBxUoK\",\"rc_number\":\"RJ37GB4819\",\"fit_up_to\":\"2026-12-09\",\"registration_date\":\"2024-12-06\",\"owner_name\":\"CHAINA RAM KUMAWAT\",\"father_name\":\"\",\"present_address\":\"SHARWANPURA, KUCHAMAN, , Nagaur, Rajasthan, 341520\",\"permanent_address\":\"SHARWANPURA, KUCHAMAN, , Nagaur, Rajasthan, 341520\",\"mobile_number\":\"\",\"vehicle_category\":\"LGV\",\"vehicle_chasi_number\":\"MA1ZN2TTKR5L35316\",\"vehicle_engine_number\":\"TTR4L32331\",\"maker_description\":\"MAHINDRA & MAHINDRA LIMITED\",\"maker_model\":\"BOLERO PIK-UP CBC MS 1.3T\",\"body_type\":\"OPEN\",\"fuel_type\":\"DIESEL\",\"color\":\"DIAMOND WHITE-\",\"norms_type\":\"BHARAT STAGE VI\",\"financer\":\"MAHINDRA & MAHINDRA FIN SER LTD\",\"financed\":true,\"insurance_company\":\"National Insurance Co. Ltd.\",\"insurance_policy_number\":\"38040331256360004038\",\"insurance_upto\":\"2026-11-26\",\"manufacturing_date\":\"11\\/2024\",\"manufacturing_date_formatted\":\"2024-11\",\"registered_at\":\"DIDWANA DTO, Rajasthan\",\"latest_by\":\"2026-05-27\",\"less_info\":true,\"tax_upto\":null,\"tax_paid_upto\":\"LTT\",\"cubic_capacity\":\"2523.00\",\"vehicle_gross_weight\":\"2995\",\"no_cylinders\":\"4\",\"seat_capacity\":\"2\",\"sleeper_capacity\":\"0\",\"standing_capacity\":\"0\",\"wheelbase\":\"3264\",\"unladen_weight\":\"1530\",\"vehicle_category_description\":\"Goods Carrier(LGV)\",\"pucc_number\":\"RJ03700150004537\",\"pucc_upto\":\"2026-12-08\",\"permit_number\":\"\",\"permit_issue_date\":null,\"permit_valid_from\":null,\"permit_valid_upto\":null,\"permit_type\":\"\",\"national_permit_number\":\"\",\"national_permit_upto\":null,\"national_permit_issued_by\":null,\"non_use_status\":null,\"non_use_from\":null,\"non_use_to\":null,\"blacklist_status\":\"\",\"noc_details\":\"\",\"owner_number\":\"1\",\"rc_status\":\"ACTIVE\",\"masked_name\":false,\"challan_details\":null,\"variant\":null,\"rto_code\":\"\",\"response_metadata\":{\"masked_chassis\":false,\"masked_engine\":false,\"masked_owner_name\":false}}', '200', '2026-05-27 16:34:17', '2026-05-27 16:34:17');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_id` varchar(191) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `payment_status` enum('pending','success','failed') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'pending',
  `transaction_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` varchar(250) NOT NULL DEFAULT 'Wallet Recharge',
  `order_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `user_id`, `amount`, `payment_id`, `payment_status`, `transaction_type`, `remarks`, `order_id`, `created_at`, `updated_at`) VALUES
(14613, 477, 20.00, 'wallet_panToMobile', 'success', 'debited', 'Pan to Mobile & Email Report', NULL, '2026-05-27 11:00:55', '2026-05-27 11:00:55'),
(14614, 46, 5.00, 'wallet_PanToMobile_commission', 'pending', 'credited', 'Commission from assistant (Tester@gmail.com)', NULL, '2026-05-27 11:00:55', '2026-05-27 11:00:55'),
(14718, 563, 150.00, 'wallet_crif', 'success', 'debited', 'CRIF Report', NULL, '2026-05-27 14:33:28', '2026-05-27 14:33:28'),
(14736, 15, 50.00, 'wallet_equifax', 'success', 'debited', 'Equifax Report', NULL, '2026-05-27 15:07:27', '2026-05-27 15:07:27'),
(14789, 15, 15.00, 'wallet_panToMobile', 'success', 'debited', 'Pan to Mobile & Email Report', NULL, '2026-05-27 16:31:39', '2026-05-27 16:31:39'),
(14794, 15, 1.50, 'wallet_prefill', 'success', 'debited', 'Prefill Report', NULL, '2026-05-27 16:32:51', '2026-05-27 16:32:51'),
(14799, 579, 15.00, 'wallet_vehicleRcVerification', 'success', 'debited', 'Vehicle RC Verification', NULL, '2026-05-27 16:34:17', '2026-05-27 16:34:17'),
(14846, 406, 60.00, 'wallet_cibil', 'success', 'debited', 'CIBIL Report', NULL, '2026-05-27 17:14:38', '2026-05-27 17:14:38'),
(14849, 15, 25.00, 'wallet_experian', 'success', 'debited', 'Experian Report', NULL, '2026-05-27 17:31:28', '2026-05-27 17:31:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_aggregators`
--
ALTER TABLE `account_aggregators`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_aggregators_user_id_foreign` (`user_id`);

--
-- Indexes for table `assistant_amounts`
--
ALTER TABLE `assistant_amounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bs_customers`
--
ALTER TABLE `bs_customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`);

--
-- Indexes for table `cibil_credit_reports`
--
ALTER TABLE `cibil_credit_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cibil_credit_reports_user_id_index` (`user_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_mobile` (`mobile`),
  ADD KEY `idx_pan` (`pan`),
  ADD KEY `idx_created_user` (`created_at`,`user_id`);

--
-- Indexes for table `crif_credit_reports`
--
ALTER TABLE `crif_credit_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `crif_credit_reports_mobile_index` (`mobile`),
  ADD KEY `crif_credit_reports_pan_index` (`pan`);

--
-- Indexes for table `crif_credit_reports_avs`
--
ALTER TABLE `crif_credit_reports_avs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equifax_credit_reports`
--
ALTER TABLE `equifax_credit_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equifax_credit_reports_mobile_index` (`mobile`),
  ADD KEY `equifax_credit_reports_id_number_index` (`id_number`),
  ADD KEY `equifax_credit_reports_id_type_index` (`id_type`);

--
-- Indexes for table `experian_credit_reports`
--
ALTER TABLE `experian_credit_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `experian_credit_reports_mobile_index` (`mobile`),
  ADD KEY `experian_credit_reports_pan_index` (`pan`);

--
-- Indexes for table `mobile_to_details`
--
ALTER TABLE `mobile_to_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mobile_to_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `pan_to_details`
--
ALTER TABLE `pan_to_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pan_to_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);


--
-- Indexes for table `vehicle_rc_to_details`
--
ALTER TABLE `vehicle_rc_to_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_rc_to_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_aggregators`
--
ALTER TABLE `account_aggregators`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `assistant_amounts`
--
ALTER TABLE `assistant_amounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bs_customers`
--
ALTER TABLE `bs_customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cibil_credit_reports`
--
ALTER TABLE `cibil_credit_reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8321;

--
-- AUTO_INCREMENT for table `crif_credit_reports`
--
ALTER TABLE `crif_credit_reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `crif_credit_reports_avs`
--
ALTER TABLE `crif_credit_reports_avs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;

--
-- AUTO_INCREMENT for table `equifax_credit_reports`
--
ALTER TABLE `equifax_credit_reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT for table `experian_credit_reports`
--
ALTER TABLE `experian_credit_reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2121;

--
-- AUTO_INCREMENT for table `mobile_to_details`
--
ALTER TABLE `mobile_to_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=623;

--
-- AUTO_INCREMENT for table `pan_to_details`
--
ALTER TABLE `pan_to_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;


--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=699;

--
-- AUTO_INCREMENT for table `vehicle_rc_to_details`
--
ALTER TABLE `vehicle_rc_to_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14850;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_aggregators`
--
ALTER TABLE `account_aggregators`
  ADD CONSTRAINT `account_aggregators_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mobile_to_details`
--
ALTER TABLE `mobile_to_details`
  ADD CONSTRAINT `mobile_to_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pan_to_details`
--
ALTER TABLE `pan_to_details`
  ADD CONSTRAINT `pan_to_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicle_rc_to_details`
--
ALTER TABLE `vehicle_rc_to_details`
  ADD CONSTRAINT `vehicle_rc_to_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;