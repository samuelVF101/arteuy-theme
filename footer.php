<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Arteuy_Theme
 */

?>

<footer id="colophon" class="site-footer">
	<div class="footer-section-menu">
		<div class="row">
			<div class="col-12 col-md-3">
				<?php wp_nav_menu(['menu' => esc_html__('Principal', 'arteuy-theme'), 'container_class' => 'section-menu', 'menu_id' => 'menu-1', 'menu_class' => 'navbar-nav']); ?>
			</div>
			<div class="col-12 col-md-3">
				<?php wp_nav_menu(['menu' => esc_html__('Menú 2', 'arteuy-theme'), 'container_class' => 'section-menu', 'menu_id' => 'menu-2', 'menu_class' => 'navbar-nav']); ?>
			</div>
			<div class="col-12 col-md-3">
				<?php wp_nav_menu(['menu' => esc_html__('Menú 3', 'arteuy-theme'), 'container_class' => 'section-menu', 'menu_id' => 'menu-3', 'menu_class' => 'navbar-nav']); ?>
			</div>
			<div class="col-12 col-md-3">
				<?php wp_nav_menu(['menu' => esc_html__('Redes sociales', 'arteuy-theme'), 'container_class' => 'section-menu-socialnetworks', 'menu_id' => 'menu-socialnetworks', 'menu_class' => 'navbar-nav']); ?>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-md-4">
				<p>Dirección Nacional de Artesanías, Pequeñas y</p>
				<p>Medianas Empresas - Dinapyme</p>
				<p>Ministerio de Industria, Energía y Minería</p>
			</div>
			<div class="col-12 col-md-4">
				<p>Calle Rincón 719 piso 2 - C.P. 11000</p>
				<p>Montevideo, República Oriental del Uruguay</p>
				<p>(+598) 2840.1234 int.3188</p>
			</div>
			<div class="col-12 col-md-4"></div>
		</div>
		<div class="d-flex justify-content-between">
			<img class="logo-misterio" src="http://artesania.uy/wp-content/uploads/2021/12/logotipo-ministerio.png" alt="Logo del Ministerio">
		</div>

	</div>
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>