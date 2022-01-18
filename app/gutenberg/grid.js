/**
 * File gutenberg_grid.js.
 *
 */

import { registerBlockType } from '@wordpress/blocks'
import { Fragment } from '@wordpress/element'
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor'

import {
	SelectControl,
	ToggleControl,
	PanelBody,
	PanelRow,
	RadioControl,
	ResponsiveWrapper,
} from '@wordpress/components'

import { withSelect, useSelect } from '@wordpress/data'

import { __ } from '@wordpress/i18n'

import { useState } from 'react'

import cardLogoImg from '../images/card-logo.png'

export const BlockGridEdit = (props) => {
	const { attributes, setAttributes } = props

	const [editMode, setEditMode] = useState(false)

	const layout_config = {
		1: {
			per_page: 4,
			column_sizes: [3, 3, 3, 3],
		},
		2: {
			per_page: 3,
			column_sizes: [6, 3, 3],
		},
		3: {
			per_page: 3,
			column_sizes: [3, 3, 6],
		},
	}

	const posts = useSelect((select) => {
		const { getEntityRecords } = select('core')

		return getEntityRecords('postType', 'post', {
			per_page: layout_config[attributes.layout].per_page,
			page: 1,
			categories: attributes.categoryIds,
		})
	}, [])

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
										setAttributes({
											active: active_val,
										})
									}
								/>
							</PanelRow>

							<PanelRow>
								{props.category_list && (
									<SelectControl
										multiple
										label={__('Categorías')}
										value={attributes.categoryIds}
										onChange={(posts) => {
											var categoryIds = []

											posts.forEach((id) => {
												categoryIds.push(id)
											})

											setAttributes({
												categoryIds: categoryIds,
											})

											// jQuery('select.components-select-control__input').select2()
										}}
										options={[
											{
												value: null,
												label: 'Seleccione una categoría',
												disabled: true,
											},
										].concat(
											props.category_list.map((post) => {
												return {
													value: post.id,
													label: post.name,
												}
											})
										)}
									/>
								)}
							</PanelRow>
							<PanelRow>
								<RadioControl
									label="Plantillas"
									help="The type of the current user"
									selected={attributes.layout}
									options={[
										{ label: 'Plantilla 1', value: '1' },
										{ label: 'Plantilla 2', value: '2' },
										{ label: 'Plantilla 3', value: '3' },
									]}
									onChange={(layout_num) => {
										setAttributes({
											layout: layout_num,
										})
									}}
								/>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				}

				{posts ? (
					<div className="container">
						<PanelBody title={__('Textos', 'awp')} initialOpen={true}>
							<PanelRow>
								<div className="row justify-content-between">
									<div className="col-6">
										<RichText
											className={`input-text`}
											style={{
												textAlign: attributes.alignment,
											}}
											tagName="span"
											onChange={(newTitle) => {
												setAttributes({
													title: newTitle,
												})
											}}
											value={attributes.title}
											placeholder={__('Título...', 'arteuy-theme')}
										/>
									</div>
									<div className="col-6">
										<RichText
											className={`input-text`}
											style={{
												textAlign: attributes.alignment,
											}}
											tagName="span"
											onChange={(newTitle_view_all) => {
												setAttributes({
													title_view_all: newTitle_view_all,
												})
											}}
											value={attributes.title_view_all}
											placeholder={__(
												'Texto del enlace...',
												'arteuy-theme'
											)}
										/>
									</div>
								</div>
							</PanelRow>

							<PanelRow>
								<div className="row justify-content-between">
									<div className="col-12">
										<RichText
											className={`input-text`}
											style={{
												textAlign: attributes.alignment,
											}}
											tagName="span"
											onChange={(newSubtitle) => {
												setAttributes({
													subtitle: newSubtitle,
												})
											}}
											value={attributes.subtitle}
											placeholder={__(
												'Subtítulo...',
												'arteuy-theme'
											)}
										/>
									</div>
								</div>
							</PanelRow>
						</PanelBody>
						<PanelBody
							title={__('Previsualización', 'awp')}
							initialOpen={true}
						>
							<PanelRow>
								<section class="grid-section">
									<div class="d-flex justify-content-between">
										<h2>{attributes.title}</h2>
										<a href="#">{attributes.title_view_all}</a>
									</div>
									<div class="d-flex justify-content-between">
										<h3>{attributes.subtitle}</h3>
									</div>
									<div class="row">
										{posts.map(function (post, index) {
											return (
												<div
													className={`col-${
														layout_config[attributes.layout]
															.column_sizes[index]
													} card-item`}
												>
													<img
														src={cardLogoImg}
														alt="Imagen destacada"
													/>
													<h4>{post.title.rendered}</h4>
													<h5>Directorio</h5>
												</div>
											)
										})}
									</div>
								</section>
							</PanelRow>
						</PanelBody>
					</div>
				) : (
					<div>
						<h2>Selecciona las entradas en el panel lateral</h2>
					</div>
				)}
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
			categoryIds: {
				type: 'array',
				default: [],
			},
			title: {
				type: 'string',
				default: '',
			},
			subtitle: {
				type: 'string',
				default: '',
			},
			title_view_all: {
				type: 'string',
				default: '',
			},
			layout: {
				type: 'string',
				default: '1',
			},
		},
		edit: withSelect((select, props) => {
			const { getEntityRecords } = select('core')

			return {
				category_list: getEntityRecords('taxonomy', 'category'),
			}
		})(BlockGridEdit),
		save: () => {
			return null
		},
	})
}
