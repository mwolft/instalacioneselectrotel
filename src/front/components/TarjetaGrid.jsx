import React from "react";

export default function TarjetaGrid({ url, text, descripcion, type, className = "", ...props }) {
    const typeLower = (type || "").toString().toLowerCase();
    const isImage = typeLower.includes("imagen");
    const isVideo = typeLower.includes("video")
    const containerClass = `${className} w-full overflow-hidden group aspect-video`;

    return (
        <>
            <div className={containerClass} {...props}>
                {isImage ? (
                    <img
                        src={url}
                        alt={text || ""}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : isVideo ? (
                    <video
                        src={url}
                        title={text || ""}
                        className="w-full h-full object-cover"
                        loop
                        preload="metadata"
                        playsInline
                        muted
                    />
                ) : (
                    <img
                        src={url}
                        alt={text || ""}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                )}

            </div>
            <div className="text-sm m-2 text-center font-bold leading-tight text-black">
                {text}
            </div>
            <div className="text-xs m-2 text-center leading-tight text-gray-600">
                {descripcion}
            </div>
        </>
    );
}