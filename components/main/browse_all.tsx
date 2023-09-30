import { RootState } from "@/store";
import { ApiStatus } from "@/store/reducers/main_slice";
import { connect } from "react-redux";
import Loader from "../network_request";
import { getSeveralCategories } from "@/utils/api";
import { Component } from "react";
import Image from "next/image";
import { Category } from "@/utils/types";

type Props = {
  access_token: string | null,
  status: ApiStatus
}

class BrowseAll extends Component<Props, { categories: any }>{
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: null
    }
  }

  componentDidMount(): void {
    if (this.props.access_token == null) return;
    getSeveralCategories(this.props.access_token).then(
      data => this.setState(state => ({ ...state, categories: data }))
    )

  }

  render() {
    return this.state.categories ? (
      <section>
        <h3>Browse all</h3>
        <div className={'flex flex-row'}>
          {this.state.categories.map((cateogry: Category) => (<figure key={cateogry.id}><Image src={cateogry.image} width={100} height={100} alt={cateogry.name} />
            <figcaption>{cateogry.name}</figcaption></figure>))}
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
