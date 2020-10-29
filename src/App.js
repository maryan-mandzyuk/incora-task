import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { UserPage } from './components/User/UserPage';
import { PostPage } from './components/Post/PostsPage';
import PostDetailsPage from './components/Post/PostDetailsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/users">
            <UserPage />
          </Route>
          <Route path="/posts/:userId">
            <PostPage />
          </Route>
          <Route path="/post/:postId">
            <PostDetailsPage />
          </Route>
          <Route path="*">
            <UserPage />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
