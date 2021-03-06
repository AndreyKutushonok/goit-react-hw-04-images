import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, openModal }) {
    return (
        <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                    key={id}
                    webImage={webformatURL}
                    openModal={() => openModal(largeImageURL)}
                    description={tags}
                />
            ))}
        </ul>
    );
}

ImageGallery.propTypes = {
    images: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.number.isRequired,
            webformatURL: propTypes.string.isRequired,
            largeImageURL: propTypes.string.isRequired,
            tags: propTypes.string.isRequired,
        })
    ),
    openModal: propTypes.func.isRequired,
};
