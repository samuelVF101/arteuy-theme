/**
 * File gutenberg_block-template.js.
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
} from '@wordpress/block-editor'

import {
	ToggleControl,
	PanelBody,
	PanelRow,
	CheckboxControl,
	SelectControl,
	ColorPicker,
	Toolbar,
	IconButton,
	Placeholder,
	Disabled,
} from '@wordpress/components'

import { __ } from '@wordpress/i18n'

import { useState } from 'react'

export const BlockTemplateEdit = (props) => {
	const { attributes, setAttributes } = props

	const [editMode, setEditMode] = useState(false)

	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent })
	}

	const onChangeAlignment = (newAlignment) => {
		setAttributes({
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		})
	}

	return (
		<div {...useBlockProps()}>
			{
				<BlockControls>
					<AlignmentToolbar
						value={attributes.alignment}
						onChange={onChangeAlignment}
					/>
					<Toolbar>
						<IconButton
							label={editMode ? 'Preview' : 'Edit'}
							icon={editMode ? 'format-image' : 'edit'}
							onClick={() => setEditMode(!editMode)}
						/>
					</Toolbar>
				</BlockControls>
			}
			{
				<InspectorControls>
					<PanelBody
						title="Activar Block Template"
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
							<PanelRow>
								<ToggleControl
									label="Toggle me"
									checked={attributes.toggle}
									onChange={(newval) =>
										setAttributes({ toggle: newval })
									}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label="What's your favorite animal?"
									value={attributes.favoriteAnimal}
									options={[
										{ label: 'Dogs', value: 'dogs' },
										{ label: 'Cats', value: 'cats' },
										{
											label: 'Something else',
											value: 'weird_one',
										},
									]}
									onChange={(newval) =>
										setAttributes({
											favoriteAnimal: newval,
										})
									}
								/>
							</PanelRow>
							<PanelRow>
								<ColorPicker
									color={attributes.favoriteColor}
									onChangeComplete={(newval) =>
										setAttributes({
											favoriteColor: newval.hex,
										})
									}
									disableAlpha
								/>
							</PanelRow>
							<PanelRow>
								<CheckboxControl
									label="Activate lasers?"
									checked={attributes.activateLasers}
									onChange={(newval) =>
										setAttributes({
											activateLasers: newval,
										})
									}
								/>
							</PanelRow>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			}

			{editMode && (
				<Fragment>
					<RichText
						className={attributes.className}
						style={{ textAlign: attributes.alignment }}
						tagName="p"
						onChange={onChangeContent}
						value={attributes.content}
					/>
				</Fragment>
			)}
			{!editMode && (
				<Placeholder isColumnLayout={true}>
					<Disabled>
						<RichText.Content
							className={`text-${attributes.alignment}`}
							tagName="p"
							value={attributes.content}
						/>
					</Disabled>
				</Placeholder>
			)}
		</div>
	)
}

export const BlockTemplateSave = (props) => {
	const blockProps = useBlockProps.save()

	return props.attributes.active ? (
		<div {...blockProps}>
			<RichText.Content
				className={`text-${props.attributes.alignment}`}
				tagName="p"
				value={props.attributes.content}
			/>
		</div>
	) : (
		''
	)
}

export const registerDefaultBlockTemplate = () => {
	registerBlockType('arteuy/block-template', {
		apiVersion: 2,
		title: __('Arteuy - Block Template', 'arteuy-theme'),
		icon: 'dashicons dashicons-admin-site-alt3',
		category: 'media',
		description: 'Block Template',
		keywords: ['block', 'template', 'arteuy', 'artesanía'],
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			alignment: {
				type: 'string',
				default: 'none',
			},
			active: {
				type: 'boolean',
				default: true,
			},
			toggle: {
				type: 'boolean',
				default: true,
			},
			favoriteAnimal: {
				type: 'string',
				default: 'dogs',
			},
			favoriteColor: {
				type: 'string',
				default: '#DDDDDD',
			},
			activateLasers: {
				type: 'boolean',
				default: false,
			},
		},
		example: {
			attributes: {
				content: 'Hello World',
				alignment: 'right',
			},
		},
		edit: BlockTemplateEdit,
		save: BlockTemplateSave,
	})
}
