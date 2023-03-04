import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";



// z-10 -mx-4  sm:mx-0 sm:rounded-3xl lg:w-1/2 lg:flex-none
function Card({ title, imgurl, rmbg = false }) {
    return (


        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="px-4 py-2">
                <h2 class="text-gray-800  text-center text-xl font-bold">{title}</h2>
            </div>
            <img class="w-full h-96" src={imgurl} alt={title} style={rmbg ? {
                backgroundColor: '#fff',
                backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjkzNyA3LjkzOCIgaGVpZ2h0PSIzMCIgd2lkdGg9IjMwIj48cGF0aCBwYWludC1vcmRlcj0ic3Ryb2tlIGZpbGwgbWFya2VycyIgZD0iTS4wMTQuMDE0SDMuOTdWMy45N0guMDE0ek0zLjk3IDMuOTY4aDMuOTU0djMuOTU1SDMuOTd6IiBmaWxsPSIjZWVlZmYwIi8+PC9zdmc+)',
                backgroundSize: '25px'
            } : {}} />

        </div>


    )

}
function RemoveBg() {
    const containerRef = React.useRef(null);


    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [resultUrl, setResultUrl] = useState(null);
    const [processing, setProcessing] = useState(false)
    const [copied, setCopied] = useState(false);



    const apiKey = process.env.REACT_APP_BG_REMOVER;
    const apiUrl = "https://api.remove.bg/v1.0/removebg";

    const handleImageFileChange = (event) => {
        setImageFile(event.target.files[0]);
        setImageUrl(null);
        setResultUrl(null);
    };
    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
        setImageFile(null);
        setResultUrl(null);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!imageFile && !imageUrl) {
            alert("Please provide an image file or URL.");
            return;
        }

        let formData;
        if (imageFile) {
            formData = new FormData();
            formData.append("image_file", imageFile);
        }
        else {
            formData = { image_url: imageUrl }
        }


        setProcessing(true);
        axios
            .post(apiUrl, formData, { headers: { "X-Api-Key": apiKey }, responseType: "blob" })
            .then((response) => {
                setResultUrl(URL.createObjectURL(response.data));
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => {
                setProcessing(false)
            })
    };

    function clearData() {
        setImageFile(null)
        setImageUrl(null)
        setProcessing(null)
        setResultUrl(null);
    }

    const handleDownload = () => {
        // create a new anchor element with the image URL
        const downloadLink = document.createElement('a');
        downloadLink.href = resultUrl;
        downloadLink.download = 'rmbg-image.jpg';
        document.body.appendChild(downloadLink);
        // simulate click event on the anchor element
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleShare = async () => {
        try {
            // use Web Share API if available
            if (navigator.share) {
                await navigator.share({
                    title: 'bg remove Image',
                    url: resultUrl,
                });
            } else {
                // fallback to copying the image URL to clipboard
                await navigator.clipboard.writeText(resultUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="overflow-hidden flex flex-col items-center">


            <nav className="sticky top-0 w-full bg-white border-b border-gray-300 z-50 p-2">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

                    <div className="flex-shrink-0">
                        <a href="/">
                            <img className="h-16 w-auto" src="./bgremove-logo.png" alt="Logo" />
                        </a>
                    </div>
                    {/* <div className="flex items-center">
                        <h1 className="font-bold text-4xl text-indigo-700">
                            bgRemover
                        </h1>
                    </div> */}
                    <h2 className="text-lg font-bold">
                        <a href="./">Home</a>
                    </h2>
                </div>
            </nav>
            <div className="flex flex-col lg:flex-row gap-5 lg:p-20 w-full bg-gray-100" style={{ minHeight: 'calc(100vh - 11vh)' }}>

                <section className="flex justify-center item-center" style={{ flex: "0.5" }}>
                    <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center item-center">
                        <h1 className="text-3xl lg:text-5xl font-bold my-8  mb-8 text-indigo-600 text-center">Remove Background</h1>

                        <h2 className="text-2xl font-medium mb-8 text-center">
                            Say goodbye to background hassles.
                        </h2>

                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img className="h-60 w-full rounded" src={(imageFile ? URL.createObjectURL(imageFile) : imageUrl) || "https://hotpot.ai/images/site/ai/background_remover/teaser_400.jpg"} alt="" style={{ objectFit: "fill" }} />
                        </div>

                    </div>
                </section>


                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mb-8 lg:w-3/5 mt-8" style={{ flex: "0.5" }}>
                    <div class="relative mb-3 xl:w-96">
                        <input
                            class="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-white bg-clip-padding py-4 px-3 text-base font-normal leading-tight text-neutral-700 ease-in-out placeholder:text-transparent focus:border-primary focus:bg-white focus:pt-[1.625rem] focus:pb-[0.625rem] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 [&:not(:placeholder-shown)]:pt-[1.625rem] [&:not(:placeholder-shown)]:pb-[0.625rem] bg-white w-full"
                            id="image-url"
                            type="text"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                        />
                        <label
                            for="image-url"
                            class="pointer-events-none absolute top-0 left-0 origin-[0_0] border border-solid border-transparent py-4 px-3 text-neutral-700 transition-[opacity,_transform] duration-100 ease-in-out peer-focus:translate-x-[0.15rem] peer-focus:-translate-y-2 peer-focus:scale-[0.85] peer-focus:opacity-[0.65] peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[0.65] motion-reduce:transition-none dark:text-neutral-200">
                            Image URL
                        </label
                        >
                    </div>


                    <p className="text-gray-700 m-3">
                        or
                    </p>
                    <div class="flex items-center justify-center w-full px-4">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white  hover:bg-blue-100">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>

                            </div>
                            <input id="dropzone-file" type="file" class="hidden" onChange={handleImageFileChange} />
                        </label>
                    </div>

                    <div className="flex gap-5 item-center">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline mt-5">
                            {processing ? "Processing..." : "Remove Background"}
                        </button>

                        <button onClick={clearData} disabled={(!imageFile && !imageUrl) || (processing)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline mt-5">
                            Clear
                        </button>

                    </div>
                </form>


            </div>


            {resultUrl &&

                <div className="overflow-hidden p-4 w-full bg-red">
                    <div className="w-full rounded-lg gap-10 flex flex-col lg:flex-row justify-center items-center" >
                        {/* <Card title={"Input Image"} imgurl={imageFile ? URL.createObjectURL(imageFile) : imageUrl} /> */}
                        <Card title={"Output Image"} imgurl={resultUrl} rmbg={true} />
                    </div>
                </div>


            }

            {resultUrl && <div className="flex justify-center item-center gap-5 my-6 bg-white p-5 w-full">
                <button
                    className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onClick={handleDownload}
                >
                    Download
                </button>

                <button
                    ref={containerRef}
                    className={`${copied ? 'bg-green-500' : 'bg-blue-700'
                        } hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
                    onClick={handleShare}
                >
                    {copied ? 'Copied!' : 'Share'}
                </button>
            </div>}
        </div>
    );
}

export default RemoveBg;
