/**
 * File gutenberg_slider.js.
 *
 */

import { registerBlockType } from '@wordpress/blocks'

import { Fragment } from '@wordpress/element'

import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor'

import {
	ToggleControl,
	PanelBody,
	PanelRow,
	Toolbar,
	IconButton,
	Placeholder,
	Disabled,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components'

import { withSelect } from '@wordpress/data'

import { __ } from '@wordpress/i18n'

import { useState } from 'react'

export const BlockSlideEdit = (props) => {
	const { attributes, setAttributes } = props

	const removeMedia = () => {
		props.setAttributes({
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

		props.setAttributes({
			mediaIds: mediaIds,
			mediaUrls: mediaUrls,
		})
	}

	const blocksStyle =
		attributes.mediaUrls.length > 0
			? attributes.mediaUrls.map((url) => {
					return {
						backgroundImage: `url(${url})`,
					}
			  })
			: []

	const onChangeAlignment = (newAlignment) => {
		setAttributes({
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		})
	}

	return (
		<div {...useBlockProps()}>
			<Fragment>
				{
					<BlockControls>
						<AlignmentToolbar
							value={attributes.alignment}
							onChange={onChangeAlignment}
						/>
					</BlockControls>
				}
				{
					<InspectorControls>
						<PanelBody
							title={__('Select block background image', 'awp')}
							initialOpen={true}
						>
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
													{
														(console.log(
															'props.media',
															props.media
														),
														props.media.length >
															0 &&
															props.media.map(
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
															))
													}
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
				{blocksStyle.map((style) => (
					<div style={style}></div>
				))}
			</Fragment>
		</div>
	)
}

export const BlockSlideSave = (props) => {
	const { attributes } = props

	const blocksStyle =
		attributes.mediaUrls.length > 0
			? attributes.mediaUrls.map((url) => {
					return {
						backgroundImage: `url(${url})`,
					}
			  })
			: []

	return blocksStyle.map((style) => <div style={style}></div>)
}

export const registerDefaultBlockSlide = () => {
	registerBlockType('arteuy/slider', {
		apiVersion: 2,
		title: __('Arteuy - Slider', 'arteuy-theme'),
		icon: 'dashicons dashicons-slides',
		category: 'media',
		supports: {
			align: true,
		},
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
		example: {
			attributes: {
				content: 'Hello World',
				alignment: 'right',
			},
		},
		edit: withSelect((select, props) => {
			return {
				media: props.attributes.mediaIds
					? select('core').getMediaItems({
							include: props.attributes.mediaIds,
					  })
					: undefined,
			}
		})(BlockSlideEdit),
		save: BlockSlideSave,
	})
}
