<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Arteuy_Theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<div id="page" class="site art-container">
		<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'arteuy-theme'); ?></a>

		<header id="masthead" class="site-navbar site-navbar-target" role="banner">

			<nav class="navbar navbar-expand-lg navbar-light">
				<div class="container-fluid">
					<?php if (has_custom_logo()) :  ?>
						<?php
						// Get Custom Logo URL
						$custom_logo_id = get_theme_mod('custom_logo');
						$custom_logo_data = wp_get_attachment_image_src($custom_logo_id, 'full');
						$custom_logo_url = $custom_logo_data[0];
						?>

						<a class="navbar-brand" href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_attr(get_bloginfo('name')); ?>" rel="home">

							<img src="<?php echo esc_url($custom_logo_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>" />

						</a>
					<?php else : ?>
						<div class="site-name"><?php bloginfo('name'); ?></div>
					<?php endif; ?>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="main-navbar">
						
						<?php wp_nav_menu(['menu' => esc_html__('Principal', 'arteuy-theme'), 'container_class' => 'section-menu', 'menu_id' => 'menu-1', 'menu_class' => 'navbar-nav']); ?>
						<?php wp_nav_menu(['menu' => esc_html__('Menú 2', 'arteuy-theme'), 'container_class' => 'section-menu', 'menu_id' => 'menu-2', 'menu_class' => 'navbar-nav']); ?>
						<?php wp_nav_menu(['menu' => esc_html__('Menú 3', 'arteuy-theme'), 'container_class' => 'section-menu', 'menu_id' => 'menu-3', 'menu_class' => 'navbar-nav']); ?>
						<?php wp_nav_menu(['menu' => esc_html__('Redes sociales', 'arteuy-theme'), 'container_class' => 'section-menu-socialnetworks', 'menu_id' => 'menu-socialnetworks', 'menu_class' => 'navbar-nav']); ?>
						<img class="logo-misterio" src="http://artesania.uy/wp-content/uploads/2021/12/logotipo-ministerio.png" alt="Logo del Ministerio">
					</div>
				</div>
			</nav>

		</header><!-- #masthead -->