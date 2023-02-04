
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "./filecompression.css";
import { Breadcrumbs, Button, Chip, Switch, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import DownloadIcon from '@mui/icons-material/Download';
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CompressIcon from '@mui/icons-material/Compress';
import ShareIcon from '@mui/icons-material/Share';

const FileCompression = () => {
    const [file, setFile] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [compressedSize, setCompressedSize] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [compressSize, setCompressSize] = useState(1);
    const [keepAspectRatio, setkeepAspectRatio] = useState(false);
    const [ratio, setRatio] = useState(1);
    const fileTypes = ["JPEG", "PNG", "GIF"];
    const [ImageProperty, setImageProperty] = useState({
        width: null,
        height: null,
        convertType: "JPEG"
    });


    const handleFileChange = (file) => {

        setFile(file);
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;

            image.onload = () => {
                setImageProperty(prev => ({
                    ...prev,
                    width: image.width,
                    height: image.height,
                    compressSize: Number(file.size / 1024).toFixed(4)
                }));
                setRatio(image.height / image.width)
                setCompressSize(Number(file.size / 1024).toFixed(4))
            };
        };
    };

    const handleOptionChange = (event) => {
        const k1 = event.target.name;
        const v1 = event.target.value;
        // ratio  =  height / width
        if (keepAspectRatio && (k1 === 'height' || k1 === 'width')) {
            let k2, v2;
            if (k1 === "height") {
                k2 = "width";
                v2 = v1 / ratio;
            }
            else {
                k2 = "height";
                v2 = v1 * ratio;
            }

            setImageProperty(prev => ({
                ...prev,
                [k1]: v1,
                [k2]: v2
            }));

        }
        else {
            setImageProperty(prev => ({
                ...prev,
                [k1]: v1,
            }));
        }



    };

    const handleCompressSizeChange = (event) => {
        console.log(Number(event.target.value))
        setCompressSize(Number(event.target.value));
    };

    const handleCompression = (event) => {
        event.preventDefault();
        setProcessing(true);
        const imgoptions = {
            maxSizeMB: ImageProperty.compressSize / 1024,
            maxWidthOrHeight: Math.min(ImageProperty.width, ImageProperty.height),
            useWebWorker: true,
            outputPixelFormat: ImageProperty.convertType,
            maxIteration: 50,
        };


        imageCompression(file, imgoptions)
            .then((compressedImage) => {
                setCompressedImage(compressedImage);
                setCompressedSize(Number(compressedImage.size / 1024).toFixed(4));
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => {
                setProcessing(false);
            })


        // new Compressor(file, {
        //     width: options.width,
        //     height: options.height,
        //     quality: selectedOption === "compress" ? options.quality : 1,
        //     convertType: options.convertType,
        //     success(result) {
        //         setCompressedSize(result.size / 1024);
        //         setCompressedImage(result);
        //         setProcessing(false)
        //     },
        //     error(err) {
        //         console.error(err.message);
        // setProcessing(false);
        //     },
        // });
    };


    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(compressedImage);
        link.download = "compressed-image." + ImageProperty.convertType;
        link.addEventListener("error", () => {
            console.log("Failed to download file. Please try again.");
        });
        link.click();
    };

    const handleShare = async () => {




        const imageElements = document.getElementsByClassName('compressedImage');
        const imageUrl = imageElements[0].src;


        const blob = await fetch(imageUrl).then(r => r.blob())




        const data = {
            files: [
                new File([blob], `compressed-${file.name.split('.')[0]}.${ImageProperty.convertType}`, {
                    type: blob.type,
                }),
            ],
            title: "Image",
            text: 'Shared Image',
        };
        try {
            if (!(navigator.canShare(data))) {
                throw new Error("Can't share data.", data);
            }
            await navigator.share(data);
        } catch (err) {
            console.error(err.name, err.message);
        }





    };

    return (
        <>


            <div className="breadcum">
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        to="/"
                    >

                        <Chip icon={<HomeIcon />} label="Home" />



                    </NavLink>

                    <NavLink
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        to="/img-compress"
                    >

                        <Chip icon={<CompressIcon />} label="Note Pad" />


                    </NavLink>
                </Breadcrumbs>
            </div>

            <div className="container">



                <div className="fileUploaderWrapper">
                    <FileUploader
                        multiple={false}
                        handleChange={handleFileChange}
                        name="file"
                        types={fileTypes}
                    />
                    <Typography className="filenamedisplay" variant="body2">{file ? `File name: ${file.name}` : "No File Uploaded Yet"}</Typography>
                </div>
                {
                    file &&
                    (<div className="ActionPannelWrapper">


                        <div className="ActionPannel">


                            <div className="resizeActionPannel">
                                <div className="InputElement">
                                    <label htmlFor="width">Width </label>


                                    <input type="number"

                                        name="width"
                                        id="width"
                                        value={ImageProperty.width || ""}
                                        onChange={handleOptionChange}
                                        disabled={!file}
                                    />
                                </div>
                                <div className="InputElement">
                                    <label htmlFor="height">Height </label>
                                    <input
                                        type="number"
                                        name="height"
                                        id="height"
                                        value={ImageProperty.height || ""}
                                        onChange={handleOptionChange}
                                        disabled={!file}
                                    />
                                </div>



                                <div className="aspectWrapper">
                                    <label htmlFor="ascpectRatio">Aspect Ratio </label>
                                    <Switch
                                        name="ascpectRatio"
                                        id="ascpectRatio"
                                        checked={keepAspectRatio}
                                        onChange={() => setkeepAspectRatio(!keepAspectRatio)}

                                    />
                                </div>

                            </div>



                            <div className="compressActionPannel">



                                <div className="InputElement targetCompresswrapper">
                                    <label htmlFor="targetCompressSize">Max Compress Size(KB)  </label>
                                    <input
                                        type="number"
                                        name="targetCompressSize"
                                        id="targetCompressSize"
                                        value={compressSize}
                                        onChange={handleCompressSizeChange}
                                    />

                                </div>

                                <div className="InputElement">
                                    <label htmlFor="convertType">Convert Type   </label>
                                    <select
                                        name="convertType"
                                        id="convertType"
                                        value={ImageProperty.convertType}
                                        onChange={handleOptionChange}
                                    >
                                        <option value="jpeg">JPEG</option>
                                        <option value="png">PNG</option>
                                        <option value="webp">WEBP</option>
                                    </select>
                                </div>

                            </div>




                        </div>


                        {
                            file &&
                            <div className="CompressbtnWrapper">

                                <Button className="compressbtn" variant="contained" onClick={handleCompression}
                                    disabled={!file && !processing}
                                >
                                    {processing ? "Proccessing..." : "Compress"}

                                </Button>

                            </div>
                        }
                    </div>)

                }

                <div className="displayImageWrapper">

                    {file && <div className="orginalImageWrapper">

                        <Typography variant="h6">Orginal Image </Typography>
                        <img className="orginalImage" src={URL.createObjectURL(file)} alt="orginalImage" />


                        {

                            <p>Orginal Size(KB)

                                <b>
                                    {"  " + ImageProperty.compressSize}
                                </b>

                            </p>
                        }

                    </div>}

                    {compressedImage && (
                        <div className="compressedImageWrapper">

                            <Typography variant="h6">Compressed Image </Typography>
                            <img className="compressedImage" src={URL.createObjectURL(compressedImage)} alt="Compressed" />
                            {
                                compressedSize &&

                                <p className="sizedisplaytext">Compressed Size(KB)
                                    <b>
                                        {"  " + compressedSize}
                                    </b>
                                </p>
                            }

                        </div>
                    )}

                </div>

                {
                    compressedImage &&
                    <div className="compressedImageShare">
                        <Button variant="outlined" onClick={handleDownload}>
                            Download <DownloadIcon />
                        </Button>

                        <Button variant="outlined" onClick={handleShare}>
                            Share <ShareIcon></ShareIcon>
                        </Button>
                    </div>
                }
            </div >
        </>
    );
};
export default FileCompression;
