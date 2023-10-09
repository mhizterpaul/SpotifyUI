import { RootState } from "@/store";
import { ApiStatus } from "@/store/reducers/main_slice";
import { connect } from "react-redux";
import Loader from "../network_request";
import { getTopGenres, test } from "@/utils/api";
import { Component } from "react";
import React from 'react'
import Image from "next/image";
import { Category } from "@/utils/types";
import image from '@/static/images/test.jpeg'
import { random } from '@/utils'
import Carousel from 'nuka-carousel'
import {PiCaretRightBold, PiCaretLeftBold} from 'react-icons/pi' 

type Props = {
    access_token: string | null,
    status: ApiStatus,
}

const color = [
    '#BA5D07',
    '#608108',
    '#8D67AB'
]



const imgStyle: React.CSSProperties = {
    width: 19.75 / 1.5 + 'rem',
    height: 10.625 / 1.5 + 'rem',
    flexShrink: '0',
    borderRadius: '5.8125rem 0rem 0.625rem 0rem',
    background: 'lightgray 50% / cover no-repeat',
    mixBlendMode: 'luminosity',
    position: 'absolute',
    bottom: '0',
    right: '0',
}

const style: React.CSSProperties = {
    width: 30.8125 / 2 + 'rem',
    height: 17.1875 / 1.5 + 'rem',
    flexShrink: '0',
    borderRadius: '0.625rem',
    position: 'relative'
},btnStyle = {
    color: '#181818',
    width: '2rem',
    height: '2rem'
}, btnClassName = 'rounded-full p-2 bg-slate-200';

class TopGenres extends Component<Props, { genres: any, updatedWithCarousel: boolean }>{
    boundingRectRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props)
        this.state = {
            genres: null,
            updatedWithCarousel: false
        }
        this.boundingRectRef = React.createRef();
    }

    timeStamp = 0;
    debounce : NodeJS.Timeout | null = null;

    debouncedRecalcBoundingRect(e: UIEvent) : any {
        if(this.timeStamp == 0) return this.timeStamp = e.timeStamp;
        if((e.timeStamp - this.timeStamp) < 1000){
            if(this.debounce != null) clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => this.setState(prev => ({ ...prev, updatedWithCarousel: true })) , 1000);
    }

    componentDidMount(): void {
        //if (this.props.access_token == null) 
        window.addEventListener('resize', this.debouncedRecalcBoundingRect)
        return this.setState(state => ({ ...state, genres: test }));
        getTopGenres(this.props.access_token).then(
            data => this.setState(state => ({ ...state, genres: data }))
        )

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{ genres: any; }>, snapshot?: any): void {
        if ((this.boundingRectRef.current == null) && (this.state.updatedWithCarousel === false)) this.setState(prev => ({ ...prev, updatedWithCarousel: true }));
    }

    boundingRectCalc() {
        const width = this.boundingRectRef.current.clientWidth;
        return Math.floor(width / (Number(style.width.slice(0, 4)) * 16))
    }

    render() {
        return this.state.genres ? (
            <section className='mt-8 sm:mt-4 w-full'>
                <h3>Your top genres</h3>
                <Carousel ref={this.boundingRectRef} cellSpacing={20} defaultControlsConfig={{
                    pagingDotsStyle: { display: 'none' },
                    prevButtonText: <button className={btnClassName}><PiCaretLeftBold style={btnStyle}/></button>,
                    nextButtonText: <button className={btnClassName}><PiCaretRightBold style={btnStyle}/></button>
                }} className={'mt-4'}>
                    {
                        (() => {
                            const withCarousel = () => {
                                const innerImgCount = this.boundingRectCalc(),
                                    carouseldata = this.state.genres.map((el: Category, id: number, arr: Category[]) => {
                                        if ((id === 0) || (((id) % innerImgCount) === 0)) {
                                            const innerImgs = arr.slice(id, id + innerImgCount);
                                            return (
                                                <div key={id} className={`w-full h-[${style.height}] flex flex-nowrap ${((id + innerImgCount) >= (arr.length - 1)) ? 'justify-start gap-x-4' : innerImgCount < 3 ? 'justify-around': 'justify-between'}`}>
                                                    {
                                                        innerImgs.map((genre: Category) => {
                                                            const myStyle = { ...style, background: random(color) }
                                                            return (<figure key={genre.id} style={myStyle} ><Image src={image || genre.image} width={100} height={100} alt={genre.name} style={imgStyle} /><figcaption className='top-4 left-4 absolute text-xl font-black'>{genre.name}</figcaption></figure>);
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    });
                                return carouseldata.filter((el: React.ReactNode | undefined) => el != undefined);
                            }
                            return this.boundingRectRef.current == null ? (<div className={'flex flex-row mt-4 gap-x-8'}>
                                {this.state.genres.map((genre: Category) => {
                                    const myStyle = { ...style, background: random(color) }
                                    return (<figure key={genre.id} style={myStyle} ><Image src={image || genre.image} width={100} height={100} alt={genre.name} style={imgStyle} /><figcaption className='top-4 left-4 absolute text-xl font-black'>{genre.name}</figcaption></figure>);
                                })}
                            </div>) : withCarousel()
                        })()
                    }
                </Carousel>
            </section>

        ) : <Loader status={this.props.status} meta={'TopGenres'} />

    }


}


const mapStateToProps = (state: RootState) => {
    return {
        access_token: state.main.access_token,
        status: state.main.fetchAccessTokenStatus,
    };
};

export default connect(mapStateToProps)(TopGenres);