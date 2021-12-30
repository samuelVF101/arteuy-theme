<?php

/**
 * Arteuy Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Arteuy_Theme
 */

if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

if (!function_exists('arteuy_theme_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function arteuy_theme_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Arteuy Theme, use a find and replace
		 * to change 'arteuy-theme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('arteuy-theme', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			[
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			]
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'arteuy_theme_custom_background_args',
				[
					'default-color' => 'ffffff',
					'default-image' => '',
				]
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			[
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			]
		);
	}
endif;
add_action('after_setup_theme', 'arteuy_theme_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function arteuy_theme_content_width()
{
	$GLOBALS['content_width'] = apply_filters('arteuy_theme_content_width', 640);
}
add_action('after_setup_theme', 'arteuy_theme_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function arteuy_theme_widgets_init()
{
	register_sidebar(
		[
			'name'          => esc_html__('Sidebar', 'arteuy-theme'),
			'id'            => 'sidebar-1',
			'description'   => esc_html__('Add widgets here.', 'arteuy-theme'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		]
	);
}
add_action('widgets_init', 'arteuy_theme_widgets_init');


function asset($asset_name)
{
	$path = "/build/";
	$manifest = file_get_contents(get_stylesheet_directory_uri() . $path . "manifest.json");
	$manifest = json_decode($manifest, true); //decode json string to php associative array

	if (!isset($manifest[$asset_name])) return $asset_name; //if manifest.json doesn't contain $asset_name then return $asset_name itself

	$file = $manifest[$asset_name];

	return $path . $file;
}

/**
 * Registers a stylesheet.
 */
function arteuy_theme_styles()
{
	wp_register_style('index', get_stylesheet_directory_uri() . asset('index.css'));
	wp_enqueue_style('index');
}
// Register style sheet.
add_action('wp_enqueue_scripts', 'arteuy_theme_styles');


/**
 * Enqueue scripts and styles.
 */
function arteuy_theme_scripts()
{
	wp_enqueue_style('arteuy-theme-style', get_stylesheet_uri(), [], _S_VERSION);
	wp_style_add_data('arteuy-theme-style', 'rtl', 'replace');


	wp_enqueue_script('arteuy-theme-index', get_template_directory_uri() . asset('index.js'), ['jquery'], _S_VERSION, true);
	wp_enqueue_script('arteuy-theme-navigation', get_template_directory_uri() . asset('navigation.js'), ['jquery'], _S_VERSION, true);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'arteuy_theme_scripts');



function gutenberg_register_blocks()
{

	if (!function_exists('register_block_type')) {
		// Gutenberg is not active.
		return;
	}

	// automatically load dependencies and version
	$asset_file = include(get_template_directory() . asset('gutenberg_blocks.php'));

	wp_register_script(
		'gutenberg_blocks',
		get_template_directory_uri() . asset('gutenberg_blocks.js'),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'gutenberg_blocks_editor',
		get_stylesheet_directory_uri() . asset('gutenberg_blocks_editor.css'),
		['wp-edit-blocks'],
		_S_VERSION
	);

	wp_register_style(
		'gutenberg_blocks_style',
		get_stylesheet_directory_uri() . asset('gutenberg_blocks_style.css'),
		[],
		_S_VERSION
	);

	register_block_type('gutenberg-blocks/home-slider', array(
		'api_version' => 2,
		'style' => 'gutenberg_blocks_style',
        'editor_style' => 'gutenberg_blocks_editor',
		'editor_script' => 'gutenberg_blocks',
	));
}
add_action('init', 'gutenberg_register_blocks');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Load WooCommerce compatibility file.
 */
if (class_exists('WooCommerce')) {
	require get_template_directory() . '/inc/woocommerce.php';
}
