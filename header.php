<!doctype html>
<html lang="en">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <title><?php bloginfo('title'); ?><?php wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="<?php bloginfo('title'); ?><?php wp_title(); ?>">
    <meta property="og:description" content="<?php bloginfo('description'); ?>">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/img/logo.png">
    <meta property="og:site_name" content="<?php bloginfo('name'); ?>"/>
    <meta property="og:url" content="<?php bloginfo('url'); ?><?php echo $_SERVER["REQUEST_URI"] ?>"/>
    <meta name="twitter:title" content="<?php bloginfo('title'); ?><?php wp_title(); ?>"/>
    <meta name="twitter:description" content="<?php bloginfo('description'); ?>"/>
    <meta name="twitter:image" content="<?php echo get_template_directory_uri(); ?>/assets/img/logo.png"/>
    <meta name="twitter:card" content="summary_large_image"/>

    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon/apple-icon-57x57.png">

</head>
<?php wp_head(); ?>
<body <?php body_class($class); ?>>

