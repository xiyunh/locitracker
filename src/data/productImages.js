import singleLarge from '../assets/product-single-1200.webp'
import singleThumb from '../assets/product-single-600.webp'
import fourLarge from '../assets/product-four-pack-1200.webp'
import fourThumb from '../assets/product-four-pack-600.webp'
import twoSizesLarge from '../assets/product-two-sizes-1200.webp'
import twoSizesThumb from '../assets/product-two-sizes-600.webp'

/** Product photography keyed by catalog id. Products without a shot fall back to a placeholder. */
export const productImages = {
  'loci-sticker-single': { src: singleLarge, thumb: singleThumb, alt: 'A single Loci sticker with the compass mark' },
  'loci-sticker-four-pack': { src: fourLarge, thumb: fourThumb, alt: 'Four Loci stickers laid out in a grid' },
  'pre-order': { src: twoSizesLarge, thumb: twoSizesThumb, alt: 'Loci stickers in two sizes, side by side' },
}
