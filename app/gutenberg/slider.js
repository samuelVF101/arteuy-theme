/**
 * File gutenberg_slider.js.
 *
 */

import { registerBlockType } from '@wordpress/blocks'

import { Fragment } from '@wordpress/element'

import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor'

import {
	ToggleControl,
	PanelBody,
	PanelRow,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components'

import { withSelect } from '@wordpress/data'

import { __ } from '@wordpress/i18n'

import { useState } from 'react'

// Swiper. core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay])

export const BlockSlideEdit = (props) => {
	const { attributes, setAttributes } = props

	const [editMode, setEditMode] = useState(false)

	const removeMedia = () => {
		setAttributes({
			mediaIds: [],
			mediaUrls: [],
		})
	}

	const onSelectMedia = (media) => {
		var mediaIds = []
		var mediaUrls = []
		media.forEach((media) => {
			mediaIds.push(media.id)
			mediaUrls.push(media.url)
		})

		setAttributes({
			mediaIds: mediaIds,
			mediaUrls: mediaUrls,
		})
	}

	const renderSliderInEditor = () => {
		const slideAdmin = new Swiper('.slide-admin', {
			speed: 1000,
			autoplay: false,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		})

		if (attributes.mediaUrls.length > 0) {
			return (
				<div className="swiper slide-admin">
					<div className="swiper-wrapper">
						{attributes.mediaUrls.map(function (img_url) {
							return (
								<div className="swiper-slide">
									<div
										className="img"
										style={{
											backgroundImage: `url(${img_url})`,
										}}
									/>
								</div>
							)
						})}
					</div>
					<div className="swiper-button-prev" />
					<div className="swiper-button-next" />
					<div className="swiper-pagination" />
				</div>
			)
		} else {
			return (
				<div>
					<h2>Selecciona las imágenes en el panel lateral</h2>
				</div>
			)
		}
	}

	return (
		<div {...useBlockProps()}>
			<Fragment>
				{
					<InspectorControls>
						<PanelBody
							title={__('Configuración del slider', 'awp')}
							initialOpen={true}
						>
							<PanelRow>
								<ToggleControl
									label="Activo"
									checked={attributes.active}
									onChange={(active_val) =>
										setAttributes({ active: active_val })
									}
								/>
							</PanelRow>
							<PanelRow>
								<div className="editor-post-featured-image">
									<MediaUploadCheck>
										<MediaUpload
											onSelect={onSelectMedia}
											value={attributes.mediaIds}
											allowedTypes={['image']}
											multiple={true}
											render={({ open }) => (
												<Button
													className={
														attributes.mediaIds
															.length == 0
															? 'editor-post-featured-image__toggle'
															: 'editor-post-featured-image__preview'
													}
													onClick={open}
												>
													{attributes.mediaIds
														.length == 0 &&
														__(
															'Choose an image',
															'awp'
														)}
													{props.media_list &&
														props.media_list
															.length > 0 &&
														props.media_list.map(
															(media) => (
																<ResponsiveWrapper
																	naturalWidth={
																		media
																			.media_details
																			.width
																	}
																	naturalHeight={
																		media
																			.media_details
																			.height
																	}
																>
																	<img
																		src={
																			media.source_url
																		}
																	/>
																</ResponsiveWrapper>
															)
														)}
												</Button>
											)}
										/>
									</MediaUploadCheck>
									{attributes.mediaIds.length > 0 && (
										<MediaUploadCheck>
											<MediaUpload
												title={__(
													'Replace image',
													'awp'
												)}
												value={attributes.mediaIds}
												onSelect={onSelectMedia}
												allowedTypes={['image']}
												multiple={true}
												render={({ open }) => (
													<Button
														onClick={open}
														isDefault
														isLarge
													>
														{__(
															'Replace image',
															'awp'
														)}
													</Button>
												)}
											/>
										</MediaUploadCheck>
									)}
									{attributes.mediaIds.length > 0 && (
										<MediaUploadCheck>
											<Button
												onClick={removeMedia}
												isLink
												isDestructive
											>
												{__('Remove image', 'awp')}
											</Button>
										</MediaUploadCheck>
									)}
								</div>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				}

				{renderSliderInEditor()}
			</Fragment>
		</div>
	)
}

export const BlockSlideSave = (props) => {
	const { attributes } = props

	if (attributes.active) {
		if (attributes.mediaUrls.length > 0) {
			return (
				<div className="swiper block-slider">
					<div className="swiper-wrapper">
						{attributes.mediaUrls.map(function (img_url) {
							return (
								<div className="swiper-slide">
									<div
										className="img"
										style={{
											backgroundImage: `url(${img_url})`,
										}}
									/>
								</div>
							)
						})}
					</div>
					<div className="swiper-button-prev" />
					<div className="swiper-button-next" />
				</div>
			)
		} else {
			return (
				<div>
					<h2>Selecciona las imágenes</h2>
				</div>
			)
		}
	}
}

export const registerDefaultBlockSlide = () => {
	registerBlockType('arteuy/slider', {
		apiVersion: 2,
		title: __('Arteuy - Slider', 'arteuy-theme'),
		icon: 'dashicons dashicons-slides',
		category: 'media',
		description: 'Slider Principal',
		keywords: ['slider', 'arteuy', 'artesanía'],
		attributes: {
			alignment: {
				type: 'string',
				default: 'none',
			},
			active: {
				type: 'boolean',
				default: true,
			},
			mediaIds: {
				type: 'array',
				default: [],
			},
			mediaUrls: {
				type: 'array',
				default: [],
			},
		},
		edit: withSelect((select, props) => {
			return {
				media_list: props.attributes.mediaIds
					? select('core').getMediaItems({
							include: props.attributes.mediaIds,
					  })
					: [],
			}
		})(BlockSlideEdit),
		save: BlockSlideSave,
	})
}
