'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

export default function ProjectMedia({
    image,
    alt,
    frame = 'phone',
    className = '',
    priority = false,
    sizes = '(max-width: 768px) 80vw, 320px',
    showViewFull = true
}) {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef(null);
    const dialogId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return undefined;
        }

        if (open && !dialog.open) {
            dialog.showModal();
        }

        if (!open && dialog.open) {
            dialog.close();
        }

        return undefined;
    }, [open]);

    const close = useCallback(() => setOpen(false), []);

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            close();
        }
    }

    return (
        <div className={`project-media ${className}`.trim()}>
            <div className={`device-frame device-${frame}`}>
                {frame === 'browser' ? (
                    <div className="browser-toolbar" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <p>Website preview</p>
                    </div>
                ) : null}
                <div className="device-screen">
                    {frame === 'crop' ? (
                        <Image
                            src={image}
                            alt={alt}
                            fill
                            sizes={sizes}
                            style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                    ) : (
                        <Image
                            src={image}
                            alt={alt}
                            sizes={sizes}
                            priority={priority}
                        />
                    )}
                </div>
            </div>
            {showViewFull ? (
                <button
                    type="button"
                    className="view-full-design"
                    aria-haspopup="dialog"
                    aria-controls={dialogId}
                    onClick={() => setOpen(true)}
                >
                    View full design
                    <span aria-hidden="true">→</span>
                </button>
            ) : null}
            <dialog
                ref={dialogRef}
                id={dialogId}
                className="design-dialog"
                onClose={close}
                onClick={handleBackdropClick}
            >
                <div className="design-dialog-panel">
                    <button
                        type="button"
                        className="design-dialog-close"
                        aria-label="Close full design"
                        onClick={close}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <Image src={image} alt={alt} sizes="(max-width: 900px) 92vw, 420px" />
                </div>
            </dialog>
        </div>
    );
}
