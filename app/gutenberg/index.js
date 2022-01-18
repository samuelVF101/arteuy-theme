/**
 * File gutenberg_block.js.
 *
 */

import '../sass/gutenberg/block_style.scss'
import 'select2'
import 'select2/dist/css/select2.css'

import { registerDefaultBlockTemplate } from './block-template'
import { registerDefaultBlockSlide } from './slider'
import { registerDefaultBlockGrid } from './grid'

registerDefaultBlockTemplate()

registerDefaultBlockSlide()

registerDefaultBlockGrid()
