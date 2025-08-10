import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { Settings, X } from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";


const LevelPage = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [openSettingsFor, setOpenSettingsFor] = useState(null);
    const [timerSettings, setTimerSettings] = useState({
        step1: 60,
        step2: 60,
        step3: 60,
    });

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/users/data?email=${user.email}`)
                .then(res => res.json())
                .then(data => setUserData(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    if (!userData) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
    }

    const certificates = userData.certificates || [];
    const hasA2 = certificates.includes('A2');
    const hasB2 = certificates.includes('B2');

    const tests = [
        {
            id: 'step1',
            name: 'Step 1: A1 & A2',
            unlocked: true,
            description: 'Total 44 questions, 44 minutes',
        },
        {
            id: 'step2',
            name: 'Step 2: B1 & B2',
            unlocked: hasA2,
            description: hasA2 ? 'Total 44 questions, 44 minutes' : 'Complete Step 1 to unlock',
        },
        {
            id: 'step3',
            name: 'Step 3: C1 & C2',
            unlocked: hasB2,
            description: hasB2 ? 'Total 44 questions, 44 minutes' : 'Complete Steps 1 & 2 to unlock',
        },
    ];

    const handleTimerChange = (testId, value) => {
        setTimerSettings(prev => ({
            ...prev,
            [testId]: parseInt(value, 10)
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-extrabold mb-12 text-center tracking-wide">
                Choose Your Assessment
            </h1>
            <div className="max-w-md mx-auto space-y-6 w-full">
                {tests.map(test => (
                    <div
                        key={test.id}
                        className={`relative group ${!test.unlocked && 'cursor-not-allowed'}`}
                    >
                        <Link
                            to={test.unlocked ? `/quiz/${test.id}?timer=${timerSettings[test.id]}` : '#'}
                            className={`
                                no-underline w-full block
                                bg-gray-800 rounded-xl shadow-lg p-6
                                transform transition-transform duration-300
                                border border-gray-700
                                ${test.unlocked
                                    ? 'hover:scale-[1.02] hover:bg-gradient-to-br from-purple-500 to-indigo-600'
                                    : 'opacity-50 pointer-events-none'
                                }
                            `}
                        >
                            <h2 className="text-2xl font-bold">{test.name}</h2>
                            <p className="text-sm text-gray-300 mt-2">{test.description}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Timer: {timerSettings[test.id] || 60} seconds per question
                            </p>
                        </Link>

                        {/* Settings button */}
                        <button
                            disabled={!test.unlocked}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent link from navigating
                                e.stopPropagation(); // Stop event from bubbling to parent link
                                setOpenSettingsFor(openSettingsFor === test.id ? null : test.id);
                            }}
                            className={`${!test.unlocked && 'cursor-not-allowed opacity-50'} absolute top-4 right-4 text-gray-400 hover:text-white transition-colors`}
                        >
                            <Settings size={20} />
                        </button>
                        
                        {/* Settings Modal (Popover) */}
                        {openSettingsFor === test.id && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                             bg-gray-700 p-4 rounded-lg shadow-xl border border-gray-600
                                             z-10 w-full max-w-sm"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Timer Settings</h3>
                                    <button onClick={() => setOpenSettingsFor(null)} className="text-gray-400 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>
                                <label className="block mb-2 text-sm text-gray-300">
                                    Time per question (seconds):
                                </label>
                                <input
                                    type="number"
                                    value={timerSettings[test.id]}
                                    onChange={(e) => handleTimerChange(test.id, e.target.value)}
                                    min="10" // Minimum timer value to prevent issues
                                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                                />
                                <p className="text-xs text-gray-400 mt-2">
                                    Total Time: {Math.round((timerSettings[test.id] * 44) / 60)} minutes
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LevelPage;