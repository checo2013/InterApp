-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 08-06-2015 a las 08:21:53
-- Versión del servidor: 5.5.34
-- Versión de PHP: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `dashboard`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apps`
--

CREATE TABLE `apps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `apps_name_unique` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `apps`
--

INSERT INTO `apps` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'interApp', 'App destinada para el manejo de polizas de seguro', 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `app_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`),
  KEY `categories_app_id_foreign` (`app_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `status`, `app_id`, `created_at`, `updated_at`) VALUES
(1, 'menu', 1, 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(2, 'contenido', 1, 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(3, 'consulta', 1, 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(4, 'resultados', 1, 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(5, 'seccion', 1, 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menus`
--

CREATE TABLE `menus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `template_to` int(10) unsigned NOT NULL,
  `template_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `menus_template_id_foreign` (`template_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Volcado de datos para la tabla `menus`
--

INSERT INTO `menus` (`id`, `name`, `image`, `status`, `template_to`, `template_id`, `created_at`, `updated_at`) VALUES
(1, 'Gastos Médicos Mayores', 'http://iterapp.daseda.net/resource/menus/interapp/1/1.jpg', 1, 2, 1, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(2, 'Red Médica', 'http://iterapp.daseda.net/resource/menus/interapp/1/2.jpg', 1, 2, 1, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(3, 'Inter Informa', 'http://iterapp.daseda.net/resource/menus/interapp/1/3.png', 1, 2, 1, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(4, 'Beneficios Adicionales INTER', 'http://iterapp.daseda.net/resource/menus/interapp/1/4.jpg', 1, 2, 1, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(5, 'Digital', 'http://iterapp.daseda.net/resource/menus/interapp/1/5.png', 1, 2, 1, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(6, 'Mis Seguros', 'http://iterapp.daseda.net/resource/menus/interapp/2/1.png', 1, 3, 2, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(7, 'Red Médica', 'http://iterapp.daseda.net/resource/menus/interapp/2/2.jpg', 1, 3, 2, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(8, 'Inter Informa', 'http://iterapp.daseda.net/resource/menus/interapp/2/3.jpg', 1, 3, 2, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(9, 'Beneficios Adicionales INTER', 'http://iterapp.daseda.net/resource/menus/interapp/2/4.jpg', 1, 3, 2, '2015-06-08 11:18:41', '2015-06-08 11:18:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2015_06_06_190755_create_user_table', 1),
('2015_06_06_191127_create_apps_table', 1),
('2015_06_06_191219_create_categorias_table', 1),
('2015_06_06_191314_create_template_table', 1),
('2015_06_06_191348_create_menus_table', 1),
('2015_06_06_191412_create_seccions_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccions`
--

CREATE TABLE `seccions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `template_to` int(10) unsigned NOT NULL,
  `template_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `seccions_template_id_foreign` (`template_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `seccions`
--

INSERT INTO `seccions` (`id`, `name`, `image`, `status`, `template_to`, `template_id`, `created_at`, `updated_at`) VALUES
(1, 'Emergencias', '', 1, 4, 3, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(2, 'Mi Poliza', '', 1, 5, 3, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(3, 'Consulta Médica,Telefonica/Domicilio', '', 1, 6, 3, '2015-06-08 11:18:41', '2015-06-08 11:18:41'),
(4, 'Preguntas Frecuentes', '', 1, 7, 3, '2015-06-08 11:18:41', '2015-06-08 11:18:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `templates`
--

CREATE TABLE `templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `app_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `templates_app_id_foreign` (`app_id`),
  KEY `templates_category_id_foreign` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `templates`
--

INSERT INTO `templates` (`id`, `name`, `content`, `description`, `image`, `principal`, `status`, `app_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'InterApp', '', 'Primer pantalla del sistema', '', 1, 1, 1, 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(2, 'Mis Seguros', '', 'Menu de mis seguros', '', 0, 1, 1, 1, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(3, 'Gastos médicos mayores', '', 'seccion gastos medicos mayores', 'http://iterapp.daseda.net/resource/template/interapp/2/1.png', 0, 1, 1, 5, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(4, 'Emergencia', '<h3 style="text-align: center;">Numero para emergencias</h3><h3 style="text-align: center;"><a href="01 800 911 9999" target="">01 800 911 9999</a><br/></h3>', 'Seccion de emergencia', 'http://iterapp.daseda.net/resource/secciones/interapp/4/1.png', 0, 1, 1, 2, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(5, 'Mi Poliza', '<h3 style="text-align: center;"><title>ANEXO A</title><div class="page" title="Page 13"><div class="section" style="background-color: rgb(100.000000%, 100.000000%, 100.000000%);"><div class="layoutArea"><div class="column"><p><span style="color: rgb(59.607850%, 59.607850%, 60.000000%);">Nombre de asegurado</span></p><p><title>ANEXO A</title></p><div class="page" title="Page 13"><div class="section" style="background-color: rgb(100.000000%, 100.000000%, 100.000000%);"><div class="layoutArea"><div class="column"><p><span style="color: rgb(48.627450%, 48.627450%, 49.019610%);"> </span><span style="color: rgb(59.607850%, 59.607850%, 60.000000%);">Número de póliza</span></p><p><title>ANEXO A</title></p><div class="page" title="Page 13"><div class="section" style="background-color: rgb(100.000000%, 100.000000%, 100.000000%);"><div class="layoutArea"><div class="column"><p><span style="color: rgb(59.607850%, 59.607850%, 60.000000%);">Vigencia</span></p><p><title>ANEXO A</title></p><div class="page" title="Page 13"><div class="section" style="background-color: rgb(100.000000%, 100.000000%, 100.000000%);"><div class="layoutArea"><div class="column"><p><span style="color: rgb(59.607850%, 59.607850%, 60.000000%);">Aseguradora</span></p><p><span style="color: rgb(59.607850%, 59.607850%, 60.000000%);"><a href="01 800 911 9999" target="">01 800 911 9999</a><br/></span></p></div></div></div></div><p></p></div></div></div></div><p></p></div></div></div></div><p></p></div></div></div></div></h3><h3 style="text-align: center;"><br/></h3>', 'Seccion de mi poliza', 'http://iterapp.daseda.net/resource/secciones/interapp/4/1.png', 0, 1, 1, 2, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(6, 'Consulta Médica telefónica/domicilio', '<h3 style="text-align: center;">Numero para solicitar informes</h3><h3 style="text-align: center;"><a href="01 800 911 9999" target="">01 800 911 9999</a><br/></h3>', 'Seccion de consulta medica', 'http://iterapp.daseda.net/resource/secciones/interapp/4/1.png', 0, 1, 1, 2, '2015-06-08 11:18:40', '2015-06-08 11:18:40'),
(7, 'Preguntas frecuentes y formatos', '<p><title>ANEXO A</title></p><div class="page" title="Page 15"><div class="section" style="background-color: rgb(100.000000%, 100.000000%, 100.000000%);"><div class="layoutArea"><div class="column"><h3><span style="color: rgb(26.051740%, 26.052440%, 26.052060%);">¿Necesita los formatos de la aseguradora?</span></h3><div><ul><li><font color="#424242">Informe Médico<br/></font></li><li><font color="#424242">Programación de Servicios Médicos<br/></font></li><li><font color="#424242">Reembolso<br/></font></li><li><font color="#424242">Pago Directo<br/></font></li></ul><h3><font color="#424242">¿Qué hacer para reclamar un reembolso?<br/></font></h3></div><p><font color="#424242">Para reclamar un reembolso es necesario contar con la siguiente documentación:<br/></font></p><p></p><ul><li><font color="#424242">Solicitud de reembolso, el cual llena el asegurado.<br/></font></li><li><font color="#424242">Formato de informe médico de la aseguradora, el cual llena el médico tratante con un diagnostico definitivo.<br/></font></li><li><font color="#424242">Copia de credencial de elector.<br/></font></li><li><font color="#424242">Copia de comprobante de domicilio.<br/></font></li></ul><p></p><div><font color="#424242"><br/></font></div></div></div></div></div>', 'Seccion de preguntas frecuentes de gastos medicos', 'http://iterapp.daseda.net/resource/secciones/interapp/4/1.png', 0, 1, 1, 2, '2015-06-08 11:18:40', '2015-06-08 11:18:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ip` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `ip`, `email`, `username`, `password`, `company`, `phone`, `avatar`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', 'Sistemas', '192.168.255.255', 'admin@tapp.mx', 'admin', '$2y$10$lsipGeCaYm1AhnCiiSsd2.dD/Dz.XpOOvS.6O/B/z5k10t9lWzbW6', '', '', '', 1, '2d587f7fb92e4e4ad44756de695c6eaaa96bad536dfbfdf340799e4432953b99', '2015-06-08 11:18:40', '2015-06-08 11:18:40');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_app_id_foreign` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`);

--
-- Filtros para la tabla `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`);

--
-- Filtros para la tabla `seccions`
--
ALTER TABLE `seccions`
  ADD CONSTRAINT `seccions_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`);

--
-- Filtros para la tabla `templates`
--
ALTER TABLE `templates`
  ADD CONSTRAINT `templates_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `templates_app_id_foreign` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`);
