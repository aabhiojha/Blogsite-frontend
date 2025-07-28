import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm px-6 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo + Links */}
                <div className="flex items-center gap-8 cursor-pointer">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-black rotate-45" />
                        <span className="font-bold text-xl text-gray-900">Tech Insights</span>
                    </Link>

                    {/* Desktop Nav Links - Removed About and Contact */}
                    <ul className="hidden md:flex gap-6 text-sm text-gray-950">
                        <li>
                            <Link to="/" className="hover:text-black cursor-pointer">Home</Link>
                        </li>
                    </ul>
                </div>

                {/* Desktop Buttons - Removed Search */}
                <div className="hidden md:flex items-center gap-4">

                    {isAuthenticated ? (
                        <>
                            <Link 
                                to="/create"
                                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold text-sm px-4 py-1.5 rounded-lg transition-colors"
                            >
                                Create Post
                            </Link>

                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <User size={16} />
                                <span>Welcome, {user?.username}</span>
                            </div>

                            <button 
                                onClick={handleLogout}
                                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-black font-semibold text-sm px-4 py-1.5 rounded-lg flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login"
                                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-black font-semibold text-sm px-4 py-1.5 rounded-lg"
                            >
                                Login
                            </Link>

                            <Link 
                                to="/signup"
                                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-black font-semibold text-sm px-4 py-1.5 rounded-lg"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileOpen && (
                <div className="md:hidden mt-4 space-y-3 px-4 pb-4 border-t pt-4">
                    <ul className="flex flex-col gap-2 text-gray-800 text-sm">
                        <li>
                            <Link to="/" className="hover:text-black cursor-pointer">Home</Link>
                        </li>
                    </ul>
                    <div className="flex flex-col gap-2 mt-4">

                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to="/create"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                                >
                                    Create Post
                                </Link>

                                <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700">
                                    <User size={16} />
                                    <span>Welcome, {user?.username}</span>
                                </div>

                                <button 
                                    onClick={handleLogout}
                                    className="bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login"
                                    className="bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm px-4 py-2 rounded-lg"
                                >
                                    Login
                                </Link>

                                <Link 
                                    to="/signup"
                                    className="bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm px-4 py-2 rounded-lg"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
