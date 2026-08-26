'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { whatsappNumber, whatsappServices } from '../lib/siteData';

function WhatsAppIcon({ size = 20 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
        >
            <path
                fill="currentColor"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
        </svg>
    );
}

function buildWhatsAppMessage(selectedService) {
    return `Hello! I visited the DEVcraft website and would like more information about your services.

Service selected: ${selectedService}

I would like to discuss my project and receive a quotation.

Please let me know what information you need from me. Thank you!`;
}

export default function WhatsAppContact() {
    const [open, setOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const dialogRef = useRef(null);
    const titleRef = useRef(null);
    const dialogId = useId();
    const titleId = useId();
    const hintId = useId();
    const groupName = useId();

    const closeModal = useCallback(() => {
        setOpen(false);
        setSelectedService('');
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return undefined;
        }

        if (open) {
            if (!dialog.open) {
                dialog.showModal();
            }
            titleRef.current?.focus();
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = previousOverflow;
            };
        }

        if (dialog.open) {
            dialog.close();
        }

        return undefined;
    }, [open]);

    function handleDialogClose() {
        setOpen(false);
        setSelectedService('');
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    function handleContinue() {
        if (!selectedService) {
            return;
        }

        const message = buildWhatsAppMessage(selectedService);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        closeModal();
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary whatsapp-trigger"
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={dialogId}
                onClick={() => setOpen(true)}
            >
                <WhatsAppIcon />
                Talk to a Specialist Now!
            </button>

            <dialog
                ref={dialogRef}
                id={dialogId}
                className="whatsapp-modal"
                aria-labelledby={titleId}
                onClose={handleDialogClose}
                onClick={handleBackdropClick}
            >
                <div className="whatsapp-modal-panel">
                    <button
                        type="button"
                        className="whatsapp-modal-close"
                        aria-label="Close"
                        onClick={closeModal}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>

                    <h2 id={titleId} ref={titleRef} tabIndex={-1}>
                        What service are you interested in?
                    </h2>

                    <form
                        className="whatsapp-modal-form"
                        onSubmit={event => {
                            event.preventDefault();
                            handleContinue();
                        }}
                    >
                        <div
                            className="whatsapp-options"
                            role="radiogroup"
                            aria-labelledby={titleId}
                            aria-required="true"
                            aria-describedby={hintId}
                        >
                            {whatsappServices.map(service => {
                                const selected = selectedService === service;
                                return (
                                    <label
                                        key={service}
                                        className={`whatsapp-option${selected ? ' selected' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name={groupName}
                                            value={service}
                                            checked={selected}
                                            onChange={() => setSelectedService(service)}
                                        />
                                        <span>{service}</span>
                                    </label>
                                );
                            })}
                        </div>

                        <p id={hintId} className="whatsapp-modal-hint" aria-live="polite">
                            {selectedService
                                ? 'You can continue to WhatsApp with this service selected.'
                                : 'Please select a service to continue.'}
                        </p>

                        <button
                            type="submit"
                            className="btn btn-whatsapp"
                            disabled={!selectedService}
                        >
                            <WhatsAppIcon size={18} />
                            Continue on WhatsApp
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}
