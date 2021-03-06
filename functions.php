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
	$asset_file = include(get_template_directory() . asset('g-block-arteuy.php'));

	wp_register_script(
		'g_block_arteuy',
		get_template_directory_uri() . asset('g-block-arteuy.js'),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'g_block_arteuy_editor',
		get_stylesheet_directory_uri() . asset('g-block-arteuy-editor.css'),
		['wp-edit-blocks'],
		_S_VERSION
	);

	wp_register_style(
		'g_block_arteuy_style',
		get_stylesheet_directory_uri() . asset('g-block-arteuy.css'),
		[],
		_S_VERSION
	);

	register_block_type('arteuy/slider', [
		'api_version' => 2,
		'style' => 'g_block_arteuy_style',
		'editor_style' => 'g_block_arteuy_editor',
		'editor_script' => 'g_block_arteuy',
		'attributes' => [
			'alignment' => [
				'type' => 'string',
				'default' => 'none'
			],
			'active' => [
				'type' => 'boolean',
				'default' => true
			],
			'mediaIds' => [
				'type' => 'array',
				'default' => []
			],
			'mediaUrls' => [
				'type' => 'array',
				'default' => []
			],
		]
	]);

	register_block_type('arteuy/grid', [
		'api_version' => 2,
		'style' => 'g_block_arteuy_style',
		'editor_style' => 'g_block_arteuy_editor',
		'editor_script' => 'g_block_arteuy',
		'render_callback' => function ($attr, $content) {

			$layout_config = [
				1 => [
					"per_page" => 4,
					"column_sizes" => [3, 3, 3, 3],
				],
				2 => [
					"per_page" => 3,
					"column_sizes" => [6, 3, 3],
				],
				3 => [
					"per_page" => 3,
					"column_sizes" => [3, 3, 6],
				],
			];

			if ($attr['active'] and !empty($attr['categoryIds'])) {
				$str = '<section class="grid-section section-mx section-mt">
				<div class="d-flex justify-content-between">
					<h2>' . $attr['title'] . '</h2> 
					<a href="#">' . $attr['title_view_all'] . '</a>
				</div>
				<div class="d-flex justify-content-between">
					<h3>' . $attr['subtitle'] . '</h3>
				</div>
				<div class="row">{%posts_str%}</div>
			</section>';
				$query = new WP_Query([
					'orderby' => 'rand',
					'post_type' => 'post',
					'posts_per_page' => $layout_config[$attr['layout']]['per_page'],
					'page' => 1,
					'cat' => implode(',', $attr['categoryIds'])
				]);

				$posts_str = '';

				if ($query->have_posts()) {

					$index = 0;
					while ($query->have_posts()) {

						$query->the_post();

						$featured_image_url = wp_get_attachment_url(get_post_thumbnail_id(get_the_ID()), 'thumbnail');

						$posts_str .= '<div class="col-12 col-md-' . $layout_config[$attr['layout']]['column_sizes'][$index] . '">' .
							'<div class="grid-item">' .
							'<img src="' . $featured_image_url . '" />' .
							'<h4>' . get_the_title() . '</h4>' .
							'<h5>Directorio</h5>' .
							'</div>' .
							'</div>';
						$index++;
					}
				}

				return str_replace('{%posts_str%}', $posts_str, $str);
			} else {

				return '';
			}
		},
		'attributes' => [
			'alignment' => [
				'type' => 'string',
				'default' => 'none'
			],
			'active' => [
				'type' => 'boolean',
				'default' => true
			],
			'categoryIds' => [
				'type' => 'array',
				'default' => []
			],
			'title' => [
				'type' => 'string',
				'default' => ''
			],
			'subtitle' => [
				'type' => 'string',
				'default' => ''
			],
			'title_view_all' => [
				'type' => 'string',
				'default' => ''
			],
			'layout' => [
				'type' => 'string',
				'default' => '1'
			],
		]
	]);
}

add_action('init', 'gutenberg_register_blocks');


//Eliminar todos las etiquetas p vac??as
add_filter('the_content', function ($content) {

	// Check if we're inside the main loop in a single Post.
	if (is_singular() && in_the_loop() && is_main_query()) {
		return preg_replace('/<p><\/p>/', '', $content);
	}

	return $content;
}, 1);



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
