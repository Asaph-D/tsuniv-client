import LazyImage from '../shared/LazyImage';

const ImagePreview = ({ src, alt = 'Aperçu'}) => {
    return (
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
            <LazyImage
                src={src}
                alt={alt}
                className={`max-w-full h-32 object-cover rounded-lg border `}
            />
        </div>
    );
};

export default ImagePreview;
