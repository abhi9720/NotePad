import React, { useEffect, useRef, useState } from 'react';
import './style.css'; // import the CSS file

import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import IconButton from '@mui/material/IconButton';
import CloudDownload from '@mui/icons-material/CloudDownload';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Switch } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import GetAppIcon from '@mui/icons-material/GetApp';


import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';




const Notepad = () => {
    const [text, setText] = useState('');

    const [height, setHeight] = useState(0)
    const [previousStates, setPreviousStates] = useState([]);
    const [futureStates, setFutureStates] = useState([]);
    const [font, setFont] = useState('cursive');
    const [fontSize, setFontSize] = useState(16);
    const [wordCount, setWordCount] = useState(0);
    const [letterCount, setLetterCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);
    const [isWhite, setIsWhite] = useState(false);
    const [togglenav, setToggleNav] = useState(false);
    const fileInputRef = useRef(null);
    const textAreaRef = useRef();
    const [textColor, setTextColor] = useState('#022b3a');

    const [promptEvent, setPromptEvent] = useState(null);
    const [appAccepted, setAppAccepted] = useState(false);

    let isAppInstalled = false;

    if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
        isAppInstalled = true;
    }

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        setPromptEvent(e);
    });

    const installApp = () => {
        promptEvent.prompt();
        promptEvent.userChoice.then(result => {
            if (result.outcome === 'accepted') {
                setAppAccepted(true);
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
        });
    };






    const handleColorSelection = color => {

        setTextColor(color);
        localStorage.setItem("textColor", color)
    };



    useEffect(() => {
        const countWords = () => {
            let words = text.trim().split(/\s+/);
            setWordCount(words.length);
        }

        const countLetters = () => {
            setLetterCount(text.length);
        }
        const lineCount = () => {
            const lines = text.split('\n').length;
            setLineCount(lines);
        }
        // localStorage.setItem('text', text);
        countWords();
        countLetters();
        lineCount();
        setHeight(textAreaRef.current.scrollHeight)
    }, [text]);



    useEffect(() => {

        const screenmode = JSON.parse(localStorage.getItem("screenmode"));
        const userfontsize = localStorage.getItem("userfontsize");
        const userfontfamily = localStorage.getItem("userfontfamily");
        const textColor = localStorage.getItem("textColor")

        setTextColor(textColor || '#022b3a')
        setFontSize(userfontsize ? parseInt(userfontsize) : 16)
        setFont(userfontfamily || 'cursive')
        setIsWhite(screenmode);

    }, []);

    useEffect(() => {
        const savedText = localStorage.getItem('text');
        if (savedText) {
            setText(savedText);
        }


        const savedPreviousStates = JSON.parse(localStorage.getItem('previousStates'));
        if (savedPreviousStates && savedPreviousStates.length > 0) {
            setPreviousStates(savedPreviousStates);
        }

        const savedFutureStates = JSON.parse(localStorage.getItem('futureStates'));
        if (savedFutureStates && savedFutureStates.length > 0) {
            setFutureStates(savedFutureStates, savedFutureStates);
        }


    }, []);

    useEffect(() => {
        localStorage.setItem('text', text);
        localStorage.setItem('previousStates', JSON.stringify(previousStates));
        localStorage.setItem('futureStates', JSON.stringify(futureStates));
    }, [text, previousStates, futureStates]);








    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "my_file.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    const handleCopy = async e => {
        try {
            const selectedText = text.substring(textAreaRef.current.selectionStart, textAreaRef.current.selectionEnd);
            await navigator.clipboard.writeText(selectedText || text);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    const handlePaste = async e => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const cursorPos = textAreaRef.current.selectionStart;
            const updatedText = text.slice(0, cursorPos) + clipboardText + text.slice(cursorPos);
            setPreviousStates([...previousStates, text]);
            setText(updatedText);
            setFutureStates([]);
        } catch (err) {
            console.error('Failed to paste text: ', err);
        }
    }

    const handleFontChange = (e) => {

        setFont(e.target.value);
        localStorage.setItem("userfontfamily", e.target.value);
    }



    const handleShare = () => {
        const encodedText = encodeURIComponent(text);
        const shareUrl = `whatsapp://send?text=${encodedText}`;
        window.open(shareUrl, "_blank");

    }


    const incrementFontSize = () => {
        setFontSize(Math.min(fontSize + 1, 24));
        localStorage.setItem("userfontsize", Math.min(fontSize + 1, 24))
    }
    const decrementFontSize = () => {
        setFontSize(Math.max(fontSize - 1, 12));
        localStorage.setItem("userfontsize", Math.max(fontSize - 1, 12))
    }
    const handleClear = () => {
        setPreviousStates([text]);
        setFutureStates([])
        localStorage.removeItem("text")
        localStorage.removeItem('futureStates')
        localStorage.removeItem('previousStates');
        setText('');

    }

    function handleFileInput(event) {
        const file = event.target.files[0];
        readFile(file);
    }
    function readFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileText = event.target.result;
            setText(fileText);
        }
        reader.readAsText(file);
    }

    const handlePrint = () => {


        window.print();



    }



    const handleChange = e => {
        setPreviousStates([...previousStates, text]);
        setText(e.target.value);
        setFutureStates([]);
    };

    const handleUndo = () => {
        if (previousStates.length > 0) {
            setFutureStates([text, ...futureStates]);
            setText(previousStates[previousStates.length - 1]);
            setPreviousStates(previousStates.slice(0, -1));
        }
    };

    const handleRedo = () => {
        if (futureStates.length > 0) {
            setPreviousStates([...previousStates, text]);
            setText(futureStates[0]);
            setFutureStates(futureStates.slice(1));
        }
    };



    const printStyles = `
    @media print {
      #notepadtextbox {
        page-break-before: always;
        white-space: pre-wrap;
        min-height: ${height}px !important;
        height: fit-content !important;
      }
    
    }
  `;

    return (
        <div className="text-editor"
            style={{ backgroundColor: `#${isWhite ? 'd9e3ffc7' : 'ff86005a'}` }}
        >

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
                        to="/notepad"
                    >

                        <Chip icon={<ArticleIcon />} label="Note Pad" />


                    </NavLink>
                </Breadcrumbs>
            </div>





            <div className="header"
                style={{ borderBottom: `2px solid #${isWhite ? '0466c8b5' : 'd0a090'}` }}>

                <img src="../Icon-notepad.png" alt="Logo" className="logo" />
                <div className='actiontbtn'>
                    <IconButton onClick={handleCopy} tile="Copy">
                        <ContentCopyIcon />
                        <span className={togglenav ? "btntexthide" : "btntext"}>Copy</span>
                    </IconButton>
                    <IconButton onClick={handlePaste} title="Paste">
                        <ContentPasteIcon />
                        <span className={togglenav ? "btntexthide" : "btntext"}>Paste </span>
                    </IconButton>
                    <IconButton onClick={handleClear} title="Clear Screen">
                        <DeleteOutlineIcon />
                        <span className={togglenav ? "btntexthide" : "btntext"}>Clear </span>
                    </IconButton>
                    <IconButton onClick={handleUndo} title="Undo" disabled={previousStates.length === 0}>
                        <UndoIcon />
                        <span className={togglenav ? "btntexthide" : "btntext"}> Undo</span>
                    </IconButton>
                    <IconButton onClick={handleRedo} title="Redo" disabled={futureStates.length === 0}>
                        <RedoIcon />
                        <span className={togglenav ? "btntexthide" : "btntext"}> Redo</span>
                    </IconButton>

                    <IconButton onClick={handleDownload} title="Save file">
                        <CloudDownload />
                        <span className={togglenav ? "btntexthide" : "btntext"}> Save</span>
                    </IconButton>

                    {
                        !togglenav ?
                            <IconButton onClick={() => fileInputRef.current.click()} title="Upload File">
                                <CloudUploadIcon />
                                <span className={togglenav ? "btntexthide" : "btntext"}>Upload File </span>
                            </IconButton>
                            : <></>
                    }


                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInput} />
                    {
                        togglenav ?
                            <IconButton className='showonsmall' onClick={e => setToggleNav(!togglenav)}>
                                <KeyboardArrowDownIcon className='showonsmall' />
                            </IconButton> : <></>
                    }


                </div>
                {togglenav ?
                    <></> :
                    <div className='fontaction'>
                        <IconButton onClick={handlePrint}>
                            <LocalPrintshopIcon></LocalPrintshopIcon>
                            <span className={togglenav ? "btntexthide" : "btntext"}>Print </span>
                        </IconButton>
                        <IconButton onClick={handleShare} title="Share on WhatsApp">
                            <WhatsAppIcon />
                            <span className={togglenav ? "btntexthide" : "btntext"}>Share </span>
                        </IconButton>
                        <IconButton onClick={incrementFontSize} title="incrementFontSize" aria-label="incrementFontSize">
                            <ZoomInIcon fontSize="large" />
                        </IconButton>

                        <IconButton onClick={decrementFontSize} title="decrementFontSize" aria-label="decrementFontSize" >
                            <ZoomOutIcon fontSize="large" />
                        </IconButton>
                        <p className='fontsizedisplay' title='font-size'>

                            <span className='hidetext'> Font Size</span>
                            {` ${fontSize}`}
                        </p>

                        <select value={font} onChange={handleFontChange}>
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="sans-serif">sans-serif</option>
                            <option value="cursive">cursive</option>
                            <option value="Lato">Lato</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Poppins">Poppins</option>
                        </select>



                        <IconButton className='showonsmall' onClick={e => setToggleNav(!togglenav)}>
                            <KeyboardArrowUpIcon className='showonsmall' />
                        </IconButton>


                    </div>}

            </div>
            <style dangerouslySetInnerHTML={{ __html: printStyles }} />
            <textarea

                id="notepadtextbox"
                className={isWhite ? 'notebook-page-white' : 'notebook-page-yellow'}
                value={text}
                onChange={handleChange}
                ref={textAreaRef}
                onPaste={handlePaste}
                style={{ fontFamily: font, fontSize: `${fontSize}px`, color: textColor }} />



            <div className='counts'>

                <div>
                    <p className="line-count">Line  {lineCount} </p>
                    <p className="word-count">Word: {wordCount} </p>
                    <p className="letter-count">Chars: {letterCount}</p>
                </div>
                <div className="colotPickerdiv">


                    <input type="color" id="colorpicker" name="colorpicker"
                        value={textColor}
                        onChange={(e) => handleColorSelection(e.target.value)}
                    />
                    <label
                        style={{ backgroundColor: textColor }}
                        className='colorpickertxt' htmlFor="colorpicker"></label>


                </div>


                <Switch
                    checked={isWhite}
                    onChange={e => {
                        localStorage.setItem("screenmode", JSON.stringify(!isWhite));
                        setIsWhite(!isWhite)
                    }}

                    label={isWhite ? "light" : "dark"}
                />

                {promptEvent && !isAppInstalled && (
                    <IconButton content="Install App"
                        title="Install App"
                        onClick={installApp}>
                        <GetAppIcon />
                    </IconButton>
                )}


            </div>

        </div>
    );
};

export default Notepad;


