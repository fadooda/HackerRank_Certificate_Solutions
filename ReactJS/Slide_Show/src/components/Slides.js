import React, {useState, useEffect} from 'react';

function Slides({slides}) {
    const [currentSlide, setCurrentSlide] = useState();
    const [currentIndex, setCurrentIndex] = useState();
    const [doesPrevSlideExist, setDoesPrevSlideExist] = useState(false);
    const [isOnFirstSlide, setIsOnFirstSlide] = useState(true);
    const [doesNextSlideExist, setDoesNextSlideExist] = useState(true);

    //maps html to js data to form a visual slide
    const renderSlide= ({text,title}, index) =>{
        return(
        <div id="slide" className="card text-center" key={index}>
        <h1 data-testid="title">{title}</h1>
        <p data-testid="text">{text}</p>
        </div>
         )
        }

    //initialize
    useEffect(() => {
        let getSlide=renderSlide({text: slides[0].text, title: slides[0].title})
        setCurrentSlide(getSlide)
        setCurrentIndex(0)
        if (slides.length===1) setDoesNextSlideExist(false)
    }, []);

    //reset ---change current slide to the first element in the articles array
    const reset= (()=>{
        setCurrentIndex(0)
        let getSlide=renderSlide({text: slides[0].text, title: slides[0].title})
        setCurrentSlide(getSlide)
        setDoesPrevSlideExist(false)
        setIsOnFirstSlide(true)
        if (slides.length===1){
            setDoesNextSlideExist(false)
        } else{
            setDoesNextSlideExist(true)
        }
    }) 
    
    //next slide in the array.
    const next= (()=>{
        if(currentIndex<slides.length-1){
            let getSlide=renderSlide({text: slides[currentIndex+1].text, title: slides[currentIndex+1].title})
            setCurrentSlide(getSlide)
            setCurrentIndex(currentIndex => currentIndex +1)  
            setDoesPrevSlideExist(true)
            setIsOnFirstSlide(false)
            if (currentIndex+1===slides.length-1)
            setDoesNextSlideExist(false)
        }else{
            console.log('At the begining of the list')
            setDoesNextSlideExist(false)
        }
    })

    //previous slide in the array.
    const prev= (()=>{
        if(currentIndex>0){
            let getSlide=renderSlide({text: slides[currentIndex-1].text, title: slides[currentIndex-1].title})
            setCurrentSlide(getSlide)
            setCurrentIndex(currentIndex => currentIndex -1)
            setDoesNextSlideExist(true)
            if (currentIndex-1===0){
                setIsOnFirstSlide(true)
                setDoesPrevSlideExist(false)
            }
        }else{
            //At the begining of the list
            setIsOnFirstSlide(true)
            setDoesPrevSlideExist(false)
        }
    })

    return (
        <div>
            <div id="navigation" className="text-center">
            <button data-testid="button-restart" disabled={isOnFirstSlide} onClick={reset} className="small outlined">Restart</button>
                <button data-testid="button-prev" disabled={!doesPrevSlideExist} onClick={prev} className="small">Prev</button>
                <button data-testid="button-next" disabled={!doesNextSlideExist} onClick={next} className="small">Next</button>
            </div>
            <div>
                {currentSlide}
            </div>
        </div>
    );

}

export default Slides;
