import { RootState } from "@/store";
import { ApiStatus } from "@/store/reducers/main_slice";
import { connect } from "react-redux";
import Loader from "../network_request";
import { getSeveralCategories, test } from "@/utils/api";
import { Component } from "react";
import Image from "next/image";
import { Category } from "@/utils/types";
import image from '@/static/images/test.jpeg'
import {random} from '@/utils'


type Props = {
  access_token: string | null,
  status: ApiStatus
}

const bgColors = ['#27856A', '#8D67AB', '#1E3264', '#E8115B']

const style: React.CSSProperties = {
  width: 14.4375/1.5 + 'rem',
  height: 14.4375/1.5 + 'rem',
  flexShrink: '0',
  borderRadius: '0.625rem',
  position: 'relative'
}

const imgStyle: React.CSSProperties = {
  width: 7/1.5 +'rem',
  height: 7/1.5 +'rem',
  flexShrink: '0',
  borderRadius: '0.6875rem 0rem 0.625rem 0rem',
  background: 'lightgray 50% / cover no-repeat',
  mixBlendMode: 'luminosity',
  position:  'absolute',
  bottom: '0',
  right: '0'
}

class BrowseAll extends Component<Props, { categories: any }>{
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: null
    }
  }

  componentDidMount(): void {
    //if (this.props.access_token == null) 
    return this.setState(state => ({ ...state, categories: test }));

    getSeveralCategories(this.props.access_token).then(
      data => this.setState(state => ({ ...state, categories: data }))
    )

  }

  render() {
    return this.state.categories ? (
      <section className='flex flex-col w-fulljustify-center mt-8'>
        <h3>Browse all</h3>
        <div className={'flex flex-row flex-wrap items-center justify-between gap-4 mt-4'}>
          {this.state.categories.map((cateogry: Category) => {
            const myStyle = {...style, background: random(bgColors)};

            return (<figure key={cateogry.id} style={myStyle}><Image src={image || cateogry.image} width={100} height={100} fill={false} alt={cateogry.name} style={imgStyle} />
            <figcaption className = 'top-4 left-4 absolute text-lg font-black'>{cateogry.name}</figcaption></figure>)
          })}
        </div>
      </section>

    ) : <Loader status={this.props.status} meta={'BrowseAll'} />

  }


}


const mapStateToProps = (state: RootState) => {
  return {
    access_token: state.main.access_token,
    status: state.main.fetchAccessTokenStatus,
  };
};

export default connect(mapStateToProps)(BrowseAll);
