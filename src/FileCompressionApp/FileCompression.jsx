
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "./filecompression.css";
import { Breadcrumbs, Chip, IconButton, LinearProgress, Switch, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import DownloadIcon from '@mui/icons-material/Download';
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CompressIcon from '@mui/icons-material/Compress';
import ShareIcon from '@mui/icons-material/Share';
import ImageResizer from "react-image-file-resizer";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

const initialobj = {
    width: null,
    height: null,
    compressedSize: null,
    maxSize: 1,
    convertType: "JPEG"
}
const FileCompression = () => {
    const [file, setFile] = useState(null);
    const [targetImage, setTargetImage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [keepAspectRatio, setkeepAspectRatio] = useState(true);
    const [ratio, setRatio] = useState(1);
    const [quality, setQuality] = useState(1);
    const [choice, setChoice] = useState(null);
    // resize , compress 

    const [targetImageProperty, setTargetImageProperty] = useState(initialobj)

    const fileTypes = ["JPEG", "PNG", "GIF", "jpg", "svg", "webp", "bmp", "tiff"];
    const [ImageProperty, setImageProperty] = useState({
        width: null,
        height: null,
    });

    const clearData = () => {
        setFile(null);
        setTargetImage(null);
        setQuality(1);
        setChoice(null)
        setImageProperty({
            width: null,
            height: null,
        })
        setTargetImage(initialobj);

    }

    const handleFileChange = (file) => {
        setFile(file);
        setTargetImage(null)
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
                    Size: Number(file.size / 1024).toFixed(4),
                    Type: file.type.split('/')[1]
                }));
                setRatio(image.height / image.width)
                const currentsize = Number(file.size / 1024).toFixed(4);
                setTargetImageProperty((prev) => ({
                    ...prev,
                    ...initialobj,
                    maxSize: currentsize,
                    width: image.width,
                    height: image.height,
                    convertType: file.type.split('/')[1]
                }))
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
                v2 = Number(v1) / ratio;
            }
            else {
                k2 = "height";
                v2 = Number(v1) * ratio;
            }

            setTargetImageProperty(prev => ({
                ...prev,
                [k1]: v1,
                [k2]: v2
            }));

        }
        else {
            setTargetImageProperty(prev => ({
                ...prev,
                [k1]: v1,
            }));
        }



    };

    const handleCompressSizeChange = (event) => {
        setTargetImageProperty(prev => ({
            ...prev,
            maxSize: Number(event.target.value)
        }))
    };

    const handleCompression = (event) => {
        event.preventDefault();
        setProcessing(true);
        let processfile = file;
        if (targetImage) {
            processfile = targetImage;
        }
        const imgoptions = {
            maxSizeMB: targetImageProperty.maxSize / 1024,
            maxWidthOrHeight: Math.min(targetImageProperty.width, targetImageProperty.height),
            useWebWorker: true,
            outputPixelFormat: targetImageProperty.convertType,
            maxIteration: 20,
            initialQuality: quality,
            alwaysKeepResolution: true
        };



        imageCompression(processfile, imgoptions)
            .then((compressedImage) => {
                setTargetImage(compressedImage);
                setTargetImageProperty(prev => ({
                    ...prev,
                    compressedSize: Number(compressedImage.size / 1024).toFixed(4)
                }))
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => {
                setProcessing(false);
            })

    };


    const handleResizeImage = async () => {
        setProcessing(true);

        ImageResizer.imageFileResizer(
            file,
            targetImageProperty.width,
            targetImageProperty.height,
            targetImageProperty.convertType,
            80,
            0,
            (resfile) => {
                setTargetImage(resfile);
                const reader = new FileReader();
                reader.readAsDataURL(resfile);
                reader.onload = () => {
                    const image = new Image();
                    image.src = reader.result;
                    image.onload = () => {
                        setTargetImageProperty(prev => ({
                            ...prev,
                            compressedSize: Number(resfile.size / 1024).toFixed(4),
                            width: image.width,
                            height: image.height,

                        }))
                    }
                }
                setProcessing(false);
            },
            "file",
            targetImageProperty.width,
            targetImageProperty.height,
        )
    }


    const handleResizeImageCompress = async () => {
        setProcessing(true)
        console.log(targetImageProperty.height, targetImageProperty.width)
        ImageResizer.imageFileResizer(
            file,
            targetImageProperty.height,
            targetImageProperty.width,
            targetImageProperty.convertType,
            100,
            0,
            (resfile) => {
                setTargetImage(resfile);


                const reader = new FileReader();
                reader.readAsDataURL(resfile);
                reader.onload = () => {
                    const image = new Image();
                    image.src = reader.result;
                    image.onload = () => {
                        setTargetImageProperty(prev => ({
                            ...prev,
                            compressedSize: Number(resfile.size / 1024).toFixed(4),
                            width: image.width,
                            height: image.height,

                        }))
                    }
                }
            },
            "file",
            targetImageProperty.height,
            targetImageProperty.width,
        )
        setProcessing(false)
    }


    const handleDownload = () => {
        if (!targetImage) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(targetImage);
        link.download = "compressed-image." + targetImageProperty.convertType;
        link.addEventListener("error", () => {
            console.log("Failed to download file. Please try again.");
        });
        link.click();
    };

    const handleShare = async () => {
        if (!targetImage) return;
        const imageElements = document.getElementsByClassName('compressedImage');
        const imageUrl = imageElements[0].src;
        const blob = await fetch(imageUrl).then(r => r.blob())

        const data = {
            files: [
                new File([blob], `compressed-${file.name.split('.')[0]}.${targetImageProperty.convertType}`, {
                    type: blob.type,
                }),
            ],
            title: "https://rapidapps.netlify.app/img-compress",
            text: 'Compress and Resize Image easily',
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

            <div className="fileCompressionContainer">

                <div className="heroTitle">
                    <Typography variant="h2">
                        ImgResizer
                    </Typography>
                    <Typography variant="h7">

                        Easily resize and Compress images online for free.
                    </Typography>
                </div>


                <div className="fileUploaderWrapper">
                    <FileUploader
                        multiple={false}
                        handleChange={handleFileChange}
                        name="file"
                        types={fileTypes}
                    />
                    <Typography className="filenamedisplay" variant="div">
                        {file ? <p>
                            {`File name: ${file.name}`}
                            <IconButton onClick={clearData}>
                                <DeleteIcon style={{ color: 'rgb(219 20 54)' }} />
                            </IconButton>
                        </p> :

                            <p>No File Uploaded Yet</p>
                        }


                    </Typography>



                    {file && (
                        <div className="UserChoiceAction">
                            <Typography variant="h4">Choose an option:</Typography>
                            <div className="actionbtnwrapper">
                                <button className="filecompressionbtn" disabled={choice === 'resize'} onClick={() => setChoice('resize')}>Resize Image</button>
                                <button className="filecompressionbtn" disabled={choice === 'compress'} onClick={() => setChoice('compress')}>Compress Image</button>
                            </div>

                        </div>
                    )
                    }

                </div>



                {!file && <div className="InstructionDisplay">
                    <Typography variant="h4">How to Resize an Image?</Typography>
                    <div className="InstructionDisplaywrapper">
                        <img src="../../compresslogo.jpg" alt="compresslogo" className="InstructionLogo" />

                        <ul className="Instruction">
                            <li>
                                <b>Upload or drop a file </b> an image.
                            </li>
                            <li>
                                Choose an Option <b>"Resize</b> or <b>Compress"</b>

                            </li>
                            <li>
                                Enter <b>"Quality and Dimensaion:</b> for new Image.
                            </li>
                            <li>
                                Click the <b>"Compress or Resize Image"</b> button to resize the image.
                            </li>

                        </ul>


                    </div>
                </div>}

                {
                    choice !== null && file &&
                    (<div className="ActionPannelWrapper">




                        <div className="ActionPannel">


                            <div className="resizeActionPannel">

                                <div className="InputElement">
                                    <label htmlFor="width"> {choice === "compress" ? "Maximum - " : ""}Width </label>


                                    <input type="number"

                                        name="width"
                                        id="width"
                                        value={targetImageProperty.width || ""}
                                        onChange={handleOptionChange}
                                        disabled={!file}
                                    />
                                </div>
                                <div className="InputElement">
                                    <label htmlFor="height"> {choice === "compress" ? "Maximum - " : ""} Height </label>
                                    <input
                                        type="number"
                                        name="height"
                                        id="height"
                                        value={targetImageProperty.height || ""}
                                        onChange={handleOptionChange}
                                        disabled={!file}
                                    />
                                </div>

                                {
                                    choice === "compress" &&


                                    <div className="InputElement">
                                        <Typography variant="caption" color="primary" className="notice">
                                            <InfoIcon></InfoIcon> Maximum of width and height Taken</Typography>
                                    </div>
                                }

                                <div className="aspectWrapper">
                                    <label htmlFor="ascpectRatio">Aspect Ratio </label>
                                    {choice === "resize" ?

                                        <>
                                            <Switch
                                                name="ascpectRatio"
                                                id="ascpectRatio"
                                                checked={keepAspectRatio}
                                                onChange={() => setkeepAspectRatio(true)}
                                            />

                                        </>
                                        :
                                        <Switch
                                            name="ascpectRatio"
                                            id="ascpectRatio"
                                            checked={keepAspectRatio}
                                            onChange={() => setkeepAspectRatio(!keepAspectRatio)} />
                                    }
                                </div>

                            </div>






                            <div className="compressActionPannel">

                                {choice === "compress" &&
                                    <div className="InputElement qualitydiv">

                                        <div>
                                            <label htmlFor="targetCompressSize">Quality  </label>
                                            <input
                                                step="0.01"
                                                min="0"
                                                max="1"
                                                type="number"
                                                name="targetQuality"
                                                id="targetQuality"
                                                value={quality}
                                                onChange={e => setQuality(Number(e.target.value))}
                                            />
                                        </div>
                                        <Typography variant="caption">Only value between 0 to 1</Typography>
                                    </div>
                                }

                                {choice === "compress" &&
                                    <div className="InputElement targetCompresswrapper">
                                        <label htmlFor="targetCompressSize">Target Size (KB)  </label>
                                        <input
                                            type="number"
                                            name="targetCompressSize"
                                            id="targetCompressSize"
                                            value={targetImageProperty.maxSize}
                                            onChange={handleCompressSizeChange}
                                        />

                                    </div>
                                }


                                <div className="InputElement">
                                    <label htmlFor="convertType">Convert Type   </label>
                                    <select
                                        name="convertType"
                                        id="convertType"
                                        value={targetImageProperty.convertType}
                                        onChange={handleOptionChange}
                                    >
                                        <option value="jpeg">JPEG</option>
                                        <option value="png">PNG</option>
                                        <option value="webp">WEBP</option>
                                        <option value="jpg">JPG</option>
                                        <option value="svg">SVG</option>
                                        <option value="gif">GIF</option>



                                    </select>
                                </div>
                            </div>



                        </div>


                        {
                            file &&
                            <div className="CompressbtnWrapper">

                                {
                                    choice === "compress" &&

                                    <button className="filecompressionbtn compressbtn" variant="contained" onClick={handleCompression}
                                        disabled={!file && !processing}>
                                        Compress

                                    </button>
                                }

                                {
                                    choice === "resize" &&

                                    <button className="filecompressionbtn compressbtn" variant="contained" onClick={handleResizeImage}
                                        disabled={!file && !processing}>
                                        Resize Image
                                    </button>
                                }
                                {
                                    choice === "compress" && targetImage
                                    &&
                                    <button className="filecompressionbtn compressbtn" variant="contained" onClick={handleResizeImageCompress}
                                        disabled={!file && !processing}>
                                        Resize
                                    </button>
                                }






                            </div>
                        }


                        {
                            (choice === "compress" && targetImage)
                            &&

                            <Typography variant="caption" color="primary" className="notice">
                                <InfoIcon></InfoIcon> Here Resize will be performed on Compressed Image</Typography>


                        }

                        <div className="loader">
                            {processing && <LinearProgress />}
                        </div>
                    </div>)

                }
                {file &&
                    <div className="displayImageWrapper">
                        <div className="orginalImageWrapper">
                            <Typography variant="h6">Orginal Image </Typography>
                            <img className="orginalImage" src={URL.createObjectURL(file)} alt="orginalImage" />
                            {
                                <div>
                                    <p>Orginal Size(KB)<b>{"  " + ImageProperty.Size}</b></p>
                                    <p>Dimension :{`${ImageProperty.width}x${ImageProperty.height}`} </p>
                                </div>
                            }
                        </div>

                        {targetImage && !processing && (
                            <div className="compressedImageWrapper">

                                <Typography variant="h6">Compressed Image </Typography>
                                <img className="compressedImage" src={URL.createObjectURL(targetImage)} alt="Compressed" />
                                {



                                    <div>

                                        <p >Compressed Size(KB)<b>{"  " + targetImageProperty?.compressedSize}</b></p>
                                        <p>Dimension :{`${targetImageProperty?.width}x${targetImageProperty?.height}`} </p>
                                    </div>
                                }
                            </div>
                        )}

                    </div>
                }
                {
                    targetImage &&
                    <div className="compressedImageShare">
                        <button className="filecompressionbtn" variant="outlined" onClick={handleDownload} disabled={processing}>
                            Download <DownloadIcon />
                        </button>

                        <button className="filecompressionbtn" variant="outlined" onClick={handleShare} disabled={processing}>
                            Share <ShareIcon></ShareIcon>
                        </button>

                    </div>
                }
            </div >
        </>
    );
};
export default FileCompression;
