import { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.scss';
import SideBar from './components/side-bar/side-bar';
import UsersListContainer from './components/users-list/users-list-container';
import UserProfileContainer from './components/user-profile/user-profile-container';

export enum SortOrder {
  BYCOMPANY = "byCompany",
  BYCITY = "byCity"
};

interface AppProps { };
interface AppState {
  sorting: SortOrder
};

export class App extends Component<AppProps, AppState> {
  state = {
    sorting: SortOrder.BYCITY
  };

  constructor(props: AppProps) {
    super(props);
    this.sort = this.sort.bind(this);
  };

  sort(sortOrder: SortOrder) {
    this.setState({ sorting: sortOrder })
  };

  render() {
    return (
      <div className='pageWraper'>
        <SideBar sort={this.sort} />
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<UsersListContainer sortOrder={this.state.sorting} />} />
              <Route path="/profile" element={<UserProfileContainer />} >
                <Route path=":userId" element={<UserProfileContainer />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    );
  };
};

export default App