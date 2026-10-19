import { useEffect, useState } from 'react';

interface Props {
    file: File | Blob | null | undefined;
    className?: string;
}

// Miniatura de un archivo local. La URL se crea una sola vez por archivo y se libera al
// desmontar o cambiar de archivo; si el valor no es un Blob válido no rompe la pantalla.
export default function FilePreviewImg({ file, className }: Props) {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!(file instanceof Blob)) { setSrc(null); return; }
        let url: string | null = null;
        try {
            url = URL.createObjectURL(file);
            setSrc(url);
        } catch {
            setSrc(null);
        }
        return () => { if (url) URL.revokeObjectURL(url); };
    }, [file]);

    if (!src) return <div className={className} />;
    return <img src={src} className={className} alt="" />;
}
