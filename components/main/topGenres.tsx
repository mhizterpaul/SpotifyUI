import { RootState } from "@/store";
import { ApiStatus, pushRef } from "@/store/reducers/main_slice";
import { connect } from "react-redux";
import Loader from "../networkRequest";
import { getSeveralCategories } from "@/utils/api";
import { Component } from "react";
import React from 'react'
import Image from "next/image";
import { Category } from "@/utils/types";
import { random } from '@/utils'
import Carousel from 'nuka-carousel'
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi'
import { store } from '@/store';
import { Context, V } from "@/containers/rootProvider";

type Props = {
    access_token: string | null,
    status: ApiStatus,
    listStyle?: React.CSSProperties
}

const color = [
    '#BA5D07',
    '#608108',
    '#8D67AB'
]


const imgStyle: React.CSSProperties = {
    width: 17.75 / 1.5 + 'rem',
    height: 8.625 / 1.5 + 'rem',
    flexShrink: '0',
    borderRadius: '5.8125rem 0rem 0.625rem 0rem',
    background: 'lightgray 50% / cover no-repeat',
    mixBlendMode: 'luminosity',
    position: 'absolute',
    bottom: '0',
    right: '0',
}

const style: React.CSSProperties = {
    width: 28.8125 / 2 + 'rem',
    height: 15.1875 / 1.5 + 'rem',
    flexShrink: '0',
    borderRadius: '0.625rem',
    position: 'relative'
}, btnStyle = {
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
    debounce: NodeJS.Timeout | null = null;
    static contextType = Context;
    context!: React.ContextType<typeof Context>;
    debouncedRecalcBoundingRect(e: UIEvent): any {
        if (this.timeStamp == 0) return this.timeStamp = e.timeStamp;
        if ((e.timeStamp - this.timeStamp) < 1000) {
            if (this.debounce != null) clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => this.setState(prev => ({ ...prev, updatedWithCarousel: true })), 1000);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.debouncedRecalcBoundingRect.bind(this));
    }

    componentDidMount(): void {
        //if (this.props.access_token == null) 
        window.addEventListener('resize', this.debouncedRecalcBoundingRect.bind(this));
        if (!this.props.access_token || this.state.genres) return;
        getSeveralCategories(this.props.access_token, random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']), '1').then(
            data => this.setState(state => ({ ...state, genres: data }))
        )

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{ genres: any; }>, snapshot?: any): void {
        if ((this.boundingRectRef.current == null) && (this.state.updatedWithCarousel === false)) this.setState(prev => ({ ...prev, updatedWithCarousel: true }));
    }

    boundingRectCalc() {
        if (!this.boundingRectRef.current) return;
        const width = this.boundingRectRef.current.clientWidth;
        return Math.floor(width / (Number(String(style.width).slice(0, 4)) * 16))
    }

    render() {
        return this.state.genres ? (
            <section className='mt-8 md:mt-4 w-full mb-8 ' style={this.props.listStyle}>
                <h3>Your top genres</h3>
                <Carousel ref={this.boundingRectRef} cellSpacing={20} defaultControlsConfig={{
                    pagingDotsStyle: { display: 'none' },
                    prevButtonText: <button className={btnClassName}><PiCaretLeftBold style={btnStyle} /></button>,
                    nextButtonText: <button className={btnClassName}><PiCaretRightBold style={btnStyle} /></button>
                }} className={'mt-4'}>
                    {
                        (() => {
                            const withCarousel = () => {
                                const innerImgCount = this.boundingRectCalc(),
                                    carouseldata = this.state.genres.map((el: Category, id: number, arr: Category[]) => {
                                        if ((id === 0) || (((id) % Number(innerImgCount)) === 0)) {
                                            const innerImgs = arr.slice(id, id + Number(innerImgCount));
                                            return (
                                                <div key={id} className={`w-full h-[calc(17.1875rem/1.5)] flex flex-nowrap ${((id + Number(innerImgCount)) >= (arr.length - 1)) ? 'justify-start gap-x-4' : Number(innerImgCount) < 3 ? 'justify-around' : 'justify-between'}`}>
                                                    {
                                                        innerImgs.map((genre: Category, index) => {
                                                            return (
                                                                () => {
                                                                    const bgColor = random(color);
                                                                    const myStyle = { ...style, background: bgColor }
                                                                    const dispatch = store.dispatch;
                                                                    const onClick = () => {
                                                                        this.context.setProp('currentPlaylist', genre);
                                                                        dispatch(pushRef('/playlist?category=' + genre.name));
                                                                    }
                                                                    return (<figure key={genre.id} className={''} onClick={onClick} style={myStyle} ><Image src={genre.image} width={100} height={100} alt={genre.name} style={imgStyle} /><figcaption className='top-4 left-3 absolute text-xl font-black'>{genre.name}</figcaption></figure>);
                                                                })()
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    });
                                return carouseldata.filter((el: React.ReactNode | undefined) => el != undefined);
                            }
                            return this.boundingRectRef.current == null ? (<div className={'flex flex-row mt-4 gap-x-8'} style={style}>
                                {this.state.genres.map((genre: Category) => {
                                    const myStyle = { ...style, background: random(color) }
                                    return (<figure key={genre.id} style={myStyle} ><Image src={genre.image} width={100} height={100} alt={genre.name} style={imgStyle} /><figcaption className='top-4 left-4 absolute text-xl font-black'>{genre.name}</figcaption></figure>);
                                })}
                            </div>) : withCarousel()
                        })()
                    }
                </Carousel>
            </section>

        ) : <Loader status={'PENDING'} meta={'TopGenres'} />

    }


}


const mapStateToProps = (state: RootState, ownProps: { listStyle: React.CSSProperties }) => {
    return {
        access_token: state.main.access_token,
        status: state.main.fetchAccessTokenStatus,
        ...ownProps
    };
};
export default connect(mapStateToProps)(TopGenres);