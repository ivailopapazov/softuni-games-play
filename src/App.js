import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import PrivateRoute from "./components/common/PrivateRoute";

import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import CreateGame from './components/CreateGame/CreateGame';
import EditGame from './components/EditGame/EditGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from "./components/GameDetails/GameDetails";
import './App.css';
import GameOwner from "./components/common/GameOwner";

const Register = lazy(() => import('./components/Register/Register'));

function App() {
    return (
        <AuthProvider>
            <div id="box">
                <Header />

                {/* Main Content */}
                <GameProvider>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={
                                <Suspense fallback={<span>Loading....</span>}>
                                    <Register />
                                </Suspense>
                            } />
                            <Route path="/create" element={(
                                <PrivateRoute>
                                    <CreateGame />
                                </PrivateRoute>
                            )} />
                            <Route element={<GameOwner />}>
                                <Route path="/games/:gameId/edit" element={<EditGame />} />
                            </Route>
                            <Route element={<PrivateRoute />}>
                                <Route path="/logout" element={<Logout />} />
                            </Route>
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:gameId" element={<GameDetails />} />
                        </Routes>
                    </main>
                </GameProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
