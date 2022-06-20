import { useState, useEffect } from 'react';
import getImages from '../../services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [queryResult, setQueryResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [totalQueryResult, setTotalQueryResult] = useState(0);
    const [prevSearchQuery, setPrevSearchQuery] = useState('');

    useEffect(() => {
        if (!searchQuery) {
            return;
        }

        const handleFetch = async () => {
            try {
                const images = await getImages(searchQuery, currentPage);

                if (images.hits.length === 0) {
                    alert('There is no such images');

                    setQueryResult([]);
                    setCurrentPage(1);
                }

                if (
                    prevSearchQuery !== searchQuery &&
                    images.hits.length !== 0
                ) {
                    setQueryResult(images.hits);
                    setTotalQueryResult(images.totalHits);
                    setPrevSearchQuery(searchQuery);
                }

                if (prevSearchQuery === searchQuery && 2 <= currentPage) {
                    setQueryResult(prevImages => [
                        ...prevImages,
                        ...images.hits,
                    ]);
                }
            } catch (response) {
                console.log(response);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        handleFetch();
    }, [searchQuery, currentPage, prevSearchQuery]);

    const handleFormSubmit = searchQuery => {
        setSearchQuery(searchQuery);
        setCurrentPage(1);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
    };

    const incrementPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const showLargeImage = clickedImage => {
        toggleModal();
        setModalImage(clickedImage);
    };

    return (
        <>
            <Searchbar
                onSubmit={handleFormSubmit}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {queryResult && (
                <ImageGallery images={queryResult} openModal={showLargeImage} />
            )}
            {isModalOpen && (
                <Modal
                    largeImageURL={modalImage}
                    onClose={toggleModal}
                    description={searchQuery}
                />
            )}
            {loading && <Loader />}
            {queryResult.length > 11 &&
                queryResult.length !== totalQueryResult &&
                !loading && <Button onClick={incrementPage} />}
        </>
    );
}
