//import { AppBar } from '@mui/material';
import React, {Component} from 'react';

const listItems = [ 'demos','elements', 'features', 'support', 'documentation']

class AppBar extends Component {
    render(){
        return (
            <nav className='sticky justify-between flex flex-row '>
                <a href=""><img src="" alt="logo image" srcset="" /></a>
                <ul className='invisible lg:visible' >{listItems.map((listItem) => <li>{listItem}</li>)}</ul>
                <a href=''>
                    'support cv_maker'
                </a>
                <a className='lg:invisible'>
                    ''
                </a>
            </nav>
        );
    }
}

export default AppBar;