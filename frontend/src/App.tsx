
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import Layout from "./Components/Layout.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Layout/>}>
            <Route index element={<HomeScreen />}/>
            <Route path='meet' element={<h2>Meet Here  </h2>}/>
        </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
