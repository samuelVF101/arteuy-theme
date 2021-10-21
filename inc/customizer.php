<?php

/**
 * Taro Theme Theme Customizer
 *
 * @package Taro_Theme
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function taro_theme_customize_register($wp_customize)
{
	$wp_customize->get_setting('blogname')->transport         = 'postMessage';
	$wp_customize->get_setting('blogdescription')->transport  = 'postMessage';
	$wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

	if (isset($wp_customize->selective_refresh)) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'taro_theme_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'taro_theme_customize_partial_blogdescription',
			)
		);
	}
}
add_action('customize_register', 'taro_theme_customize_register');

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function taro_theme_customize_partial_blogname()
{
	bloginfo('name');
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function taro_theme_customize_partial_blogdescription()
{
	bloginfo('description');
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function taro_theme_customize_preview_js()
{
	// Check to see if the file exists.
	$deps_file = plugin_dir_path(__FILE__) . '/js/build/customizer.asset.php';

	// Set default fallback to dependencies array
	$deps = [];

	// If the file can be found, use it to set the dependencies array.
	if (file_exists($deps_file)) {
		$deps_file = require($deps_file);
		$deps      = $deps_file['dependencies'];
	}
	$deps = $deps + ['customize-preview'];
	// var_dump($deps);
	wp_enqueue_script('taro-theme-customizer', get_template_directory_uri() . '/js/build/customizer.js', $deps, _S_VERSION, true);
}
add_action('customize_preview_init', 'taro_theme_customize_preview_js');
