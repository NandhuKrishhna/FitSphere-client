import { X } from 'lucide-react';
type ImagePreviewModalProps = {
    src: string;
    alt: string;
    onClose: () => void;
}
const ImagePreviewModal = ({ src, alt, onClose }: ImagePreviewModalProps) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-[90%] max-h-[90%] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-white bg-slate-200/20 hover:bg-gray-300/50 rounded-full p-2"
                    onClick={onClose}
                >
                    <X size={24} color="white" />
                </button>
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
            </div>
        </div>
    );
};
export default ImagePreviewModal