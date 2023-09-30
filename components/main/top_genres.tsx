import { RootState } from "@/store";
import { ApiStatus } from "@/store/reducers/main_slice";
import { connect } from "react-redux";
import Loader from "../network_request";
import { getTopGenres } from "@/utils/api";
import { Component } from "react";
import Image from "next/image";
import { Category } from "@/utils/types";

type Props = {
    access_token: string | null,
    status: ApiStatus,
}

class TopGenres extends Component<Props, { genres: any }>{
    constructor(props: Props) {
        super(props);
        this.state = {
            genres: null
        }
    }

    componentDidMount(): void {
        if (this.props.access_token == null) return;

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
                    {this.state.genres.map((genre: Category) => (<figure key={genre.id}><Image src={genre.image} width={100} height={100} alt={genre.name} /><figcaption>{genre.name}</figcaption></figure>))}
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
