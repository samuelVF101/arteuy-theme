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
			mediaId: 0,
			mediaUrl: '',
		})
	}

	const onSelectMedia = (media) => {
		props.setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
		})
	}

	const blockStyle = {
		backgroundImage:
			attributes.mediaUrl != ''
				? 'url("' + attributes.mediaUrl + '")'
				: 'none',
	}

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
											value={attributes.mediaId}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button
													className={
														attributes.mediaId == 0
															? 'editor-post-featured-image__toggle'
															: 'editor-post-featured-image__preview'
													}
													onClick={open}
												>
													{attributes.mediaId == 0 &&
														__(
															'Choose an image',
															'awp'
														)}
													{props.media !=
														undefined && (
														<ResponsiveWrapper
															naturalWidth={
																props.media
																	.media_details
																	.width
															}
															naturalHeight={
																props.media
																	.media_details
																	.height
															}
														>
															<img
																src={
																	props.media
																		.source_url
																}
															/>
														</ResponsiveWrapper>
													)}
												</Button>
											)}
										/>
									</MediaUploadCheck>
									{attributes.mediaId != 0 && (
										<MediaUploadCheck>
											<MediaUpload
												title={__(
													'Replace image',
													'awp'
												)}
												value={attributes.mediaId}
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
									{attributes.mediaId != 0 && (
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
				<div style={blockStyle}>... Your block content here...</div>
			</Fragment>
		</div>
	)
}

export const BlockSlideSave = (props) => {
	const { attributes } = props
	const blockStyle = {
		backgroundImage:
			attributes.mediaUrl != ''
				? 'url("' + attributes.mediaUrl + '")'
				: 'none',
	}
	return <div style={blockStyle}>... Your block content here...</div>
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
			mediaId: {
				type: 'number',
				default: 0,
			},
			mediaUrl: {
				type: 'string',
				default: '',
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
				media: props.attributes.mediaId
					? select('core').getMedia(props.attributes.mediaId)
					: undefined,
			}
		})(BlockSlideEdit),
		save: BlockSlideSave,
	})
}
