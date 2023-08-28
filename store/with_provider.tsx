
import { Provider } from 'react-redux'
import { store } from '@/store'

const withProvider = (Component : React.FC) => {
    return function EnhancedComponent(){
        return (
        <Provider store = {store}>
            <Component />
        </Provider>
        )
    }
  }

  export default withProvider;