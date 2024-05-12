import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import MainRoutes from './routes/routes'
library.add(fas, fab)

function App() {
    return (
        <Router>
            <MainRoutes/>
        </Router>
    )
}

export default App
