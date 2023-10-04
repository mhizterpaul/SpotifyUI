import { RootState } from "@/store";
import { ApiStatus } from "@/store/reducers/main_slice";
import { connect } from "react-redux";
import Loader from "../network_request";
import { getTopGenres, test } from "@/utils/api";
import { Component } from "react";
import Image from "next/image";
import { Category } from "@/utils/types";
import image from '@/static/images/test.jpeg'
import random from '@/utils/random'

type Props = {
    access_token: string | null,
    status: ApiStatus,
}

const color = [
    '#BA5D07',
    '#608108',
    '#8D67AB'
]



const imgStyle : React.CSSProperties = {
    width: '19.75rem',
    height: '10.625rem',
    flexShrink: '0',
    borderRadius: '5.8125rem 0rem 0.625rem 0rem',
    background: 'lightgray 50% / cover no-repeat',
    mixBlendMode: 'luminosity'
}

const style = {
    width: '30.8125rem',
    height: '17.1875rem',
    flexShrink: '0',
    borderRadius: '0.625rem',
    backgroud: random(color),
}

class TopGenres extends Component<Props, { genres: any }>{
    constructor(props: Props) {
        super(props);
        this.state = {
            genres: null
        }
    }

    componentDidMount(): void {
        if (this.props.access_token == null) return this.setState(state => ({ ...state, genres: test }));

        getTopGenres(this.props.access_token).then(
            data => this.setState(state => ({ ...state, genres: data }))
        )

    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{ genres: any; }>, snapshot?: any): void {
        console.log(this.state);
    }

    render() {
        return this.state.genres ? (
            <section>
                <h3>Your top genres</h3>
                <div className={'flex flex-row'}>
                    {this.state.genres.map((genre: Category) => (<figure key={genre.id} style={style}><Image src={image || genre.image} width={100} height={100} alt={genre.name} style={imgStyle} /><figcaption>{genre.name}</figcaption></figure>))}
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