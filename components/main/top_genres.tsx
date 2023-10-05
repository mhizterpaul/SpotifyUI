import { RootState } from "@/store";
import { ApiStatus } from "@/store/reducers/main_slice";
import { connect } from "react-redux";
import Loader from "../network_request";
import { getTopGenres, test } from "@/utils/api";
import { Component } from "react";
import Image from "next/image";
import { Category } from "@/utils/types";
import image from '@/static/images/test.jpeg'
import {random} from '@/utils'
import classnames from 'classnames'

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
    width: 19.75/1.5 + 'rem',
    height: 10.625/1.5 + 'rem',
    flexShrink: '0',
    borderRadius: '5.8125rem 0rem 0.625rem 0rem',
    background: 'lightgray 50% / cover no-repeat',
    mixBlendMode: 'luminosity',
    position: 'absolute',
    bottom: '0',
    right: '0',
}

const style: React.CSSProperties = {
    width: 30.8125/2 +'rem',
    height: 17.1875/1.5 +'rem',
    flexShrink: '0',
    borderRadius: '0.625rem',
    position: 'relative'
}

class TopGenres extends Component<Props, { genres: any }>{
    constructor(props: Props) {
        super(props);
        this.state = {
            genres: null
        }
    }

    componentDidMount(): void {
        //if (this.props.access_token == null) 
        return this.setState(state => ({ ...state, genres: test }));

        getTopGenres(this.props.access_token).then(
            data => this.setState(state => ({ ...state, genres: data }))
        )

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{ genres: any; }>, snapshot?: any): void {
        console.log(this.state);
    }

    render() {
        return this.state.genres ? (
            <section className='mt-4'>
                <h3>Your top genres</h3>
                <div className={'flex flex-row mt-4 gap-x-8'}>
                    {this.state.genres.map((genre: Category) => {
                        const myStyle = {...style, background: random(color)}
                        return (<figure key={genre.id} style={myStyle} ><Image src={image || genre.image} width={100} height={100} alt={genre.name} style={imgStyle} /><figcaption className='top-4 left-4 absolute text-xl font-black'>{genre.name}</figcaption></figure>);
                    })}
                </div>
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