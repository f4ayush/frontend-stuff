'use client'
import React, { useRef } from 'react';

const Html2Img: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        console.log("clicked")
        if (elementRef.current) {
            const element = elementRef.current;

            // Create a temporary canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Set canvas dimensions to match the element
                canvas.width = element.clientWidth;
                canvas.height = element.clientHeight;

                // Create an image element from the HTML element
                const image = new Image();
                image.onload = () => {
                    // Draw the image onto the canvas
                    ctx.drawImage(image, 0, 0);

                    // Convert canvas to data URL
                    const dataUrl = canvas.toDataURL('image/png');
                    // Create a download link
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'element.png';
                    // Trigger click event on the link to start the download
                    link.click();
                };
                image.onerror = (error) => {
                    console.error('Error loading image:', error);
                };
                image.src = getSvgDataURL(element);
                // Set the source of the image to a data URL representing the HTML element
                document.body.appendChild(image)
            }
            // console.log(getSvgDataURL(element))
        }
    };


    const applyStyle = (element: HTMLElement) => {
        const computedStyles = window.getComputedStyle(element);
        let styleString = '';
        for (let i = 0; i < computedStyles.length; i++) {
            const property = computedStyles[i];
            const value = computedStyles.getPropertyValue(property);
            styleString += `${property}: ${value}; `;
        }
        element.setAttribute('style', styleString)
        let innerElements = element.querySelectorAll("*");
        innerElements.forEach((element: any) => {
            applyStyle(element)
        })
        console.log(styleString)
    }

    const getSvgDataURL = (mainElement: HTMLElement): string => {
        // Get computed styles of the element
        const element = mainElement
        applyStyle(element)
        // Construct SVG string with embedded HTML content and styles
        const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${element.clientWidth}" height="${element.clientHeight}">
        <foreignObject width="100%" height="100%">

          <div xmlns="http://www.w3.org/1999/xhtml" >
                  ${new XMLSerializer().serializeToString(element)}
          </div>
        </foreignObject>
      </svg>
    `;


        console.log(svgString)
        // Convert SVG string to Base64
        const encodedSvg = btoa(decodeURIComponent(encodeURIComponent(svgString)));

        // Return the SVG data URL
        return `data:image/svg+xml;base64,${encodedSvg}`;
    };

    return (
        <div>
            <div ref={elementRef} className='bg-green-300'>
                {/* Your content goes here */}
                <span>asas</span>
                <h1>This is a downloadable element</h1>
                <p>You can convert this into an image and download it.</p>
            </div>
            <button onClick={handleDownload}>Download as Image</button>
        </div>
    );
};

export default Html2Img;
