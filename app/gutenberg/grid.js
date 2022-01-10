/**
 * File gutenberg_grid.js.
 *
 */

import { registerBlockType } from '@wordpress/blocks'

import { Fragment } from '@wordpress/element'

import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import {
	SelectControl,
	ToggleControl,
	PanelBody,
	PanelRow,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components'

import { withSelect, useSelect } from '@wordpress/data'

import { __ } from '@wordpress/i18n'

import { useState } from 'react'

export const BlockGridEdit = (props) => {
	const { attributes, setAttributes } = props

	const [editMode, setEditMode] = useState(false)

	const removeMedia = () => {
		setAttributes({
			postIds: [],
		})
	}

	const onSelectPost = (posts) => {
		var postIds = []

		posts.forEach((id) => {
			postIds.push(id)
		})

		setAttributes({
			postIds: postIds,
		})

		// jQuery('select.components-select-control__input').select2()
	}

	const renderGridInEditor = () => {
		if (props.post_list && props.post_list.length > 0) {
			return (
				<div className="row">
					{props.post_list.map(function (post) {
						return (
							<div className="col-3">
								<h3>{post.title.rendered}</h3>
							</div>
						)
					})}
				</div>
			)
		} else {
			return (
				<div>
					<h2>Selecciona las entradas en el panel lateral</h2>
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
							title={__('Configuración de la grilla', 'awp')}
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
								{props.post_list && (
									<SelectControl
										multiple
										label={__('Entradas')}
										value={attributes.postIds}
										onChange={onSelectPost}
										options={[
											{
												value: null,
												label: 'Seleccione una entrada',
												disabled: true,
											},
										].concat(
											props.post_list.map((post) => {
												return {
													value: post.id,
													label: post.title.rendered,
												}
											})
										)}
									/>
								)}
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				}

				{renderGridInEditor()}
			</Fragment>
		</div>
	)
}

export const registerDefaultBlockGrid = () => {
	registerBlockType('arteuy/grid', {
		apiVersion: 2,
		title: __('Arteuy - Grid', 'arteuy-theme'),
		icon: 'dashicons dashicons-grid-view',
		category: 'widgets',
		description: 'Grilla Principal',
		keywords: ['grid', 'arteuy', 'artesanía'],
		attributes: {
			alignment: {
				type: 'string',
				default: 'none',
			},
			active: {
				type: 'boolean',
				default: true,
			},
			postIds: {
				type: 'array',
				default: [],
			},
		},
		edit: withSelect((select, props) => {
			const { getEntityRecords } = select('core')

			return {
				post_list: getEntityRecords('postType', 'post', {
					per_page: 4,
					page: 1,
				}),
			}
		})(BlockGridEdit),
		save: () => {
			return null
		},
	})
}
