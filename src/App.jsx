import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyProfile from "./components/user/MyProfile";
import UserProfile from "./components/user/UserProfile";
import FriendRequests from "./components/Friends/FriendRequests";
import CreatePost from "./posts/CreatePost";
import EditPost from "./posts/EditPost";
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />}>
            <Route index element={<Register />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/myProfile" element={<MyProfile/>}/>
          <Route path="/:userId" element={<UserProfile/>}/>
          <Route path="/friendRequests" element={<FriendRequests/>}/>
          <Route path="/createPost" element={<CreatePost/>}/>
          <Route path="/editPost/:postId" element={<EditPost/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;