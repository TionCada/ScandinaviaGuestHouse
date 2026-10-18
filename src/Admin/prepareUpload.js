// Photos straight from a phone or camera are often 5-15 MB and much larger than any screen: they
// are scaled down to at most MAX_SIDE pixels on the longer side and saved as JPEG before upload,
// so the site stays fast on mobile data. Videos are uploaded as they are

const MAX_SIDE = 2560;
const JPEG_QUALITY = 0.85;

export const isVideo = (file) => file.type.startsWith('video/');

export const preparePhoto = async (file) => {
    let bitmap;
    try {
        // Turned upright by its EXIF orientation, as phones record it
        bitmap = await createImageBitmap(file, {imageOrientation: 'from-image'});
    } catch {
        // A format this browser can't read: upload it as it is, the server checks the type
        return file;
    }
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    // White under any transparent parts, which JPEG can't keep
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY));
    // Keep the original if re-encoding didn't make it smaller and it needed no scaling
    if (!blob || (scale === 1 && file.type === 'image/jpeg' && blob.size >= file.size)) {
        return file;
    }
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', {type: 'image/jpeg'});
};
